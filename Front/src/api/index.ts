import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SPRING,
  cache: new InMemoryCache(),
});
