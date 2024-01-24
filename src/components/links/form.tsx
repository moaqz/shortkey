"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { STATES } from "~/lib/constants";
import { parseURL } from "~/lib/functions/urls";
import { updateLink } from "~/lib/services/link.service";

import { DotsSpinner } from "~/components/common";
import { Button, TextInput } from "~/components/ui";

interface LinkFormProps {
  id: number;
  slug: string;
  url: string;
  onSubmit?: () => void;
}

export function LinkForm(props: LinkFormProps) {
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
        <label htmlFor="linkUrl" className="block text-zinc-400 text-sm">
          Destination URL
        </label>

        <TextInput
          id="linkUrl"
          type="url"
          value={url}
          ref={inputRef}
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={isError ? "true" : undefined}
        />

        <span className="text-red-500 font-medium text-sm">
          {isError && "Invalid URL. Please enter a valid URL."}
        </span>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <DotsSpinner /> : "Save changes"}
      </Button>
    </form>
  );
}
