import { useState } from "react";
import {
  useLnInvoiceCreateOnBehalfOfRecipientMutation,
  useLnUsdInvoiceCreateOnBehalfOfRecipientMutation,
} from "@/utils/generated/graphql";
import { NEXT_PUBLIC_ESCROW_WALLET_BTC, NEXT_PUBLIC_ESCROW_WALLET_USD } from "@/variables";

export const useCreateInvoice = () => {
  const [currency, setCurrency] = useState<string>("BTC");
  const [
    createLnInvoice,
    { loading: lnInvoiceLoading, error: lnInvoiceError, data: lnInvoiceData },
  ] = useLnInvoiceCreateOnBehalfOfRecipientMutation();

  const [
    createLnUsdInvoice,
    {
      loading: lnUsdInvoiceLoading,
      error: lnUsdInvoiceError,
      data: lnUsdInvoiceData,
    },
  ] = useLnUsdInvoiceCreateOnBehalfOfRecipientMutation();

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const handleCreateInvoice = async (amount: number, memo: string) => {
    let result;
    if (currency === "USD") {
      result = await createLnUsdInvoice({
        variables: {
          input: {
            recipientWalletId: `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
            amount: amount,
            memo: memo,
          },
        },
        context: {
          endpoint: "MAINNET",
        },
      });
    } else {
      result = await createLnInvoice({
        variables: {
          input: {
            recipientWalletId: `${NEXT_PUBLIC_ESCROW_WALLET_BTC}`,
            amount: amount,
            memo: memo,
          },
        },
        context: {
          endpoint: "MAINNET",
        },
      });
    }

    return result;
  };

  return {
    currency,
    handleCurrencyChange,
    handleCreateInvoice,
    lnInvoiceLoading,
    lnUsdInvoiceLoading,
    lnInvoiceError,
    lnUsdInvoiceError,
    lnInvoiceData: currency === "USD" ? lnUsdInvoiceData : lnInvoiceData,
  };
};
