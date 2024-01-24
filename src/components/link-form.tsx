"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { STATES } from "~/lib/constants";
import { parseURL } from "~/lib/functions/urls";
import { updateLink } from "~/lib/services/link.service";
import DotsSpinner from "./dots-spinner";

interface LinkFormProps {
  id: number;
  slug: string;
  url: string;
  onSubmit?: () => void;
}

export default function LinkForm(props: LinkFormProps) {
  const [status, setStatus] = useState(STATES.IDLE);
  const [url, setUrl] = useState(props.url);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(STATES.LOADING);

    const parsedUrl = parseURL(url);
    if (!parsedUrl) {
      setStatus(STATES.ERROR);
      inputRef.current?.focus();
      return;
    }

    updateLink(parsedUrl, props.id)
      .then(() => toast.success("Successfully updated link!"))
      .catch((error) => {
        if (error?.error) {
          toast.error(error.error);
          return;
        }

        toast.error("Link could not be updated. Please try again.");
      })
      .finally(() => {
        setStatus(STATES.IDLE);
        props.onSubmit?.();
      });
  };

  const isLoading = status === STATES.LOADING;
  const isError = status === STATES.ERROR;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="linkUrl" className="block text-zinc-400">
          URL
        </label>
        <input
          id="linkUrl"
          type="text"
          ref={inputRef}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={isError ? "true" : undefined}
          className="h-10 w-full rounded-md bg-zinc-800 px-4 text-lg placeholder:font-medium focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 focus:aria-[invalid]:outline-red-500"
        />
        <span className="text-red-500 font-medium text-sm">
          {isError && "Invalid URL. Please enter a valid URL."}
        </span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 min-h-8 w-full cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 disabled:opacity-60 enabled:hover:bg-indigo-600 hover:transition-colors"
      >
        {isLoading ? <DotsSpinner /> : "Save changes"}
      </button>
    </form>
  );
}
