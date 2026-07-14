import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest").notNull(),
  message: text("message"),
  status: text("status").notNull().default("new"),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  kind: text("kind").notNull(),
  title: text("title").notNull(),
  caption: text("caption"),
  url: text("url").notNull(),
  posterUrl: text("poster_url"),
  storageKey: text("storage_key"),
  published: integer("published").notNull().default(1),
});

export const properties = sqliteTable("properties", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  price: text("price").notNull(),
  propertyType: text("property_type").notNull(),
  beds: text("beds").notNull(),
  baths: text("baths").notNull(),
  sqft: text("sqft").notNull(),
  description: text("description").notNull(),
  features: text("features").notNull().default("[]"),
  published: integer("published").notNull().default(1),
});

export const propertyMedia = sqliteTable("property_media", {
  id: text("id").primaryKey(),
  propertyId: text("property_id").notNull().references(() => properties.id, { onDelete: "cascade" }),
  createdAt: text("created_at").notNull(),
  kind: text("kind").notNull(),
  url: text("url").notNull(),
  storageKey: text("storage_key").notNull(),
  altText: text("alt_text").notNull(),
  roomTag: text("room_tag"),
  sortOrder: integer("sort_order").notNull().default(0),
});
