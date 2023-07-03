import { Currency } from "@/utils/generated/graphql";

export const DEFAULT_CURRENCY: Currency = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};
