import { ory } from "@/services/kratos";
import { GenericError } from "@ory/client/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface KratosErrorResponse {
  error: GenericError;
}

export function LogoutLink(): () => void {
  const [logoutToken, setLogoutToken] = useState<string | null>(null);
  const [loginRedirect, setLoginRedirect] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    ory
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        setLogoutToken(data.logout_token);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 401:
            setLoginRedirect(true);
            return;
        }
      })
  }, []);

  return (): void => {
    if (logoutToken) {
      ory
        .updateLogoutFlow({ token: logoutToken })
        .then(() => {
          window.location.href = '/';
        })
        .catch(console.error);
    } else if (loginRedirect) {
      window.location.href = "/";
    }
  };
}