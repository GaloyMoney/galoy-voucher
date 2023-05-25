"use client";
import React, { useEffect } from "react";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { QRCode } from "react-qrcode-logo";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent";
import { UPDATE_WITHDRAW_LINK } from "@/utils/graphql/mutation";
import { GET_WITHDRAW_LINK } from "@/utils/graphql/query";
import { LN_INVOCE_PAYMENT_STATUS } from "@/services/galoy";
import {
  LnInvoicePaymentStatusPayload,
  WithdrawLink,
} from "@/utils/generated/graphql";

interface Params {
  params: {
    paymenthash: string;
  };
}

interface QueryResult {
  getWithdrawLink: WithdrawLink;
}

interface LnInvoicePaymentStatusData {
  lnInvoicePaymentStatus: LnInvoicePaymentStatusPayload;
}

interface UpdateWithdrawLinkMutationResult {
  updateWithdrawLink: WithdrawLink;
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
  } = useQuery<QueryResult>(GET_WITHDRAW_LINK, {
    variables: { getWithdrawLinkId: paymenthash },
    context: {
      endpoint: "SELF",
    },
  });

  const withdrawLink = dataWithdrawLink?.getWithdrawLink;
  const paymentRequest = withdrawLink?.payment_request;

  //creating web socket connection for invoice that will be used to take funds from user
  const [updateWithdrawLink, { loading: updatingWithdrawLink }] =
    useMutation<UpdateWithdrawLinkMutationResult>(UPDATE_WITHDRAW_LINK);

  //TODO need to add error checking in this section
  const {
    data: paymentStatusData,
    loading: paymentStatusLoading,
    error: paymentStatusDataError,
  } = useSubscription<LnInvoicePaymentStatusData>(LN_INVOCE_PAYMENT_STATUS, {
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
                updateWithdrawLinkInput: { status: "FUNDED" },
              },
            });
            const updatedWithdrawLink = response.data?.updateWithdrawLink;
            router.push(`/withdraw/${response.data?.updateWithdrawLink.id}`);
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
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <h1 className="font-bold text-3xl">
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
