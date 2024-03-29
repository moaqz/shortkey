"use client";

import NextLink from "next/link";
import { toast } from "sonner";

import { BASE_URL } from "~/lib/constants";
import { formatDate } from "~/lib/functions/dates";
import type { Link } from "~/types/links";

import { ChartIcon, ClipboardIcon } from "~/components/common";
import { IconButton } from "~/components/ui";
import { LinkSettings } from "./settings-modal";

export function LinkCard(props: Link) {
  const target = `${BASE_URL}/${props.slug}`;

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <li className="shadow-lg p-3 rounded-md bg-zinc-800 flex flex-col">
      <div className="flex items-center justify-between">
        <NextLink href={target} className="text-indigo-300 font-semibold">
          shortkey/{props.slug}
        </NextLink>

        <div className="flex items-center gap-0.5">
          <div className="px-2 py-0.5 text-sm rounded-md bg-zinc-700 text-gray-200 inline-flex items-center gap-x-0.5">
            <ChartIcon width={16} height={16} />
            {props.clicks}
          </div>

          <IconButton
            onClick={() => copyToClipboard(target)}
            aria-label="Copy to Clipboard"
          >
            <ClipboardIcon width={16} height={16} />
          </IconButton>

          <LinkSettings link={{ ...props }} />
        </div>
      </div>

      <div className="text-sm text-zinc-400 inline-flex items-center gap-1">
        <p>{formatDate(props.created_at)}</p>
        <span className="hidden sm:block">•</span>
        <p
          className="hidden truncate sm:block sm:max-w-40 underline"
          title={props.url}
        >
          {props.url}
        </p>
      </div>
    </li>
  );
}
