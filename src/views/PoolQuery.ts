import gql from 'graphql-tag';

export default gql`
  query PoolQuery($id: ID!) {
    pool(id: $id) {
      id
      name
      tokens {
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
