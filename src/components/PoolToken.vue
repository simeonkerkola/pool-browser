<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { roundNumber } from '@/helpers/numbers';
interface Props {
  poolToken: {
    weight: string | null;
    id: string;
    symbol: string;
    token: { id: string };
  };
}

const props = defineProps<Props>();

const weight = computed(() =>
  props.poolToken.weight
    ? `${roundNumber(Number(props.poolToken.weight) * 100)}%`
    : ''
);
</script>

<template>
  <span class="pool-token">
    {{ poolToken.symbol }}
    <span class="weight" v-if="weight">
      {{ weight }}
    </span>
  </span>
</template>

<style scoped>
.pool-token {
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 12px;
  background: var(--color-background-mute);
}

.weight {
  font-size: 0.7rem;
}
</style>
