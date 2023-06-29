"use client";
import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { encodeURLToLNURL, formatSecretCode } from "@/utils/helpers";
import PageLoadingComponet from "@/components/Loading/PageLoadingComponent";
import { useGetWithdrawLinkQuery } from "@/utils/generated/graphql";
import { NEXT_PUBLIC_LOCAL_URL } from "@/config/variables";
import Button from "@/components/Button/Button";
import styles from "./LnurlPage.module.css";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import FundsPaid from "@/components/FundsPaid";
import Heading from "@/components/Heading";
import Bold from "@/components/Bold";
interface Params {
  params: {
    id: string;
  };
}

// this page shows the LNURLw screen after success in fund transfer to escrow account
export default function Page({ params: { id } }: Params) {
  const [revelLNURL, setRevelLNURL] = useState(false);
  const { loading, error, data } = useGetWithdrawLinkQuery({
    variables: { getWithdrawLinkId: id },
    context: {
      endpoint: "SELF",
    },
  });

  if (loading) {
    return <PageLoadingComponet />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  const lnurl = encodeURLToLNURL(
    `${NEXT_PUBLIC_LOCAL_URL}/api/lnurlw/${data.getWithdrawLink?.unique_hash}`
  );
  const url = `${NEXT_PUBLIC_LOCAL_URL}/withdraw/${id}?lightning=${lnurl}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(lnurl);
  };

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="top_page_container">
      {data.getWithdrawLink?.status === "PAID" ? (
        <FundsPaid></FundsPaid>
      ) : (
        <>
          <Heading>
            {" "}
            Voucher <Bold>{data.getWithdrawLink?.identifier_code}</Bold> created
            Successfully{" "}
          </Heading>
          <p>
            Please collect ${data.getWithdrawLink?.amount} before sharing with
            the customer
          </p>
          <p>
            Voucher <Bold>{data.getWithdrawLink?.identifier_code}</Bold>
          </p>
          <p>
            voucher Amount $
            {(Number(data.getWithdrawLink?.max_withdrawable) / 100).toFixed(2)}
          </p>
          {revelLNURL ? (
            <>
              {" "}
              <div className={styles.LNURL_container}>
                <Heading>LNURL fund withdraw</Heading>
                <p>scan to redeem</p>
                <QRCode size={300} value={url} />
                <p>or visit voucher.blink.sv and redeem with </p>
                <div className={styles.voucher_container}>
                  <p> VOUCHER CODE </p>
                  <p>{formatSecretCode(data.getWithdrawLink?.secret_code)} </p>
                </div>
              </div>
              <Button onClick={copyToClipboard}>Copy LNURL</Button>
            </>
          ) : null}
          {!revelLNURL ? (
            <Button onClick={() => setRevelLNURL(true)}>Revel Voucher</Button>
          ) : null}
          <Button onClick={() => sharePage()}>Share Voucher</Button>
          <Button onClick={() => window.print()}>Print Voucher</Button>
          <InfoComponent>
            To redeem instantly for zero fees Download App at blink.sv and scan
            above QR with Blink
          </InfoComponent>{" "}
          <InfoComponent>
            To redeem later or onChain visit voucher.blink.sv and enter the
            voucher secret, If you can't withdraw links from LNURL, you can scan
            this QR code with a regular QR scanner. After scanning, visit the
            URL and choose the "onChain" option.
          </InfoComponent>
        </>
      )}
    </div>
  );
}
