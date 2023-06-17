"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import useRealtimePrice from "@/hooks/useRealTimePrice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import NumPad from "@/components/NumPad/NumPad";
import {
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import { formatOperand } from "@/utils/helpers";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import styles from "./CreateLink.module.css";
import LoadingComponent from "@/components/LoadingComponent";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

export default function HomePage() {
  const [amountSATS, setAmountSATS] = useState("0");
  const [amountFIAT, setAmountFIAT] = useState("0");
  const [commissionPercentage, setCommissionPercentage] = useState(0);
  const [unit, setUnit] = useState("FIAT");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setUnit("FIAT");
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  const [accountType, setAccountType] = useState("BTC");

  useRealtimePrice(currency.id);
  const {
    currencyList,
    formatCurrency,
    loading: currencyLoading,
  } = useDisplayCurrency();

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
        console.log("WS", convertedCurrencyAmount);
        setAmountSATS(convertedCurrencyAmount.toFixed().toString());
      }
    } else {
      console.log("NOR");
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

  const handleCurrencyChange = (event: any) => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.id === event.target.value
    );
    setCurrency(selectedCurrency || DEFAULT_CURRENCY);
  };

  const handleCommissionPercentage = (event: any) => {
    setCommissionPercentage(event.target.value);
  };

  if (currencyLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent></LoadingComponent>
      </div>
    );
  }

  return (
    <div className={styles.container}>
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

      <div className="flex flex-col gap-2">
        <NumPad
          currentAmount={unit === "FIAT" ? amountFIAT : amountSATS}
          secondaryAmount={unit === "FIAT" ? amountSATS : amountFIAT}
          setCurrentAmount={unit === "FIAT" ? setAmountFIAT : setAmountSATS}
          unit={unit}
        />
        <div className="flex flex-col gap-4">
          <Input
            label="Commission %"
            type="number"
            max={100}
            min={0}
            onChange={handleCommissionPercentage}
          />
          <Input
            label="Memo"
            max={100}
            min={0}
            onChange={handleCommissionPercentage}
          />
          
        </div>
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
            placement="top-start"
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

        <Button onClick={() => handleOpen()}>Create Link</Button>
        <Modal open={modalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 5,
              borderRadius: "0.5em",
              p: 4,
            }}
          >
            <h1>Confirm Link Creation</h1>
            <p>Total amount after commission:</p>
            <p className="text-lg font-semibold">
              {currency.symbol}{" "}
              {formatOperand(
                (
                  Number(amountFIAT) -
                  (Number(amountFIAT) * Number(commissionPercentage)) / 100
                ).toString()
              )}
            </p>
            {/* <p> ≈ {formatOperand(amountSATS)} sats</p> */}
            <p>Commission {commissionPercentage}%</p>
            <p>
              Account Type:{" "}
              {accountType === "BTC" ? "Regular sats" : "Stable sats"}
            </p>
            <div className="flex gap-4 mt-4">
              <Button>Confirm</Button>
              <Button onClick={() => handleClose()}>Cancel</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
