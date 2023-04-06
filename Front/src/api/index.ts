import { ApolloClient, InMemoryCache } from "@apollo/client";

export const django = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_DJANGO,
  cache: new InMemoryCache(),
});

export default new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SPRING,
  cache: new InMemoryCache(),
});
