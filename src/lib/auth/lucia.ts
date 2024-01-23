import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { client } from "~/lib/database/client";

export const auth = lucia({
  adapter: libsql(client, {
    key: "user_keys",
    session: "user_sessions",
    user: "users",
  }),
  middleware: nextjs_future(),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  csrfProtection: true,
  getUserAttributes: (data) => {
    return {
      username: data.username,
      avatarUrl: data.avatar,
    };
  },
});

export type Auth = typeof auth;
