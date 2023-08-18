import resolvers from "../../../graphql/resolvers";
import typeDefs from "../../../graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ory } from "@/services/kratos";
const Cors = require("micro-cors");
const cors = Cors();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    return {
      message: err.message,
      locations: err.locations,
      code: err.extensions?.code,
    };
  },
});

export default cors(
  startServerAndCreateNextHandler(server, {
    context: async (req) => {
      try {
        const kratosSessionCookie = req.headers.cookie;
        const response = await ory.toSession({ cookie: kratosSessionCookie });
        return { user: response?.data?.active ? response.data.identity : null };
      } catch {
        return { user: null };
      }
    },
  })
);
