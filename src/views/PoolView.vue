<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import { ref } from 'vue';
import PoolQuery from './PoolQuery'

interface PoolsQueryResult {
  pool: {
    id: string
    tokens: { name: string, id: string, }[]
  }
}
const route = useRoute()

const { result } = useQuery<PoolsQueryResult>(PoolQuery, { id: route.params.id })

const tokens = useResult(
  result,
  [],
  data => data.pool.tokens
);
console.log({ tokens })
</script>

<template>
  <div class="about">
    <h1>{{ route.params.name }}</h1>
    <h2>{{ route.params.id }}</h2>
    <ul>
      <li v-for="token in tokens" :key="token.id">
        {{ token.name }}
      </li>
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
