<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { usd } from '../helpers/numbers';
import PoolToken from './PoolToken.vue';

interface Props {
  pool: {
    name: string;
    id: string;
    totalLiquidity: string;
    tokens: {
      weight: string | null;
      id: string;
      symbol: string;
      token: { id: string };
    }[];
  };
}

const props = defineProps<Props>();

const pool = computed(() => props.pool);
</script>

<template>
  <article class="card">
    <RouterLink :to="{ name: 'pool', params: { id: pool.id } }">
      <h3 class="pool-name">
        {{ pool.name }}
      </h3>
    </RouterLink>
    <span class="total-liquidity">
      {{ usd(pool.totalLiquidity) }}
    </span>
    <div class="tokens">
      <pool-token v-for="poolToken in pool.tokens" :poolToken="poolToken" :key="poolToken.id">
      </pool-token>
    </div>
    <!-- <img v-for="poolToken in pool.tokens" :key="poolToken.id"
        :src="`https://assets.trustwalletapp.com/blockchains/ethereum/assets/${poolToken.token.id}/logo.png`" alt=""> -->
  </article>
</template>

<style scoped>
.pool-name {
  font-size: 1.1rem;
}

.total-liquidity {}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 2px;
  padding: 20px;
}

.tokens {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
