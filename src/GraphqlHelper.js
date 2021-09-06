import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import Cookies from 'js-cookie';

const client = new ApolloClient({
  uri: '/graphql',
  headers: {},
  cache: new InMemoryCache()
});


// client
//   .query({
//     query: gql`
//       query GetCurrentUser {
//         currentUser {
//           id
//           budgetCategories {
//             id
//             label
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
