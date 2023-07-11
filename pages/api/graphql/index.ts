import resolvers from "../../../graphql/resolvers";
import typeDefs from "../../../graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
const Cors = require("micro-cors");
const cors = Cors();
//graphql API provider
//TODO need to add cors
export const  server = new ApolloServer({
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

export default cors(startServerAndCreateNextHandler(server));
