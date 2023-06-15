import { v4 as uuidv4 } from "uuid";
import { bech32 } from "bech32";
import { ParsedUrlQuery } from "querystring";

export function generateRandomHash(): string {
  const uuid = uuidv4();
  return uuid.replace(/-/g, "");
}

export function encodeURLToLNURL(url: string): string {
  let words = bech32.toWords(Buffer.from(url, "utf8"));
  return bech32.encode("lnurl", words, 1500).toUpperCase();
}

export function formatDate(timestamp: string) {
  const parsedTimestamp = parseInt(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(parsedTimestamp).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export function convertCentsToSats(response: any, cents: number): number {
  const btcSatBase = response.data.realtimePrice.btcSatPrice.base;
  const btcSatBaseOffset = response.data.realtimePrice.btcSatPrice.offset;
  const current = btcSatBase / 10 ** btcSatBaseOffset;
  const sats = cents / current;
  return Math.floor(sats);
}
export const usdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatOperand(
  operand: string | undefined,
  defaultValue?: string
) {
  if (operand == null || isNaN(Number(operand))) return defaultValue ?? `0.00`;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) {
    return usdFormatter.format(Number(integer));
  }
  return `${usdFormatter.format(Number(integer))}.${decimal}`;
}

export function parseDisplayCurrency(query: any) {
  const display = query.display as string | null;

  return {
    display: display ?? localStorage.getItem("display") ?? "USD",
  };
}

export function safeAmount(amount: number | string | string[] | undefined) {
  try {
    if (isNaN(Number(amount))) return 0;
    const theSafeAmount = (
      amount !== "NaN" &&
      amount !== undefined &&
      amount !== "" &&
      typeof amount === "string"
        ? !amount?.includes("NaN")
        : true
    )
      ? amount
      : 0;
    return Number(theSafeAmount);
  } catch (e) {
    return 0;
  }
}
