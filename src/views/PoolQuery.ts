import gql from 'graphql-tag';

export default gql`
  query PoolQuery($id: ID!) {
    pool(id: $id) {
      id
      name
      tokens {
        decimals
        id
        symbol
        weight
        token {
          id
        }
      }
    }
  }
`;
