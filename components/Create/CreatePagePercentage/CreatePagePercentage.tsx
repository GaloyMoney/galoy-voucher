import React, { useEffect, useState } from "react";
import Numpad from "@/components/NumPad/NumPad";
import { formatOperand } from "@/utils/helpers";
import styles from "../CreateLink.module.css";
import Button from "@/components/Button/Button";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import Heading from "@/components/Heading";

interface Props {
  setCommissionPercentage: any;
  commissionPercentage: string;
  amountSATS: string;
  amountFIAT: string;
  currency: any;
  usdToSats: any;
  setCurrentPage: any;
  fiatAfterCommission: any;
  satsAfterCommission: any;
  setFiatAfterCommission: any;
  setSatsAfterCommission: any;
}

export default function CreatePagePercentage({
  commissionPercentage,
  setCommissionPercentage,
  amountSATS,
  amountFIAT,
  currency,
  setCurrentPage,
  fiatAfterCommission,
  satsAfterCommission,
  setFiatAfterCommission,
  setSatsAfterCommission,
}: Props) {
  useEffect(() => {
    setFiatAfterCommission(
      currency.fractionDigits === 0
        ? Number(
            Number(amountFIAT) -
              (Number(amountFIAT) * Number(commissionPercentage)) / 100
          ).toFixed()
        : Number(
            Number(amountFIAT) -
              (Number(amountFIAT) * Number(commissionPercentage)) / 100
          )
            .toFixed(currency.fractionDigits)
            .toString()
    );

    setSatsAfterCommission(
      Number(
        Number(amountSATS) -
          (Number(amountSATS) * Number(commissionPercentage)) / 100
      )
        .toFixed()
        .toString()
    );
  }, [commissionPercentage, amountSATS, amountFIAT]);

  return (
    <>
      <Heading>Please Enter Commission</Heading>
      <div className="text-3xl font-semibold">
        {formatOperand(commissionPercentage)}%
      </div>
      <div className={styles.percentage_amount}>
        <div>
          {currency.symbol} {formatOperand(fiatAfterCommission)}
        </div>
        <div>≈ {formatOperand(satsAfterCommission)} sats</div>
      </div>
      <Numpad
        currentAmount={commissionPercentage}
        setCurrentAmount={setCommissionPercentage}
        unit="PERCENTAGE"
      />

      <Button style={{ width: "90%" }} onClick={() => setCurrentPage("AMOUNT")}>
        Previous
      </Button>
    </>
  );
}
