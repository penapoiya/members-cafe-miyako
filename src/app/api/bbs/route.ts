import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, gender, message, deviceId } = body;

    if (!name || !gender || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const now = new Date().toISOString();

    // ── IP・地域・UA を取得（Vercelが自動付与するヘッダー） ──
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const city = h.get("x-vercel-ip-city") || "";
    const region = h.get("x-vercel-ip-country-region") || "";
    const country = h.get("x-vercel-ip-country") || "";
    const location = [city, region, country].filter(Boolean).join(", ") || "unknown";
    const userAgent = h.get("user-agent") || "unknown";

    // microCMS に保存
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY && process.env.MICROCMS_SERVICE_DOMAIN !== "dummy") {
      const res = await fetch(
        `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
          },
          body: JSON.stringify({
            name,
            gender: [gender],
            message,
            date: now,
            ip,
            location,
            userAgent,
            deviceId: deviceId || "unknown",
          }),
        }
      );

      if (!res.ok) {
        const error = await res.text();
        console.error("microCMS error:", error);
        return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
      }

      const result = await res.json();
      return NextResponse.json({
        id: result.id,
        name,
        gender,
        message,
        date: now,
      });
    }

    // microCMS未接続時（デモ）
    return NextResponse.json({
      id: `demo-${Date.now()}`,
      name,
      gender,
      message,
      date: now,
    });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
