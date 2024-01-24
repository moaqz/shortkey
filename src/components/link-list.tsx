"use client";

import useSWR from "swr";
import { Link } from "~/types/links";
import LinkCard from "./link-card";
import LinkCardSkeleton from "./link-card-skeleton";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};

export default function LinkList() {
  const { data, isLoading } = useSWR<{ links: Link[] }>("/api/links", fetcher);

  return (
    <ul className="w-full max-w-lg grid gap-2">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: it is not necessary here.
          <LinkCardSkeleton key={index} />
        ))}

      {!isLoading &&
        data &&
        Boolean(data.links.length) &&
        data.links.map((link) => <LinkCard key={link.slug} {...link} />)}
    </ul>
  );
}
