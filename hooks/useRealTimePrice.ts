import * as React from "react";
import {
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import { useDisplayCurrency } from "./useDisplayCurrency";

const useRealtimePrice = (
  currency: string,
  onSubscriptionDataCallback?: (subscriptionData: any) => void
) => {
  const priceRef = React.useRef<number>(0);
  const { formatCurrency } = useDisplayCurrency();
  const hasLoaded = React.useRef<boolean>(false);

  const { data } = useRealtimePriceWsSubscription({
    variables: { currency },
    onSubscriptionData({ subscriptionData }) {
      if (onSubscriptionDataCallback)
        onSubscriptionDataCallback(subscriptionData);
    },
  }); 

  const { data: initialData } = useRealtimePriceInitialQuery({
    variables: { currency },
    onCompleted(initData) {
      if (initData?.realtimePrice?.btcSatPrice) {
        const { base, offset } = initData.realtimePrice.btcSatPrice;
        priceRef.current = base / 10 ** offset;
      }
    },
  });

  React.useEffect(() => {
    if ((data || initialData) && !hasLoaded.current) {
      hasLoaded.current = true;
    }
  }, [data, initialData]);

  const conversions = React.useMemo(
    () => ({
      satsToCurrency: (
        sats: number,
        display: string,
        fractionDigits: number
      ) => {
        const convertedCurrencyAmount =
          fractionDigits === 2
            ? (sats * priceRef.current) / 100
            : sats * priceRef.current;
        const formattedCurrency = formatCurrency({
          amountInMajorUnits: convertedCurrencyAmount,
          currency: display,
          withSign: true,
        });
        return {
          convertedCurrencyAmount,
          formattedCurrency,
        };
      },
      currencyToSats: (
        currency: number,
        display: string,
        fractionDigits: number
      ) => {
        const convertedCurrencyAmount =
          fractionDigits === 2
            ? (100 * currency) / priceRef.current
            : currency / priceRef.current;
        const formattedCurrency = formatCurrency({
          amountInMajorUnits: convertedCurrencyAmount,
          currency: display,
          withSign: true,
        });
        return {
          convertedCurrencyAmount,
          formattedCurrency,
        };
      },
      hasLoaded: hasLoaded,
    }),
    [priceRef, formatCurrency]
  );

  if (data?.realtimePrice?.realtimePrice?.btcSatPrice) {
    const { base, offset } = data.realtimePrice.realtimePrice.btcSatPrice;
    priceRef.current = base / 10 ** offset;
  }

  if (priceRef.current === 0) {
    return {
      satsToCurrency: () => {
        return {
          convertedCurrencyAmount: NaN,
          formattedCurrency: "0",
        };
      },
      currencyToSats: () => {
        return {
          convertedCurrencyAmount: NaN,
          formattedCurrency: "0",
        };
      },
      hasLoaded: hasLoaded,
    };
  }

  return conversions;
};
export default useRealtimePrice;
