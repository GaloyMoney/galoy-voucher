"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import { encodeURLToLNURL } from "@/utils/helpers";
import PageLoadingComponet from "@/components/Loading/PageLoadingComponent";
import { useGetWithdrawLinkQuery } from "@/utils/generated/graphql";
import { NEXT_PUBLIC_LOCAL_URL } from "@/config/variables";
import Button from "@/components/Button/Button";
import LinkDetails from "@/components/LinkDetails/LinkDetails";
import styles from "./LnurlPage.module.css";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FundsPaid from "@/components/FundsPaid";
interface Params {
  params: {
    id: string;
  };
}

// this page shows the LNURLw screen after success in fund transfer to escrow account
export default function Page({ params: { id } }: Params) {
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
    //TODO need to add septate component for error section here
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  //LNURLw URL this will be encoded in LNURL format
  const lnurl = encodeURLToLNURL(
    `${NEXT_PUBLIC_LOCAL_URL}/api/lnurlw/${data.getWithdrawLink?.unique_hash}`
  );
  const url = `${NEXT_PUBLIC_LOCAL_URL}/withdraw/${id}?lightning=${lnurl}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(lnurl);
  };

  //TODO need to add this to septate component
  return (
    <div className="create_page_container">
      {data.getWithdrawLink?.status === "PAID" ? (
        <FundsPaid></FundsPaid>
      ) : (
        <>
          <div className={styles.heading}>LNURL fund withdraw</div>
          <LinkDetails withdrawLink={data.getWithdrawLink}></LinkDetails>
          <div>
            <QRCode size={300} value={url} />
            <Button onClick={copyToClipboard}>Copy LNURL</Button>
          </div>
          <InfoComponent>
            If you can't withdraw links from LNURL, you can scan this QR code
            with a regular QR scanner. After scanning, visit the URL and choose
            the "onChain" option.
          </InfoComponent>
        </>
      )}
    </div>
  );
}
