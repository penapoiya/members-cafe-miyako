"use client";

import { useState, useEffect, useRef } from "react";
import type { BBSPost } from "@/lib/microcms";
import { getDeviceId } from "@/lib/fingerprint";
import { trackEvent } from "@/components/Analytics";

// microCMSのセレクトフィールドは配列で返るため正規化
function getGender(g: string[] | string): string {
  return Array.isArray(g) ? g[0] || "その他" : g;
}

const genderOptions = [
  { value: "男性", color: "#5B9BD5", label: "男性" },
  { value: "女性", color: "#E8A0BF", label: "女性" },
  { value: "カップル", color: "#E06060", label: "カップル" },
  { value: "その他", color: "#A0C0A0", label: "その他" },
] as const;

function genderColor(gender: string) {
  return genderOptions.find((g) => g.value === gender)?.color ?? "#A0C0A0";
}

function genderClass(gender: string) {
  const map: Record<string, string> = {
    "女性": "bg-[rgba(232,160,191,0.15)] text-[#E8A0BF]",
    "男性": "bg-[rgba(91,155,213,0.15)] text-[#5B9BD5]",
    "カップル": "bg-[rgba(224,96,96,0.15)] text-[#E06060]",
    "その他": "bg-[rgba(160,192,160,0.15)] text-[#A0C0A0]",
    "スタッフ": "bg-[rgba(192,160,208,0.15)] text-[#C0A0D0]",
  };
  return map[gender] || map["その他"];
}

export default function BBSBoard({ posts: initialPosts }: { posts: BBSPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formInteracted = useRef(false);

  // BBS ページ閲覧トラッキング
  useEffect(() => {
    trackEvent("bbs_page_view");
  }, []);

  // フォームに初めて触れた時点を記録
  const onFormInteract = () => {
    if (!formInteracted.current) {
      formInteracted.current = true;
      trackEvent("bbs_form_start");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender || !message.trim()) return;
    setSubmitting(true);

    const deviceId = getDeviceId();

    try {
      const res = await fetch("/api/bbs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), gender, message: message.trim(), deviceId }),
      });

      if (res.ok) {
        const newPost = await res.json();
        setPosts((prev) => [newPost, ...prev]);
        setName("");
        setGender("");
        setMessage("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        trackEvent("bbs_post_submit", { gender });
      }
    } catch {
      alert("投稿に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {/* 投稿フォーム */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-6 mb-8 reveal reveal-delay-2">
        <h3 className="font-[family-name:var(--font-shippori)] text-[1.1rem] font-medium text-[var(--champagne)] mb-6 tracking-[0.05em]">
          ご来店予告
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* お名前 */}
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] text-[var(--text-secondary)] mb-2">
              お名前
              <span className="text-[0.65rem] bg-[var(--rose-gold)] text-[var(--bg-primary)] px-2 py-0.5 rounded-sm">必須</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.9rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)]"
              placeholder="ニックネーム可"
              onFocus={onFormInteract}
            />
          </div>

          {/* 性別 */}
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] text-[var(--text-secondary)] mb-3">
              性別
            </label>
            <div className="flex flex-wrap gap-4">
              {genderOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 cursor-pointer select-none text-[0.9rem] transition-colors ${
                    gender === opt.value ? "text-[var(--champagne)]" : "text-[var(--text-secondary)]"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
                      gender === opt.value
                        ? "border-transparent"
                        : "border-[var(--border-accent)]"
                    }`}
                    style={{
                      backgroundColor: gender === opt.value ? opt.color : "transparent",
                    }}
                  >
                    {gender === opt.value && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    checked={gender === opt.value}
                    onChange={(e) => setGender(e.target.value)}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* メッセージ */}
          <div>
            <label className="flex items-center gap-2 text-[0.85rem] text-[var(--text-secondary)] mb-2">
              メッセージ
              <span className="text-[0.65rem] bg-[var(--rose-gold)] text-[var(--bg-primary)] px-2 py-0.5 rounded-sm">必須</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[0.9rem] px-4 py-3 outline-none focus:border-[var(--rose-gold)] transition-colors placeholder:text-[var(--text-dim)] resize-vertical"
              placeholder="来店予告やメッセージをどうぞ"
            />
          </div>

          {/* 特典 */}
          <div className="flex items-start gap-2 text-[0.75rem] text-[var(--rose-gold)]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--rose-gold)" strokeWidth="1.5" className="shrink-0 mt-0.5">
              <circle cx="8" cy="8" r="7" /><path d="M8 5v3M8 10.5v.5" />
            </svg>
            <span>
              女性の方は書き込みで入会金が無料に。すべてのお客様にドリンク一杯サービス！
            </span>
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={submitting || !name.trim() || !gender || !message.trim()}
            className="w-full flex items-center justify-center gap-3 font-[family-name:var(--font-shippori)] text-[0.95rem] tracking-[0.1em] text-[var(--bg-primary)] bg-gradient-to-r from-[#888] to-[#999] py-4 border-none cursor-pointer transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{
              background: (!name.trim() || !gender || !message.trim()) ? undefined : "linear-gradient(135deg, var(--rose-gold), var(--rose-gold-light))",
            }}
          >
            投稿
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>

          {submitted && (
            <p className="text-center text-[var(--rose-gold-light)] text-[0.85rem] animate-pulse">
              投稿しました！ありがとうございます。
            </p>
          )}
        </form>
      </div>

      {/* 投稿一覧 */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 max-[900px]:p-6 reveal reveal-delay-3">
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
          <div>
            {posts.map((post, i) => {
              const d = new Date(post.date);
              const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
              return (
                <div
                  key={post.id || i}
                  className="py-6 border-b border-[rgba(196,149,106,0.08)] last:border-b-0"
                >
                  {/* ヘッダー: 名前 + 性別 */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-[family-name:var(--font-cormorant)] text-[0.65rem] text-white font-medium shrink-0"
                      style={{ backgroundColor: genderColor(getGender(post.gender)) }}
                    >
                      {post.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-[family-name:var(--font-shippori)] text-[0.9rem] font-medium text-[var(--champagne)]">
                      名前: {post.name}
                    </span>
                    <span className={`text-[0.7rem] px-2 py-0.5 rounded-sm ${genderClass(getGender(post.gender))}`}>
                      {getGender(post.gender)}
                    </span>
                  </div>

                  {/* メッセージ */}
                  <p className="text-[0.9rem] text-[var(--rose-gold-light)] leading-[1.8] mb-2 pl-11">
                    {post.message}
                  </p>

                  {/* 日付 */}
                  <p className="text-[0.7rem] text-[var(--text-dim)] pl-11">
                    投稿日: {dateStr}
                  </p>

                  {/* スタッフ返信 */}
                  {post.reply && (
                    <div className="ml-11 mt-4 border-l-2 border-[#C0A0D0] bg-[rgba(192,160,208,0.06)] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#C0A0D0] flex items-center justify-center text-[0.5rem] text-white font-medium shrink-0">
                          S
                        </div>
                        <span className="font-[family-name:var(--font-shippori)] text-[0.8rem] font-medium text-[#C0A0D0]">
                          返信 from スタッフ
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-[var(--text-secondary)] leading-[1.8] pl-8 whitespace-pre-wrap">
                        {post.reply}
                      </p>
                      {post.replyDate && (
                        <p className="text-[0.65rem] text-[var(--text-dim)] pl-8 mt-1">
                          投稿日: {new Date(post.replyDate).toLocaleString("ja-JP")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
