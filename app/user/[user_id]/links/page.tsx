"use client";
import React, { useState, useEffect } from "react";
import {
  Status,
  WithdrawLink,
  useGetWithdrawLinksByUserIdQuery,
} from "@/utils/generated/graphql";
import { formatDate } from "@/utils/helpers";
import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";

interface Params {
  params: {
    user_id: string;
  };
}

export default function UserLinks({ params: { user_id } }: Params) {
  console.log("user_id", user_id);
  const [status, setStatus] = useState<Status | null>(null); // Initial status is null

  const [poll, setPoll] = useState(false);

  const { loading, error, data } = useGetWithdrawLinksByUserIdQuery({
    variables: { user_id, status },
    pollInterval: poll ? 5000 : 0,
  });

  useEffect(() => {
    setPoll(true);
    return () => setPoll(false);
  }, []);

  if (loading) {
  }

  if (error) {
  }
  const handleStatusChange = (selectedStatus: Status | "ALL") => {
    if (selectedStatus === "ALL") {
      setStatus(null);
    } else {
      setStatus(selectedStatus);
    }
  };

  const withdrawLinks = data?.getWithdrawLinksByUserId;
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-full max-w-3xl p-8 rounded-lg shadow">
        <div className="mb-4">
          <select
            className="bg-zinc-800 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white"
            value={status ? status.toString() : ""}
            onChange={(e) => handleStatusChange(e.target.value as Status)}
          >
            <option value="ALL">All</option>
            <option value={Status.Funded}>Funded</option>
            <option value={Status.Paid}>Paid</option>
            <option value={Status.Unfunded}>Unfunded</option>
          </select>
        </div>
        {loading ? (
          <LoadingComponent></LoadingComponent>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            {withdrawLinks?.map((withdrawLink: WithdrawLink) => (
              <Link
                href={
                  withdrawLink.status === "UNFUNDED"
                    ? `/fund/${withdrawLink.id}`
                    : withdrawLink.status === "FUNDED"
                    ? `/withdraw/${withdrawLink.id}`
                    : "#"
                }
                onClick={(event) => {
                  if (
                    withdrawLink.status !== "UNFUNDED" &&
                    withdrawLink.status !== "FUNDED"
                  ) {
                    event.preventDefault();
                  }
                }}
                key={withdrawLink.id}
              >
                <div className="flex-col mb-4">
                  <div className="block max-w-7xl p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-zinc-900 dark:border-gray-700 dark:hover:bg-zinc-800">
                    <div className="flex justify-between">
                      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {withdrawLink?.title}
                      </h2>
                      <span
                        className={` inline-flex items-center px-3 py-2 text-xs  text-center  rounded-lg  focus:ring-4            text-gray-600
                    dark:text-gray-400 ${
                      withdrawLink.status === "UNFUNDED"
                        ? "border border-red-800"
                        : withdrawLink.status === "PAID"
                        ? "border border-blue-800"
                        : withdrawLink.status === "FUNDED"
                        ? "border border-green-800"
                        : ""
                    }`}
                      >
                        {withdrawLink.status === "UNFUNDED"
                          ? "Unfunded"
                          : withdrawLink.status === "PAID"
                          ? "Claimed"
                          : withdrawLink.status === "FUNDED"
                          ? "Active"
                          : ""}
                      </span>
                    </div>
                    <p>Withdrawable amount: {withdrawLink.min_withdrawable}</p>
                    <p>Account Type: {withdrawLink.account_type}</p>
                    <p
                      className="
                    text-sm
                    font-medium
                    text-gray-600
                    dark:text-gray-400
                    hover:underline
                    "
                    >
                      Created At: {formatDate(withdrawLink.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
