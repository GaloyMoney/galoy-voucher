import { CodegenConfig } from "@graphql-codegen/cli";
// code generator file for typescript types
const config: CodegenConfig = {
  schema: [
    "http://localhost:3000/api/graphql",
    "https://api.mainnet.galoy.io/graphql",
  ],

  ignoreNoDocuments: true,
  generates: {
    "./utils/generated/": {
      preset: "client-preset",
      plugins: [],
    },
  },
};

export default config;
