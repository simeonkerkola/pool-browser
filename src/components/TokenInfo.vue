<script setup lang="ts">
import { defineProps } from 'vue';
import { roundNumber } from '@/helpers/numbers';

const props = defineProps({
  symbol: { type: String, required: true },
  id: { type: String, required: true },
  loading: { type: Boolean, default: false },
  balance: { type: String, default: '' },
  weight: { type: [String, Number], required: true },
});
</script>

<template>
  <a :href="`https://etherscan.io/address/${props.id}`" rel="noopener noreferrer">
    {{ props.symbol }}
  </a>

  <span>{{ props.weight }}</span>
  <span v-if="loading">loading...</span>
  <span v-else>{{ roundNumber(props.balance) }}</span>
</template>

<style>
</style>
