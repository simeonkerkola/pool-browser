<script setup lang="ts">
import { formatPoolBalance } from "@/helpers/numbers";

const props = defineProps({
  symbol: { type: String, required: true },
  id: { type: String, required: true },
  loading: { type: Boolean, default: false },
  balance: { type: String, default: "" },
  weight: { type: [String, Number], required: true },
});
</script>

<template>
  <a
    :href="`https://etherscan.io/address/${props.id}`"
    rel="noopener noreferrer"
  >
    {{ props.symbol }}
  </a>

  <span class="text-end">{{ props.weight }}</span>
  <div class="text-end">
    <span v-if="loading">loading...</span>
    <span v-else>{{ formatPoolBalance(props.balance) }}</span>
  </div>
</template>
