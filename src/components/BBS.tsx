import type { BBSPost } from "@/lib/microcms";

function getGender(g: string[] | string): string {
  return Array.isArray(g) ? g[0] || "その他" : g;
}

function genderClass(gender: string) {
  const map: Record<string, string> = {
    "女性": "bg-[rgba(196,149,106,0.15)] text-[var(--rose-gold-light)]",
    "男性": "bg-[rgba(100,140,180,0.15)] text-[#8ab4d8]",
    "カップル": "bg-[rgba(160,120,180,0.15)] text-[#c0a0d0]",
    "その他": "bg-[rgba(140,160,140,0.15)] text-[#a0c0a0]",
  };
  return map[gender] || map["その他"];
}

export default function BBS({ posts }: { posts: BBSPost[] }) {
  return (
    <section id="bbs" className="relative py-32 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <p className="section-label reveal">Bulletin Board</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
            BBS
          </h2>
          <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
            来店掲示板
          </p>
          <div className="w-10 h-px bg-[var(--rose-gold)] mx-auto mb-12 reveal reveal-delay-2" />
        </div>

        {/* 特典バッジ */}
        <div className="text-center mb-12 reveal reveal-delay-2">
          <span className="inline-block font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.3em] uppercase text-[var(--bg-primary)] bg-gradient-to-br from-[var(--rose-gold)] to-[var(--rose-gold-light)] px-6 py-2 mb-6">
            Special Benefit
          </span>
          <p className="font-[family-name:var(--font-shippori)] text-[1.1rem] text-[var(--champagne)] tracking-[0.08em] leading-[2]">
            来店掲示板に書き込みいただいた<strong className="text-[var(--rose-gold-light)] font-medium">女性のお客様</strong>は<strong className="text-[var(--rose-gold-light)] font-medium">入会金が無料</strong>に。
            <br />
            <strong className="text-[var(--rose-gold-light)] font-medium">すべてのお客様</strong>にBBS来店予告で<strong className="text-[var(--rose-gold-light)] font-medium">ドリンク一杯</strong>サービス！
          </p>
        </div>

        {/* 投稿一覧 */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-6 max-w-[800px] mx-auto reveal reveal-delay-3">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border-subtle)]">
            <span className="font-[family-name:var(--font-shippori)] text-[1rem] font-medium text-[var(--champagne)] tracking-[0.05em]">
              最近の書き込み
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-[0.7rem] tracking-[0.2em] text-[var(--text-dim)]">
              {posts.length} posts
            </span>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-dim)] py-8 text-[0.85rem]">
              現在、書き込みはありません
            </p>
          ) : (
            <div className="space-y-0">
              {posts.map((post) => {
                const d = new Date(post.date);
                const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
                return (
                  <div
                    key={post.id}
                    className="py-6 border-b border-[rgba(196,149,106,0.08)] last:border-b-0 grid grid-cols-[auto_1fr] gap-5 items-start"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--rose-gold-dim)] to-[var(--rose-gold)] flex items-center justify-center font-[family-name:var(--font-cormorant)] text-[0.7rem] text-[var(--bg-primary)] font-medium shrink-0">
                      {post.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                        <span className="font-[family-name:var(--font-shippori)] text-[0.85rem] font-medium text-[var(--champagne)]">
                          {post.name}さん
                        </span>
                        <span className={`text-[0.7rem] px-2 py-0.5 rounded-sm ${genderClass(getGender(post.gender))}`}>
                          {getGender(post.gender)}
                        </span>
                        <span className="text-[0.7rem] text-[var(--text-dim)]">
                          {dateStr}
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-[var(--text-secondary)] leading-[1.8]">
                        {post.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
