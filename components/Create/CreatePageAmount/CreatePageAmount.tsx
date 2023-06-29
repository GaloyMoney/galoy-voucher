"use client";
import { useRef, useState } from "react";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import NumPad from "@/components/NumPad/NumPad";
import { formatOperand } from "@/utils/helpers";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import styles from "../CreateLink.module.css";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import PageLoadingComponent from "@/components/Loading/PageLoadingComponent";
import Tooltip from "@mui/material/Tooltip";
import Button from "@/components/Button/Button";
import ModalComponent from "@/components/ModalComponent";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import Heading from "@/components/Heading";
import useRealtimePrice from "@/hooks/useRealTimePrice";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

interface Props {
  amount: string;
  setamount: (amount: string) => void;
  currency: any;
  setCurrency: (currency: any) => void;
  setCurrentPage: (accountType: string) => void;
  usdToSats: any;
  commissionPercentage: any;
  setConfirmModal: (currency: boolean) => void;
  AmountInDollars: string;
  commissionAmountInDollars: string;
  hasLoaded:any;
}

export default function HomePage({
  setamount,
  setCurrency,
  setCurrentPage,
  setConfirmModal,
  amount,
  currency,
  usdToSats,
  commissionPercentage,
  commissionAmountInDollars,
  hasLoaded
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
    return <PageLoadingComponent></PageLoadingComponent>;
  }

  const handelConfimLink = () => {
    if (Number(commissionAmountInDollars) < 0.01) {
      setAlerts(true);
      return;
    }
    setConfirmModal(true);
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
          Amount cannot be less than 0.01 ≈ {(usdToSats(1) / 100).toFixed()}{" "}
          sats
          <Button
            onClick={() => {
              setAlerts(false);
            }}
            style={{
              width: "8rem",
            }}
          >
            Ok
          </Button>
        </div>
      </ModalComponent>
      <div>{hasLoaded.current === false ? "LOADING" : null}</div>
      <Heading>Please Enter Amount</Heading>
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
        <div>
          {currency.symbol} {formatOperand(amount)}
        </div>
      </div>
      <div>{Number(commissionPercentage)}% commission</div>
      <div>≈ ${commissionAmountInDollars}</div>
      <NumPad currentAmount={amount} setCurrentAmount={setamount} unit="FIAT" />
      <div className={styles.account_type}></div>
      <div className={styles.commission_and_submit_buttons}>
        <Button
          onClick={() => {
            setCurrentPage("COMMISSION");
          }}
        >
          Commission
        </Button>
        <Button onClick={handelConfimLink}>Create link</Button>
      </div>

      <InfoComponent>
        Regular sats refer to BTC sats, which can fluctuate in value over time,
        either increasing or decreasing. On the other hand, stable sats are USD
        sats that maintain a fixed value and do not change their values.
      </InfoComponent>
    </>
  );
}
