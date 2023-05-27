import { NEXT_PUBLIC_GALOY_URL, NEXT_PUBLIC_LOCAL_URL } from "@/variables";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink1 = new HttpLink({
  uri: `https://${NEXT_PUBLIC_GALOY_URL}/graphql`,
});
const httpLink2 = new HttpLink({
  uri: `${NEXT_PUBLIC_LOCAL_URL}/api/graphql`,
});
const wsLink = new WebSocketLink({
  uri: `wss://${NEXT_PUBLIC_GALOY_URL}/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([
    (operation, forward) => {
      const { endpoint } = operation.getContext();
      if (endpoint === "MAINNET") {
        return httpLink1.request(operation, forward);
      } else {
        return httpLink2.request(operation, forward);
      }
    },
  ])
);

const apolloClient = new ApolloClient({
  link: terminatingLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
