# Deno Nip05 Server

## Usage

- Database PostgreSQL or SQLite. Edit /Database.ts

For Postgres

```ts
import { PostgresProvider } from "https://deno.land/x/keyv2@0.0.2/mod.ts";

const db = new PostgresProvider(
  Deno.env.get("TABLENAME"),
  Deno.env.get("USERNAME"),
  Deno.env.get("DATABASE"),
  Deno.env.get("HOSTNAME"),
  Deno.env.get("PASSWORD"),
);

await db.init();
```

For SQLit:

```ts
import { SqliteProvider } from "https://deno.land/x/keyv2@0.0.2/mod.ts";

const db = new SqliteProvider("db.sqlite", "tablename");
```

Start the project:

```
deno task start
```
