import { v4 as uuidv4 } from "uuid";
import { bech32 } from "bech32";

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
