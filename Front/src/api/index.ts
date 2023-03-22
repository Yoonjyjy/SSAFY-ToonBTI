import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: import.meta.env.VITE_BASE_URI,
  cache: new InMemoryCache(),
});
