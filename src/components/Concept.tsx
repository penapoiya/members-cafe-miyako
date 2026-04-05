export default function Concept() {
  return (
    <section id="concept" className="relative py-32 px-8" style={{ background: `radial-gradient(ellipse at 70% 30%, rgba(196,149,106,0.03) 0%, transparent 50%), var(--bg-primary)` }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="section-label reveal">Concept</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
            Concept
          </h2>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
            店内案内
          </p>
          <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-12 reveal reveal-delay-2" />
        </div>

        <div className="max-w-[800px] mx-auto space-y-8">
          <p className="font-[family-name:var(--font-shippori)] text-[0.95rem] leading-[2.4] text-[var(--text-secondary)] reveal reveal-delay-2">
            members cafe MIYAKOは京都の紳士、淑女により作り出される交流の場となります。
            <br />
            当店は、完全会員制となっております。会員様方だけに開かれる、秘密のバーですのでどうぞリラックスしてお楽しみ下さい。
          </p>

          <div className="border-l border-[var(--rose-gold)] pl-6 reveal reveal-delay-3">
            <p className="font-[family-name:var(--font-shippori)] text-[1.15rem] font-medium text-[var(--rose-gold-light)] tracking-[0.1em] leading-[2.2]">
              古都に眠りし非日常異空間。
              <br />
              楽しむためのこだわりが、あなたをお出迎えします。
            </p>
          </div>

          <p className="font-[family-name:var(--font-shippori)] text-[0.95rem] leading-[2.4] text-[var(--text-secondary)] reveal reveal-delay-3">
            カウンターでは様々な種類のお酒を片手に、普段の社会では話せないことや恋愛の悩みを大いに語り合ってください。秘密厳守のスタッフに相談をするのも良いでしょう。
          </p>

          <p className="font-[family-name:var(--font-shippori)] text-[0.95rem] leading-[2.4] text-[var(--text-secondary)] reveal reveal-delay-3">
            お二人の世界を楽しみたい方々にはカップルシートも完備しています。さらに意気投合したなら是非、もっと奥へとどうぞ。
            あなたの秘密も、ここなら開花させられるかもしれません。
          </p>

          <p className="font-[family-name:var(--font-shippori)] text-[0.95rem] leading-[2.4] text-[var(--text-secondary)] reveal reveal-delay-3">
            心の奥底に存在しているもう一人の、いや本当の自分を解放し、何のしがらみもないMIYAKOの自由を一身に感じてください。当店はあなたをお待ちいたしております。
          </p>
        </div>
      </div>
    </section>
  );
}
