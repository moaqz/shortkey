import type { FlatErrors, InferInput } from "valibot";
import { url as isURL, maxLength, minLength, minValue, number, object, pipe, string } from "valibot";

export const CreateLinkSchema = object({
  url: pipe(
    string(),
    isURL("Invalid Destination URL"),
  ),
  slug: pipe(
    string(),
    minLength(3, "The slug must be at least 3 characters long."),
    maxLength(25, "The slug must not exceed 25 characters."),
  ),
});

export type CreateLink = InferInput<typeof CreateLinkSchema>;
export type CreateLinkErrors = FlatErrors<typeof CreateLinkSchema>["nested"];

export const EditLinkSchema = object({
  id: pipe(
    number(),
    minValue(0),
  ),
  ...CreateLinkSchema.entries,
});

export type EditLink = InferInput<typeof EditLinkSchema>;
export type EditLinkErrors = FlatErrors<typeof EditLinkSchema>["nested"];
