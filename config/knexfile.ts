import type { Knex } from "knex";
const env = require("dotenv").config({ path: "../.env" });

const config: { [key: string]: Knex.Config } = {
  //using vercel's free tier postgress DB for development
  development: {
    client: "postgresql",
    connection: {
      host: `${process.env.NEXT_PUBLIC_PGHOST}`,
      database: `${process.env.NEXT_PUBLIC_PGDATABASE}`,
      user: `${process.env.NEXT_PUBLIC_PGUSER}`,
      password: `${process.env.NEXT_PUBLIC_PGPASSWORD}`,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: `${process.env.NEXT_PUBLIC_PGHOST}`,
      database: `${process.env.NEXT_PUBLIC_PGDATABASE}`,
      user: `${process.env.NEXT_PUBLIC_PGUSER}`,
      password: `${process.env.NEXT_PUBLIC_PGPASSWORD}`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
