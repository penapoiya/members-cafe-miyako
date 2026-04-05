import ShimmerCanvas from "./ShimmerCanvas";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(196,149,106,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(196,149,106,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(100,60,30,0.05) 0%, transparent 60%),
            linear-gradient(180deg, #0a0a0a 0%, #0d0b09 50%, #0a0a0a 100%)
          `,
        }}
      />

      <ShimmerCanvas />

      {/* Vertical text */}
      <span className="absolute left-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-[family-name:var(--font-shippori)] text-[0.7rem] tracking-[0.5em] text-[var(--text-dim)] opacity-30 max-[900px]:hidden">
        Members Cafe &amp; Bar
      </span>
      <span className="absolute right-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-[family-name:var(--font-shippori)] text-[0.7rem] tracking-[0.5em] text-[var(--text-dim)] opacity-30 max-[900px]:hidden">
        Kyoto, Kawaramachi
      </span>

      {/* Content */}
      <div className="relative z-2 text-center px-8 max-w-3xl">
        <p
          className="font-[family-name:var(--font-cormorant)] text-[0.8rem] font-light tracking-[0.5em] uppercase text-[var(--rose-gold)] mb-8 opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-out-expo) 0.5s forwards" }}
        >
          Members Cafe &amp; Bar
        </p>
        <h1
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,8vw,7rem)] font-light tracking-[0.3em] uppercase text-[var(--champagne)] leading-[1.1] mb-2 opacity-0"
          style={{ animation: "fadeUp 1.4s var(--ease-out-expo) 0.8s forwards" }}
        >
          Miyako
        </h1>
        <p
          className="font-[family-name:var(--font-shippori)] text-[clamp(0.9rem,2vw,1.2rem)] tracking-[0.8em] text-[var(--rose-gold-dim)] mb-10 opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-out-expo) 1.1s forwards" }}
        >
          メンバーズカフェ みやこ
        </p>

        <div
          className="w-[60px] h-px mx-auto mb-10 opacity-0"
          style={{
            background: "linear-gradient(90deg, transparent, var(--rose-gold), transparent)",
            animation: "fadeUp 1s var(--ease-out-expo) 1.4s forwards",
          }}
        />

        {/* 訴求文（コンセプト統合） */}
        <p
          className="font-[family-name:var(--font-shippori)] text-[clamp(1rem,2.2vw,1.35rem)] text-[var(--text-secondary)] tracking-[0.1em] leading-[2.4] mb-8 opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-out-expo) 1.7s forwards" }}
        >
          古都に眠りし、非日常異空間。
          <br />
          すべてを忘れて、もうひとりの自分に出逢う夜。
        </p>

        <div
          className="flex flex-wrap justify-center gap-4 opacity-0"
          style={{ animation: "fadeUp 1.2s var(--ease-out-expo) 2.0s forwards" }}
        >
          <span className="border border-[var(--rose-gold)] text-[var(--rose-gold-light)] font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.1em] px-5 py-2">
            女性無料
          </span>
          <span className="border border-[var(--border-accent)] text-[var(--text-secondary)] font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.1em] px-5 py-2">
            飲み放題
          </span>
          <span className="border border-[var(--border-accent)] text-[var(--text-secondary)] font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.1em] px-5 py-2">
            時間制限なし
          </span>
          <span className="border border-[var(--border-accent)] text-[var(--text-secondary)] font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.1em] px-5 py-2">
            見学のみもOK
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
        style={{ animation: "fadeUp 1s var(--ease-out-expo) 2.4s forwards" }}
      >
        <span className="font-[family-name:var(--font-cormorant)] text-[0.65rem] tracking-[0.3em] uppercase text-[var(--text-dim)]">
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(180deg, var(--rose-gold), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
