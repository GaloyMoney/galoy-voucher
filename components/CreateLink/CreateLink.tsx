"use client";
import {
  useState,
  useReducer,
  ChangeEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  formatOperand,
  generateRandomHash,
  parseDisplayCurrency,
} from "@/utils/helpers";
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
import Numpad from "@/components/Numpad/Numpad";
import reducer, { ACTIONS } from "@/utils/reducers";
import { safeAmount } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import CurrencyInput, { formatValue } from "react-currency-input-field";

function isRunningStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

interface UpdateAmount {
  shouldUpdate: boolean;
  value: string | null;
}
export enum AmountUnit {
  Sat = "SAT",
  Fiat = "FIAT",
}
const defaultCurrencyMetadata: any = {
  id: "USD",
  flag: "🇺🇸",
  name: "US Dollar",
  symbol: "$",
  fractionDigits: 2,
  __typename: "Currency",
};

interface props {
  dispatch: any;
  state: React.ComponentState;
}

export default function CreateLink({ dispatch, state }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams!.get("amount") || null;
  const sats = searchParams!.get("sats") || null;
  const unit = searchParams!.get("unit") || null;
  const memo = searchParams!.get("memo") || null;
  const currency = searchParams!.get("currency") || null;
  const display =
    searchParams!.get("display") ??
    localStorage.getItem("display") ??
    "USD";
  const { currencyToSats, satsToCurrency, hasLoaded } =
    useRealtimePrice(display);
  const { currencyList } = useDisplayCurrency();
  const [valueInFiat, setValueInFiat] = useState(0);
  const [valueInSats, setValueInSats] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(state.currentAmount);
  const [currencyMetadata, setCurrencyMetadata] = useState(
    defaultCurrencyMetadata
  );
  const [numOfChanges, setNumOfChanges] = useState(0);

  const prevUnit = useRef(AmountUnit.Fiat);

  if (!currency) {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    searchParams.set("currency", "BTC");
    const newQueryString = searchParams.toString();
    window.history.pushState(null, "", "?" + newQueryString);
  }

  if (!amount) {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    searchParams.set("amount", "0");
    const newQueryString = searchParams.toString();
    window.history.pushState(null, "", "?" + newQueryString);
  }

  useEffect(() => {
    const initialUnit = unit ?? "FIAT";
    const initialAmount = safeAmount(amount || "0").toString();
    const initialSats = safeAmount(sats || "0").toString();
    const initialDisplay = display ?? localStorage.getItem("display") ?? "USD";

    // const initialQuery = { ...router.query };
    // delete initialQuery?.currency;

    router.push(
      `/create?amount=${initialAmount}&sats=${initialSats}&unit=${initialUnit}&memo=${
        memo ?? ""
      }&display=${initialDisplay}`
    );
  }, []);

  const updateCurrentAmountWithParams = useCallback((): UpdateAmount => {
    if (unit === AmountUnit.Sat) {
      if (sats === currentAmount) {
        return {
          shouldUpdate: false,
          value: null,
        };
      } else if (sats) {
        return {
          shouldUpdate: true,
          value: sats.toString(),
        };
      }
    } else {
      if (Number(amount) === Number(currentAmount)) {
        return { shouldUpdate: false, value: null };
      } else if (amount) {
        return { shouldUpdate: true, value: amount.toString() };
      }
    }
    return { shouldUpdate: false, value: null };
  }, [amount, sats, unit, currentAmount]);

  const toggleCurrency = () => {
    const newUnit = unit === AmountUnit.Sat ? AmountUnit.Fiat : AmountUnit.Sat;
    prevUnit.current = (unit as AmountUnit) || AmountUnit.Fiat;
    router.push(
      `/create?currency=USD&unit=${newUnit}&memo=${memo}&display=${display}&amount=${amount}&sats=${sats}`
    );
  };

  const handleAmountChange = (skipRouterPush?: boolean) => {
    if (!unit || (currentAmount === "" && numOfChanges === 0)) return;
    setNumOfChanges(numOfChanges + 1);

    // 1) format the fiat amount
    const { convertedCurrencyAmount } = satsToCurrency(
      currentAmount,
      display,
      currencyMetadata.fractionDigits
    );
    let amt = unit === AmountUnit.Sat ? convertedCurrencyAmount : currentAmount;
    if (unit === AmountUnit.Sat || currencyMetadata.fractionDigits === 0) {
      const safeAmt = safeAmount(amt);
      amt =
        currencyMetadata.fractionDigits === 0
          ? safeAmt.toFixed()
          : safeAmt.toFixed(currencyMetadata.fractionDigits);
    }
    if (isNaN(Number(amt))) return;
    const formattedValue = formatValue({
      value: amt,
      intlConfig: { locale: navigator.language, currency: display },
    });
    localStorage.setItem("formattedFiatValue", formattedValue);
    setValueInFiat(amt);

    // 2) format the sats amount
    let satsAmt =
      unit === AmountUnit.Sat
        ? currentAmount
        : currencyToSats(
            Number(currentAmount),
            display,
            currencyMetadata.fractionDigits
          ).convertedCurrencyAmount;
    satsAmt = safeAmount(satsAmt).toFixed();
    setValueInSats(satsAmt);

    // 3) update the query params

    if (!skipRouterPush) {
      router.push(
        `/create?amount=${amt}&sats=${satsAmt}&currency=USD&unit=${unit}&memo=${memo}&display=${display}`
      );
    }
  };

  useEffect(handleAmountChange, [currentAmount, hasLoaded.current]);

  useEffect(() => {
    setCurrentAmount(state.currentAmount);
  }, [state.currentAmount]);

  useEffect(() => {
    if (!unit || unit === prevUnit.current) return;
    if (unit === AmountUnit.Fiat) {
      const { convertedCurrencyAmount } = currencyToSats(
        Number(amount),
        display,
        currencyMetadata.fractionDigits
      );
      dispatch({
        type: ACTIONS.SET_AMOUNT,
        payload: convertedCurrencyAmount.toString(),
      });
    }
    if (unit === AmountUnit.Sat) {
      const { convertedCurrencyAmount } = satsToCurrency(
        Number(sats),
        display,
        currencyMetadata.fractionDigits
      );
      dispatch({
        type: ACTIONS.SET_AMOUNT,
        payload: convertedCurrencyAmount?.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  useEffect(() => {
    const latestCurrencyMetadata = currencyList?.find((c) => c.id === display);
    if (latestCurrencyMetadata) {
      setCurrencyMetadata(latestCurrencyMetadata);
    }
  }, [display, currencyList]);

  useEffect(() => {
    if (!unit || !sats || !amount) return;
    const { shouldUpdate, value } = updateCurrentAmountWithParams();
    if (shouldUpdate && value) {
      dispatch({
        type: ACTIONS.SET_AMOUNT,
        payload: value?.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, sats, unit, dispatch]);

  const [
    createWithdrawLink,
    { loading: withdrawLinkLoading, error: withdrawLinkError },
  ] = useCreateWithdrawLinkMutation();

  //TODO need to create a separate component for this and also for input fields
  return (
    <div className="flex flex-col mt-36 items-center h-screen">
      <CurrencyInput
        style={{
          width: "100%",
          border: 0,
          color: "black",
          backgroundColor: "transparent",
          textAlign: "center",
          fontWeight: 600,
        }}
        value={!amount ? 0 : valueInFiat}
        readOnly={true}
        
      />
      <div
      // className={`${
      //   unit === AmountUnit.Sat ? styles.zero_order : styles.first_order
      // }
      //   }`}
      >
        {unit === "FIAT" ? "≈" : ""} {formatOperand(valueInSats.toString())}{" "}
        sats
        {!hasLoaded.current && (
          <span
            style={{
              fontSize: "1rem",
              marginLeft: ".5rem",
              width: "18px",
              height: "18px",
            }}
            // className={styles.spinner}
          >
            loading
          </span>
        )}
      </div>
      <div>
        <div>
          <select>
            {currencyList.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name} - {currency.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={() => toggleCurrency()}>{unit}</button>
      <div className="flex flex-col gap-1">
        <Numpad dispatch={dispatch} />
        <Input type="text" placeholder="Enter memo" value={memo} />
      </div>
    </div>
  );
}
