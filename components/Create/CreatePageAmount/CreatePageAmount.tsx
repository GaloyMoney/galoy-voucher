"use client";
import { useState } from "react";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import NumPad from "@/components/NumPad/NumPad";
import { formatOperand } from "@/utils/helpers";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import styles from "../CreateLink.module.css";
import LoadingComponent from "@/components/LoadingComponent";
import Tooltip from "@mui/material/Tooltip";
import Button from "@/components/Button/Button";
import ModalComponent from "@/components/ModalComponent";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

interface Props {
  amountSATS: string;
  setAmountSATS: (amount: string) => void;
  amountFIAT: string;
  setAmountFIAT: (amount: string) => void;
  unit: string;
  setUnit: (unit: string) => void;
  currency: any;
  setCurrency: (currency: any) => void;
  accountType: string;
  setAccountType: (accountType: string) => void;
  loading: any;
  setCurrentPage: (accountType: string) => void;
  usdToSats: any;
}

export default function HomePage({
  amountSATS,
  amountFIAT,
  unit,
  currency,
  accountType,
  loading,
  setAmountSATS,
  setAmountFIAT,
  setUnit,
  setCurrency,
  setAccountType,
  setCurrentPage,
  usdToSats,
}: Props) {
  const { currencyList, loading: currencyLoading } = useDisplayCurrency();
  const [alerts, setAlerts] = useState(false);

  const handleCurrencyChange = (event: any) => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.id === event.target.value
    );
    setCurrency(selectedCurrency || DEFAULT_CURRENCY);
  };

  if (currencyLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>
    );
  }

  const handelPageChange = () => {
    const cent_sats = (usdToSats(1) / 100).toFixed();
    if (Number(cent_sats) > Number(amountSATS)) {
      return setAlerts(true);
    } else {
      setUnit("FIAT");
      setCurrentPage("COMMISSION");
    }
  };

  return (
    <>
      <ModalComponent
        open={alerts}
        onClose={() => {
          setAlerts(false);
        }}
      >
        <div className={styles.alert_box}>
          Amount cannot be less than ≈ {(usdToSats(1) / 100).toFixed()} sats
          <Button
            onClick={() => {
              setAlerts(false);
            }}
          >
            {" "}
            OK{" "}
          </Button>
        </div>
      </ModalComponent>
      <select
        id="currency"
        value={currency.id}
        className={styles.currency_drop_down}
        onChange={handleCurrencyChange}
      >
        {currencyList.map((currencyOption) => (
          <option
            key={currencyOption.id}
            value={currencyOption.id}
            className={styles.currency_drop_down_option}
          >
            {currencyOption.name}
          </option>
        ))}
      </select>
      <div className="text-3xl font-semibold">
        {unit === "FIAT" ? (
          <div>
            {currency.symbol} {formatOperand(amountFIAT)}
          </div>
        ) : (
          <div>{formatOperand(amountSATS)} sats</div>
        )}
      </div>
      <div className="cursor-pointer">
        <SwapVertIcon
          onClick={() => (unit === "FIAT" ? setUnit("SATS") : setUnit("FIAT"))}
        />
      </div>
      {loading || currencyLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="text-xl">
          {unit === "FIAT" ? (
            <div> ≈ {formatOperand(amountSATS)} sats</div>
          ) : (
            <div>
              {currency.symbol} {formatOperand(amountFIAT)}
            </div>
          )}
        </div>
      )}
      <NumPad
        currentAmount={unit === "FIAT" ? amountFIAT : amountSATS}
        setCurrentAmount={unit === "FIAT" ? setAmountFIAT : setAmountSATS}
        unit={unit}
      />
      <div className={styles.account_type}>
        <Tooltip
          placement="top-start"
          title="BTC link will be created where sats' fixed price will fluctuate based on the price of BTC."
        >
          <button
            className={
              accountType === "BTC"
                ? styles.account_type_button_selected
                : styles.account_type_button
            }
            onClick={() => setAccountType("BTC")}
          >
            Regular sats BTC
          </button>
        </Tooltip>
        <Tooltip
          placement="bottom-end"
          title="Withdraw link will be created that will have a stable price. Sats will automatically adjust based on the price."
        >
          <button
            className={
              accountType === "USD"
                ? styles.account_type_button_selected
                : styles.account_type_button
            }
            onClick={() => setAccountType("USD")}
          >
            Stable sats USD
          </button>
        </Tooltip>
      </div>
      <Button onClick={handelPageChange}>Next</Button>
    </>
  );
}
