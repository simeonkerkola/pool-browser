<script setup lang="ts">
import { computed } from 'vue';
import usePoolsQuery from '@/composables/usePoolsQuery/usePoolsQuery';
import FetchMoreBtn from '@/components/FetchMoreBtn.vue';
import PoolCard from '@/components/PoolCard.vue';

const { result, loading, error, fetchMoreResults } = usePoolsQuery();

const pools = computed(() => result.value?.pools ?? []);
if (error.value) {
  console.error({ error: error.value });
}

async function handleClick() {
  fetchMoreResults();
}
</script>

<template>
  <section>
    <h2>Pools</h2>
    <div class="pools-grid">
      <pool-card v-for="pool in pools" :key="pool.id" :pool="pool"></pool-card>
    </div>
    <fetch-more-btn :disabled="loading" :loading="loading" @click="handleClick"></fetch-more-btn>
  </section>
</template>

<style scoped>
.pools-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}
</style>
