"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

import { STATES } from "~/lib/constants";
import { parseURL } from "~/lib/functions/urls";
import { createLink } from "~/lib/services/link.service";

import { DotsSpinner } from "~/components/common";
import { SendIcon } from "~/components/common";
import { Button, TextInput } from "~/components/ui";

type CreateLinkProps = {
  disabled: boolean;
};

export function CreateLinkForm(props: CreateLinkProps) {
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState(STATES.IDLE);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(STATES.LOADING);

    const parsedUrl = parseURL(target);
    if (!parsedUrl) {
      setStatus(STATES.ERROR);
      inputRef.current?.focus();
      return;
    }

    createLink(target)
      .then(() => {
        setStatus(STATES.SUCCESS);
        toast.success("Link created successfully.");
        mutate("/api/links");
      })
      .catch((error) => {
        if (error?.error) {
          toast.error(error.error);
          return;
        }

        toast.error("Link could not be created. Please try again.");
      })
      .finally(() => {
        setStatus(STATES.IDLE);
        setTarget("");
      });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isLoading = status === STATES.LOADING;
  const isError = status === STATES.ERROR;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full max-w-lg"
    >
      <div className="relative flex items-center justify-center">
        <TextInput
          type="url"
          value={target}
          onChange={handleInputChange}
          ref={inputRef}
          aria-invalid={isError ? "true" : undefined}
          required
          placeholder="https://shortkey.pages.dev"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            type="submit"
            variant="secondary"
            disabled={props.disabled || status === STATES.LOADING}
          >
            {isLoading ? <DotsSpinner /> : <SendIcon width={22} height={22} />}
          </Button>
        </div>
      </div>

      <span className="block mt-2 text-sm font-semibold underline text-zinc-400">
        Only HTTPS URLs are allowed.
      </span>
    </form>
  );
}
