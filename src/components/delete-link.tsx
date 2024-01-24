"use client";

import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { deleteLink } from "~/lib/services/link.service";
import DotsSpinner from "./dots-spinner";

interface DeleteLinkProps {
  id: number;
  onSubmit?: () => void;
}

export default function DeleteLink(props: DeleteLinkProps) {
  const [randomWord] = useState(nanoid(6));
  const [deleting, setDeleting] = useState(false);
  const [inputWord, setInputWord] = useState<string>("");

  const handleDeletion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeleting(true);

    if (inputWord !== randomWord) {
      setDeleting(false);
      return;
    }

    deleteLink(props.id)
      .then(() => toast.success("Successfully deleted link!"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setDeleting(false);
        setInputWord("");
        props.onSubmit?.();
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-zinc-400">
        Deleting this link will remove all of its stats. This action cannot be
        undone.
      </p>

      <form onSubmit={handleDeletion}>
        <label htmlFor="verification" className="block text-zinc-400 mb-2">
          To verify, type{" "}
          <span className="font-semibold text-indigo-400">{randomWord}</span> in
          the box below.
        </label>
        <input
          type="text"
          id="verification"
          value={inputWord}
          onChange={(event) => setInputWord(event.target.value)}
          className="h-10 w-full rounded-md px-4 bg-zinc-800 focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
        />

        <button
          type="submit"
          disabled={deleting}
          className="mt-4 min-h-8 w-full cursor-pointer rounded-md bg-red-500 px-3 py-1.5 disabled:opacity-60 enabled:hover:bg-red-600 hover:transition-colors"
        >
          {deleting ? <DotsSpinner /> : "Confirm"}
        </button>
      </form>
    </div>
  );
}
