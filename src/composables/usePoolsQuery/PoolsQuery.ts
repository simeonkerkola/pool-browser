import gql from 'graphql-tag';

export default gql`
  query PoolsQuery(
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $first: Int
    $skip: Int
    $where: Pool_filter
  ) {
    pools(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
      where: $where
    ) {
      id
      poolType
      name
      totalLiquidity
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
