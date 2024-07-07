import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").unique().notNull(),
  googleId: text("google_id").unique().notNull(),
  profilePicture: text("profile_picture").notNull().default(""),
}, (table) => {
  return {
    emailIdx: index("users_email_idx").on(table.email),
  };
});

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const links = sqliteTable("links", {
  id: integer("id").notNull().primaryKey(),
  destinationUrl: text("destination_url").notNull(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull().references(
    () => users.id,
    { onDelete: "cascade", onUpdate: "no action" },
  ),
  totalClicks: integer("total_clicks").notNull().default(0),
  lastClicked: integer("last_clicked", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`unixepoch()`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`unixepoch()`),
});

export const TABLES = { users, sessions, links };
