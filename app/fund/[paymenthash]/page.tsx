"use client";
import React, { useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import {
  Status,
  useGetWithdrawLinkQuery,
  useUpdateWithdrawLinkMutation,
  useLnInvoicePaymentStatusSubscription,
} from "@/utils/generated/graphql";

interface Params {
  params: {
    paymenthash: string;
  };
}

//this Screen is used to take funds from user for withdraw links
//TODO need to fix loading in this
export default function FundPaymentHash({ params: { paymenthash } }: Params) {
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
  });

  useEffect(() => {
    const handlePaymentStatus = async () => {
      //TODO need to handel errors in this section
      if (paymentStatusData && paymentStatusData.lnInvoicePaymentStatus) {
        const status = paymentStatusData.lnInvoicePaymentStatus.status;
        console.log("Payment status:", status);
        if (status === "PAID") {
          //TODO need to show septate component in this section
          alert("PAID");
          try {
            const response = await updateWithdrawLink({
              variables: {
                updateWithdrawLinkId: withdrawLink?.id || "",
                updateWithdrawLinkInput: { status: Status.Funded },
              },
            });
            router.replace(
              `/withdraw/${response.data?.updateWithdrawLink.id}/lnurl`
            );
          } catch (error) {
            alert(error);
          }
        }
      }
    };

    handlePaymentStatus();
  }, [paymentStatusData]);

  if (loadingWithdrawLink || updatingWithdrawLink) {
    return <LoadingComponent />;
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
    <div className="flex flex-col gap-5  mt-36 items-center justify-start h-screen">
      <h1 className="font-bold text-xl">
        Please Fund the Link to create the LNURL link{" "}
      </h1>
      <div className="w-80 h-80 flex flex-col items-center justify-center border border-gray-300 rounded-md p-4">
        <QRCode size={300} value={withdrawLink?.payment_request} />
      </div>
      <button
        onClick={handleCopyToClipboard}
        className=" bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md hover:bg-zinc-900 "
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
