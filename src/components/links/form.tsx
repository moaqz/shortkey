"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";

import { DotsSpinner } from "~/components/common";
import { Button, TextInput } from "~/components/ui";
import { TLinkSchema, linkSchema } from "~/lib/schemas/link";

interface LinkFormProps {
  prePopulatedData?: Partial<TLinkSchema>;
  handleFormSubmit: (data: Partial<TLinkSchema>) => Promise<void>;
}

const defaultValues: Partial<TLinkSchema> = {
  url: "",
};

export function LinkForm(props: LinkFormProps) {
  const { handleFormSubmit, prePopulatedData } = props;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TLinkSchema>({
    defaultValues: prePopulatedData ?? defaultValues,
    resolver: valibotResolver(linkSchema),
  });

  const onSubmit: SubmitHandler<TLinkSchema> = async (data) => {
    await handleFormSubmit?.(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="link-url" className="block text-zinc-400 text-sm">
          Destination URL
        </label>

        <TextInput
          id="link-url"
          type="url"
          aria-invalid={errors.url ? "true" : undefined}
          {...register("url")}
        />

        {errors.url ? (
          <span className="text-red-500 font-medium text-sm">
            {errors.url.message}
          </span>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <DotsSpinner /> : "Save changes"}
      </Button>
    </form>
  );
}
