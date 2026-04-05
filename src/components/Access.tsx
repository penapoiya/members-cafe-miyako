export default function Access() {
  return (
    <section id="access" className="relative py-32 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label reveal">Information</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
          Access
        </h2>
        <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
          お店のこと
        </p>
        <div className="w-10 h-px bg-[var(--rose-gold)] mb-12 reveal reveal-delay-2" />

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-16">
          <div>
            <InfoItem label="Store Name" delay="1">
              <p>members cafe -MIYAKO-</p>
              <p className="text-[var(--text-dim)]">メンバーズカフェ みやこ</p>
            </InfoItem>

            <InfoItem label="Hours" delay="2">
              <p>19:30〜24:00（毎日）</p>
              <p>13:30〜24:00（木曜日のみ）</p>
              <p className="text-[var(--text-dim)]">不定休</p>
            </InfoItem>

            <InfoItem label="Address" delay="2">
              <p>京都府京都市中京区大黒町（河原町通り）</p>
              <p className="text-[0.8rem] text-[var(--text-dim)]">
                ※ 到着次第一度お電話下さい。
              </p>
            </InfoItem>

            <InfoItem label="Contact" delay="3">
              <p>
                <a
                  href="tel:050-6876-2583"
                  className="text-[var(--champagne)] border-b border-[var(--border-accent)] pb-0.5 hover:border-[var(--champagne)] transition-colors no-underline"
                >
                  050-6876-2583
                </a>
              </p>
              <p>
                <a
                  href="mailto:members.cafe.miyako.k@gmail.com"
                  className="text-[var(--text-dim)] text-[0.85rem] hover:text-[var(--champagne)] transition-colors no-underline"
                >
                  members.cafe.miyako.k@gmail.com
                </a>
              </p>
            </InfoItem>

            <a
              href="tel:050-6876-2583"
              className="inline-flex items-center gap-4 font-[family-name:var(--font-cormorant)] text-[0.8rem] tracking-[0.3em] uppercase text-[var(--champagne)] border border-[var(--rose-gold)] px-10 py-4 mt-8 transition-all duration-500 hover:bg-[var(--rose-gold)] hover:text-[var(--bg-primary)] no-underline reveal reveal-delay-3"
              style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
            >
              Call Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* 地図エリア */}
          <div className="aspect-[4/3] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center reveal reveal-delay-2">
            <div className="text-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--text-dim)" strokeWidth="1" className="mx-auto mb-4">
                <path d="M20 4c-6.6 0-12 5.4-12 12 0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" />
                <circle cx="20" cy="16" r="4" />
              </svg>
              <span className="font-[family-name:var(--font-cormorant)] text-[0.65rem] tracking-[0.3em] uppercase text-[var(--text-dim)]">
                京都・河原町エリア
              </span>
            </div>
          </div>
        </div>

        {/* お問い合わせフォーム（控えめに） */}
        <div className="mt-24 max-w-[500px] mx-auto reveal reveal-delay-3">
          <details className="group">
            <summary className="cursor-pointer text-center font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.3em] uppercase text-[var(--text-dim)] hover:text-[var(--text-secondary)] transition-colors list-none">
              <span className="border-b border-[var(--border-subtle)] pb-1">Contact Form</span>
            </summary>
            <form className="mt-8 space-y-4" action={`mailto:members.cafe.miyako.k@gmail.com`} method="post" encType="text/plain">
              <input type="text" name="name" placeholder="お名前" className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.85rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)]" />
              <input type="email" name="email" placeholder="メールアドレス" className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.85rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)]" />
              <input type="tel" name="phone" placeholder="電話番号" className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.85rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)]" />
              <input type="text" name="subject" placeholder="件名" className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.85rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)]" />
              <textarea name="message" placeholder="メッセージ" rows={4} className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.85rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)] resize-vertical" />
              <button type="submit" className="font-[family-name:var(--font-cormorant)] text-[0.8rem] tracking-[0.25em] uppercase text-[var(--bg-primary)] bg-gradient-to-r from-[var(--rose-gold)] to-[var(--rose-gold-light)] border-none px-10 py-3 cursor-pointer transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,149,106,0.25)]">
                Send
              </button>
            </form>
          </details>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, delay, children }: { label: string; delay: string; children: React.ReactNode }) {
  return (
    <div className={`mb-10 reveal reveal-delay-${delay}`}>
      <p className="font-[family-name:var(--font-cormorant)] text-[0.65rem] tracking-[0.4em] uppercase text-[var(--rose-gold)] mb-3">
        {label}
      </p>
      <div className="font-[family-name:var(--font-shippori)] text-[0.95rem] text-[var(--text-secondary)] leading-[2]">
        {children}
      </div>
    </div>
  );
}
