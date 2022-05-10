<script setup lang="ts">
import { ethers } from "ethers";
import TokenInfo from "../components/TokenInfo.vue";
import useVault from "../composables/useVault";
import { ref } from "vue";

interface Props {
  poolId: string;
  tokens: {
    decimals: number;
    symbol: string;
    id: string;
    weight: number | null;
    token: {
      id: string;
    };
  }[];
}

function getPoolTokenBalance(tokenId: string): string {
  return poolTokenBalances.value[tokenId.toUpperCase()];
}

const props = defineProps<Props>();
const vault = useVault();

const poolTokenBalances = ref<Record<string, string>>({});
const tokenBalancesLoading = ref<boolean>(true);

vault.getPoolTokens(props.poolId).then((res) => {
  const keys = res.tokens.map((token) => token.toUpperCase());
  const values = res.balances.map((balance, i) =>
    ethers.utils.formatUnits(balance, props.tokens[i].decimals)
  );
  poolTokenBalances.value = Object.fromEntries(
    // Use token address as a key
    // Use balance as a value
    keys.map((_, i) => [keys[i], values[i]])
  );
  tokenBalancesLoading.value = false;
});
</script>

<template>
  <div class="pool-view-tokens-grid">
    <span class="pool-view-tokens-label">Token</span>
    <span class="pool-view-tokens-label text-end">Weight</span>
    <span class="pool-view-tokens-label text-end">Balance</span>
    <token-info
      v-for="poolToken in props.tokens"
      :key="poolToken.id"
      :loading="tokenBalancesLoading"
      :symbol="poolToken.symbol"
      :id="poolToken.token.id"
      :weight="poolToken.weight || '-'"
      :balance="getPoolTokenBalance(poolToken.token.id)"
    >
    </token-info>
  </div>
</template>

<style>
.pool-view-tokens-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
}

.pool-view-tokens-label {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}
</style>
