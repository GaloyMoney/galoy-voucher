"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateRandomHash } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import { useCreateWithdrawLinkMutation } from "@/utils/generated/graphql";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import useRealtimePrice from "@/hooks/useRealTimePrice";
import {
  NEXT_PUBLIC_ESCROW_WALLET_BTC,
  NEXT_PUBLIC_ESCROW_WALLET_USD,
} from "@/config/variables";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import NumPad from "@/components/NumPad/NumPad";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

// TODO need to fix loading in this component
export default function HomePage() {
  const router = useRouter();
  const [amountSATS, setAmountSATS] = useState("0");
  const [amountFIAT, setAmountFIAT] = useState("0");
  const [unit, setUnit] = useState("FIAT");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const { currencyToSats, satsToCurrency, hasLoaded } = useRealtimePrice(
    currency.id
  );
  const { currencyList } = useDisplayCurrency();

  useEffect(() => {
    if (unit === "FIAT") {
      const { convertedCurrencyAmount: convertedCurrencyAmountUSD } =
        currencyToSats(
          Number(amountFIAT),
          currency.id,
          currency.fractionDigits
        );
      setAmountSATS(convertedCurrencyAmountUSD.toFixed().toString());
    } else {
      const { convertedCurrencyAmount: convertedCurrencyAmountSat } =
        satsToCurrency(
          Number(amountSATS),
          currency.id,
          currency.fractionDigits
        );
      setAmountFIAT(
        convertedCurrencyAmountSat.toFixed(currency.fractionDigits).toString()
      );
      setAmountSATS(Number(amountSATS).toFixed());
    }
  }, [amountSATS, amountFIAT, unit]);

  useEffect(() => {
    console.log("currency", currency.id);
    console.log("amountFIAT", amountFIAT);

    const { convertedCurrencyAmount: convertedCurrencyAmountUSD } =
      currencyToSats(Number(amountFIAT), currency.id, currency.fractionDigits);
    setAmountSATS(convertedCurrencyAmountUSD.toFixed().toString());
    console.log("convertedCurrencyAmountUSD", convertedCurrencyAmountUSD);
    console.log("amountSATS", amountSATS);
  }, [hasLoaded.current, hasLoaded, currency, currency.id]);

  const handleCurrencyChange = (event: any) => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.id === event.target.value
    );
    setCurrency(selectedCurrency || DEFAULT_CURRENCY);
  };

  return (
    <div className="flex flex-col mt-36 items-center h-screen">
      <div>{hasLoaded.current ? null : <div>LOADING</div>} </div>
      <select id="currency" value={currency.id} onChange={handleCurrencyChange}>
        {currencyList.map((currencyOption) => (
          <option key={currencyOption.id} value={currencyOption.id}>
            {currencyOption.name}
          </option>
        ))}
      </select>
      <div>{unit === "FIAT" ? amountFIAT : amountSATS}</div>
      <div>{unit === "FIAT" ? amountSATS : amountFIAT}</div>

      <div
        onClick={() => (unit === "FIAT" ? setUnit("SATS") : setUnit("FIAT"))}
      >
        {unit}
      </div>
      <div className="flex flex-col gap-1">
        <NumPad
          currentAmount={unit === "FIAT" ? amountFIAT : amountSATS}
          setCurrentAmount={unit === "FIAT" ? setAmountFIAT : setAmountSATS}
        />
      </div>
    </div>
  );
}
