<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'click', value: MouseEvent): void
}>()

const props = defineProps({
  loading: { type: Boolean, default: false },

})

</script>

<template>

  <button @click="(e) => emit('click', e)">
    {{ props.loading ? 'Loading...' : 'Fetch more' }}</button>
</template>
