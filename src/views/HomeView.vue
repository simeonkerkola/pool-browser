<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import { ref } from 'vue';
import PoolsQuery from './PoolsQuery'

interface PoolsQueryResult {
  pools: { name: string, id: string, totalLiquidity: string }[]
}

const first = ref(5)
const skip = ref(0)

const { result } = useQuery<PoolsQueryResult>(PoolsQuery, { first, skip })

const pools = useResult(
  result,
  [],
  data => data.pools
);
console.log({ pools })
</script>

<template>
  <div>
    <h3>Pools</h3>
    <div v-for="pool in pools" :key="pool.id">
      <RouterLink :to="{ name: 'pool', params: { id: pool.id, name: pool.name } }"> {{ pool.name }}</RouterLink>
      {{ pool.totalLiquidity }}
    </div>
  </div>
</template>
