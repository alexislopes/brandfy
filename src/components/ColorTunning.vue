<template>
  <div class="color-tunning-container rad-shadow">
    <div @click="isOpen = !isOpen" class="color-tunning-header">
      <p class="color-tunning-header-title">Tune {{ scope }} Color</p>
      <span v-if="!isOpen" class="material-icons">
        keyboard_double_arrow_up
      </span>
      <span v-else class="material-icons">
        keyboard_double_arrow_down
      </span>
    </div>
    <div v-if="isOpen" style="padding: 0 1rem; padding-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; justify-content: space-between; flex-direction: column;">
        <div class="color-box" :style="`background-color: ${hex};`">&nbsp;</div>
        <div
          :style="`border: 1.5px solid ${hex}; border-radius: 4px; padding: 0.4rem; text-align: center; gap: 1rem; display: flex; justify-content: center; margin: 1rem 0;`">
          <span>{{ hex }}</span>
          <span class="material-icons" style="font-size: large; cursor: pointer;">
            content_copy
          </span>

        </div>
      </div>
      <div>
        <label style="display: flex; align-items: center;" for="">
          Hue: {{ hue.toFixed(2) }}
        </label>
        <div style="display: flex; width: 100%;">
          <input style="width: 100%;" type="range" v-model.number="hue" :step="0.01" :min="range.min" :max="range.max"
            name="" id="">
        </div>
      </div>
      <div style="display: flex; flex-direction: column;">
        <label style="display: flex; align-items: center;" for="">
          Saturation: {{ saturation.toFixed(2) }}
        </label>
        <div style="display: flex; width: 100%;">
          <input style="width: 100%;" type="range" min="1" v-model.number="saturation" :step="0.01" name="" id="">
        </div>
      </div>
      <div>
        <label style="display: flex; align-items: center;" for="">
          Lightness: {{ lightness.toFixed(2) }}
        </label>
        <div style="display: flex; width: 100%;">
          <input style="width: 100%;" type="range" min="1" v-model.number="lightness" :step="0.01" name="" id="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import chroma from 'chroma-js';
import { toRefs, computed, ref, watch } from 'vue';
import { useColorStore } from '../stores/useColorStore.js'
import { useSettingsStore } from '../stores/useSettingsStore';

const emit = defineEmits(['change'])

const colorStore = useColorStore();
const settingsStore = useSettingsStore();

const isOpen = ref(false)

const props = defineProps({
  hex: String,
  scope: String
});

const { hex, scope } = toRefs(props);

const range = ref({ min: 0, max: 360 });

const hue = ref(chroma(hex.value).hsl()[0])
const saturation = ref(chroma(hex.value).hsl()[1])
const lightness = ref(chroma(hex.value).hsl()[2])


watch(hex, (value) => {
  const [h, s, l] = chroma(value).hsl();
  hue.value = h
  saturation.value = s
  lightness.value = l
})

// watch(() => colorStore.brand, (value) => {
//   console.log(value)
//   colorStore.changeColorScheme(usePreferredColorScheme())
// })

watch(scope, (value) => {
  console.log(value)
  range.value = settingsStore[value.toLowerCase()] || { min: 0, max: 360 }
})

watch([hue, saturation, lightness], ([hue, saturation, lightness]) => {
  emit('change', chroma.hsl(hue, saturation, lightness).hex())
})

</script>

<style scoped>
.color-box {
  display: block;
  width: 100%;
  height: 100%;
  color: v-bind('colorStore.colorScheme.text1');
  min-width: 20px;
  border-radius: 5px;
}

.color-tunning-container {
  margin-right: 4rem;
  /* padding: 1rem; */

  background: v-bind('colorStore.colorScheme.surface1');
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px 10px 0 0
}

p {
  margin: 0;
  text-align: start;
}

.color-tunning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 400px;
  min-height: 50px;
  padding: 0 1rem;
  cursor: pointer;
}

.color-tunning-header-title {
  font-weight: 700;
  font-size: 19px;
  height: fit-content;
}
</style>