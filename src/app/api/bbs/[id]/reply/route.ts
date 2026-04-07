import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reply, replyName } = body;

    if (!reply) {
      return NextResponse.json({ error: "返信内容が空です" }, { status: 400 });
    }

    if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    const res = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        },
        body: JSON.stringify({
          reply,
          replyName: replyName || "スタッフ",
          replyDate: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "返信に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
