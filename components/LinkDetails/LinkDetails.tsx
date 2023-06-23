import React from "react";
import styles from "./LinkDetails.module.css";
import { timeSince } from "@/utils/helpers";
import { WithdrawLink } from "@/utils/generated/graphql";
import useSatPrice from "@/hooks/useSatsPrice";

interface LinkDetailsProps {
  withdrawLink?: WithdrawLink | null;
}

export default function LinkDetails({ withdrawLink }: LinkDetailsProps) {
  const { usdToSats, satsToUsd } = useSatPrice();

  if (!withdrawLink) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div
        className={
          withdrawLink?.status === "UNFUNDED"
            ? styles.status_UNFUNDED
            : styles.status_FUNDED
        }
      >
        {withdrawLink?.status === "UNFUNDED"
          ? "Not funded and inactive"
          : withdrawLink?.status === "FUNDED"
          ? "Already funded and active"
          : ""}
      </div>
      <div>
        {withdrawLink?.account_type === "BTC"
          ? `${withdrawLink?.max_withdrawable} sats`
          : `${usdToSats(withdrawLink?.max_withdrawable / 100).toFixed()} sats`}
      </div>

      <div>
        {withdrawLink?.account_type === "BTC" ? "Regular sats" : "Stable sats"}
      </div>

      <div>
        {withdrawLink?.commission_percentage === 0
          ? `No commission`
          : `${withdrawLink?.commission_percentage} percent Commission`}
      </div>
      <div className={styles.time}>
        Created {timeSince(Number(withdrawLink?.created_at))}{" "}
      </div>
    </div>
  );
}
