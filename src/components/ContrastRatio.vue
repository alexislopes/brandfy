<template>
  <div class="contrast-ratio">
    <div class="circle" :style="`background: ${color};`"></div>
    <p>{{ ratio.toFixed(2) }}</p>
    <span v-if="ratio >= 4.5" class="material-icons" :style="`color: ${colorStore.colorScheme.success}`">
      check
    </span>
    <span v-else class="material-icons" :style="`color: ${colorStore.colorScheme.fail}`">
      clear
    </span>
  </div>
</template>

<script setup>
import { useColorStore } from '../stores/useColorStore.js'
const colorStore = useColorStore()

const props = defineProps({
  foreground: String,
  background: String,
  color: String,
  ratio: Number
});

</script>

<style scoped>
.contrast-ratio {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 2rem;
  height: 2rem;
}

p {
  margin: 0;
  font-size: x-large;
}
</style>