import { asc, desc, eq } from "drizzle-orm";
import { flatten, object, optional, picklist, safeParse } from "valibot";
import { TABLES, db } from "~/server/database";

/**
 * allowed URL search params
 */
const searchParamsSchema = object({
  order: optional(
    picklist(["asc", "desc"]),
    "desc",
  ),
});

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event).id;

  const query = getQuery(event);
  const { success, output: params, issues } = safeParse(searchParamsSchema, query);
  if (!success) {
    throw createError({
      status: 400,
      statusMessage: "Bad request",
      message: "Invalid query parameters.",
      data: flatten(issues),
    });
  }

  const { order } = params;
  const links = await db
    .select()
    .from(TABLES.links)
    .where(eq(TABLES.links.userId, userId))
    .orderBy(
      order === "asc" ? asc(TABLES.links.createdAt) : desc(TABLES.links.createdAt),
    );

  return links;
});
