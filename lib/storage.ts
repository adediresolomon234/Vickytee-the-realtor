import { env } from "cloudflare:workers";
import { homes, type HomeProfile } from "./homes";

export type MediaItem = { id: string; createdAt: string; kind: "instagram" | "upload"; title: string; caption: string | null; url: string; posterUrl: string | null; storageKey: string | null; published: number };
export type Lead = { id: string; createdAt: string; firstName: string; lastName: string; email: string; phone: string | null; interest: string; message: string | null; status: string };
export type PropertyMediaItem = { id: string; propertyId: string; createdAt: string; kind: "image" | "video"; url: string; storageKey: string; altText: string; roomTag: string | null; sortOrder: number };
export type PropertyRecord = { id: string; createdAt: string; updatedAt: string; slug: string; title: string; address: string; city: string; state: string; zip: string; price: string; propertyType: string; beds: string; baths: string; sqft: string; description: string; features: string; published: number; media: PropertyMediaItem[] };

export const SECTIONS = ["gallery", "buy", "sell"] as const;
export type Section = (typeof SECTIONS)[number];
export type SectionMediaItem = { id: string; section: Section; createdAt: string; kind: "image" | "video"; title: string; caption: string | null; url: string; storageKey: string; sortOrder: number; published: number };

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
    database.prepare(`CREATE TABLE IF NOT EXISTS properties (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, state TEXT NOT NULL, zip TEXT NOT NULL, price TEXT NOT NULL, property_type TEXT NOT NULL, beds TEXT NOT NULL, baths TEXT NOT NULL, sqft TEXT NOT NULL, description TEXT NOT NULL, features TEXT NOT NULL DEFAULT '[]', published INTEGER NOT NULL DEFAULT 1)`),
    database.prepare(`CREATE TABLE IF NOT EXISTS property_media (id TEXT PRIMARY KEY, property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE, created_at TEXT NOT NULL, kind TEXT NOT NULL, url TEXT NOT NULL, storage_key TEXT NOT NULL, alt_text TEXT NOT NULL, room_tag TEXT, sort_order INTEGER NOT NULL DEFAULT 0)`),
    database.prepare(`CREATE INDEX IF NOT EXISTS properties_published_idx ON properties(published, created_at DESC)`),
    database.prepare(`CREATE INDEX IF NOT EXISTS property_media_property_idx ON property_media(property_id, sort_order)`),
    database.prepare(`CREATE TABLE IF NOT EXISTS section_media (id TEXT PRIMARY KEY, section TEXT NOT NULL, created_at TEXT NOT NULL, kind TEXT NOT NULL, title TEXT NOT NULL, caption TEXT, url TEXT NOT NULL, storage_key TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0, published INTEGER NOT NULL DEFAULT 1)`),
    database.prepare(`CREATE INDEX IF NOT EXISTS section_media_section_idx ON section_media(section, published, sort_order)`),
    database.prepare(`CREATE TABLE IF NOT EXISTS migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)`),
  ]);
  await seedHomeProfiles(database);
  ready = true;
}

async function seedHomeProfiles(database: ReturnType<typeof db>) {
  const migrationName = "seed_home_profiles_v1";
  const applied = await database.prepare("SELECT 1 FROM migrations WHERE name = ?").bind(migrationName).first();
  if (applied) return;

  const now = new Date().toISOString();
  const statements = [];
  for (const home of homes) {
    const propertyId = crypto.randomUUID();
    statements.push(database.prepare(
      `INSERT OR IGNORE INTO properties (id, created_at, updated_at, slug, title, address, city, state, zip, price, property_type, beds, baths, sqft, description, features, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
    ).bind(propertyId, now, now, home.slug, home.name, "Address not yet provided", "Not specified", "N/A", "00000", home.segment, home.type, home.beds, home.baths, home.size, home.summary, JSON.stringify(home.features)));
    home.gallery.forEach((url, index) => {
      statements.push(database.prepare(
        `INSERT OR IGNORE INTO property_media (id, property_id, created_at, kind, url, storage_key, alt_text, room_tag, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), propertyId, now, "image", url, url, `${home.name} photo ${index + 1}`, null, index));
    });
  }
  statements.push(database.prepare("INSERT INTO migrations (name, applied_at) VALUES (?, ?)").bind(migrationName, now));
  await database.batch(statements);
}

const mediaColumns = "id, created_at as createdAt, kind, title, caption, url, poster_url as posterUrl, storage_key as storageKey, published";

export async function getPublishedMedia() {
  await ensureSchema();
  const result = await db().prepare(`SELECT ${mediaColumns} FROM media WHERE published = 1 ORDER BY created_at DESC LIMIT 9`).all<MediaItem>();
  return result.results;
}

