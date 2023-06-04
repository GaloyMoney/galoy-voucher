"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { generateRandomHash } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import { useCreateWithdrawLinkMutation } from "@/utils/generated/graphql";
import {
  NEXT_PUBLIC_ESCROW_WALLET_BTC,
  NEXT_PUBLIC_ESCROW_WALLET_USD,
} from "@/variables";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";

//TODO need to fix loading in this compoent
export default function HomePage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string>("");
  const {
    currency,
    handleCurrencyChange,
    handleCreateInvoice,
    lnInvoiceLoading,
    lnUsdInvoiceLoading,
    lnInvoiceError,
    lnUsdInvoiceError,
    lnInvoiceData,
  } = useCreateInvoice();

  //for inserting withdraw link data
  const [
    createWithdrawLink,
    { loading: withdrawLinkLoading, error: withdrawLinkError },
  ] = useCreateWithdrawLinkMutation();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleSubmit = async () => {
    //TODO need to create Septate component for this section
    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (amount < 20 && currency === "BTC") {
      alert("Amount must be greater than 20 sats");
      return;
    }
    try {
      const result = await handleCreateInvoice(amount, memo);

      let invoiceData;
      if (currency === "USD") {
        invoiceData = (
          result as {
            data?: { lnUsdInvoiceCreateOnBehalfOfRecipient: { invoice: any } };
          }
        )?.data?.lnUsdInvoiceCreateOnBehalfOfRecipient.invoice;
      } else {
        invoiceData = (
          result as {
            data?: { lnInvoiceCreateOnBehalfOfRecipient: { invoice: any } };
          }
        )?.data?.lnInvoiceCreateOnBehalfOfRecipient.invoice;
      }

      const { paymentRequest, paymentHash, paymentSecret, satoshis } =
        invoiceData || {
          paymentRequest: "",
          paymentHash: "",
          paymentSecret: "",
          satoshis: 0,
        };

      //TODO need to add error checking in section
      const createWithdrawLinkResult = await createWithdrawLink({
        variables: {
          input: {
            user_id: "aaaaaaaa-e098-4a16-932b-e4f4abc24366", //hard-coded currently but this will be changed when login system is created for multiple users
            payment_request: paymentRequest, //ln invoice
            payment_hash: paymentHash,
            payment_secret: paymentSecret,
            amount: satoshis, //this will be used if we charge fees and also if multiple links at once this will store their sum
            account_type: currency, //this can be BTC or USD
            escrow_wallet:
              currency === "BTC"
                ? `${NEXT_PUBLIC_ESCROW_WALLET_BTC}`
                : `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
            title: memo || "LNURLw",
            min_withdrawable:
              currency === "BTC"
                ? satoshis
                : amount,
            max_withdrawable:
              currency === "BTC"
                ? satoshis
                : amount,
            unique_hash: generateRandomHash(),
            k1: generateRandomHash(),
          },
        },
      });

      //TODO need to check for errors in this section before forwarding to next page
      router.push(
        `/fund/${createWithdrawLinkResult.data?.createWithdrawLink.id}`
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  if (lnInvoiceLoading || lnUsdInvoiceLoading || withdrawLinkLoading) {
    return <LoadingComponent />;
  }

  if (lnInvoiceError || lnUsdInvoiceError || withdrawLinkError) {
    //TODO need to create a error component
    return (
      <div>
        Error: {lnInvoiceError?.message} {lnUsdInvoiceError?.message}{" "}
        {withdrawLinkError?.message}
      </div>
    );
  }

  //TODO need to create a separate component for this and also for input fields
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col">
        <div className="flex mt-2 py-2 w-full">
          <button
            onClick={() => handleCurrencyChange("USD")}
            className={`bg-zinc-700 text-white px-4 py-2  rounded-md hover:bg-zinc-900 ${
              currency === "USD" ? "border bg-zinc-900" : ""
            }`}
          >
            USD Wallet (cents)
          </button>
          <button
            onClick={() => handleCurrencyChange("BTC")}
            className={`bg-zinc-700 text-white px-4 py-2 ml-1 rounded-md hover:bg-zinc-900 ${
              currency === "BTC" ? "border bg-zinc-900" : ""
            }`}
          >
            BTC Wallet (sats)
          </button>
        </div>
        <input
          type="number"
          placeholder={`Enter amount`}
          value={amount.toString()}
          onChange={handleAmountChange}
          className="border border-stone-700 rounded-md px-4 py-2 bg-neutral-900 w-full"
          required
        />
        <input
          type="text"
          placeholder="Enter memo"
          value={memo}
          onChange={handleMemoChange}
          className="border border-stone-700 rounded-md px-4 py-2 mt-2 bg-neutral-900 w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md hover:bg-zinc-900 w-full"
        >
          Create LNURLw
        </button>
      </div>
    </div>
  );
}
