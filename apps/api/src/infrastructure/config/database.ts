import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./database-types";

const postgresDialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const kyselyInstance = new Kysely<Database>({
  dialect: postgresDialect,
});

export type KyselyInstance = typeof kyselyInstance;

export type * from "./database-types";
