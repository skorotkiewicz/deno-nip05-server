import { signal } from "@preact/signals";
import { PostgresProvider } from "https://deno.land/x/keyv2@0.0.2/mod.ts";

const db = new PostgresProvider(
  Deno.env.get("TABLENAME"),
  Deno.env.get("USERNAME"),
  Deno.env.get("DATABASE"),
  Deno.env.get("HOSTNAME"),
  Deno.env.get("PASSWORD")
);

await db.init();

export default signal(db);
