<script setup lang="ts">
import { computed } from 'vue';
import { formatPercentage } from '@/helpers/numbers';

interface Props {
  weight: string | null;
  symbol: string;
}

const props = defineProps<Props>();

const weightPercentage = computed<string>(() =>
  props.weight ? formatPercentage(props.weight) : ''
);
</script>

<template>
  <span class="token-chip">
    {{ symbol }}
    <span class="token-chip-weight" v-if="weightPercentage">
      {{ weightPercentage }}
    </span>
  </span>
</template>

<style scoped>
.token-chip {
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 12px;
  background: var(--color-background-mute);
}

.token-chip-weight {
  font-size: 0.7rem;
}
</style>
