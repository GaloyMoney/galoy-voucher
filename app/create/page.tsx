"use client";
import { useReducer } from "react";
import CurrencyDropdown from "@/components/CurrencyDropDown";
import reducer, { ACTIONS } from "@/utils/reducers";

import CreateLink from "@/components/CreateLink/CreateLink";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";

export default function HomePage() {
  const searchParams = useSearchParams()
  const [state, dispatch] = useReducer(reducer, {
    currentAmount: "",
  });
  const { queryParams, setQueryParams } = useQueryParams();
  const display = searchParams!.get("display")


  return (
    <>
      <CurrencyDropdown
        style={{
          border: "none",
          outline: "none",
          height: "42px",
          fontSize: "18px",
          backgroundColor: "white",
          textAlign: "center",
          verticalAlign: "middle",
        }}
        showOnlyFlag={true}
        onSelectedDisplayCurrencyChange={(newDisplayCurrency) => {
          localStorage.setItem("display", newDisplayCurrency);
          setQueryParams({
            display: newDisplayCurrency,
          });
          setTimeout(() => {
            console.log("newDisplayCurrency", newDisplayCurrency);


            window.location.reload();
          }, 500);
        }}
      />
      <CreateLink state={state} dispatch={dispatch}></CreateLink>
    </>
  );
}
