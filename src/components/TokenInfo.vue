<script setup lang="ts">
import { defineProps } from 'vue'
import { roundNumber } from '@/helpers/numbers';

const props = defineProps({
  symbol: { type: String, required: true },
  id: { type: String, required: true },
  balance: { type: String, default: '' },
  weight: { type: Number, required: true }
})

</script>

<template>
  <li>

    <a :href="`https://etherscan.io/address/${props.id}`" rel="noopener noreferrer">
      {{ props.symbol }}
    </a>
    <ul>
      <li>
        id: {{ props.id }}
      </li>
      <li>
        balance: {{ roundNumber(props.balance) }}
      </li>
      <li>
        weight: {{ props.weight }}
      </li>
    </ul>
  </li>
</template>

<style>
</style>
