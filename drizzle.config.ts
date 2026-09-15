import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run this command via `dotenv -e .env.local -- ...` (see the npm scripts)."
  );
}

export default defineConfig({
  schema: "./api/_lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
