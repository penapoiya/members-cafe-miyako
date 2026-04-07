"use client";

// Tracker — クライアント側の閲覧計測コンポーネント
//
// 役割:
//   1. ページ表示時に /api/track に page_view を送信
//   2. ページ離脱時に滞在時間とスクロール深度を sendBeacon で送信
//   3. session_id を管理（30分中断で新セッション）
//   4. SPA 遷移にも追従（pathname 変化を監視）

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getDeviceId } from "@/lib/fingerprint";

const SESSION_KEY = "miyako_session_id";
const SESSION_TS_KEY = "miyako_session_last_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30分

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const now = Date.now();
  const last = parseInt(sessionStorage.getItem(SESSION_TS_KEY) || "0", 10);
  let sid = sessionStorage.getItem(SESSION_KEY) || "";
  if (!sid || now - last > SESSION_TIMEOUT_MS) {
    sid = `s_${now}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  sessionStorage.setItem(SESSION_TS_KEY, String(now));
  return sid;
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getMaxScrollPct(): number {
  if (typeof document === "undefined") return 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight;
  if (docHeight <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / docHeight) * 100));
}

export default function Tracker() {
  const pathname = usePathname();
  const arrivedAtRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const lastSentPathRef = useRef<string>("");

  // ── ページビュー送信（pathname変化ごと） ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lastSentPathRef.current === pathname) return;

    // 直前ページの滞在時間を送信してから新ページのpv送信
    const prevPath = lastSentPathRef.current;
    if (prevPath) {
      const duration = Date.now() - arrivedAtRef.current;
      const deviceId = getDeviceId();
      const sessionId = getOrCreateSessionId();
      try {
        const payload = JSON.stringify({
          type: "duration",
          device_id: deviceId,
          session_id: sessionId,
          path: prevPath,
          duration_ms: duration,
          max_scroll_pct: maxScrollRef.current,
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
        } else {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {}
    }

    // 新ページのpv記録
    arrivedAtRef.current = Date.now();
    maxScrollRef.current = 0;
    lastSentPathRef.current = pathname;

    const deviceId = getDeviceId();
    const sessionId = getOrCreateSessionId();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        device_id: deviceId,
        session_id: sessionId,
        path: pathname,
        referrer: document.referrer || null,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        device_type: getDeviceType(),
      }),
    }).catch(() => {});
  }, [pathname]);

  // ── スクロール深度の追跡 ──
  useEffect(() => {
    const handler = () => {
      const cur = getMaxScrollPct();
      if (cur > maxScrollRef.current) maxScrollRef.current = cur;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── ページ離脱・タブ切替時に滞在時間を送信 ──
  useEffect(() => {
    const sendDuration = () => {
      const path = lastSentPathRef.current;
      if (!path) return;
      const duration = Date.now() - arrivedAtRef.current;
      if (duration < 100) return;
      const deviceId = getDeviceId();
      const sessionId = getOrCreateSessionId();
      try {
        const payload = JSON.stringify({
          type: "duration",
          device_id: deviceId,
          session_id: sessionId,
          path,
          duration_ms: duration,
          max_scroll_pct: maxScrollRef.current,
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
        }
      } catch {}
    };

    const visibilityHandler = () => {
      if (document.visibilityState === "hidden") sendDuration();
    };
    window.addEventListener("pagehide", sendDuration);
    document.addEventListener("visibilitychange", visibilityHandler);
    return () => {
      window.removeEventListener("pagehide", sendDuration);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return null;
}
