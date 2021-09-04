import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { Fetch } from './FetchHelper.js'
import Cookies from 'js-cookie';
import { setAuthenticated } from './actions/index';
import store from "./config/configureStore";

// get temp session / csrf token from server
Fetch('temporary_session', 'get')

const httpLink = createHttpLink({
  uri: '/graphql',
});

const csrfLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': Cookies.get('CSRF-Token')
    }
  }
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  console.log(graphQLErrors)
  if (networkError && [401, 422].includes(networkError.statusCode)) {
    store.dispatch(setAuthenticated({authenticated: false, name: ''}));
    Fetch('temporary_session', 'get')
  }
});

const client = new ApolloClient({
  link: from([errorLink, csrfLink, httpLink]),
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
