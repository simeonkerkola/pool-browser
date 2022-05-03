import gql from 'graphql-tag';

export default gql`
  query PoolQuery($id: ID!) {
    pool(id: $id) {
      id
      tokens {
        name
        id
        weight
      }
    }
  }
`;
