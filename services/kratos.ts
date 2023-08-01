import { Configuration, FrontendApi } from "@ory/client";

export const ory = new FrontendApi(
  new Configuration({
    basePath: "http://127.0.0.1:4433",
    baseOptions: {
      withCredentials: true,
    },
  })
);
