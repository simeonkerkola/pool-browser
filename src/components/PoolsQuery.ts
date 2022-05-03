import gql from 'graphql-tag';

export default gql`
  query PoolsQuery($first: Int, $skip: Int) {
    pools(orderBy: totalLiquidity, first: $first, skip: $skip) {
      id
      poolType
      name
      tokens {
        name
      }
    }
  }
`;
