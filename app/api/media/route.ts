import { NextResponse } from "next/server";
import { ensureSchema, getDatabase, getMediaBucket, getPublishedMedia } from "../../../lib/storage";

export async function GET() { return NextResponse.json(await getPublishedMedia()); }

export async function POST(request: Request) {
  const form = await request.formData();
  const title = String(form.get("title") || "").trim().slice(0, 140);
  const caption = String(form.get("caption") || "").trim().slice(0, 1000);
  const instagramUrl = String(form.get("instagramUrl") || "").trim();
  const file = form.get("video");
  if (!title) return NextResponse.json({ error: "A title is required." }, { status: 400 });
  await ensureSchema();
  const id = crypto.randomUUID();
  let kind = "instagram";
  let url = instagramUrl;
  let key: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("video/")) return NextResponse.json({ error: "Please upload a video file." }, { status: 400 });
    if (file.size > 150 * 1024 * 1024) return NextResponse.json({ error: "Video must be under 150 MB." }, { status: 400 });
    kind = "upload";
    key = `videos/${id}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    await getMediaBucket().put(key, file.stream(), { httpMetadata: { contentType: file.type } });
    url = `/api/media/${encodeURIComponent(key)}`;
  } else if (!/^https:\/\/(www\.)?instagram\.com\/(p|reel)\//.test(instagramUrl)) {
    return NextResponse.json({ error: "Add a valid Instagram post/reel URL or upload a video." }, { status: 400 });
  }
  await getDatabase().prepare("INSERT INTO media (id, created_at, kind, title, caption, url, storage_key, published) VALUES (?, ?, ?, ?, ?, ?, ?, 1)")
    .bind(id, new Date().toISOString(), kind, title, caption, url, key).run();
  return NextResponse.json({ ok: true });
}
