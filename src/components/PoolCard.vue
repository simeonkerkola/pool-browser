<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { formatUsd } from "../helpers/numbers";
import PoolToken from "./PoolToken.vue";

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
    <h3 class="pool-name">
      <RouterLink :to="{ name: 'pool', params: { id: pool.id } }">
        {{ pool.name }}
      </RouterLink>
    </h3>
    <span>
      {{ formatUsd(pool.totalLiquidity) }}
    </span>
    <div class="tokens">
      <pool-token
        v-for="poolToken in pool.tokens"
        :poolToken="poolToken"
        :key="poolToken.id"
      >
      </pool-token>
    </div>
  </article>
</template>

<style scoped>
.pool-name {
  font-size: 1.1rem;
}

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
