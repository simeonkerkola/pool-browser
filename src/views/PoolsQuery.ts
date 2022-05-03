import gql from 'graphql-tag';

export default gql`
  query PoolsQuery($first: Int, $skip: Int) {
    pools(
      orderBy: totalLiquidity
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      poolType
      name
      totalLiquidity
      tokens {
        name
      }
    }
  }
`;
