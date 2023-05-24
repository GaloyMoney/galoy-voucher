

import resolvers from "../../../graphql/resolvers";
import typeDefs from "../../../graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
const Cors  = require('micro-cors')
const cors = Cors()
//graphql API provider 
//TODO need to add cors 
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default cors(startServerAndCreateNextHandler(server));