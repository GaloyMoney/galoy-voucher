import React, { useEffect } from "react";
import { useCurrencyListQuery } from "@/utils/generated/graphql";
import { useSearchParams } from "next/navigation";

export default function CurrencyDropdown({
  onSelectedDisplayCurrencyChange,
  name,
  style,
  showOnlyFlag = false,
}: {
  onSelectedDisplayCurrencyChange?: (newDisplayCurrency: string) => void;
  name?: string;
  style?: React.CSSProperties;
  showOnlyFlag?: boolean;
}) {
  const searchParams = useSearchParams();
  const display = searchParams?.get("display");

  const { data: currencyData } = useCurrencyListQuery({
    context: {
      endpoint: "MAINNET",
    },
  });
  console.log(display);
  const [selectedDisplayCurrency, setSelectedDisplayCurrency] = React.useState(
    display && typeof display === "string"
      ? display
      : localStorage.getItem("display") ?? "USD"
  );
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  useEffect(() => {
    if (display && typeof display === "string") {
      setSelectedDisplayCurrency(display);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <select
      style={style ?? { border: "none" }}
      name={name ?? "display"}
      placeholder={selectedDisplayCurrency}
      required
      value={selectedDisplayCurrency}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        const currencyId = event.target.value;
        const newDisplayCurrency = currencyData?.currencyList?.find(
          (item) => item.id === currencyId
        );
        if (newDisplayCurrency) {
          setSelectedDisplayCurrency(newDisplayCurrency.id);
        }
        if (onSelectedDisplayCurrencyChange) {
          onSelectedDisplayCurrencyChange(newDisplayCurrency?.id ?? "USD");
        }
        setIsDropDownOpen(false);
      }}
      onFocus={() => {
        setIsDropDownOpen(true);
      }}
      onBlur={() => {
        setIsDropDownOpen(false);
      }}
    >
      {currencyData?.currencyList?.map((option) => {
        const fullLabel = `${option.id} - ${option.name} ${
          option.flag ? option.flag : ""
        }`;
        const flagOnlyLabel = option.flag ? option.flag : option.id;
        const isSelected = selectedDisplayCurrency === option.id;
        return (
          <option key={option.id} value={option.id}>
            {isDropDownOpen && fullLabel}
            {!isDropDownOpen &&
              (isSelected
                ? showOnlyFlag
                  ? flagOnlyLabel
                  : fullLabel
                : fullLabel)}
          </option>
        );
      })}
    </select>
  );
}
