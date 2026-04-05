const links = [
  { href: "/#concept", label: "Concept" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/bbs", label: "Event & BBS", newTab: true },
  { href: "/#system", label: "System" },
  { href: "/#access", label: "Access" },
  { href: "/privacy", label: "Privacy Policy", newTab: true },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-8 px-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-[1fr_auto_1fr] max-[900px]:grid-cols-1 max-[900px]:text-center gap-12 items-start">
        <div>
          <div className="font-[family-name:var(--font-cormorant)] text-[1.5rem] font-light tracking-[0.3em] text-[var(--champagne)] uppercase">
            Miyako
          </div>
          <div className="font-[family-name:var(--font-shippori)] text-[0.7rem] tracking-[0.5em] text-[var(--text-dim)] mt-1">
            メンバーズカフェ みやこ
          </div>
        </div>

        <ul className="list-none flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...("newTab" in link && link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-[family-name:var(--font-cormorant)] text-[0.75rem] tracking-[0.2em] uppercase text-[var(--text-dim)] hover:text-[var(--rose-gold-light)] transition-colors no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-6 justify-end max-[900px]:justify-center">
          <a
            href="https://x.com/MiyakocafeKyot1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-9 h-9 flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-dim)] hover:border-[var(--rose-gold)] hover:text-[var(--rose-gold)] transition-all duration-400 no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto mt-12 pt-8 border-t border-[var(--border-subtle)] flex justify-between max-[900px]:flex-col max-[900px]:gap-3 max-[900px]:text-center">
        <p className="text-[0.65rem] tracking-[0.15em] text-[var(--text-dim)]">
          &copy; {new Date().getFullYear()} members cafe -MIYAKO-. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
