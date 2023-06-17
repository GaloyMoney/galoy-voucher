"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateRandomHash } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import { useCreateWithdrawLinkMutation } from "@/utils/generated/graphql";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import useRealtimePrice from "@/hooks/useRealTimePrice";
import {
  NEXT_PUBLIC_ESCROW_WALLET_BTC,
  NEXT_PUBLIC_ESCROW_WALLET_USD,
} from "@/config/variables";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";

//TODO need to fix loading in this compoent
export default function HomePage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(NaN);
  const [memo, setMemo] = useState<string>("");
  const { currencyList } = useDisplayCurrency();
  const { currencyToSats, satsToCurrency, hasLoaded } = useRealtimePrice("USD");
  const [commissionPercentage, setCommissionPercentage] = useState<number>(NaN);
  const {
    currency,
    handleCurrencyChange,
    handleCreateInvoice,
    lnInvoiceLoading,
    lnUsdInvoiceLoading,
    lnInvoiceError,
    lnUsdInvoiceError,
  } = useCreateInvoice();
  let withdrawAmount = 0;
  const handleCommissionPercentageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const commissionValue = parseInt(e.target.value);

    if (commissionValue > 100) {
      setCommissionPercentage(100);
    } else {
      setCommissionPercentage(commissionValue);
    }
  };

  if (isNaN(commissionPercentage)) {
    withdrawAmount = amount;
  } else {
    withdrawAmount = amount - (amount * commissionPercentage) / 100;
  }

  const { convertedCurrencyAmount: convertedCurrencyAmountSat } =
    satsToCurrency(withdrawAmount, "USD", 2);
  const { convertedCurrencyAmount: convertedCurrencyAmountUSD } =
    currencyToSats(withdrawAmount, "USD", 0);

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
    if (withdrawAmount <= 0 || isNaN(withdrawAmount)) {
      alert("Amount must be greater than 0");
      return;
    }
    if (commissionPercentage < 0 || isNaN(commissionPercentage)) {
      alert("Commission cannot be negative 0");
      return;
    }

    if (currency === "USD" && withdrawAmount < 1) {
      alert("Minimum withdraw amount is 1 cent");
      return;
    }

    if (currency === "BTC" && withdrawAmount < 20) {
      alert("Minimum withdraw amount is 20 sats");
      return;
    }

    try {
      const result = await handleCreateInvoice(withdrawAmount, memo);

      let invoiceData;
      if (currency === "USD") {
        invoiceData = (
          result as {
            data?: {
              lnUsdInvoiceCreateOnBehalfOfRecipient: { invoice: any };
            };
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
            amount: currency === "BTC" ? satoshis : withdrawAmount, //this will be used if we charge fees and also if multiple links at once this will store their sum
            account_type: currency, //this can be BTC or USD
            escrow_wallet:
              currency === "BTC"
                ? `${NEXT_PUBLIC_ESCROW_WALLET_BTC}`
                : `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
            title: memo || "LNURLw",
            min_withdrawable: currency === "BTC" ? satoshis : withdrawAmount,
            max_withdrawable: currency === "BTC" ? satoshis : withdrawAmount,
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
  console.log(currencyList);
  //TODO need to create a separate component for this and also for input fields
  return (
    <div className="flex flex-col mt-36 items-center h-screen">
      <Button className=" px-4 py-6 mt-2 rounded-3xl w-full text-3xl font-bold">
        {currency === "BTC" ? (
          <>$ {isNaN(amount) ? 0 : convertedCurrencyAmountSat.toFixed(2)}</>
        ) : (
          <> {isNaN(amount) ? 0 : convertedCurrencyAmountUSD.toFixed()} sats</>
        )}
      </Button>
      <div className="flex flex-col gap-4">
        <div className="flex mt-2 py-2 w-full">
          <Button
            onClick={() => handleCurrencyChange("USD")}
            className={`  px-4 py-2  rounded-md hover:bg-slate-100 ${
              currency === "USD" ? "border bg-slate-200" : ""
            }`}
          >
            USD Wallet (cents)
          </Button>
          <Button
            onClick={() => handleCurrencyChange("BTC")}
            className={`  px-4 py-2 ml-1 rounded-md hover:bg-slate-100 ${
              currency === "BTC" ? "border bg-slate-200" : ""
            }`}
          >
            BTC Wallet (sats)
          </Button>
        </div>
        <Button className="  px-4 py-2 mt-2 rounded-md w-full">
          {isNaN(withdrawAmount) ? "Total Amount" : withdrawAmount}
        </Button>
        <Input
          type="number"
          label="amount"
          onChange={handleAmountChange}
          required
        />
        <Input type="text" label="memo" onChange={handleMemoChange} />
        <Input
          label="commission %"
          type="number"
          onChange={handleCommissionPercentageChange}
          required
          min={0}
        />

        <Button onClick={handleSubmit}>Create LNURLw</Button>
      </div>
    </div>
  );
}
