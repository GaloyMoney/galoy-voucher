export const ESCROW_TOKEN = process.env.ESCROW_TOKEN || "";
export const NEXT_PUBLIC_GALOY_URL =process.env.NEXT_PUBLIC_GALOY_URL || "api.staging.galoy.io";
export const NEXT_PUBLIC_LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL || "";
export const NEXT_PUBLIC_ESCROW_WALLET_BTC =process.env.NEXT_PUBLIC_ESCROW_WALLET_BTC || "";
export const NEXT_PUBLIC_ESCROW_WALLET_USD =process.env.NEXT_PUBLIC_ESCROW_WALLET_USD || "";
export const MAX_INPUT_VALUE_LENGTH = 14;

export const databaseConfig = {
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "ln-withdraw-usr",
  password: process.env.PGPASSWORD || "ln-withdraw-pwd",
  database: process.env.PGDATABASE || "ln-withdraw",
  port: 5432,
  debug: false,
  poolMax: 5,
  poolMin: 1,
  ssl: process.env.DB_SSL || false,
};
