import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: ' https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Field policy for pools query's pagination
        // https://www.apollographql.com/docs/react/pagination/core-api
        pools: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming, { args: { skip = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
