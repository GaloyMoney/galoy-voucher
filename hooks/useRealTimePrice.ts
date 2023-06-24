import { useState, useEffect } from "react";
import {
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import { useDisplayCurrency } from "./useDisplayCurrency";

interface Currency {
  __typename: string;
  id: string;
  symbol: string;
  name: string;
  flag: string;
  fractionDigits: number;
}

export default function useRealTimePrice(currencyId: string) {
  const [priceData, setPriceData] = useState(null);

  const {
    data: initialData,
    loading,
    refetch,
  } = useRealtimePriceInitialQuery({
    variables: { currency: currencyId },
    context: {
      endpoint: "MAINNET",
    },
  });

  const { data: wsData, loading: wsLoading } = useRealtimePriceWsSubscription({
    variables: { currency: currencyId },
    context: {
      endpoint: "MAINNET",
    },
  });

  useEffect(() => {

  }, [initialData]);

  useEffect(() => {
    refetch();
  }, [wsData]);

  const satsToFiat = (sats: number) => {
    if (!priceData) return null;
    const { base, offset } = priceData;
    const priceRef = base / 10 ** offset;
    return (sats * priceRef).toFixed(2);
  };

  const fiatToSats = (fiat: number) => {
    if (!priceData) return null;
    const { base, offset } = priceData;
    const priceRef = base / 10 ** offset;
    return (fiat / priceRef).toFixed();
  };

  return { priceData, satsToFiat, fiatToSats };
}
