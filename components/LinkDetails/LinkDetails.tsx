import React from "react";
import styles from "./LinkDetails.module.css";
import { timeSince } from "@/utils/helpers";
import { WithdrawLink } from "@/utils/generated/graphql";
import useSatPrice from "@/hooks/useSatsPrice";
import { TimeBar } from "@/components/TimeBar/TimeBar";
import Bold from "../Bold";

interface LinkDetailsProps {
  withdrawLink?: WithdrawLink | null;
  setExpired?: any;
}

export default function LinkDetails({
  withdrawLink,
  setExpired,
}: LinkDetailsProps) {
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
          ? "Not Funded"
          : withdrawLink?.status === "FUNDED"
          ? "Funded and Active"
          : null}
      </div>
      {withdrawLink.status === "UNFUNDED" ? (
        <>
          <div className={styles.amount}>
            Pay{" "}
            {withdrawLink?.account_type === "BTC"
              ? `${withdrawLink?.max_withdrawable} sats`
              : `≈ ${usdToSats(
                  withdrawLink?.max_withdrawable / 100
                ).toFixed()} sats`}{" "}
            to create withdraw link for ${withdrawLink?.max_withdrawable / 100}{" "}
            US Dollar
          </div>
          <div>
            {withdrawLink?.commission_percentage === 0
              ? `No commission`
              : `${withdrawLink?.commission_percentage} percent Commission`}
          </div>
        </>
      ) : withdrawLink?.status === "FUNDED" ? (
        <>
          <div className={styles.amount}>
            Voucher Amount ${withdrawLink?.max_withdrawable / 100} US
          </div>
          <div>
            Voucher Code <Bold>{withdrawLink.identifier_code}</Bold>{" "}
          </div>
        </>
      ) : null}

      <div className={styles.time}>
        Created {timeSince(Number(withdrawLink?.created_at))}{" "}
      </div>
      <div className={styles.expire_time}>
        {withdrawLink.status === "UNFUNDED" && setExpired ? (
          <>
            Invoice Expires in{" "}
            <TimeBar
              setExpired={setExpired}
              expirationTimestamp={Number(withdrawLink?.invoice_expiration)}
            ></TimeBar>
          </>
        ) : null}
      </div>
    </div>
  );
}
