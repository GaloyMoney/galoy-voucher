"use client";
import { SetStateAction, useEffect, useState } from "react";
import { RegistrationFlow, Configuration, FrontendApi } from "@ory/client";
import { useRouter } from "next/navigation";
import { ory } from "@/services/kratos";
import { LogoutLink } from "@/hooks/useLogoutHandler";
import { handleGetFlowError } from "@/utils/KratosErrors";
import { NextRouter } from "next/router";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flow, setFlow] = useState<any>();
  const onLogout = LogoutLink();

  useEffect(() => {
    ory
      .createBrowserLoginFlow()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(
        handleGetFlowError(router as unknown as NextRouter, "login", setFlow)
      );
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const csrfToken = flow?.ui?.nodes.find(
      (node: any) => node.attributes.name === "csrf_token"
    ).attributes.value;
    ory
      .updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          method: "password",
          identifier: username,
          password,
          csrf_token: csrfToken,
        },
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch(() =>
        handleGetFlowError(router as unknown as NextRouter, "login", setFlow)
      );
  };

  return (
    <div className="top_page_container">
      <Heading>Login</Heading>

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
        Login
      </Button>

      <Link href={`/auth/registration`}>
        Done have account yet? register here
      </Link>
    </div>
  );
}
