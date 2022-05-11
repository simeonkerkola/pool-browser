<script setup lang="ts">
import { computed } from 'vue';
import usePoolsQuery from '@/composables/usePoolsQuery/usePoolsQuery';
import FetchMoreBtn from '@/components/FetchMoreBtn.vue';
import PoolCard from '@/components/PoolCard.vue';

const { result, loading, error, fetchMoreResults } = usePoolsQuery();

const pools = computed(() => result.value?.pools ?? []);

async function handleClick() {
  fetchMoreResults();
}
</script>

<template>
  <section class="home-page-wrapper">
    <h2>Pools</h2>
    <span v-if="error">Error fetching pools</span>
    <template v-if="pools.length">
      <div class="pools-grid">
        <pool-card
          v-for="pool in pools"
          :key="pool.id"
          :pool="pool"
        ></pool-card>
      </div>
      <fetch-more-btn
        class="fetch-more-btn"
        :disabled="loading"
        :loading="loading"
        @click="handleClick"
      >
      </fetch-more-btn>
    </template>
    <span v-else>Loading pools...</span>
  </section>
</template>

<style scoped>
.pools-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 768px) {
  .pools-grid {
    grid-template-columns: 1fr;
  }
}

.home-page-wrapper {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.fetch-more-btn {
  margin: 0 auto;
}
</style>
