"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { QRCode } from "react-qrcode-logo";
import { encodeURLToLNURL } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import { GET_WITHDRAW_LINK } from "@/utils/graphql/query";
import {
  WithdrawLink,
} from "@/utils/generated/graphql";
interface Params {
  params: {
    id: string;
  };
}

interface QueryResult {
  getWithdrawLink: WithdrawLink | null;
}

// this page shows the LNURLw screen after success in fund transfer to escrow account
export default function Page({ params: { id } }: Params) {
  const { loading, error, data } = useQuery<QueryResult>(GET_WITHDRAW_LINK, {
    variables: { getWithdrawLinkId: id },
    context: {
      endpoint: "SELF",
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    //TODO need to add septate component for error section here
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  //LNURLw URL this will be encoded in LNURL format
  const url = encodeURLToLNURL(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/lnurlw/${data.getWithdrawLink?.unique_hash}`
  );


  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  //TODO need to add this to septate component
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <button className="bg-zinc-700  text-white py-2 px-4 rounded w-80">
        <span>Account Type : </span> {data.getWithdrawLink?.account_type}
      </button>

      <button className="bg-zinc-700  text-white py-2 px-4 rounded w-80">
        <span>Min Withdrawable : </span> {data.getWithdrawLink?.min_withdrawable}{" "}
        sats
      </button>
      <button className="bg-zinc-700  text-white py-2 px-4 rounded w-80">
        <span>Max Withdrawable : </span> {data.getWithdrawLink?.max_withdrawable}{" "}
        sats
      </button>
      <div>
        <QRCode size={300} value={url} />
      </div>
      <button
        onClick={copyToClipboard}
        className="bg-zinc-700 hover:bg-zinc-900 text-white py-2 px-4 rounded w-80"
      >
        Copy URL
      </button>
    </div>
  );
}
