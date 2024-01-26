import { nanoid } from "nanoid";
import { LINKS_TABLE } from "~/lib/constants";
import { client } from "~/lib/database/client";

export async function getRandomSlug() {
  const slug = nanoid(8);
  const result = await client.execute({
    sql: `SELECT slug FROM ${LINKS_TABLE} WHERE slug = ?`,
    args: [slug],
  });

  // slug already exists.
  if (result.rows.length) {
    return getRandomSlug();
  }

  return slug;
}

export async function createLink({
  url,
  slug,
  userId,
}: {
  url: string;
  slug: string;
  userId: string;
}) {
  return client.execute({
    sql: `INSERT INTO ${LINKS_TABLE} (slug, url, user_id) VALUES (?, ?, ?)`,
    args: [slug, url, userId],
  });
}

export async function getLink(slug: string) {
  const result = await client.execute({
    sql: `SELECT id, url, slug FROM ${LINKS_TABLE} WHERE slug = ?`,
    args: [slug],
  });

  return result.rows;
}

export async function getUserLinks(userId: string) {
  const result = await client.execute({
    sql: `SELECT * FROM ${LINKS_TABLE} WHERE user_id = ? ORDER BY created_at DESC`,
    args: [userId],
  });

  return result.rows;
}

export async function recordVisit(slug: string) {
  return await client.execute({
    sql: `UPDATE ${LINKS_TABLE} SET clicks = clicks + 1 WHERE slug = ?`,
    args: [slug],
  });
}

export async function deleteLink({
  userId,
  id,
}: {
  userId: string;
  id: number;
}) {
  return await client.execute({
    sql: `DELETE FROM ${LINKS_TABLE} WHERE id = ? AND user_id = ?`,
    args: [id, userId],
  });
}

export async function updateLink({
  userId,
  url,
  id,
}: { userId: string; url: string; id: number }) {
  return await client.execute({
    sql: `UPDATE ${LINKS_TABLE} SET url = ? WHERE id = ? AND user_id = ?`,
    args: [url, id, userId],
  });
}
