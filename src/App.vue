<script setup>
import { ref, onUpdated, nextTick, computed } from "vue"
import chroma from "chroma-js";
import { useColorScheme } from './composables/useColorScheme.js'
import { useColorUtils } from './composables/useColorUtils.js'

import ContrastRatio from './components/ContrastRatio.vue'
import ColorTunning from './components/ColorTunning.vue'

import { useColorStore } from './stores/useColorStore.js'

const colorStore = useColorStore();

const { getStyle, getContrast } = useColorUtils();

const { changeColorScheme, scheme } = useColorScheme(chroma.random())


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function changeSaturation(e) {
  document.querySelector(':root').style.setProperty('--saturation', `${e.target.value}%`)
}

function changeLightness(e) {
  document.querySelector(':root').style.setProperty('--lightness', `${e.target.value}%`)
  document.querySelector(':root').style.setProperty('--lightness-light', `${e.target.value * 0.7}%`)
}

const titles = ref([
  {
    nome: "Brand",
    style: '--brand',
    key: 'brand'
  },
  {
    nome: 'Text 1',
    style: '--text1',
    key: 'text1'
  },
  {
    nome: 'Text 2',
    style: '--text2',
    key: 'text2'
  },
  {
    nome: 'Fail',
    style: '--fail-hex',
    key: 'fail'
  },
  {
    nome: 'Info',
    style: '--info-hex',
    key: 'info'
  },
  {
    nome: 'Success',
    style: '--success-hex',
    key: 'success'
  },
  {
    nome: 'Caution',
    style: '--caution-hex',
    key: 'caution'
  }
]);

const selectedColor = ref(undefined);
const index = ref(0);

const ratio = computed(() => {
  return colorStore.getSurface1Contrast[titles[index].key]
})

</script>

<template>
  <div class="switcher-container">
    <div class="switcher">
      <p class="item" :class="{ active: scheme === 'light' }" @click="changeColorScheme('light')">Light</p>
      <p class="item" :class="{ active: scheme === 'dark' }" @click="changeColorScheme('dark')">Dark</p>
      <p class="item" :class="{ active: scheme === 'dim' }" @click="changeColorScheme('dim')">Dim</p>
    </div>
  </div>
  <div style="display: flex; gap: 8rem; justify-content: center;">

    <div style="display: flex; gap: 4rem;">
      <div>

        <section style="display: flex; height: fit-content;">
          <span
            style="display: flex; align-content: center; justify-content: center; align-items: center; cursor: pointer; padding-right: 2rem;"
            v-show="index != 0" @click="index--" class="material-icons">
            arrow_back_ios
          </span>
          <div>
            <h1 style="margin: 0; text-align: start;">{{ titles[index].nome }}</h1>

            <div class="container">
              <div class="box rad-shadow surface1">
                <ContrastRatio :ratio="colorStore.getSurface1Contrast[titles[index].key]"
                  :color="colorStore.colorScheme[titles[index].key]" />
              </div>
              <div class="box rad-shadow surface2">
                <ContrastRatio :ratio="colorStore.getSurface2Contrast[titles[index].key]"
                  :color="colorStore.colorScheme[titles[index].key]" />
              </div>
              <div class="box rad-shadow surface3">
                <ContrastRatio :ratio="colorStore.getSurface3Contrast[titles[index].key]"
                  :color="colorStore.colorScheme[titles[index].key]" />
              </div>
              <div class="box rad-shadow surface4">
                <ContrastRatio :ratio="colorStore.getSurface4Contrast[titles[index].key]"
                  :color="colorStore.colorScheme[titles[index].key]" />
              </div>
            </div>
          </div>
          <span
            style="display: flex; align-content: center; justify-content: center; align-items: center; cursor: pointer; padding-left: 2rem;"
            v-show="index != titles.length - 1" @click="index++" class="material-icons">
            arrow_forward_ios
          </span>
        </section>
      </div>
      <section class="brand-info">
        <div class="info" v-for="title in titles">
          <div class="circle" :style="`background: ${colorStore.colorScheme[title.key]}`"></div>
          <p>{{ title.nome }}</p>
          <span @click="selectedColor = getStyle(title.style); index = titles.findIndex(elm => elm.nome === title.nome)"
            class="material-icons" style="cursor: pointer;">
            tune
          </span>
        </div>
        <ColorTunning v-if="selectedColor" :hex="selectedColor" />

        <!-- <div class="info">
          <div class="circle text1"></div>
          <p style="color: var(--text1)">Text Color 1</p>
          <span class="material-icons">
            tune
          </span>
        </div>
        <div class="info">
          <div class="circle text2"></div>
          <p style="color: var(--text2)">Text Color 2</p>
          <span class="material-icons">
            tune
          </span>
        </div>
        <div class="info">
          <div class="circle info-accent"></div>
          <p>Info</p>
          <span class="material-icons">
            tune
          </span>
        </div>
        <div class="info">
          <div class="circle fail-accent"></div>
          <p>Fail</p>
          <span class="material-icons">
            tune
          </span>
        </div>
        <div class="info">
          <div class="circle success-accent"></div>
          <p>Success</p>
          <span class="material-icons">
            tune
          </span>
        </div>
        <div class="info">
          <div class="circle caution-accent"></div>
          <p>Caution</p>
          <span class="material-icons">
            tune
          </span>
        </div> -->
        <!-- <p>Saturation</p>
        <input type="range" @input="changeSaturation" name="" id="">

        <p>Lightness</p>
        <input type="range" @input="changeLightness" name="" id=""> -->
      </section>
    </div>
    <!-- <section style="width: 40%; display: flex; gap: 1rem; flex-direction: column;">
      <div class="tabs">
        <p class="tab">CSS</p>
        <p class="tab">Tailwind</p>
      </div>
      <div class="code-container">
        <code style="text-align: start !important; display: block; white-space: pre-wrap">{{
          `
          --brand: ${getStyle('--brand')};
          --text1: ${getStyle('--text1')};
          --text2: ${getStyle('--text2')};
          --surface1: ${getStyle('--surface1')};
          --surface2: ${getStyle('--surface2')};
          --surface3: ${getStyle('--surface3')};
          --surface4: ${getStyle('--surface4')};
          --surface-shadow: ${getStyle('.rad-shadow')}
          `
        }}</code>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;

}

