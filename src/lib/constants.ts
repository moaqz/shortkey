export const SOCIAL_LINKS = {
  repository: "https://github.com/moaqz",
  portfolio: "https://moaqz.tech",
} as const;

export const LINKS_TABLE = "links";

export const STATES = {
  ERROR: "error",
  SUCCESS: "success",
  LOADING: "loading",
  IDLE: "idle",
};

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : "http://localhost:3000";
