import { NextResponse } from "next/server";
import { ensureSchema, getDatabase, getMediaBucket } from "../../../../lib/storage";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as { published?: boolean };
  if (typeof body.published !== "boolean") return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  await ensureSchema();
  await getDatabase().prepare("UPDATE section_media SET published = ? WHERE id = ?").bind(body.published ? 1 : 0, id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await ensureSchema();
  const database = getDatabase();
  const record = await database.prepare("SELECT storage_key as storageKey FROM section_media WHERE id = ?").bind(id).first<{ storageKey: string }>();
  if (record) await getMediaBucket().delete(record.storageKey);
  await database.prepare("DELETE FROM section_media WHERE id = ?").bind(id).run();
  return NextResponse.json({ ok: true });
}
