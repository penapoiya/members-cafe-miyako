import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "";
const apiKey = process.env.MICROCMS_API_KEY || "";

// microCMS未設定時はnull（ビルドエラーを防ぐ）
export const client =
  serviceDomain && apiKey && serviceDomain !== "dummy"
    ? createClient({ serviceDomain, apiKey })
    : null;

// ── 型定義 ──

export type BBSPost = {
  name: string;
  date: string;
  gender: string[] | string;
  message: string;
  reply?: string;       // スタッフからの返信（microCMS管理画面で入力）
  replyDate?: string;   // 返信日時
} & MicroCMSListContent;

export type Event = {
  title: string;
  date: string;
  description: string;
  image?: MicroCMSImage;
} & MicroCMSListContent;

export type GalleryImage = {
  title: string;
  image: MicroCMSImage;
  order: number;
} & MicroCMSListContent;

// ── データ取得 ──

export async function getBBSPosts(): Promise<BBSPost[]> {
  if (!client) return [];
  const res = await client.getList<BBSPost>({
    endpoint: "bbs",
    queries: { limit: 30, orders: "-date" },
  });
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  return res.contents.filter((post) => new Date(post.date) >= tenDaysAgo);
}

export async function getEvents(): Promise<Event[]> {
  if (!client) return [];
  const res = await client.getList<Event>({
    endpoint: "events",
    queries: { limit: 10, orders: "-date" },
  });
  return res.contents;
}

export async function getGallery(): Promise<GalleryImage[]> {
  if (!client) return [];
  const res = await client.getList<GalleryImage>({
    endpoint: "gallery",
    queries: { limit: 10, orders: "order" },
  });
  return res.contents;
}
