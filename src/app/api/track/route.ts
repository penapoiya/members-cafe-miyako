// /api/track — 個人レベルの閲覧ログを Supabase に蓄積する受信エンドポイント
//
// クライアント側のトラッカーから beacon/fetch で呼ばれる。
// Vercel が付与する地域ヘッダーを併用して国・地域を取得。
// セッション継続性: クライアントが session_id を保持し、30分以上の中断があれば新IDを発行する。

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type TrackPayload = {
  type?: "page_view" | "duration";
  device_id?: string;
  session_id?: string;
  path?: string;
  referrer?: string;
  screen_width?: number;
  screen_height?: number;
  language?: string;
  timezone?: string;
  device_type?: string;
  // duration only
  duration_ms?: number;
  max_scroll_pct?: number;
};

function classifyDeviceType(ua: string): string {
  const u = ua.toLowerCase();
  if (/ipad|tablet/.test(u)) return "tablet";
  if (/mobile|iphone|android/.test(u)) return "mobile";
  return "desktop";
}

export async function POST(request: Request) {
  try {
    const body: TrackPayload = await request.json();

    if (!body.device_id || !body.session_id || !body.path) {
      return NextResponse.json({ error: "missing required fields" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      // Supabase 未設定時は静かに 204 を返す（クライアントの動作を妨げない）
      return new NextResponse(null, { status: 204 });
    }

    const h = await headers();
    const ua = h.get("user-agent") || "unknown";
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const country = h.get("x-vercel-ip-country") || null;
    const region = h.get("x-vercel-ip-country-region") || null;
    const city = h.get("x-vercel-ip-city") || null;
    const deviceType = body.device_type || classifyDeviceType(ua);

    if (body.type === "duration") {
      // ── ページ離脱時の滞在時間記録 ──
      if (typeof body.duration_ms !== "number" || body.duration_ms < 0) {
        return NextResponse.json({ error: "invalid duration" }, { status: 400 });
      }
      const { error } = await supabase.from("page_view_durations").insert({
        device_id: body.device_id,
        session_id: body.session_id,
        path: body.path,
        duration_ms: Math.min(body.duration_ms, 60 * 60 * 1000), // 上限1時間（不正値ガード）
        max_scroll_pct:
          typeof body.max_scroll_pct === "number"
            ? Math.max(0, Math.min(100, Math.round(body.max_scroll_pct)))
            : null,
      });
      if (error) {
        console.error("[track] duration insert error:", error);
        return NextResponse.json({ error: "insert failed" }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    // ── ページビュー記録 ──
    const { error: pvError } = await supabase.from("page_views").insert({
      device_id: body.device_id,
      session_id: body.session_id,
      path: body.path,
      referrer: body.referrer || null,
      user_agent: ua,
      ip,
      country,
      region,
      city,
      device_type: deviceType,
      screen_width: body.screen_width || null,
      screen_height: body.screen_height || null,
      language: body.language || null,
      timezone: body.timezone || null,
    });
    if (pvError) {
      console.error("[track] page_view insert error:", pvError);
      return NextResponse.json({ error: "insert failed" }, { status: 500 });
    }

    // ── セッション upsert（30分セッション継続ロジック） ──
    const { data: existing } = await supabase
      .from("sessions")
      .select("id, page_count, started_at")
      .eq("session_id", body.session_id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("sessions")
        .update({
          last_seen_at: new Date().toISOString(),
          page_count: (existing.page_count || 0) + 1,
          exit_path: body.path,
        })
        .eq("session_id", body.session_id);
    } else {
      // 過去に同一 device_id のセッションがあれば is_returning = true
      const { count: priorCount } = await supabase
        .from("sessions")
        .select("id", { count: "exact", head: true })
        .eq("device_id", body.device_id);

      await supabase.from("sessions").insert({
        session_id: body.session_id,
        device_id: body.device_id,
        started_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
        page_count: 1,
        entry_path: body.path,
        exit_path: body.path,
        ip,
        country,
        city,
        user_agent: ua,
        device_type: deviceType,
        is_returning: (priorCount || 0) > 0,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track] unexpected error:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
