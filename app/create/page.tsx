"use client";
import Button from "@/components/Button/Button";
import { useEffect, useState } from "react";
import CreatePageAmount from "@/components/Create/CreatePageAmount/CreatePageAmount";
import CreatePagePercentage from "@/components/Create/CreatePagePercentage/CreatePagePercentage";
import {
  useCreateWithdrawLinkMutation,
  useRealtimePriceInitialQuery,
  useRealtimePriceWsSubscription,
} from "@/utils/generated/graphql";
import useSatsPrice from "@/hooks/useSatsPrice";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";
import PageLoadingComponent from "@/components/Loading/PageLoadingComponet";
import {
  NEXT_PUBLIC_ESCROW_WALLET_BTC,
  NEXT_PUBLIC_ESCROW_WALLET_USD,
} from "@/config/variables";
import { generateRandomHash } from "@/utils/helpers";
import ModalComponent from "@/components/ModalComponent";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/Create/ConifrmModal/ConfirmModal";

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
  const [amountSATS, setAmountSATS] = useState("0");
  const [amountFIAT, setAmountFIAT] = useState("0");
  const [commissionPercentage, setCommissionPercentage] = useState("0");
  const [unit, setUnit] = useState("FIAT");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [accountType, setAccountType] = useState("BTC");
  const { usdToSats, satsToUsd } = useSatsPrice();
  const [fiatAfterCommission, setFiatAfterCommission] = useState(amountFIAT);
  const [satsAfterCommission, setSatsAfterCommission] = useState(amountSATS);
  const [loadingPageChange, setLoadingPageChange] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const router = useRouter();

  const [alert, setAlert] = useState({
    message: "",
    modal: false,
  });

  const [
    createWithdrawLink,
    { loading: withdrawLinkLoading, error: withdrawLinkError },
  ] = useCreateWithdrawLinkMutation();

  const {
    handleCreateInvoice,
    loading: CreateInvoiceLoading,
    error: CreateInvoiceError,
  } = useCreateInvoice({
    recipientWalletCurrency: accountType,
  });

  const {
    data: initialData,
    loading,
    refetch,
  } = useRealtimePriceInitialQuery({
    variables: { currency: currency.id },
    context: {
      endpoint: "MAINNET",
    },
  });

  const { data: wsData, loading: wsLoading } = useRealtimePriceWsSubscription({
    variables: { currency: currency.id },
    context: {
      endpoint: "MAINNET",
    },
  });

  const updateCurrencyConversion = (priceData: any) => {
    if (priceData) {
      const { base, offset } = priceData;
      const priceRef = base / 10 ** offset;
      if (unit === "SATS") {
        const convertedCurrencyAmount =
          currency.fractionDigits === 2
            ? (Number(amountSATS) * priceRef) / 100
            : Number(amountSATS) * priceRef;
        setAmountFIAT(
          (currency.fractionDigits === 0
            ? convertedCurrencyAmount.toFixed()
            : convertedCurrencyAmount.toFixed(currency.fractionDigits)
          ).toString()
        );
      } else {
        const convertedCurrencyAmount =
          currency.fractionDigits === 2
            ? (100 * Number(amountFIAT)) / priceRef
            : Number(amountFIAT) / priceRef;
        setAmountSATS(convertedCurrencyAmount.toFixed().toString());
      }
    }
  };

  useEffect(() => {
    if (initialData?.realtimePrice?.btcSatPrice) {
      updateCurrencyConversion(initialData?.realtimePrice?.btcSatPrice);
    }
  }, [amountSATS, amountFIAT, initialData]);

  useEffect(() => {
    refetch();
  }, [wsData]);

  const handelConfirmModal = () => {
    const cent_sats = (usdToSats(1) / 100).toFixed();
    if (Number(satsAfterCommission) < Number(cent_sats)) {
      setAlert({
        message: "Amount is very small",
        modal: true,
      });
    } else {
      setConfirmModal(true);
    }
  };

  const handelSubmit = async () => {
    setConfirmModal(false);
    try {
      let amount;
      const auto_memo = `Galoy withdraw Link - for ${
        accountType === "BTC" ? "Regular sats" : "Stable sats"
      } ${
        Number(commissionPercentage) === 0
          ? ""
          : `@${Number(commissionPercentage)}% commission"`
      }`;
      if (accountType === "BTC") {
        amount = Number(satsAfterCommission);
      } else {
        amount = (
          Number(satsToUsd(Number(satsAfterCommission)).toFixed(2)) * 100
        ).toFixed();
      }
      console.log("amount", amount);
      const result = await handleCreateInvoice(Number(amount), auto_memo);
      if (result?.error?.length != 0 && result.error) {
        const errorMessage = result?.error
          .map((error) => error.message)
          .join(", ");
        return setAlert({
          message: errorMessage,
          modal: true,
        });
      }

      setLoadingPageChange(true);
      if (result.data) {
        const { paymentRequest, paymentHash, paymentSecret, satoshis } =
          result.data;
        const createWithdrawLinkResult = await createWithdrawLink({
          variables: {
            input: {
              payment_hash: paymentHash,
              user_id: "aaaaaaaa-e098-4a16-932b-e4f4abc24366",
              payment_request: paymentRequest,
              payment_secret: paymentSecret,
              amount: accountType === "BTC" ? satoshis : Number(amount),
              account_type: accountType,
              escrow_wallet:
                accountType === "BTC"
                  ? `${NEXT_PUBLIC_ESCROW_WALLET_BTC}`
                  : `${NEXT_PUBLIC_ESCROW_WALLET_USD}`,
              title: auto_memo,
              min_withdrawable:
                accountType === "BTC" ? satoshis : Number(amount),
              max_withdrawable:
                accountType === "BTC" ? satoshis : Number(amount),
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
      setLoadingPageChange(false);
      setAlert({
        message: String(e),
        modal: true,
      });
    }
  };

  if (CreateInvoiceLoading || withdrawLinkLoading || loadingPageChange) {
    return <PageLoadingComponent />;
  }

  if (currentPage === "AMOUNT") {
    return (
      <div className="create_page_container">
        <CreatePageAmount
          amountSATS={amountSATS}
          amountFIAT={amountFIAT}
          unit={unit}
          currency={currency}
          accountType={accountType}
          loading={loading}
          setAmountSATS={setAmountSATS}
          setAmountFIAT={setAmountFIAT}
          setUnit={setUnit}
          setCurrency={setCurrency}
          setAccountType={setAccountType}
          setCurrentPage={setCurrentPage}
          usdToSats={usdToSats}
        />
      </div>
    );
  } else {
    return (
      <>
        <ModalComponent
          open={alert.modal}
          onClose={() =>
            setAlert({
              message: "",
              modal: false,
            })
          }
        >
          {alert.message}
          <Button
            onClick={() =>
              setAlert({
                message: "",
                modal: false,
              })
            }
          >
            {" "}
            Ok{" "}
          </Button>
        </ModalComponent>
        <ConfirmModal
          open={confirmModal}
          onClose={() => setConfirmModal(false)}
          handleSubmit={handelSubmit}
          fiatAfterCommission={fiatAfterCommission}
          satsAfterCommission={satsAfterCommission}
          currency={currency}
          accountType={accountType}
          commissionPercentage={commissionPercentage}
        />
        <div className="create_page_container">
          <CreatePagePercentage
            commissionPercentage={commissionPercentage}
            setCommissionPercentage={setCommissionPercentage}
            amountFIAT={amountFIAT}
            amountSATS={amountSATS}
            currency={currency}
            usdToSats={usdToSats}
            setCurrentPage={setCurrentPage}
            fiatAfterCommission={fiatAfterCommission}
            satsAfterCommission={satsAfterCommission}
            setFiatAfterCommission={setFiatAfterCommission}
            setSatsAfterCommission={setSatsAfterCommission}
          />
          <Button onClick={handelConfirmModal}>Submit</Button>
        </div>
      </>
    );
  }
}
