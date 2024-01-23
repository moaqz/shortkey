import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_TOKEN,
});

export { client };
