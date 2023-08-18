"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ory } from "@/services/kratos";
import { handleGetFlowError } from "@/utils/KratosErrors";
import { NextRouter } from "next/router";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import ModalComponent from "@/components/ModalComponent";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ state: false, message: "" });
  const [flow, setFlow] = useState<any>();

  useEffect(() => {
    ory
      .createBrowserRegistrationFlow()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleGetFlowError(
          router as unknown as NextRouter,
          "registration",
          setFlow
        )
      );
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ory
      .updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
          method: "password",
          traits: {
            username,
          },
          password,
          csrf_token: flow?.ui?.nodes.find(
            (node: any) => node.attributes.name === "csrf_token"
          ).attributes.value,
        },
      })
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setModal({ state: true, message: "username already exist" });
        }
        handleGetFlowError(router as unknown as NextRouter, "login", setFlow);
      });
  };

  return (
    <div className="top_page_container">
      <ModalComponent
        open={modal.state}
        onClose={() => setModal({ state: false, message: "" })}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h1>{modal.message}</h1>
          <Button onClick={() => setModal({ state: false, message: "" })}>
            ok
          </Button>
        </div>
      </ModalComponent>
      <Heading>Register</Heading>
      <Input
        label="Username"
        type="text"
        value={username}
        style={{
          width: "90%",
        }}
        onChange={(event: { target: { value: SetStateAction<string> } }) =>
          setUsername(event.target.value)
        }
      />
      <Input
        label="Password"
        type="password"
        value={password}
        style={{
          width: "90%",
        }}
        onChange={(event: { target: { value: SetStateAction<string> } }) =>
          setPassword(event.target.value)
        }
      />
      <Button
        style={{
          width: "90%",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}
