import { env } from "cloudflare:workers";

export type MediaItem = { id: string; createdAt: string; kind: "instagram" | "upload"; title: string; caption: string | null; url: string; posterUrl: string | null; storageKey: string | null; published: number };
export type Lead = { id: string; createdAt: string; firstName: string; lastName: string; email: string; phone: string | null; interest: string; message: string | null; status: string };

let ready = false;

function db() {
  const database = (env as unknown as { DB?: D1Database }).DB;
  if (!database) throw new Error("Database binding unavailable");
  return database;
}

export async function ensureSchema() {
  if (ready) return;
  const database = db();
  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, interest TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'new')`),
    database.prepare(`CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, kind TEXT NOT NULL, title TEXT NOT NULL, caption TEXT, url TEXT NOT NULL, poster_url TEXT, storage_key TEXT, published INTEGER NOT NULL DEFAULT 1)`),
    database.prepare(`CREATE INDEX IF NOT EXISTS leads_created_idx ON leads(created_at DESC)`),
    database.prepare(`CREATE INDEX IF NOT EXISTS media_published_idx ON media(published, created_at DESC)`),
  ]);
  ready = true;
}

export async function getPublishedMedia() {
  await ensureSchema();
  const result = await db().prepare("SELECT id, created_at as createdAt, kind, title, caption, url, poster_url as posterUrl, storage_key as storageKey, published FROM media WHERE published = 1 ORDER BY created_at DESC LIMIT 9").all<MediaItem>();
  return result.results;
}

export async function getLeads() {
  await ensureSchema();
  const result = await db().prepare("SELECT id, created_at as createdAt, first_name as firstName, last_name as lastName, email, phone, interest, message, status FROM leads ORDER BY created_at DESC LIMIT 100").all<Lead>();
  return result.results;
}

export function getDatabase() { return db(); }
export function getMediaBucket() {
  const bucket = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  if (!bucket) throw new Error("Media storage binding unavailable");
  return bucket;
}
