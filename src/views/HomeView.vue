<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import { ref } from 'vue';
import PoolsQuery from './PoolsQuery'
import { usd } from '../helpers/numbers'

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
  <section>
    <h2>Pools</h2>
    <article v-for="pool in pools" :key="pool.id">
      <RouterLink :to="{ name: 'pool', params: { id: pool.id } }"> {{ pool.name }}</RouterLink>
      {{ usd(pool.totalLiquidity) }}
    </article>
  </section>
</template>
