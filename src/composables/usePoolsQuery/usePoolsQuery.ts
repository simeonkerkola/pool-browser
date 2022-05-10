import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import PoolsQuery from "./PoolsQuery";

interface PoolsQueryResult {
  pools: {
    name: string;
    id: string;
    totalLiquidity: string;
    tokens: {
      weight: string | null;
      id: string;
      symbol: string;
      token: { id: string };
    }[];
  }[];
}

export default function usePoolsQuery() {
  const skip = ref(0);
  const { result, loading, fetchMore, error } = useQuery<PoolsQueryResult>(
    PoolsQuery,
    {
      orderBy: "totalLiquidity",
      orderDirection: "desc",
      first: 6,
      skip: skip.value,
      // Hide boosted pools, they are outside the scope of this app
      where: { poolType_not_in: ["StablePhantom", "AaveLinear"] },
    },
    { notifyOnNetworkStatusChange: true }
  );

  async function fetchMoreResults() {
    const from = result?.value.pools.length ?? 0;
    await fetchMore({
      variables: {
        skip: from,
      },
    });
    skip.value = from;
  }

  return { result, loading, fetchMoreResults, error };
}
