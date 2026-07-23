import { NextResponse } from "next/server";
import { ensureSchema, getDatabase, getMediaBucket, SECTIONS, type Section } from "../../../lib/storage";

export async function POST(request: Request) {
  const form = await request.formData();
  const section = String(form.get("section") || "");
  const title = String(form.get("title") || "").trim().slice(0, 140);
  const caption = String(form.get("caption") || "").trim().slice(0, 1000);
  const files = form.getAll("file").filter((item): item is File => item instanceof File && item.size > 0);

  if (!SECTIONS.includes(section as Section)) return NextResponse.json({ error: "Choose a valid section." }, { status: 400 });
  if (!title) return NextResponse.json({ error: "A title is required." }, { status: 400 });
  if (!files.length) return NextResponse.json({ error: "Choose at least one photo or video to upload." }, { status: 400 });
  if (files.length > 20) return NextResponse.json({ error: "Upload up to 20 files at a time." }, { status: 400 });
  if (files.some((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"))) return NextResponse.json({ error: "Only image and video files are supported." }, { status: 400 });
  if (files.some((file) => file.type.startsWith("image/") && file.size > 15 * 1024 * 1024)) return NextResponse.json({ error: "Each photo must be under 15 MB." }, { status: 400 });
  if (files.some((file) => file.type.startsWith("video/") && file.size > 150 * 1024 * 1024)) return NextResponse.json({ error: "Each video must be under 150 MB." }, { status: 400 });

  await ensureSchema();
  const bucket = getMediaBucket();
  const uploaded: { key: string }[] = [];

  try {
    const database = getDatabase();
    const now = new Date().toISOString();
    const inserts = [];
    for (const [index, file] of files.entries()) {
      const id = crypto.randomUUID();
      const isVideo = file.type.startsWith("video/");
      const key = `section-media/${section}/${id}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
      uploaded.push({ key });
      inserts.push(database.prepare("INSERT INTO section_media (id, section, created_at, kind, title, caption, url, storage_key, sort_order, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)")
        .bind(id, section, now, isVideo ? "video" : "image", title, caption, `/api/media/${encodeURIComponent(key)}`, key, Date.now() + index));
    }
    await database.batch(inserts);
  } catch (error) {
    await Promise.all(uploaded.map((item) => bucket.delete(item.key)));
    console.error("Section media upload failed", error);
    return NextResponse.json({ error: "The upload could not be saved. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
