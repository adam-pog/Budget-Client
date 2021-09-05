import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { setAuthenticated } from './actions/index';
import store from "./config/configureStore";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  console.log(graphQLErrors)
  if (networkError && [401, 422].includes(networkError.statusCode)) {
    store.dispatch(setAuthenticated({authenticated: false}));
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
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
