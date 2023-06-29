import React, { useEffect, useState } from "react";
import Numpad from "@/components/NumPad/NumPad";
import { formatOperand } from "@/utils/helpers";
import styles from "../CreateLink.module.css";
import Button from "@/components/Button/Button";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import Heading from "@/components/Heading";

interface Props {
  commissionPercentage: any;
  setCommissionPercentage: any;
  amount: any;
  currency: any;
  usdToSats: any;
  setCurrentPage: any;
  fiatAfterCommission: any;
  setFiatAfterCommission: any;
  
}

export default function CreatePagePercentage({
  commissionPercentage,
  setCommissionPercentage,
  amount,
  currency,
  setCurrentPage,
  fiatAfterCommission,
  setFiatAfterCommission,
}: Props) {
  useEffect(() => {
    setFiatAfterCommission(
      currency.fractionDigits === 0
        ? Number(
            Number(amount) -
              (Number(amount) * Number(commissionPercentage)) / 100
          ).toFixed()
        : Number(
            Number(amount) -
              (Number(amount) * Number(commissionPercentage)) / 100
          )
            .toFixed(currency.fractionDigits)
            .toString()
    );

  }, [commissionPercentage, amount]);

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
      </div>
      <Numpad
        currentAmount={commissionPercentage}
        setCurrentAmount={setCommissionPercentage}
        unit="PERCENTAGE"
      />
      <div className={styles.commission_and_submit_buttons}>
        <Button
          style={{ width: "90%" }}
          onClick={() => setCurrentPage("AMOUNT")}
        >
          Previous
        </Button>
        <Button style={{ width: "90%" }}>Set commission</Button>
      </div>
    </>
  );
}
