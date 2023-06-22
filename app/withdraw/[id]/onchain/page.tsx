"use client";
import React, { useState, useEffect } from "react";
import {
  useGetOnChainPaymentFeesQuery,
  useSendPaymentOnChainMutation,
  useGetWithdrawLinkQuery,
} from "@/utils/generated/graphql";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Params) {
  const [btcWalletAddress, setBtcWalletAddress] = useState("");
  const [fetchingFees, setFetchingFees] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fees, setFees] = useState(0);
  const [successModal, setSuccessModal] = useState(false);

  const [
    sendPaymentOnChain,
    { loading: sendPaymentOnChainLoading, error: sendPaymentOnChainError },
  ] = useSendPaymentOnChainMutation();

  const {
    loading: loadingWithdrawLink,
    error: errorWithdrawLink,
    data: dataWithdrawLink,
  } = useGetWithdrawLinkQuery({
    variables: { getWithdrawLinkId: id },
    context: {
      endpoint: "SELF",
    },
  });
  const withdrawLink = dataWithdrawLink?.getWithdrawLink;
  const { loading, error, data, refetch } = useGetOnChainPaymentFeesQuery({
    variables: { getOnChainPaymentFeesId: id, btcWalletAddress },
    context: {
      endpoint: "SELF",
    },
    skip: !fetchingFees, // Skip the initial fetch until fetchingFees is set to true
  });

  useEffect(() => {
    if (fetchingFees) {
      refetch();
    }
  }, [fetchingFees]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    const response = await sendPaymentOnChain({
      variables: {
        sendPaymentOnChainId: id,
        btcWalletAddress,
      },
    });

    if (response.data?.sendPaymentOnChain.status === "SUCCESS") {
      setSuccessModal(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtcWalletAddress(e.target.value);
  };

  const handleSubmit = () => {
    setFetchingFees(true);
    handleOpen();
  };

  useEffect(() => {
    if (data) {
      setFees(data.getOnChainPaymentFees.fees);
    }
  }, [data]);

  if (loadingWithdrawLink) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col mt-36 items-center h-screen">
      <div className="flex flex-col gap-6">
        <Input
          type="text"
          value={btcWalletAddress}
          onChange={handleInputChange}
          placeholder="Enter BTC Wallet Address"
          className="border border-stone-700 rounded-md px-4 py-2 bg-neutral-900 w-full"
        />
        <Button
          className="bg-zinc-700 text-white px-4 py-2 border rounded-md bg-zinc-900 hover:bg-zinc-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Fees"}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {loading || sendPaymentOnChainLoading ? (
                <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  please wait..
                </div>
              ) : successModal ? (
                <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <p className="text-green-500">
                    Success! Withdrawal confirmed.
                  </p>
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={sendPaymentOnChainLoading}
                  >
                    Close
                  </Button>
                </div>
              ) : error || sendPaymentOnChainError ? (
                <div>
                  <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {"ERROR"}
                  </div>
                  <Button
                    type="button"
                    onClick={handleClose}
                    disabled={sendPaymentOnChainLoading}
                  >
                    Close
                  </Button>
                </div>
              ) : data ? (
                <div>
                  <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium">
                          Confirm withdraw
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm">
                            {isNaN(withdrawLink?.amount as number) ||
                            (withdrawLink?.amount as number) <= 0
                              ? "CANNOT USE ON CHAIN"
                              : `Confirm the payment with fees: ${fees}`}{" "}
                            {withdrawLink?.account_type === "BTC"
                              ? "sats"
                              : "cents"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      type="button"
                      onClick={handleConfirm}
                      disabled={sendPaymentOnChainLoading}
                    >
                      {sendPaymentOnChainLoading ? "Confirming..." : "Confirm"}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleClose}
                      disabled={sendPaymentOnChainLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {error && <p>Error: {error.message}</p>}
      {sendPaymentOnChainError && (
        <p>Error: {sendPaymentOnChainError.message}</p>
      )}
    </div>
  );
}
