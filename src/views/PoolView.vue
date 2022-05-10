<script setup lang="ts">
import { ethers } from 'ethers';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import PoolQuery from './PoolQuery';
import TokenInfo from '../components/TokenInfo.vue';
import useVault from '../composables/useVault';
import { ref, computed } from 'vue';

interface PoolsQueryResult {
  pool: {
    id: string;
    name: string;
    tokens: {
      symbol: string;
      id: string;
      weight: number | null;
      token: {
        id: string;
      };
    }[];
  };
}
const route = useRoute();
const poolId = route.params.id as string;
const vault = useVault();
const { result, loading } = useQuery<PoolsQueryResult>(PoolQuery, {
  id: poolId,
});
const poolTokenBalances = ref<Record<string, string>>({});
const tokenBalancesLoading = ref<boolean>(true);

const pool = computed(() => result.value?.pool ?? {});
const poolTokens = computed(() => result.value?.pool.tokens ?? []);

vault.getPoolTokens(poolId).then((res) => {
  // Use token address as a key
  const keys = res.tokens.map((token) => token.toUpperCase());
  // Use balance as a value
  const values = res.balances.map((balance) =>
    ethers.utils.formatEther(balance)
  );
  poolTokenBalances.value = Object.fromEntries(
    keys.map((_, i) => [keys[i], values[i]])
  );
  console.log(poolTokenBalances);
  tokenBalancesLoading.value = false;
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2 class="heading">{{ pool.name }}</h2>
    <div class="pool-view-grid">
      <span class="pool-view-label">Token</span>
      <span class="pool-view-label">Weight</span>
      <span class="pool-view-label">Balance</span>
      <template v-for="poolToken in poolTokens" :key="poolToken.id">
        <token-info :loading="tokenBalancesLoading" :symbol="poolToken.symbol" :id="poolToken.token.id"
          :weight="poolToken.weight || '-'" :balance="poolTokenBalances[poolToken.token.id.toUpperCase()]">
        </token-info>
      </template>
    </div>
  </div>
</template>

<style>
.heading {
  margin-bottom: 20px;
}

.pool-view-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
}

.pool-view-label {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}
</style>
