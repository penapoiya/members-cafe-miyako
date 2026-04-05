import Image from "next/image";
import type { Event } from "@/lib/microcms";

export default function Events({ events }: { events: Event[] }) {
  return (
    <section id="events" className="relative py-32 px-8" style={{ background: `radial-gradient(ellipse at 50% 30%, rgba(196,149,106,0.04) 0%, transparent 50%), var(--bg-primary)` }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <p className="section-label reveal">What&apos;s New</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
            Event
          </h2>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
            今月のイベント
          </p>
          <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-12 reveal reveal-delay-2" />
        </div>

        {events.length === 0 ? (
          <p className="text-center text-[var(--text-dim)] py-12 text-[0.9rem] reveal reveal-delay-3">
            現在、予定されているイベントはありません
          </p>
        ) : (
          <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-8">
            {events.map((event, i) => (
              <div
                key={event.id}
                className={`bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-all duration-500 hover:border-[var(--border-accent)] hover:-translate-y-1 reveal reveal-delay-${Math.min(i + 1, 3)}`}
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                {/* 写真1枚 */}
                <div className="h-[200px] bg-[var(--bg-tertiary)] relative flex items-center justify-center overflow-hidden">
                  {event.image?.url ? (
                    <Image
                      src={event.image.url}
                      alt={event.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-[family-name:var(--font-cormorant)] text-[0.65rem] tracking-[0.3em] uppercase text-[var(--text-dim)]">
                      Event
                    </span>
                  )}
                </div>

                {/* テキスト */}
                <div className="p-8">
                  {event.date && (
                    <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.3em] text-[var(--rose-gold)] mb-3">
                      {event.date}
                    </p>
                  )}
                  <h3 className="font-[family-name:var(--font-shippori)] text-[1.1rem] font-medium text-[var(--champagne)] mb-3 tracking-[0.05em]">
                    {event.title}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--text-secondary)] leading-[1.9]">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
