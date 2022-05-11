<script setup lang="ts">
import { computed } from 'vue';
import { formatPercentage, formatPoolBalance } from '@/helpers/numbers';

interface Props {
  symbol: string;
  id: string;
  loading?: boolean;
  balance?: string;
  weight?: string | number;
}

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
// eslint-disable-next-line vue/no-setup-props-destructure -- [@vue/reactivity-transform] Reactivity transform is an experimental feature
const { weight = null, id, symbol, balance = '' } = defineProps<Props>();

const formattedWeight = computed(() =>
  weight ? formatPercentage(weight) : '-'
);
</script>

<template>
  <a :href="`https://etherscan.io/address/${id}`" rel="noopener noreferrer">
    {{ symbol }}
  </a>

  <span class="text-end">{{ formattedWeight }}</span>
  <div class="text-end">
    <span v-if="loading">loading...</span>
    <span v-else>{{ formatPoolBalance(balance) }}</span>
  </div>
</template>
