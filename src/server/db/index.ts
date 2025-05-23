// src/lib/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/server/db/schemas/";

type DrizzlePGClient = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var -- Only var works here
  var db: DrizzlePGClient | undefined;
  // eslint-disable-next-line no-var -- Only var works here
  var pgPool: Pool | undefined;
}

let pool: Pool;
let dbInstance: DrizzlePGClient;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  dbInstance = drizzle(pool, { schema, logger: false }); // Set logger to true for query logging in prod if needed
} else {
  // In development, use the global variable if it exists to avoid creating new pools on HMR
  if (!global.pgPool) {
    global.pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  pool = global.pgPool;

  if (!global.db) {
    // You can enable logger in dev for debugging
    global.db = drizzle(pool, { schema, logger: false });
  }
  dbInstance = global.db;
}

export const db = dbInstance;
export const pgPoolInstance = pool;
