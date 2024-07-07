import { and, eq } from "drizzle-orm";
import { flatten, minValue, number, object, pipe, safeParse, string, transform } from "valibot";
import { TABLES, db } from "~/server/database";

/**
 * allowed URL search params.
 */
const searchParamsSchema = object({
  id: pipe(
    string(),
    transform(Number),
    number(),
    minValue(0),
  ),
});

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event).id;
  const { success, output, issues } = safeParse(searchParamsSchema, {
    id: getRouterParam(event, "id"),
  });

  if (!success) {
    throw createError({
      status: 400,
      statusMessage: "Bad request",
      message: "Invalid query parameters.",
      data: flatten(issues),
    });
  }

  await db.delete(TABLES.links).where(
    and(
      eq(TABLES.links.id, output.id),
      eq(TABLES.links.userId, userId),
    ),
  );
});
