"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "#concept", label: "Concept" },
  { href: "#gallery", label: "Gallery" },
  { href: "/bbs", label: "Event & BBS", newTab: true },
  { href: "#system", label: "System" },
  { href: "#access", label: "Access" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggle = () => {
    setOpen((v) => {
      document.body.style.overflow = v ? "" : "hidden";
      return !v;
    });
  };

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return isHome ? href : `/${href}`;
    return href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-600 ${
          scrolled || open
            ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-[20px] py-3 px-6 border-b border-[var(--border-subtle)]"
            : "py-5 px-6"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <a
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-[1.2rem] font-light tracking-[0.35em] uppercase text-[var(--champagne)] no-underline z-[1001]"
        >
          Miyako
        </a>

        {/* デスクトップ: 横並び */}
        <ul className="list-none gap-8 hidden min-[901px]:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={resolveHref(link.href)}
                {...("newTab" in link && link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-[family-name:var(--font-cormorant)] text-[0.8rem] font-normal tracking-[0.2em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--champagne)] relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[var(--rose-gold)] after:transition-[width] after:duration-400 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* モバイル: ハンバーガー */}
        <button
          className="hidden max-[900px]:flex flex-col gap-[5px] bg-transparent border-none p-[5px] cursor-pointer z-[1001]"
          onClick={toggle}
          aria-label="メニュー"
        >
          <span
            className={`w-6 h-px bg-[var(--champagne)] transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-[var(--champagne)] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-[var(--champagne)] transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* モバイルメニュー: 上からスライドダウン */}
      <div
        className={`fixed top-0 left-0 right-0 z-[999] bg-[rgba(10,10,10,0.97)] backdrop-blur-[30px] border-b border-[var(--border-subtle)] pt-16 pb-8 px-6 transition-all duration-500 min-[901px]:hidden ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <ul className="list-none flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={resolveHref(link.href)}
                onClick={close}
                {...("newTab" in link && link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-[family-name:var(--font-cormorant)] text-[1.1rem] font-normal tracking-[0.2em] uppercase text-[var(--text-secondary)] no-underline hover:text-[var(--champagne)] transition-colors duration-300 block py-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* オーバーレイ（メニュー外タップで閉じる） */}
      {open && (
        <div
          className="fixed inset-0 z-[998] min-[901px]:hidden"
          onClick={close}
        />
      )}
    </>
  );
}
