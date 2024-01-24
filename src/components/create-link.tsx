"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { STATES } from "~/lib/constants";
import { parseURL } from "~/lib/functions/urls";
import { createLink } from "~/lib/services/link.service";
import DotsSpinner from "./dots-spinner";
import { SendIcon } from "./icons";

type CreateLinkProps = {
  disabled: boolean;
};

export default function CreateLink(props: CreateLinkProps) {
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState(STATES.IDLE);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(STATES.LOADING);

    if (!target) {
      return;
    }

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
        router.refresh();
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
        <input
          className="h-12 w-full rounded-md bg-zinc-800 pl-4 pr-14 text-lg placeholder:font-medium focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 focus:aria-[invalid]:outline-red-500"
          type="url"
          value={target}
          onChange={handleInputChange}
          ref={inputRef}
          aria-invalid={isError ? "true" : undefined}
          required
          placeholder="https://shortkey.pages.dev"
        />

        <button
          type="submit"
          disabled={props.disabled || status === STATES.LOADING}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md min-h-8 bg-zinc-700 px-2 py-1 text-gray-200 hover:transition-colors focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 enabled:hover:bg-zinc-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <DotsSpinner /> : <SendIcon width={22} height={22} />}
        </button>
      </div>

      <span className="block mt-2 text-sm font-semibold underline text-zinc-400">
        Only HTTPS URLs are allowed.
      </span>
    </form>
  );
}
