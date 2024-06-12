import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { TABLES } from "./schema";

const config = useRuntimeConfig();

const client = createClient({
  url: config.database.url,
  authToken: config.database.token,
});

export const db = drizzle(client, {
  logger: config.database.debug.toString() === "true",
  schema: TABLES,
});
