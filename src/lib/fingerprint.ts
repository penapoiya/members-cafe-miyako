// デバイスフィンガープリント
// 初回訪問時にUUIDを生成してlocalStorageに保存。
// 名前を変えて投稿しても同一デバイスなら同じIDが記録される。

const STORAGE_KEY = "miyako_device_id";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
