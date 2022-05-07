<script setup lang="ts">
import { ethers } from 'ethers';
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
    tokens: {
      symbol: string, id: string, weight: number | null
      token: {
        id: string
      }
    }[]
  }
}
const route = useRoute()
const poolId = route.params.id as string

const vault = useVault()
const poolTokenBalances = ref<Record<string, string>>({})
vault.getPoolTokens(poolId).then((res) => {

  // Use token address as a key
  const keys = res.tokens.map((token) => token.toUpperCase())
  // Use balance as a value
  const values = res.balances.map((balance) => ethers.utils.formatEther(balance))
  poolTokenBalances.value = Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]))
})


const { result } = useQuery<PoolsQueryResult>(PoolQuery, { id: poolId })
const pool = useResult(
  result,
  {},
  data => data.pool
);
const poolTokens = useResult(
  result,
  [],
  data => data.pool.tokens
);
</script>

<template>
  <div class="about">
    <h1>{{ pool.name }}</h1>
    <h2>{{ route.params.id }}</h2>
    <ul>
      <template v-for="poolToken in poolTokens" :key="poolToken.id">
        <token-info :symbol="poolToken.symbol" :id="poolToken.token.id" :weight="poolToken.weight || 0"
          :balance="poolTokenBalances[poolToken.token.id.toUpperCase()]">
        </token-info>
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
