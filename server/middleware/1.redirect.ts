import { eq, sql } from "drizzle-orm";
import { TABLES, db } from "~/server/database";

const KNOWN_ROUTES = new Set([
  "/",
  "/dashboard",
  "/auth",
]);

function hasFileExtension(slug: string) {
  return /\.\w+$/.test(slug);
};

export default defineEventHandler(async (event) => {
  const isApiRoute = event.path.startsWith("/api");
  const isKnowRoute = KNOWN_ROUTES.has(event.path);

  if (isApiRoute || isKnowRoute) {
    return;
  }

  const slug = event.path.split("/").pop();
  if (!slug || hasFileExtension(slug)) {
    return;
  }

  const link = await db.select()
    .from(TABLES.links)
    .where(eq(TABLES.links.slug, slug))
    .then(record => record[0]);

  if (link) {
    await db.update(TABLES.links)
      .set({
        totalClicks: sql`${TABLES.links.totalClicks}+1`,
        lastClicked: new Date(),
      })
      .where(eq(TABLES.links.slug, slug));

    return sendRedirect(event, link.destinationUrl);
  }
});
