"use client";
import Button from "@/components/Button/Button";
import { useEffect, useState } from "react";
import CreatePageAmount from "@/components/Create/CreatePageAmount/CreatePageAmount";
import CreatePagePercentage from "@/components/Create/CreatePagePercentage/CreatePagePercentage";
import {
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import useSatsPrice from "@/hooks/useSatsPrice";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

export default function CreatePage() {
  const [currentPage, setCurrentPage] = useState("AMOUNT");
  const [amountSATS, setAmountSATS] = useState("0");
  const [amountFIAT, setAmountFIAT] = useState("0");
  const [commissionPercentage, setCommissionPercentage] = useState("0");
  const [unit, setUnit] = useState("FIAT");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [accountType, setAccountType] = useState("BTC");
  const { usdToSats, satsToUsd } = useSatsPrice();

  const {
    data: initialData,
    loading,
    refetch,
  } = useRealtimePriceInitialQuery({
    variables: { currency: currency.id },
    context: {
      endpoint: "MAINNET",
    },
  });

  const { data: wsData, loading: wsLoading } = useRealtimePriceWsSubscription({
    variables: { currency: currency.id },
    context: {
      endpoint: "MAINNET",
    },
  });

  const updateCurrencyConversion = (priceData: any) => {
    if (priceData) {
      const { base, offset } = priceData;
      const priceRef = base / 10 ** offset;
      if (unit === "SATS") {
        const convertedCurrencyAmount =
          currency.fractionDigits === 2
            ? (Number(amountSATS) * priceRef) / 100
            : Number(amountSATS) * priceRef;
        setAmountFIAT(
          (currency.fractionDigits === 0
            ? convertedCurrencyAmount.toFixed()
            : convertedCurrencyAmount.toFixed(currency.fractionDigits)
          ).toString()
        );
      } else {
        const convertedCurrencyAmount =
          currency.fractionDigits === 2
            ? (100 * Number(amountFIAT)) / priceRef
            : Number(amountFIAT) / priceRef;
        setAmountSATS(convertedCurrencyAmount.toFixed().toString());
      }
    }
  };

  useEffect(() => {
    if (initialData?.realtimePrice?.btcSatPrice) {
      updateCurrencyConversion(initialData?.realtimePrice?.btcSatPrice);
    }
  }, [amountSATS, amountFIAT, initialData, loading]);

  useEffect(() => {
    refetch();
  }, [wsData]);

  if (currentPage === "AMOUNT") {
    return (
      <div className="create_page_container">
        <CreatePageAmount
          amountSATS={amountSATS}
          amountFIAT={amountFIAT}
          unit={unit}
          currency={currency}
          accountType={accountType}
          loading={loading}
          setAmountSATS={setAmountSATS}
          setAmountFIAT={setAmountFIAT}
          setUnit={setUnit}
          setCurrency={setCurrency}
          setAccountType={setAccountType}
          setCurrentPage={setCurrentPage}
          usdToSats={usdToSats}
        />
      </div>
    );
  } else {
    return (
      <div className="create_page_container">
        <CreatePagePercentage
          commissionPercentage={commissionPercentage}
          setCommissionPercentage={setCommissionPercentage}
          amountFIAT={amountFIAT}
          amountSATS={amountSATS}
          currency={currency}
          usdToSats={usdToSats}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }
}
