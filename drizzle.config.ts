import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "turso",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
});
