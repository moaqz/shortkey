import { LibsqlError } from "@libsql/client";
import { count, eq } from "drizzle-orm";
import { flatten, safeParse } from "valibot";
import { TABLES, db } from "~/server/database";
import { CreateLinkSchema } from "~/utils/schemas";

const LINKS_LIMIT = 30;

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event).id;

  const totalLinks = await db.select({ count: count() })
    .from(TABLES.links)
    .where(eq(TABLES.links.userId, userId))
    .then(data => data[0]);

  if (totalLinks.count > LINKS_LIMIT) {
    throw createError({
      status: 403,
      statusMessage: "Forbidden",
      message: `You have reached the limit of ${LINKS_LIMIT} links.`,
    });
  }

  const body = await readBody(event, { strict: true });
  const { success, output: link, issues } = safeParse(CreateLinkSchema, body);
  if (!success) {
    throw createError({
      status: 422,
      statusMessage: "Unprocessable Content",
      message: "The provided data is invalid or malformed.",
      data: flatten(issues),
    });
  }

  try {
    await db.insert(TABLES.links)
      .values({
        slug: link.slug,
        destinationUrl: link.url,
        userId,
      });
  }
  catch (e) {
    if (e instanceof LibsqlError) {
      if (e.code === "SQLITE_CONSTRAINT") {
        throw createError({
          status: 409,
          statusMessage: "Conflict",
          message: "The provided slug is already in use.",
        });
      }
    }
  }
});
