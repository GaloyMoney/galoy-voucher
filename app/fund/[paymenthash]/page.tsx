"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import Button from "@/components/Button/Button";
import {
  Status,
  useGetWithdrawLinkQuery,
  useUpdateWithdrawLinkMutation,
  useLnInvoicePaymentStatusSubscription,
} from "@/utils/generated/graphql";
import LinkDetails from "@/components/LinkDetails/LinkDetails";
import ModalComponent from "@/components/ModalComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./fundPage.module.css";
import Link from "next/link";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import PageLoadingComponent from "@/components/Loading/PageLoadingComponent";

interface Params {
  params: {
    paymenthash: string;
  };
}

//this Screen is used to take funds from user for withdraw links
export default function FundPaymentHash({ params: { paymenthash } }: Params) {
  const [modalOpen, setModalOpen] = useState(false);
  //getting the data for withdraw links that was saved on /create screen
  const {
    loading: loadingWithdrawLink,
    error: errorWithdrawLink,
    data: dataWithdrawLink,
  } = useGetWithdrawLinkQuery({
    variables: { getWithdrawLinkId: paymenthash },
    context: {
      endpoint: "SELF",
    },
  });

  const withdrawLink = dataWithdrawLink?.getWithdrawLink;
  const paymentRequest = withdrawLink?.payment_request;

  //creating web socket connection for invoice that will be used to take funds from user
  const [updateWithdrawLink, { loading: updatingWithdrawLink }] =
    useUpdateWithdrawLinkMutation();

  //TODO need to add error checking in this section
  const {
    data: paymentStatusData,
    loading: paymentStatusLoading,
    error: paymentStatusDataError,
  } = useLnInvoicePaymentStatusSubscription({
    variables: {
      payment_request: paymentRequest || "",
    },
    skip: withdrawLink?.status === Status.Paid,
  });

  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (paymentStatusData && paymentStatusData.lnInvoicePaymentStatus) {
        if (paymentStatusData.lnInvoicePaymentStatus.status === "PAID") {
          try {
            await updateWithdrawLink({
              variables: {
                updateWithdrawLinkId: withdrawLink?.id || "",
                updateWithdrawLinkInput: { status: Status.Funded },
              },
            });
            setModalOpen(true);
          } catch (error) {
            alert(error);
          }
        }
      }
    };

    handlePaymentStatus();
  }, [paymentStatusData]);

  if (loadingWithdrawLink || updatingWithdrawLink) {
    return <PageLoadingComponent />;
  }

  if (errorWithdrawLink || paymentStatusDataError) {
    //TODO need to create a error component
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Error: {errorWithdrawLink?.message} {paymentStatusDataError?.message}
      </div>
    );
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(withdrawLink?.payment_request || "");
  };

  return (
    <>
      <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modal_container}>
          <CheckCircleIcon style={{ fontSize: 60, color: "#16ca40" }} />
          <h1 className={styles.modal_heading}>Successfully Paid</h1>
          <Link href={`/withdraw/${withdrawLink?.id}/lnurl`}>
            <Button
              style={{ width: "9em" }}
              onClick={() => setModalOpen(false)}
            >
              OK
            </Button>
          </Link>
        </div>
      </ModalComponent>
      <div className="top_page_container">
        <div className={styles.heading}>
          {withdrawLink?.status === "UNFUNDED" ? (
            <h1>
              Please Fund the Lighting Invoice to activate the withdraw Link{" "}
            </h1>
          ) : (
            <h1>Lighting Invoice is Funded and Link is activate</h1>
          )}
        </div>
        <LinkDetails withdrawLink={withdrawLink}></LinkDetails>
        {withdrawLink?.status === "UNFUNDED" ? (
          <div>
            <div className="w-80 h-80 flex flex-col items-center justify-center border border-gray-300 rounded-md p-4">
              <QRCode size={300} value={withdrawLink?.payment_request} />
            </div>
            <Button
              style={{
                width: "20em",
              }}
              onClick={handleCopyToClipboard}
            >
              Copy to Clipboard
            </Button>
          </div>
        ) : (
          <Link
            style={{
              width: "90%",
            }}
            href={`/withdraw/${withdrawLink?.id}/lnurl`}
          >
            <Button >Next </Button>
          </Link>
        )}

        {withdrawLink?.status === "UNFUNDED" ? (
          <InfoComponent>
            Please note that a Stable sats invoice is only valid for 5 minutes,
            while a Regular sats invoice is valid for 24 hours from the point of
            creation.
          </InfoComponent>
        ) : null}
      </div>
    </>
  );
}