.code-container {
  width: 100%;
  height: 100%;
  background: v-bind(colorStore.colorScheme.surface2);
  border-radius: 20px;

}

.switcher {
  display: flex;
  width: fit-content;
  background: v-bind(colorStore.colorScheme.surface1);
  /* padding: 0 0.3rem; */
  border-radius: 20px;


  /* gap: 0.3rem; */
}

.switcher-container {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.item:hover {
  text-decoration: underline;
  cursor: pointer;
  /* background: var(--surface2); */

}

.item {
  padding: 0.3rem 1rem;
}

.item.active {
  background: v-bind(colorStore.colorScheme.surface4);
  border-radius: 20px;
}

p {
  margin: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;

}

.brand-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.info {
  justify-content: start;
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.info p {
  font-size: xx-large;
}



.brand {
  background: v-bind(colorStore.colorScheme.brand);
}

.text1 {
  background: v-bind(colorStore.colorScheme.text1);
}

.text2 {
  background: v-bind(colorStore.colorScheme.text2);
}

.info-accent {
  /* background: hsl(var(--info-hue) var(--saturation) var(--lightness)); */
  background: v-bind(colorStore.colorScheme.info);

}

.fail-accent {
  /* background: hsl(var(--fail-hue) var(--saturation) var(--lightness)); */
  background: v-bind(colorStore.colorScheme.fail);

}

.caution-accent {
  /* background: hsl(var(--caution-hue) var(--saturation) var(--lightness)); */
  background: v-bind(colorStore.colorScheme.caution);

}

.success-accent {
  /* background: hsl(var(--success-hue) var(--saturation) var(--lightness)); */
  background: v-bind(colorStore.colorScheme.success);
}

.surface1 {
  background: v-bind(colorStore.colorScheme.surface1);
  grid-area: surface1;
}

.surface2 {
  background: v-bind(colorStore.colorScheme.surface2);
  grid-area: surface2;
}

.surface3 {
  background: v-bind(colorStore.colorScheme.surface3);
  grid-area: surface3;
}

.surface4 {
  background: v-bind(colorStore.colorScheme.surface4);
  grid-area: surface4;
}

.rad-shadow {
  box-shadow:
    0 2.8px 2.2px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / calc(v-bind(colorStore.colorScheme.shadowStrength) + .03)),
    0 6.7px 5.3px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / calc(v-bind(colorStore.colorScheme.shadowStrength) + .01)),
    0 12.5px 10px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / calc(v-bind(colorStore.colorScheme.shadowStrength) + .02)),
    0 22.3px 17.9px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / calc(v-bind(colorStore.colorScheme.shadowStrength) + .02)),
    0 41.8px 33.4px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / calc(v-bind(colorStore.colorScheme.shadowStrength) + .03)),
    0 100px 80px hsl(v-bind(colorStore.colorScheme.surfaceShadow) / v-bind(colorStore.colorScheme.shadowStrength));
}

.box {
  height: 15rem;
  width: 15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 20px;
  font-size: xx-large;
}

body {
  background: v-bind(colorStore.colorScheme.surface1);
}

.container {
  display: grid;
  gap: 1rem;
  grid: 'surface1 surface2'
    'surface3 surface4'
}
</style>
