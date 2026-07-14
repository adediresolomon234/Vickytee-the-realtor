import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { ensureSchema, getDatabase, getMediaBucket } from "../../../../lib/storage";

async function authorized() {
  const user = await getChatGPTUser();
  const adminEmail = (env as unknown as { ADMIN_EMAIL?: string }).ADMIN_EMAIL?.toLowerCase();
  return !!user && (!adminEmail || user.email.toLowerCase() === adminEmail);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as { published?: boolean };
  if (typeof body.published !== "boolean") return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  await ensureSchema();
  await getDatabase().prepare("UPDATE properties SET published = ?, updated_at = ? WHERE id = ?").bind(body.published ? 1 : 0, new Date().toISOString(), id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await ensureSchema();
  const database = getDatabase();
  const media = await database.prepare("SELECT storage_key as storageKey FROM property_media WHERE property_id = ?").bind(id).all<{ storageKey: string }>();
  await Promise.all(media.results.map((item) => getMediaBucket().delete(item.storageKey)));
  await database.batch([
    database.prepare("DELETE FROM property_media WHERE property_id = ?").bind(id),
    database.prepare("DELETE FROM properties WHERE id = ?").bind(id),
  ]);
  return NextResponse.json({ ok: true });
}
