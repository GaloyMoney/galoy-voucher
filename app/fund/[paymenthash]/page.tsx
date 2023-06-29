"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import Button from "@/components/Button/Button";
import {
  Status,
  useGetWithdrawLinkQuery,
  useUpdateWithdrawLinkMutation,
  useLnInvoicePaymentStatusSubscription,
  useDeleteWithdrawLinkMutation,
} from "@/utils/generated/graphql";
import LinkDetails from "@/components/LinkDetails/LinkDetails";
import ModalComponent from "@/components/ModalComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./fundPage.module.css";
import Link from "next/link";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import PageLoadingComponent from "@/components/Loading/PageLoadingComponent";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import Bold from "@/components/Bold";

interface Params {
  params: {
    paymenthash: string;
  };
}

//this Screen is used to take funds from user for withdraw links
export default function FundPaymentHash({ params: { paymenthash } }: Params) {
  const [modalOpen, setModalOpen] = useState(false);
  const [expired, setExpired] = useState(false);
  const router = useRouter();
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

  const [updateWithdrawLink, { loading: updatingWithdrawLink }] =
    useUpdateWithdrawLinkMutation();

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

  const [deleteWithdrawLink, { loading: deletingWithdrawLink }] =
    useDeleteWithdrawLinkMutation();

  useEffect(() => {
    if (
      expired &&
      withdrawLink?.status === "UNFUNDED" &&
      paymentStatusData?.lnInvoicePaymentStatus.status !== "PAID"
    ) {
      try {
        const deleteLink = async () => {
          const result = await deleteWithdrawLink({
            variables: {
              id: withdrawLink?.id,
            },
          });
          router.push("/create");
        };
        deleteLink();
      } catch (e) {
        console.log(e);
      }
    }
  }, [expired]);

  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (paymentStatusData && withdrawLink) {
        if (paymentStatusData.lnInvoicePaymentStatus.status === "PAID") {
          try {
            await updateWithdrawLink({
              variables: {
                updateWithdrawLinkId: withdrawLink?.id,
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

  if (loadingWithdrawLink || updatingWithdrawLink || deletingWithdrawLink) {
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
    navigator.clipboard?.writeText(withdrawLink?.payment_request || "");
  };

  return (
    <>
      <div className="top_page_container">
        <ModalComponent open={modalOpen}>
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
        <div>
          {withdrawLink?.status === "UNFUNDED" ? (
            <Heading>
              Fund Voucher <Bold>{withdrawLink.identifier_code}</Bold> by paying
              the invoice below{" "}
            </Heading>
          ) : (
            <Heading>
              Voucher <Bold>{withdrawLink?.identifier_code}</Bold> is Funded and
              Link is activate
            </Heading>
          )}
        </div>
        <LinkDetails
          withdrawLink={withdrawLink}
          setExpired={setExpired}
        ></LinkDetails>
        {withdrawLink?.status === "UNFUNDED" ? (
          <div>
            <div className="w-80 h-80 flex flex-col items-center justify-center border border-gray-300 rounded-md p-4">
              <QRCode size={300} value={withdrawLink?.payment_request} />
            </div>
            <div className={styles.button_container}>
              <Button
                style={{
                  width: "20em",
                }}
                onClick={handleCopyToClipboard}
              >
                Copy to Clipboard
              </Button>
              <Link
                href={`bitcoin:${withdrawLink.payment_request}`}
                target="_blank"
              >
                <Button
                  style={{
                    width: "20em",
                  }}
                >
                  Open in wallet
                </Button>
              </Link>
              <Button
                style={{
                  width: "20em",
                  backgroundColor: "#d90429",
                  color: "white",
                }}
                onClick={() => setExpired(true)}
              >
                Cancel Voucher Creation
              </Button>
            </div>
          </div>
        ) : (
          <Link
            style={{
              width: "90%",
            }}
            href={`/withdraw/${withdrawLink?.id}/lnurl`}
          >
            <Button>Next </Button>
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
