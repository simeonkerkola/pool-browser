import gql from 'graphql-tag';

export default gql`
  query PoolQuery($id: ID!) {
    pool(id: $id) {
      id
      name
      tokens {
        token {
          id
        }
        symbol
        id
        weight
      }
    }
  }
`;
