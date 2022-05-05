<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useQuery, useResult } from '@vue/apollo-composable'
import PoolQuery from './PoolQuery'
import TokenInfo from '../components/TokenInfo.vue'
import useVault from '../composables/useVault'
import { ref } from 'vue'

interface PoolsQueryResult {
  pool: {
    id: string
    name: string
    tokens: { name: string, id: string, weight: number | null }[]
  }
}
const route = useRoute()
const poolId = route.params.id

const { getPoolTokens } = useVault()
const poolTokens = ref({})
getPoolTokens(poolId).then((res: object) => { poolTokens.value = res })

const { result } = useQuery<PoolsQueryResult>(PoolQuery, { id: poolId })
const pool = useResult(
  result,
  {},
  data => data.pool
);
const tokens = useResult(
  result,
  [],
  data => data.pool.tokens
);
console.log({ tokens })
</script>

<template>
  <div class="about">
    <h1>{{ pool.name }}</h1>
    <h2>{{ route.params.id }}</h2>
    <ul>
      <template v-for="token in tokens" :key="token.id">
        <token-info :name="token.name" :id="token.id" :weight="token.weight || 0"></token-info>
      </template>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
