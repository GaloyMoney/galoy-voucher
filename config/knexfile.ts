import type { Knex } from "knex";
import { env } from "./env";

const {
  PGHOST: host,
  PGUSER: user,
  PGPASSWORD: password,
  PGDATABASE: database,
  POOL_MIN: poolMin,
  POOL_MAX: poolMax,
  DEBUG: debug,
  DB_SSL: ssl,
} = env;

const config: Knex.Config = {
  client: "postgresql",
  debug,
  connection: {
    host,
    database,
    user,
    password,
    ssl,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations/",
  },
};

export default config;
