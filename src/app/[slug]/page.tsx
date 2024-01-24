import { notFound, permanentRedirect } from "next/navigation";
import { getLink, recordVisit } from "~/lib/database/links";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await getLink(slug);
  if (!data.length) {
    notFound();
  }

  await recordVisit(slug);
  const link = data.at(0);
  // @ts-ignore
  permanentRedirect(link.url);
}
