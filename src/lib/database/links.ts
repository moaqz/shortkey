import { nanoid } from "nanoid";
import { LINKS_TABLE } from "~/lib/constants";
import { client } from "~/lib/database/client";

export async function getRandomKey() {
  const key = nanoid();
  const result = await client.execute({
    sql: `SELECT key FROM ${LINKS_TABLE} WHERE key = ?`,
    args: [key],
  });

  // slug already exists.
  if (result.rows.length) {
    return getRandomKey();
  }

  return key;
}

export async function createLink({
  url,
  key,
  userId,
}: {
  url: string;
  key: string;
  userId: string;
}) {
  return client.execute({
    sql: `INSERT INTO ${LINKS_TABLE} (key, url, user_id) VALUES (?, ?, ?)`,
    args: [key, url, userId],
  });
}
