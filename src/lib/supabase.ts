// Supabase クライアント（サーバー専用）
//
// 行動ログ・BBS同期用。RLSをバイパスするため service_role キーで初期化する。
// このファイルは絶対にクライアントバンドルに含めてはならない（"server-only" を import）。

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceRoleKey || serviceRoleKey === "PASTE_SERVICE_ROLE_KEY_HERE") {
    return null;
  }
  if (!_client) {
    _client = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _client;
}
