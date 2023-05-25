"use client";
import { useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LN_INVOICE_CREATE } from "@/services/galoy";
import { CREATE_WITHDRAW_LINK } from "@/utils/graphql/mutation";
import { generateRandomHash } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import { LnInvoicePayload, WithdrawLink } from "@/utils/generated/graphql";

interface InvoiceCreateData {
  lnInvoiceCreate: LnInvoicePayload;
}

interface CreateWithdrawLinkResponse {
  createWithdrawLink: WithdrawLink;
}

//TODO need to fix loading in this compoent
export default function HomePage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string>("");

  //creating ln invoice as a escrow account so that user can fund their links
  const [
    createLnInvoice,
    { loading: lnInvoiceLoading, error: lnInvoiceError, data: lnInvoiceData },
  ] = useMutation<InvoiceCreateData>(LN_INVOICE_CREATE);

  //for inserting withdraw link data
  const [
    createWithdrawLink,
    { loading: withdrawLinkLoading, error: withdrawLinkError },
  ] = useMutation<CreateWithdrawLinkResponse>(CREATE_WITHDRAW_LINK);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleCreateInvoice = async () => {
    //TODO need to create Septate component for this section
    if (amount < 20) {
      alert("Amount must be greater than 20 sats");
      return;
    }
    try {
      const result = await createLnInvoice({
        variables: {
          input: {
            walletId: `${process.env.NEXT_PUBLIC_ESCROW_WALLET_BTC}`,
            amount: amount,
            memo: memo,
          },
        },
        context: {
          endpoint: "MAINNET",
        },
      });

      const { paymentRequest, paymentHash, paymentSecret, satoshis } = result
        .data?.lnInvoiceCreate.invoice || {
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
            account_type: "BTC", //this can be BTC or USD
            escrow_wallet: `${process.env.NEXT_PUBLIC_ESCROW_WALLET_BTC}`,
            title: memo || "LNURLw",
            min_withdrawable: satoshis,
            max_withdrawable: satoshis,
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

  if (lnInvoiceLoading || withdrawLinkLoading) {
    return <LoadingComponent />;
  }

  if (lnInvoiceError || withdrawLinkError) {
    //TODO need to create a error component
    return (
      <div>
        Error: {lnInvoiceError?.message} {withdrawLinkError?.message}
      </div>
    );
  }

  //TODO need to create a separate component for this and also for input fields
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount.toString()}
        onChange={handleAmountChange}
        className="border border-stone-700 rounded-md px-4 py-2 bg-neutral-900"
        required
      />
      <input
        type="text"
        placeholder="Enter memo"
        value={memo}
        onChange={handleMemoChange}
        className="border border-stone-700 rounded-md px-4 py-2 mt-2 bg-neutral-900"
      />
      <button
        onClick={handleCreateInvoice}
        className="bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md hover:bg-zinc-900"
      >
        Create LNURLw
      </button>
    </div>
  );
}
