import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { setAuthenticated } from './actions/index';
import store from "./config/configureStore";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors.find((error) => error.message === 'Signature has expired')) {
    store.dispatch(setAuthenticated({authenticated: false}));
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  errorPolicy: 'all'
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
