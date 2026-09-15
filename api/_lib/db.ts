import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazily initialized so importing this module never throws at build/bundle
// time if DATABASE_URL isn't set yet (e.g. before the DB is provisioned).
// Do NOT wrap this in a Proxy — see the Vercel storage skill notes on why
// that breaks libraries that introspect the client's shape.
let _db: ReturnType<typeof build> | null = null;

function build() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Provision Neon Postgres and pull env vars with `vercel env pull .env.local`."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export function getDb() {
  if (!_db) _db = build();
  return _db;
}
