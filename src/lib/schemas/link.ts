import { url, Output, custom, object, string } from "valibot";

function isHttpValid(str: string) {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

export const linkSchema = object({
  url: string([
    url("Invalid destination URL."),
    custom((input) => isHttpValid(input), "Invalid destionation URL. Make sure it starts with 'https://'."),
  ]),
});

export type TLinkSchema = Output<typeof linkSchema>
