<template>
  <div class="color-tunning-container rad-shadow">
    <div @click="isOpen = !isOpen" class="color-tunning-header">
      <p class="color-tunning-header-title">Tune Caution Color</p>
      <span v-if="!isOpen" class="material-icons">
        keyboard_double_arrow_up
      </span>
      <span v-else class="material-icons">
        keyboard_double_arrow_down
      </span>
    </div>
    <div v-if="isOpen">
      <p>Tunning x color</p>
      <div style="display: flex; justify-content: space-between;">
        {{ hex }} > {{ newHex }}
        <div class="color-box" :style="`background-color: ${hex};`">&nbsp;</div>
        <div class="color-box" :style="`background-color: ${newHex};`">&nbsp;</div>
      </div>
      <div>
        <label style="display: flex; align-items: center;" for="">
          Hue
          <div style="display: flex;">
            <p>{{ hue }}</p>
            <input type="range" v-model.number="currentHue" min="221" max="240" name="" id="">
          </div>
        </label>
      </div>
      <div style="display: flex; flex-direction: column;">
        <label style="display: flex; align-items: center;" for="">
          Saturation
          <div style="display: flex;">
            <p>{{ saturation }}</p>
            <input type="range" v-model.number="currentSaturation" name="" id="">
          </div>
        </label>
        <label style="display: flex; align-items: center;" for="">
          Lightness
          <div style="display: flex;">
            <p>{{ lightness }}</p>
            <input type="range" v-model.number="currentLightness" name="" id="">
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import chroma from 'chroma-js';
import { toRefs, computed, ref, watch } from 'vue';
import { useColorUtils } from '../composables/useColorUtils'
import { useColorStore } from '../stores/useColorStore.js'

const emit = defineEmits(['change'])

const colorStore = useColorStore()

const isOpen = ref(false)

const { getStyle, HSLToHex } = useColorUtils()

const props = defineProps({
  hex: String,
  range: Array
})


const { hex } = toRefs(props);
const hue = ref(chroma(hex.value).hsl()[0])
const saturation = ref(chroma(hex.value).hsl()[1])
const lightness = ref(chroma(hex.value).hsl()[2])

const currentHue = computed({
  get() {
    return hue.value
  },

  set(value) {
    hue.value = value;
  }
});

const currentSaturation = computed({
  get() {
    return saturation.value
  },

  set(value) {
    saturation.value = value;
  }
});

const currentLightness = computed({
  get() {
    return lightness.value
  },

  set(value) {
    lightness.value = value;
  }
});

const newHex = computed(() => {
  return HSLToHex(hue.value, saturation.value, lightness.value);
})

watch(newHex, (value) => {
  emit('change', value)
})

</script>

<style scoped>
.color-box {
  display: block;
  width: 40%;
  height: 100%;
  color: v-bind(colorStore.colorScheme.text1);
  min-width: 20px;
  border-radius: 5px;
}

.color-tunning-container {
  margin-right: 4rem;
  /* padding: 1rem; */

  background: v-bind(colorStore.colorScheme.surface1);
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