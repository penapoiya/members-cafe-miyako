"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

// カスタムイベントを送信するヘルパー
export function trackEvent(action: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
