import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import * as serviceWorker from "./serviceWorker";
import "./index.css";
import App from "./App";

const RICK_GRAPHQL = "https://rickandmortyapi.com/graphql";

const httpLink = new HttpLink({
  uri: RICK_GRAPHQL
});

const link = ApolloLink.from([httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
