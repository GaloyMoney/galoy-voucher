"use client";
import React, { useState, useEffect } from "react";
import {
  useGetOnChainPaymentFeesQuery,
  useSendPaymentOnChainMutation,
  useGetWithdrawLinkQuery,
} from "@/utils/generated/graphql";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import InfoComponent from "@/components/InfoComponent/InfoComponent";
import LinkDetails from "@/components/LinkDetails/LinkDetails";
import ModalComponent from "@/components/ModalComponent";
import styles from "./OnchainPage.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FundsPaid from "@/components/FundsPaid";

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Params) {
  const [btcWalletAddress, setBtcWalletAddress] = useState("");
  const [fetchingFees, setFetchingFees] = useState(false);
  const [fees, setFees] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({
    message: "",
    open: false,
  });

  const [
    sendPaymentOnChain,
    { loading: sendPaymentOnChainLoading, error: sendPaymentOnChainError },
  ] = useSendPaymentOnChainMutation();

  const {
    loading: loadingWithdrawLink,
    error: errorWithdrawLink,
    data: dataWithdrawLink,
  } = useGetWithdrawLinkQuery({
    variables: { getWithdrawLinkId: id },
    context: {
      endpoint: "SELF",
    },
  });
  const withdrawLink = dataWithdrawLink?.getWithdrawLink;
  const { loading, error, data, refetch } = useGetOnChainPaymentFeesQuery({
    variables: { getOnChainPaymentFeesId: id, btcWalletAddress },
    context: {
      endpoint: "SELF",
    },
    skip: !fetchingFees,
  });

  useEffect(() => {
    if (fetchingFees) {
      refetch();
    }
  }, [fetchingFees]);

  const handleConfirm = async () => {
    try {
      const response = await sendPaymentOnChain({
        variables: {
          sendPaymentOnChainId: id,
          btcWalletAddress,
        },
      });

      if (response.data?.sendPaymentOnChain.status === "SUCCESS") {
        setSuccessModal(true);
      } else if (response.errors) {
        throw new Error(response.errors[0].message);
      }
    } catch (error) {
      setConfirmModal(false);
      if (error instanceof Error) {
        setErrorModal({
          message: error.message,
          open: true,
        });
      } else {
        setErrorModal({
          message: "Internal Error please Try later",
          open: true,
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log("data", data);
      if (data.getOnChainPaymentFees.fees) {
        setFees(data.getOnChainPaymentFees.fees);
        setConfirmModal(true);
      }
    } else if (error) {
      setErrorModal({
        message: error.message,
        open: true,
      });
    }
  }, [data]);

  const handelGetFees = () => {
    if (btcWalletAddress) {
      setFetchingFees(true);
    } else {
      setErrorModal({
        message: "Please enter a valid BTC wallet address",
        open: true,
      });
    }
  };

  if (loadingWithdrawLink) {
    return <LoadingComponent />;
  }
  console.log("sendPaymentOnChainLoading", sendPaymentOnChainLoading);
  return (
    <div className="create_page_container">
      {withdrawLink?.status === "PAID" ? (
        <>
          <FundsPaid></FundsPaid>
        </>
      ) : (
        <>
          <h1 className={styles.heading}>On chain fund withdraw</h1>

          <ModalComponent
            open={successModal}
            onClose={() => setSuccessModal(false)}
          >
            <div className={styles.modal_container_success}>
              <CheckCircleIcon style={{ fontSize: 60, color: "#16ca40" }} />
              <h1 className={styles.modal_heading}>Successfully Paid</h1>

              <Button
                style={{ width: "9em" }}
                onClick={() => setSuccessModal(false)}
              >
                OK
              </Button>
            </div>
          </ModalComponent>

          <ModalComponent
            open={confirmModal}
            onClose={() => setConfirmModal(false)}
          >
            <div className={styles.modal_container}>
              {!sendPaymentOnChainLoading ? (
                <>
                  <h1 className={styles.modal_heading}>Confirm Withdraw</h1>
                  <div>
                    <h2 className={styles.modal_sub_heading}>Fees</h2>
                    <p>{fees} sats</p>
                  </div>
                  <div>
                    <h2 className={styles.modal_sub_heading}>
                      Original amount{" "}
                    </h2>
                    <p>{withdrawLink?.max_withdrawable} sats</p>
                  </div>
                  <div>
                    <h2 className={styles.modal_sub_heading}>
                      Total amount after fees
                    </h2>
                    <p>{Number(withdrawLink?.max_withdrawable) - fees} sats </p>
                  </div>
                  <div className={styles.modal_button_container}>
                    <Button
                      onClick={() => {
                        setConfirmModal(false);
                        setFetchingFees(false);
                      }}
                    >
                      {" "}
                      Cancel{" "}
                    </Button>
                    <Button onClick={handleConfirm}> Confirm </Button>
                  </div>
                </>
              ) : (
                <>
                  <LoadingComponent />
                </>
              )}
            </div>
          </ModalComponent>

          <ModalComponent
            open={errorModal.open}
            onClose={() =>
              setErrorModal({
                message: "",
                open: false,
              })
            }
          >
            <div className={styles.modal_container}>
              <h1 className={styles.modal_heading}>ERROR</h1>
              <h2 className={styles.modal_description}>{errorModal.message}</h2>
              <div className={styles.modal_button_container}>
                <Button
                  style={{
                    width: "10em",
                  }}
                  onClick={() =>
                    setErrorModal({
                      message: "",
                      open: false,
                    })
                  }
                >
                  ok
                </Button>
              </div>
            </div>
          </ModalComponent>

          <LinkDetails withdrawLink={withdrawLink}></LinkDetails>
          <Input
            label="BTC Wallet Address"
            type="text"
            value={btcWalletAddress}
            style={{
              width: "90%",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBtcWalletAddress(e.target.value)
            }
          />
          <Button
            style={{
              width: "90%",
            }}
            onClick={handelGetFees}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Fees"}
          </Button>
          <InfoComponent>
            Please note that on-chain transactions are slower and come with
            transaction fees. If your wallet supports LNURL withdrawal, it is
            recommended to use that option instead
          </InfoComponent>
        </>
      )}
    </div>
  );
}
