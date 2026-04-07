import type { Metadata } from "next";
import { Cormorant_Garamond, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import Analytics from "@/components/Analytics";
import Tracker from "@/components/Tracker";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-shippori",
  display: "swap",
});

const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "members cafe -MIYAKO- | 京都・河原町の会員制カフェ＆バー",
  description:
    "京都・河原町の完全会員制カフェ＆バー。女性無料・飲み放題・時間制限なし。古都に眠りし非日常異空間で、特別な夜をお楽しみください。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${shippori.variable} ${zen.variable}`}
    >
      <body className="font-[family-name:var(--font-zen)]">
        <Analytics />
        <Tracker />
        {children}
      </body>
    </html>
  );
}
