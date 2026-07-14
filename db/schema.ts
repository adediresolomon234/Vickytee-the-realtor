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
