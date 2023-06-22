import React, { useEffect, useState } from "react";
import Numpad from "@/components/NumPad/NumPad";
import { formatOperand } from "@/utils/helpers";
import styles from "../CreateLink.module.css";
import Button from "@/components/Button/Button";

interface Props {
  setCommissionPercentage: any;
  commissionPercentage: string;
  amountSATS: string;
  amountFIAT: string;
  currency: any;
  usdToSats: any;
  setCurrentPage: any;
}

export default function CreatePagePercentage({
  commissionPercentage,
  setCommissionPercentage,
  amountSATS,
  amountFIAT,
  currency,
  usdToSats,
  setCurrentPage,
}: Props) {
  const [fiatAfterCommission, setFiatAfterCommission] = useState(amountFIAT);
  const [satsAfterCommission, setSatsAfterCommission] = useState(amountSATS);

  const handelSubmit = () => {
    

  };

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
      <Button onClick={handelSubmit}>Previous</Button>
      <Button onClick={() => setCurrentPage("AMOUNT")}>Submit</Button>
    </>
  );
}