export async function getLeads() {
  await ensureSchema();
  const result = await db().prepare("SELECT id, created_at as createdAt, first_name as firstName, last_name as lastName, email, phone, interest, message, status FROM leads ORDER BY created_at DESC LIMIT 100").all<Lead>();
  return result.results;
}

const propertySelect = "SELECT id, created_at as createdAt, updated_at as updatedAt, slug, title, address, city, state, zip, price, property_type as propertyType, beds, baths, sqft, description, features, published FROM properties";
const mediaSelect = "SELECT id, property_id as propertyId, created_at as createdAt, kind, url, storage_key as storageKey, alt_text as altText, room_tag as roomTag, sort_order as sortOrder FROM property_media";

async function attachPropertyMedia(records: Omit<PropertyRecord, "media">[]) {
  if (!records.length) return [];
  const result = await db().prepare(`${mediaSelect} WHERE property_id IN (${records.map(() => "?").join(",")}) ORDER BY sort_order, created_at`).bind(...records.map((item) => item.id)).all<PropertyMediaItem>();
  return records.map((property) => ({ ...property, media: result.results.filter((item) => item.propertyId === property.id) }));
}

export async function getPublishedProperties() {
  await ensureSchema();
  const result = await db().prepare(`${propertySelect} WHERE published = 1 ORDER BY created_at DESC`).all<Omit<PropertyRecord, "media">>();
  return attachPropertyMedia(result.results);
}

export async function getAdminProperties() {
  await ensureSchema();
  const result = await db().prepare(`${propertySelect} ORDER BY created_at DESC`).all<Omit<PropertyRecord, "media">>();
  return attachPropertyMedia(result.results);
}

export async function getPublishedPropertyBySlug(slug: string) {
  await ensureSchema();
  const record = await db().prepare(`${propertySelect} WHERE slug = ? AND published = 1 LIMIT 1`).bind(slug).first<Omit<PropertyRecord, "media">>();
  if (!record) return null;
  return (await attachPropertyMedia([record]))[0] || null;
}

export function propertyToHomeProfile(property: PropertyRecord): HomeProfile {
  const images = property.media.filter((item) => item.kind === "image").map((item) => item.url);
  const videos = property.media.filter((item) => item.kind === "video").map((item) => item.url);
  let features: string[] = [];
  try { features = JSON.parse(property.features) as string[]; } catch { /* Keep malformed legacy feature data from breaking the listing. */ }
  return {
    slug: property.slug,
    name: property.title,
    type: property.propertyType,
    setting: `${property.city}, ${property.state}`,
    segment: property.price,
    beds: property.beds,
    baths: property.baths,
    size: `${property.sqft} sq ft`,
    image: images[0] || "/og.png",
    gallery: images,
    videoUrls: videos,
    summary: property.description,
    features: features.length ? features : [property.address, `${property.city}, ${property.state} ${property.zip}`, property.propertyType],
  };
}

const sectionMediaSelect = "SELECT id, section, created_at as createdAt, kind, title, caption, url, storage_key as storageKey, sort_order as sortOrder, published FROM section_media";

export async function getPublishedSectionMedia(section: Section) {
  await ensureSchema();
  const result = await db().prepare(`${sectionMediaSelect} WHERE section = ? AND published = 1 ORDER BY sort_order, created_at`).bind(section).all<SectionMediaItem>();
  return result.results;
}

export async function getAdminSectionMedia(section: Section) {
  await ensureSchema();
  const result = await db().prepare(`${sectionMediaSelect} WHERE section = ? ORDER BY sort_order, created_at`).bind(section).all<SectionMediaItem>();
  return result.results;
}

export async function getAdminStats() {
  await ensureSchema();
  const database = db();
  const [leads, properties, publishedProperties, sectionMedia] = await Promise.all([
    database.prepare("SELECT COUNT(*) as count FROM leads").first<{ count: number }>(),
    database.prepare("SELECT COUNT(*) as count FROM properties").first<{ count: number }>(),
    database.prepare("SELECT COUNT(*) as count FROM properties WHERE published = 1").first<{ count: number }>(),
    database.prepare("SELECT COUNT(*) as count FROM section_media").first<{ count: number }>(),
  ]);
  return {
    leads: leads?.count || 0,
    properties: properties?.count || 0,
    publishedProperties: publishedProperties?.count || 0,
    sectionMedia: sectionMedia?.count || 0,
  };
}

export function getDatabase() { return db(); }
export function getMediaBucket() {
  const bucket = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  if (!bucket) throw new Error("Media storage binding unavailable");
  return bucket;
}
