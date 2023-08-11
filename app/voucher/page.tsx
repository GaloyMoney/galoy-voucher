"use client";
import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import { useGetWithdrawLinkBySecretQuery } from "@/utils/generated/graphql";
import styles from "./VoucherPage.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import ModalComponent from "@/components/ModalComponent";
import LoadingPageComponent from "@/components/Loading/PageLoadingComponent";
interface SecretCode {
  input1: string;
  input2: string;
  input3: string;
}

export default function VoucherPage() {
  const router = useRouter();
  const [secret, setSecret] = useState<string>("");
  const [inputs, setInputs] = useState<SecretCode>({
    input1: "",
    input2: "",
    input3: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { loading, error, data } = useGetWithdrawLinkBySecretQuery({
    variables: { secret_code: secret },
    context: {
      endpoint: "SELF",
    },
    skip: secret.length !== 12,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 4) {
      let parts = value.match(/.{1,4}/g);
      if (parts) {
        setInputs({
          input1: parts[0] || "",
          input2: parts[1] || "",
          input3: parts[2] || "",
        });
      }
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      if (value.length === 4) {
        if (name === "input1") {
          const nextInput = document.querySelector(
            `input[name="input2"]`
          ) as HTMLInputElement;
          nextInput?.focus();
        } else if (name === "input2") {
          const nextInput = document.querySelector(
            `input[name="input3"]`
          ) as HTMLInputElement;
          nextInput?.focus();
        } else if (name === "input3") {
          const nextInput = document.querySelector(
            `input[name="input3"]`
          ) as HTMLInputElement;
          nextInput?.blur();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (e.key === "Backspace" && value === "") {
      if (name === "input2") {
        const prevInput = document.querySelector(
          `input[name="input1"]`
        ) as HTMLInputElement;
        prevInput?.focus();
      } else if (name === "input3") {
        const prevInput = document.querySelector(
          `input[name="input2"]`
        ) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  };

  const handleSubmit = () => {
    setSecret(inputs.input1 + inputs.input2 + inputs.input3);
  };

  useEffect(() => {
    if (data?.getWithdrawLink?.id) {
      router.push(`/withdraw/${data?.getWithdrawLink?.id}`);
    } else if (data?.getWithdrawLink === null || error) {
      setInputs({
        input1: "",
        input2: "",
        input3: "",
      });
      setModalOpen(true);
    }
  }, [data]);

  if (loading) {
    return <LoadingPageComponent />;
  }

  return (
    <div className="top_page_container">
      <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modal_container}>
          <p>Invalid Code</p>
          <Button
            style={{
              width: "8em",
            }}
            onClick={() => setModalOpen(false)}
          >
            Ok
          </Button>
        </div>
      </ModalComponent>

      <Heading>Please Enter the 12 digit Code to Redeem Voucher</Heading>

      <div className={styles.voucher_container}>
        <input
          className={styles.voucher_input}
          name="input1"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputs.input1}
        ></input>
        <input
          className={styles.voucher_input}
          name="input2"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputs.input2}
        ></input>
        <input
          className={styles.voucher_input}
          name="input3"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputs.input3}
        ></input>
      </div>
      <Button
        style={{
          width: "16em",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}
