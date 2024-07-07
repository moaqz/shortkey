import type { Link } from "~/types/link";

/**
 * Filters the list of links based on the query.
 *
 * The query is matched against the destination URL and slug of each link.
 * The match is case-insensitive.
 */
export default function (query: string, links: Link[]) {
  query = query.toLowerCase();

  return links.filter(
    link => (
      link.destinationUrl.toLowerCase().includes(query)
      || link.slug.toLowerCase().includes(query)
    ),
  );
}
