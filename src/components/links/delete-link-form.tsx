"use client";

import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { deleteLink } from "~/lib/services/link.service";

import { Button, TextInput } from "~/components/ui";
import { DotsSpinner } from "~/components/common";

interface DeleteLinkProps {
  id: number;
  onSubmit?: () => void;
}

export function DeleteLinkForm(props: DeleteLinkProps) {
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

      <form onSubmit={handleDeletion} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="verification" className="block text-zinc-400">
            To verify, type{" "}
            <span className="font-semibold text-indigo-400">{randomWord}</span>{" "}
            in the box below.
          </label>

          <TextInput
            type="text"
            id="verification"
            value={inputWord}
            onChange={(event) => setInputWord(event.target.value)}
          />
        </div>

        <Button type="submit" disabled={deleting} variant="danger">
          {deleting ? <DotsSpinner /> : "Confirm"}
        </Button>
      </form>
    </div>
  );
}
