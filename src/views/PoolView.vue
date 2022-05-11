<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import PoolQuery from './PoolQuery';
import { computed } from 'vue';
import PoolViewTokens from '../components/PoolViewTokens.vue';

interface PoolQueryResult {
  pool: {
    id: string;
    name: string;
    tokens: {
      decimals: number;
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
const poolId: string = route.params.id as string;

const { result, loading } = useQuery<PoolQueryResult>(PoolQuery, {
  id: poolId,
});

const pool = computed(() => result.value?.pool ?? null);
const poolTokens = computed(() => result.value?.pool.tokens ?? []);
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!pool">Failed to load Pool data</div>
  <div v-else>
    <h2 class="heading">{{ pool.name }}</h2>
    <pool-view-tokens :pool-id="poolId" :tokens="poolTokens"></pool-view-tokens>
  </div>
</template>

<style>
.heading {
  margin-bottom: 20px;
}
</style>
