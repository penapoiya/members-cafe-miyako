import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";
import BBSBoard from "@/components/BBSBoard";
import Footer from "@/components/Footer";
import { getBBSPosts, getEvents } from "@/lib/microcms";
import type { Event } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "来店掲示板 & イベント | members cafe -MIYAKO-",
  description:
    "members cafe -MIYAKO- の来店掲示板とイベント情報。来店予告で女性は入会金無料、全員ドリンク一杯サービス。",
};

export default async function BBSPage() {
  let bbsPosts: Awaited<ReturnType<typeof getBBSPosts>> = [];
  let events: Awaited<ReturnType<typeof getEvents>> = [];

  try {
    [bbsPosts, events] = await Promise.all([getBBSPosts(), getEvents()]);
  } catch {
    // microCMS未接続時
  }

  return (
    <>
      <Navigation />
      <ScrollReveal />

      <div className="pt-28 pb-32 px-8" style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(196,149,106,0.04) 0%, transparent 50%), var(--bg-primary)` }}>
        <div className="max-w-[1100px] mx-auto">

          {/* ── イベント情報 ── */}
            <section className="mb-24">
              <div className="text-center">
                <p className="section-label reveal">What&apos;s New</p>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
                  Event
                </h2>
                <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-10 reveal reveal-delay-2">
                  今月のイベント
                </p>
                <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-10 reveal reveal-delay-2" />
              </div>

              {events.length > 0 ? (
                <div className={`grid gap-6 mx-auto max-[900px]:grid-cols-1 ${
                  events.length === 1 ? "grid-cols-1 max-w-[400px]" :
                  events.length === 2 ? "grid-cols-2 max-w-[800px]" :
                  "grid-cols-3 max-w-[1100px]"
                }`}>
                  {events.map((event: Event, i: number) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--text-dim)] py-8 text-[0.9rem] reveal reveal-delay-3">
                  現在、予定されているイベントはありません
                </p>
              )}
            </section>

          {/* ── 来店掲示板 ── */}
          <section>
            <div className="text-center">
              <p className="section-label reveal">Bulletin Board</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,4vw,3rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
                BBS
              </h2>
              <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-10 reveal reveal-delay-2">
                来店掲示板
              </p>
              <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-10 reveal reveal-delay-2" />
            </div>

            {/* 特典バッジ */}
            <div className="text-center mb-10 reveal reveal-delay-2">
              <span className="inline-block font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.3em] uppercase text-[var(--bg-primary)] bg-gradient-to-br from-[var(--rose-gold)] to-[var(--rose-gold-light)] px-6 py-2 mb-4">
                Special Benefit
              </span>
              <p className="font-[family-name:var(--font-shippori)] text-[1rem] text-[var(--champagne)] tracking-[0.05em] leading-[2]">
                来店予告の書き込みで<strong className="text-[var(--rose-gold-light)] font-medium">女性は入会金無料</strong>
                <br />
                <strong className="text-[var(--rose-gold-light)] font-medium">全てのお客様</strong>にドリンク一杯サービス！
              </p>
            </div>

            <BBSBoard posts={bbsPosts} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-all duration-500 hover:border-[var(--border-accent)] hover:-translate-y-1 reveal reveal-delay-${Math.min(index + 1, 3)}`}
      style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
    >
      {event.image?.url && (
        <div className="h-[180px] relative overflow-hidden">
          <Image
            src={event.image.url}
            alt={event.title}
            fill
            sizes="(max-width: 900px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {event.date && (
          <p className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.3em] text-[var(--rose-gold)] mb-2">
            {event.date}
          </p>
        )}
        <h3 className="font-[family-name:var(--font-shippori)] text-[1rem] font-medium text-[var(--champagne)] mb-2">
          {event.title}
        </h3>
        <p className="text-[0.8rem] text-[var(--text-secondary)] leading-[1.8]">
          {event.description}
        </p>
      </div>
    </div>
  );
}
