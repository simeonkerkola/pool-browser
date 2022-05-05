<script setup lang="ts">
import { defineProps } from 'vue'


const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  weight: { type: Number, required: true }
})

</script>

<template>
  <li>

    {{ props.name }}
    <ul>
      <li>
        id: {{ props.id }}
      </li>
      <li>
        weight: {{ props.weight }}
      </li>
    </ul>
  </li>
</template>

<style>
</style>
