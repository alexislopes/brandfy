<template>
  <div class="contrast-ratio">


    <div class="circle" :style="`background: ${color};`"></div>
    <p>{{ ratio }}</p>
    <span v-if="ratio >= 4.5" class="material-icons" style="color: var(--success)">
      check
    </span>
    <span v-else class="material-icons" style="color: var(--fail)">
      clear
    </span>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';


const props = defineProps({
  color: String,
  ratio: Number
});

const { color, ratio } = toRefs(props)

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