import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink1 = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_GALOY_URL}/graphql`,
});
const httpLink2 = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/graphql`,
});
const wsLink = new WebSocketLink({
  uri: `wss://${process.env.NEXT_PUBLIC_GALOY_URL}/graphql`,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = `${process.env.NEXT_PUBLIC_TOKEN}`;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLinkAuth1 = authLink.concat(httpLink1);
const httpLinkAuth2 = authLink.concat(httpLink2);

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
        return httpLinkAuth1.request(operation, forward);
      } else {
        return httpLinkAuth2.request(operation, forward);
      }
    },
  ])
);

const apolloClient = new ApolloClient({
  link: terminatingLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
