import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import reportWebVitals from './reportWebVitals';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: "https://causal-llama-28.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "r73S3OkEMf1RR6D8IJIC2mNqbjNT9RnxuHb6NUx3aPog4T3vNv74hLZLtV8w3ZpL",
  },
});


const wsLink = new WebSocketLink({
  uri: 'ws://causal-llama-28.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "r73S3OkEMf1RR6D8IJIC2mNqbjNT9RnxuHb6NUx3aPog4T3vNv74hLZLtV8w3ZpL",
      },
    },
  },
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();