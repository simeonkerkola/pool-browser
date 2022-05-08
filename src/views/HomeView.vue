<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue';
import { usd } from '../helpers/numbers'
import usePoolsQuery from '@/composables/usePoolsQuery/usePoolsQuery'
import FetchMoreBtn from '@/components/FetchMoreBtn.vue';

const { result, loading, error, fetchMoreResults } = usePoolsQuery()

const pools = computed(() => result.value?.pools ?? [])
if (error.value) {
  console.error({ error: error.value })
}

async function handleClick() {
  fetchMoreResults()
}

</script>

<template>
  <section>
    <h2>Pools</h2>
    <article v-for="pool in pools" :key="pool.id">
      <RouterLink :to="{ name: 'pool', params: { id: pool.id } }"> {{ pool.name }}</RouterLink>
      {{ usd(pool.totalLiquidity) }}
    </article>
    <fetch-more-btn :disabled="loading" :loading="loading" @click="handleClick"></fetch-more-btn>
  </section>
</template>
