import { and, eq } from "drizzle-orm";
import { flatten, safeParse } from "valibot";
import { TABLES, db } from "~/server/database";
import { EditLinkSchema } from "~/utils/schemas";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event).id;

  const body = await readBody(event, { strict: true });
  const { success, output: link, issues } = safeParse(EditLinkSchema, body);
  if (!success) {
    throw createError({
      status: 422,
      statusMessage: "Unprocessable Content",
      message: "The provided data is invalid or malformed.",
      data: flatten(issues),
    });
  }

  await db.update(TABLES.links)
    .set({
      slug: link.slug,
      destinationUrl: link.url,
      updatedAt: new Date(),
    })
    .where(and(
      eq(TABLES.links.id, link.id),
      eq(TABLES.links.userId, userId),
    ));
});
