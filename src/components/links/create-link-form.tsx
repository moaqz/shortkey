"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

import { TLinkSchema, linkSchema } from "~/lib/schemas/link";
import { linkServices } from "~/lib/services/link.service";

import { DotsSpinner } from "~/components/common";
import { SendIcon } from "~/components/common";
import { Button, TextInput } from "~/components/ui";

type CreateLinkProps = {
  isDisabled: boolean;
};

export function CreateLinkForm(props: CreateLinkProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLinkSchema>({
    resolver: valibotResolver(linkSchema),
    disabled: props.isDisabled,
  });

  const onSubmit: SubmitHandler<TLinkSchema> = (data) => {
    linkServices
      .createLink(data)
      .then(() => {
        toast.success("Link created succesfully.");
        mutate("/api/links");
        reset({ url: "" });
      })
      .catch(() => toast.error("Link could not be created. Please try again."));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="w-full max-w-lg"
    >
      <div className="relative flex items-center justify-center">
        <TextInput
          type="url"
          aria-invalid={errors.url ? "true" : undefined}
          placeholder="https://shortkey.pages.dev"
          {...register("url")}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {props.isDisabled ? (
            <Link
              href="/api/auth/github"
              className="bg-zinc-700 enabled:hover:bg-zinc-600 min-h-8 w-full cursor-pointer rounded-md px-3 py-1.5"
            >
              Login
            </Link>
          ) : (
            <Button
              type="submit"
              variant="secondary"
              disabled={props.isDisabled || isSubmitting}
            >
              {isSubmitting ? (
                <DotsSpinner />
              ) : (
                <SendIcon width={22} height={22} />
              )}
            </Button>
          )}
        </div>
      </div>

      <span className="block mt-2 text-sm font-semibold underline text-zinc-400">
        Only HTTPS URLs are allowed.
      </span>
    </form>
  );
}
