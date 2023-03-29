import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./api";
import "./index.css";
import { ScrollControl } from "./components/common";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ScrollControl>
          <App />
        </ScrollControl>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
