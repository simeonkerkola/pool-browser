import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import PoolsQuery from './PoolsQuery';

interface PoolsQueryResult {
  pools: { name: string; id: string; totalLiquidity: string }[];
}

export default function usePoolsQuery() {
  const skip = ref(0);
  const { result, loading, fetchMore, error } = useQuery<PoolsQueryResult>(
    PoolsQuery,
    () => ({ first: 5, skip: skip.value }),
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
