export const SOCIAL_LINKS = {
  repository: "https://github.com/moaqz/shortkey",
  portfolio: "https://moaqz.tech",
} as const;

export const LINKS_TABLE = "links";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : "http://localhost:3000";
