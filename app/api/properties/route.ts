import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../chatgpt-auth";
import { ensureSchema, getDatabase, getMediaBucket } from "../../../lib/storage";

async function authorized() {
  const user = await getChatGPTUser();
  const adminEmail = (env as unknown as { ADMIN_EMAIL?: string }).ADMIN_EMAIL?.toLowerCase();
  return !!user && (!adminEmail || user.email.toLowerCase() === adminEmail);
}

function value(form: FormData, key: string, max = 500) {
  return String(form.get(key) || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const title = value(form, "title", 140);
  const address = value(form, "address", 180);
  const city = value(form, "city", 100);
  const state = value(form, "state", 50).toUpperCase();
  const zip = value(form, "zip", 10);
  const price = value(form, "price", 40);
  const propertyType = value(form, "propertyType", 60);
  const beds = value(form, "beds", 20);
  const baths = value(form, "baths", 20);
  const sqft = value(form, "sqft", 30);
  const description = value(form, "description", 3000);
  const roomTag = value(form, "roomTag", 80);
  const features = value(form, "features", 1500).split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 12);
  const files = form.getAll("media").filter((item): item is File => item instanceof File && item.size > 0);

  if (![title, address, city, state, zip, price, propertyType, beds, baths, sqft, description].every(Boolean)) {
    return NextResponse.json({ error: "Complete all property details before publishing." }, { status: 400 });
  }
  if (!/^\d{5}(-\d{4})?$/.test(zip)) return NextResponse.json({ error: "Enter a valid U.S. ZIP code." }, { status: 400 });
  if (!files.length || !files.some((file) => file.type.startsWith("image/"))) return NextResponse.json({ error: "Upload at least one property photo." }, { status: 400 });
  if (files.length > 20) return NextResponse.json({ error: "Upload up to 20 photos and videos at a time." }, { status: 400 });
  if (files.some((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"))) return NextResponse.json({ error: "Only image and video files are supported." }, { status: 400 });
  if (files.some((file) => file.type.startsWith("image/") && file.size > 15 * 1024 * 1024)) return NextResponse.json({ error: "Each photo must be under 15 MB." }, { status: 400 });
  if (files.some((file) => file.type.startsWith("video/") && file.size > 100 * 1024 * 1024)) return NextResponse.json({ error: "Each video must be under 100 MB." }, { status: 400 });
  if (files.reduce((total, file) => total + file.size, 0) > 150 * 1024 * 1024) return NextResponse.json({ error: "The total upload must be under 150 MB." }, { status: 400 });

  await ensureSchema();
  const id = crypto.randomUUID();
  const slugBase = `${title}-${city}`.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "home";
  const slug = `${slugBase}-${id.slice(0, 8)}`;
  const now = new Date().toISOString();
  const bucket = getMediaBucket();
  const uploaded: { id: string; key: string; url: string; kind: "image" | "video"; name: string; order: number }[] = [];

  try {
    for (const [order, file] of files.entries()) {
      const mediaId = crypto.randomUUID();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const key = `properties/${id}/${mediaId}-${safeName}`;
      await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
      uploaded.push({ id: mediaId, key, url: `/api/media/${encodeURIComponent(key)}`, kind: file.type.startsWith("video/") ? "video" : "image", name: file.name, order });
    }

    const database = getDatabase();
    await database.batch([
      database.prepare("INSERT INTO properties (id, created_at, updated_at, slug, title, address, city, state, zip, price, property_type, beds, baths, sqft, description, features, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)").bind(id, now, now, slug, title, address, city, state, zip, price, propertyType, beds, baths, sqft, description, JSON.stringify(features)),
      ...uploaded.map((item) => database.prepare("INSERT INTO property_media (id, property_id, created_at, kind, url, storage_key, alt_text, room_tag, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(item.id, id, now, item.kind, item.url, item.key, `${title} — ${item.name}`, roomTag || null, item.order)),
    ]);
  } catch (error) {
    await Promise.all(uploaded.map((item) => bucket.delete(item.key)));
    console.error("Property upload failed", error);
    return NextResponse.json({ error: "The property could not be saved. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug });
}
