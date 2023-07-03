"use client";
import React, { useState, useEffect } from "react";
import {
  Status,
  WithdrawLink,
  useGetWithdrawLinksByUserIdQuery,
} from "@/utils/generated/graphql";

import LoadingComponent from "@/components/Loading/LoadingComponent";
import UserLinksComponent from "@/components/UserLinks/UserLinks";
import styles from "./UserLinkPage.module.css"
interface Params {
  params: {
    user_id: string;
  };
}

export default function UserLinks({ params: { user_id } }: Params) {
  const [status, setStatus] = useState<Status | null>(null); // Initial status is null
  const [poll, setPoll] = useState<boolean>(false);

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
    <div className="top_page_container_user_links">
      <div
        style={{
          width: "95%",
        }}
      >
        <div className="mb-4">
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white"
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
          <div className={styles.LinksContainer}>
            {withdrawLinks?.map((withdrawLink: WithdrawLink) => (
              <UserLinksComponent
                key={withdrawLink.id}
                withdrawLink={withdrawLink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
