import { NextResponse } from "next/server";

// BBS投稿の編集
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { message, deviceId } = body;

    if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    // 投稿を取得して本人確認
    const getRes = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs/${id}`,
      { headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY } }
    );
    if (!getRes.ok) return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });

    const post = await getRes.json();
    if (post.deviceId !== deviceId) {
      return NextResponse.json({ error: "編集権限がありません" }, { status: 403 });
    }

    // 更新
    const updateRes = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!updateRes.ok) return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}

// BBS投稿の削除
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    // 投稿を取得して本人確認
    const getRes = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs/${id}`,
      { headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY } }
    );
    if (!getRes.ok) return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });

    const post = await getRes.json();
    if (post.deviceId !== deviceId) {
      return NextResponse.json({ error: "削除権限がありません" }, { status: 403 });
    }

    // 削除
    const deleteRes = await fetch(
      `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bbs/${id}`,
      {
        method: "DELETE",
        headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY },
      }
    );

    if (!deleteRes.ok) return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
