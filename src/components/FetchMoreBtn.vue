<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', value: MouseEvent): void;
}>();

const props = defineProps({
  loading: { type: Boolean, default: false },
});
</script>

<template>
  <button class="button" @click="(e) => emit('click', e)">
    {{ props.loading ? 'Loading...' : 'Fetch more' }}
  </button>
</template>

<style scoped>
.button {
  background-color: hsla(160, 100%, 37%, 1);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 2px;
  text-transform: uppercase;
  border: none;
  color: var(--vt-c-black-soft);
  cursor: pointer;
}
</style>
