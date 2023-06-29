"use client";
import Button from "@/components/Button/Button";
import { useEffect, useState } from "react";
import CreatePageAmount from "@/components/Create/CreatePageAmount/CreatePageAmount";
import CreatePagePercentage from "@/components/Create/CreatePagePercentage/CreatePagePercentage";
import {
  useCreateWithdrawLinkMutation,
  useLnUsdInvoiceCreateOnBehalfOfRecipientMutation,
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import useSatsPrice from "@/hooks/useSatsPrice";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";
import PageLoadingComponent from "@/components/Loading/PageLoadingComponent";
import {
  NEXT_PUBLIC_ESCROW_WALLET_BTC,
  NEXT_PUBLIC_ESCROW_WALLET_USD,
} from "@/config/variables";
import { errorArrayToString, generateRandomHash } from "@/utils/helpers";
import ModalComponent from "@/components/ModalComponent";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/Create/ConifrmModal/ConfirmModal";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import Heading from "@/components/Heading";
import useRealtimePrice from "@/hooks/useRealTimePrice";

const DEFAULT_CURRENCY: any = {
  __typename: "Currency",
  id: "USD",
  symbol: "$",
  name: "US Dollar",
  flag: "🇺🇸",
  fractionDigits: 2,
};

export default function CreatePage() {
  const [currentPage, setCurrentPage] = useState("AMOUNT");
  const [amount, setamount] = useState("0");
  const [commissionPercentage, setCommissionPercentage] = useState("0");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const { usdToSats, satsToUsd } = useSatsPrice();
  const [fiatAfterCommission, setFiatAfterCommission] = useState(amount);
  const [loadingPageChange, setLoadingPageChange] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { currencyToCents, hasLoaded } = useRealtimePrice(currency.id);

  const router = useRouter();
  const AmountInDollars = (
    currencyToCents(Number(amount), currency.id, currency.fractionDigits)
      .convertedCurrencyAmount / 100
  ).toFixed(2);

  const commissionAmountInDollars = (
    Number(AmountInDollars) -
    (Number(AmountInDollars) * Number(commissionPercentage)) / 100
  ).toFixed(2);

  const [
    createWithdrawLink,
    { loading: withdrawLinkLoading, error: withdrawLinkError },
  ] = useCreateWithdrawLinkMutation();

  const [
    createLnUsdInvoice,
    { loading: lnUSDInvoiceLoading, error: lnUSDInvoiceError },
  ] = useLnUsdInvoiceCreateOnBehalfOfRecipientMutation();

  if (withdrawLinkLoading || loadingPageChange) {
    return <PageLoadingComponent />;
  }

  const handleSubmit = async () => {
    try {
      const result = await createLnUsdInvoice({
        variables: {
          input: {
            recipientWalletId: `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
            amount: Number(commissionAmountInDollars) * 100,
            memo: "memo",
          },
        },
        context: {
          endpoint: "MAINNET",
        },
      });

      const data = result.data?.lnUsdInvoiceCreateOnBehalfOfRecipient.invoice;
      const error = errorArrayToString(
        result.data?.lnUsdInvoiceCreateOnBehalfOfRecipient.errors
      );
      if (!error && data) {
        const createWithdrawLinkResult = await createWithdrawLink({
          variables: {
            input: {
              payment_hash: data.paymentHash,
              user_id: "aaaaaaaa-e098-4a16-932b-e4f4abc24366",
              payment_request: data.paymentRequest,
              payment_secret: data.paymentSecret,
              amount: Number(commissionAmountInDollars) * 100,
              account_type: "USD",
              escrow_wallet: `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
              title: "Galoy withdraw",
              min_withdrawable: Number(commissionAmountInDollars) * 100,
              max_withdrawable: Number(commissionAmountInDollars) * 100,
              unique_hash: generateRandomHash(),
              k1: generateRandomHash(),
              commission_percentage: Number(commissionPercentage),
            },
          },
        });
        router.push(
          `/fund/${createWithdrawLinkResult.data?.createWithdrawLink.id}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (withdrawLinkLoading || lnUSDInvoiceLoading) {
    return <PageLoadingComponent />;
  }

  if (currentPage === "AMOUNT") {
    return (
      <div className="top_page_container">
        <ConfirmModal
          open={confirmModal}
          onClose={() => setConfirmModal(false)}
          handleSubmit={handleSubmit}
          amount={amount}
          currency={currency}
          commissionPercentage={commissionPercentage}
          commissionAmountInDollars={commissionAmountInDollars}
          exchangeRateFiatUSD={"USD"}
          satsToUsd={satsToUsd}
          usdToSats={usdToSats}
        />

        <CreatePageAmount
          amount={amount}
          currency={currency}
          setamount={setamount}
          setCurrency={setCurrency}
          setCurrentPage={setCurrentPage}
          usdToSats={usdToSats}
          setConfirmModal={setConfirmModal}
          commissionPercentage={commissionPercentage}
          AmountInDollars={AmountInDollars}
          commissionAmountInDollars={commissionAmountInDollars}
          hasLoaded={hasLoaded}
        />
      </div>
    );
  } else {
    return (
      <>
        <div className="top_page_container">
          <CreatePagePercentage
            commissionPercentage={commissionPercentage}
            setCommissionPercentage={setCommissionPercentage}
            amount={amount}
            currency={currency}
            usdToSats={usdToSats}
            setCurrentPage={setCurrentPage}
            fiatAfterCommission={fiatAfterCommission}
            setFiatAfterCommission={setFiatAfterCommission}
          />

          <InfoComponent>
            Please enter the commission percentage that will be deducted from
            the original Link amount. The maximum commission is 99 percent.
          </InfoComponent>
        </div>
      </>
    );
  }
}
