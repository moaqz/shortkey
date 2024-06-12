import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Google } from "arctic";
import { TABLES, db } from "~/server/database";

const config = useRuntimeConfig();
const adapter = new DrizzleSQLiteAdapter(db, TABLES.sessions, TABLES.users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: config.session.secureCookie === "true",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      ...attributes,
    };
  },
});

export const googleProvider = new Google(
  config.oauth.google.clientId,
  config.oauth.google.clientSecret,
  config.oauth.google.redirectUri,
);

export const GOOGLE_API = {
  USERS_URL: "https://www.googleapis.com/oauth2/v3/userinfo",
};

export const COOKIES = {
  CODE_VERIFIER: "google_oauth_code_verifier",
  STATE: "google_oauth_state",
};

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  name: string;
  full_name: string;
  family_name: string;
  google_id: string;
  email: string;
}
