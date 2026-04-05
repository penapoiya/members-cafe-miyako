export default function System() {
  return (
    <section id="system" className="relative py-32 px-8" style={{ background: `radial-gradient(ellipse at 30% 60%, rgba(196,149,106,0.03) 0%, transparent 50%), var(--bg-primary)` }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <p className="section-label reveal">Price</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
            System
          </h2>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
            料金システム
          </p>
          <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-12 reveal reveal-delay-2" />
        </div>

        {/* 営業時間 */}
        <div className="text-center mb-16 reveal reveal-delay-2">
          <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.4em] uppercase text-[var(--rose-gold)] mb-3">Hours</p>
          <p className="font-[family-name:var(--font-shippori)] text-[1rem] text-[var(--champagne)] leading-[2]">
            19:30〜24:00（毎日）<br />
            13:30〜24:00（木曜日のみ）<br />
            <span className="text-[var(--text-dim)] text-[0.85rem]">不定休</span>
          </p>
        </div>

        {/* 料金カード */}
        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-8">
          {/* 女性 */}
          <div className="bg-[var(--bg-card)] border border-[var(--rose-gold)] p-10 max-[900px]:p-8 text-center transition-all duration-500 hover:-translate-y-1 relative reveal reveal-delay-1" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
            <span className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--rose-gold)] to-[var(--rose-gold-light)] text-[var(--bg-primary)] font-[family-name:var(--font-cormorant)] text-[0.6rem] tracking-[0.2em] px-5 py-1.5 font-medium">
              RECOMMENDED
            </span>
            <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.4em] uppercase text-[var(--rose-gold)] mb-6">Women</p>
            <h3 className="font-[family-name:var(--font-shippori)] text-[1.15rem] font-medium text-[var(--champagne)] mb-6">女性のお客様</h3>
            <PriceRow label="通常料金" value="0円" note="無料" />
            <PriceRow label="入会金" value="1,000円" note="BBS書込で無料" />
            <PriceRow label="アルコール" value="500円" note="/杯" />
            <PriceRow label="ソフトドリンク" value="0円" note="飲み放題" />
          </div>

          {/* 男性 */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-8 text-center transition-all duration-500 hover:border-[var(--border-accent)] hover:-translate-y-1 reveal reveal-delay-2" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
            <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.4em] uppercase text-[var(--rose-gold)] mb-6">Men</p>
            <h3 className="font-[family-name:var(--font-shippori)] text-[1.15rem] font-medium text-[var(--champagne)] mb-6">男性のお客様</h3>
            <PriceRow label="通常料金" value="8,000円" />
            <PriceRow label="入会金" value="8,000円" />
            <PriceRow label="アルコール" value="500円" note="/杯" />
            <PriceRow label="ソフトドリンク" value="0円" note="飲み放題" />
          </div>

          {/* カップル */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-8 text-center transition-all duration-500 hover:border-[var(--border-accent)] hover:-translate-y-1 reveal reveal-delay-3" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
            <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.4em] uppercase text-[var(--rose-gold)] mb-6">Couple</p>
            <h3 className="font-[family-name:var(--font-shippori)] text-[1.15rem] font-medium text-[var(--champagne)] mb-6">カップルのお客様</h3>
            <PriceRow label="通常料金" value="6,000円" note="/組" />
            <PriceRow label="入会金" value="6,000円" note="/組" />
            <PriceRow label="アルコール" value="500円" note="/杯" />
            <PriceRow label="ソフトドリンク" value="0円" note="飲み放題" />
          </div>
        </div>

        {/* 特典・備考 */}
        <div className="text-center mt-12 space-y-1 reveal reveal-delay-3">
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-dim)] leading-[2]">
            ※ BBS来店予告で、すべてのお客様にドリンク一杯サービス
          </p>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-dim)] leading-[2]">
            ※ コスプレ着用の女性のお客様は飲み放題
          </p>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-dim)] leading-[2]">
            ※ 会員証更新（半年）: 男性 1,000円 / 女性 1,000円
          </p>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] text-[var(--text-dim)] leading-[2]">
            ※ 会員証紛失: 男性 2,500円 / 女性 1,000円
          </p>
        </div>

        {/* 注意事項 */}
        <div className="mt-20 max-w-[800px] mx-auto reveal reveal-delay-3">
          <h3 className="font-[family-name:var(--font-shippori)] text-[1rem] font-medium text-[var(--champagne)] mb-6 text-center tracking-[0.1em]">
            ご利用にあたって
          </h3>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-6 text-[0.8rem] text-[var(--text-secondary)] leading-[2.2] space-y-4">
            <p>当スペースは完全会員制となっております。初回ご入会の際は<strong className="text-[var(--champagne)]">健康保険証（必須）</strong>と、その他<strong className="text-[var(--champagne)]">写真付き身分証明書</strong>の2つを必ずご提示お願い致します。</p>
            <p>新規の方につきましては入会時に面接をさせていただき、場合によってはその意向に沿えないこともございます。個人情報は厳守いたします。</p>
            <p>カップル様、お一人の男性・女性様がご入店いただけます。但し、男性のみのグループはお断りする場合がございます。</p>
            <p>暴力団関係者、薬物使用者、同業者の方のご入店はお断り致します。</p>
            <p>他のお客様が不愉快に感じる服装や衛生状態の方、仮眠目的・泥酔状態でのご入店はお断り致します。</p>

            <div className="border-t border-[var(--border-subtle)] pt-4 mt-4">
              <p className="font-medium text-[var(--champagne)] mb-2">禁止事項</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-dim)]">
                <li>会員様同士の連絡先等の交換</li>
                <li>店内を故意に汚す・破損する行為</li>
                <li>他の会員様に対して、迷惑・不快な行動</li>
                <li>店内での携帯電話の使用</li>
                <li>個人のカメラ類での場内撮影</li>
              </ul>
              <p className="mt-3 text-[var(--text-dim)] text-[0.75rem]">
                ※ 規約違反やお店側からの指示に従わない場合は即退場・退会となります。入会金・入場料金の返金はできません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex justify-between items-baseline py-3 border-b border-[rgba(196,149,106,0.08)] last:border-b-0">
      <span className="text-[0.85rem] text-[var(--text-secondary)]">{label}</span>
      <span className="font-[family-name:var(--font-cormorant)] text-[1.3rem] text-[var(--rose-gold-light)]">
        {value}
        {note && <span className="text-[0.75rem] text-[var(--text-dim)] ml-1">{note}</span>}
      </span>
    </div>
  );
}
