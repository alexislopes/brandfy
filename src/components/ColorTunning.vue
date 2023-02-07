<template>
  <div class="color-tunning-container rad-shadow">
    <p>Tunning x color</p>
    <div style="display: flex; justify-content: space-between;">
      {{ hex }}
      <div class="color-box" :style="`background-color: ${hex};`">&nbsp;</div>
    </div>
    <div>
      <label style="display: flex; align-items: center;" for="">Hue Range<input type="range" v-model="currentHue"
          min="221" max="240" name="" id=""></label>
      <p>current hue {{ currentHue }}</p>
    </div>
    <div style="display: flex; flex-direction: column;">
      <label style="display: flex; align-items: center;" for="">Saturation<input type="range" name="" id=""></label>
      <label style="display: flex; align-items: center;" for="">Lightness<input type="range" name="" id=""></label>
    </div>
  </div>
</template>

<script setup>
import chroma from 'chroma-js';
import { toRefs, computed, ref } from 'vue';
import { useColorUtils } from '../composables/useColorUtils'


const { getStyle, HSLToHex } = useColorUtils()

const props = defineProps({
  hex: String,
  range: Array
})


const { hex } = toRefs(props);
const hue = ref(chroma(hex.value).hsl()[0])

const currentHue = computed({
  get() {
    return hue.value
  },

  set(value) {
    console.log(getStyle('--info-hue'), getStyle('--saturation'), getStyle('--lightness'))
    const new_HEX = HSLToHex(value, Number(getStyle('--saturation').split('%')[0]), Number(getStyle('--lightness').split('%')[0]));
    console.log(new_HEX)
    document.querySelector(':root').style.setProperty('--info-hex', new_HEX);
    hue.value = value;
    hex.value = new_HEX
  }
})

</script>

<style scoped>
.color-box {
  display: block;
  width: 40%;
  height: 100%;
  color: var(--text1);
  min-width: 20px;
  border-radius: 5px;
}

.color-tunning-container {
  padding: 1rem;
  background: var(--surface1);
}

p {
  margin: 0;
  text-align: start;
}
</style>