import { databaseConfig } from "../config/variables";
import type { Knex } from "knex";

const { host, port, user, password, database, poolMin, poolMax, debug, ssl } =
  databaseConfig;

const config: Knex.Config = {
  client: "postgresql",
  debug,
  connection: {
    port,
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
