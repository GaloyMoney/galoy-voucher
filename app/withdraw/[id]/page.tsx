"use client";
import React from "react";
import { encodeURLToLNURL } from "@/utils/helpers";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import { useGetWithdrawLinkQuery } from "@/utils/generated/graphql";
import { NEXT_PUBLIC_LOCAL_URL } from "@/config/variables";
import Link from "next/link";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
interface Params {
  params: {
    id: string;
  };
}

// this page shows the LNURLw screen after success in fund transfer to escrow account
export default function Page({ params: { id } }: Params) {
  const { loading, error, data } = useGetWithdrawLinkQuery({
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
  const lnurl = encodeURLToLNURL(
    `${NEXT_PUBLIC_LOCAL_URL}/api/lnurlw/${data.getWithdrawLink?.unique_hash}`
  );
  const url = `${NEXT_PUBLIC_LOCAL_URL}/withdraw/${id}?lightning=${lnurl}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(lnurl);
  };

  //TODO need to add this to septate component
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <Link href={`${NEXT_PUBLIC_LOCAL_URL}/withdraw/${id}/lnurl`}>
        <Button>
          <span>LNURLw Link</span>{" "}
        </Button>
      </Link>

      <Link href={`${NEXT_PUBLIC_LOCAL_URL}/withdraw/${id}/onchain`}>
        <Button>
          <span>On Chain</span>{" "}
        </Button>
      </Link>
    </div>
  );
}
