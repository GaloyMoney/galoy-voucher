import React, { createContext, useContext, useEffect, useState } from "react";

import { ory } from "../services/kratos";

type SessionContextType = {
  session: any;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
});

export const useSession = () => useContext(SessionContext);

export const refresh = () => {
  localStorage.removeItem("ory_kratos_session");
  window.location.href = `/auth/login`;
};

export const SessionProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        const now = new Date();
        const expiry = new Date(data.expires_at as string);
        if (expiry && now > expiry) {
          return refresh();
        } else {
          setSession(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("ory_kratos_session");
        setLoading(false);
      });
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
