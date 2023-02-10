import { computed, onMounted, ref, onUpdated } from 'vue';
import chroma from "chroma-js";
import { usePreferredColorScheme, useStyleTag } from '@vueuse/core'
import { useLightColorScheme } from './useLightColorScheme';
import { useDarkColorScheme } from './useDarkColorScheme';
import { useDimColorScheme } from './useDimColorScheme';

import { useColorStore } from '../stores/useColorStore.js'
import { useColorUtils } from './useColorUtils.js'

const { HSLToHex } = useColorUtils();




export const useColorScheme = (brandColor) => {


  const colorStore = useColorStore();

  const scheme = ref(usePreferredColorScheme().value)

  const changeColorScheme = (s) => {
    scheme.value = s
    document.firstElementChild.setAttribute('color-scheme', s);
    colorStore.changeColorScheme(s)
  }

  const schemes = ref({
    light: useLightColorScheme(brandColor),
    dark: useDarkColorScheme(brandColor),
    dim: useDimColorScheme(brandColor)
  })

  const colorScheme = schemes.value[scheme.value];
  console.log(colorScheme);

  const {
    brand: brandLight,
    text1: text1Light,
    text2: text2Light,
    surface1: surface1Light,
    surface2: surface2Light,
    surface3: surface3Light,
    surface4: surface4Light
  } = useLightColorScheme(brandColor);

  const {
    brand: brandDark,
    text1: text1Dark,
    text2: text2Dark,
    surface1: surface1Dark,
    surface2: surface2Dark,
    surface3: surface3Dark,
    surface4: surface4Dark
  } = useDarkColorScheme(brandColor);

  const {
    brand: brandDim,
    text1: text1Dim,
    text2: text2Dim,
    surface1: surface1Dim,
    surface2: surface2Dim,
    surface3: surface3Dim,
    surface4: surface4Dim
  } = useDimColorScheme(brandColor);

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomPercentage() {
    return Math.floor(Math.random() * (100 - 50 + 1) + 50)
  }

  const infoVar = computed(() => {
    return chroma.hsl('200', '50', '50');
  });

  const { css } = useStyleTag(`
    :root {
      --info-hue: ${randomIntFromInterval(170, 240)}
    }
  `)

  const fail_hue = randomIntFromInterval(0, 15)
  const success_hue = randomIntFromInterval(81, 140)
  const caution_hue = randomIntFromInterval(51, 60)
  const info_hue = randomIntFromInterval(221, 240)
  const saturation = randomPercentage()
  const lightness = randomIntFromInterval(20, 50)


  onUpdated(() => {
    if (scheme.value == 'light') {
      document.querySelector(':root').style.setProperty('--info-hex', HSLToHex(info_hue, saturation, lightness * 0.7));
      document.querySelector(':root').style.setProperty('--success-hex', HSLToHex(success_hue, saturation, lightness * 0.7));
      document.querySelector(':root').style.setProperty('--caution-hex', HSLToHex(caution_hue, saturation, lightness * 0.7));
      document.querySelector(':root').style.setProperty('--fail-hex', HSLToHex(fail_hue, saturation, lightness * 0.7));
    } else {
      document.querySelector(':root').style.setProperty('--info-hex', HSLToHex(info_hue, saturation, lightness));
      document.querySelector(':root').style.setProperty('--success-hex', HSLToHex(success_hue, saturation, lightness));
      document.querySelector(':root').style.setProperty('--caution-hex', HSLToHex(caution_hue, saturation, lightness));
      document.querySelector(':root').style.setProperty('--fail-hex', HSLToHex(fail_hue, saturation, lightness));
    }
  })

  onMounted(() => {


    document.querySelector(':root').style.setProperty('--brand-hue', chroma(brandColor).hsl()[0]);

    document.querySelector(':root').style.setProperty('--brand-light', brandLight.value);
    document.querySelector(':root').style.setProperty('--brand-dark', brandDark.value);
    document.querySelector(':root').style.setProperty('--brand-dim', brandDim.value);

    document.querySelector(':root').style.setProperty('--text1-light', text1Light.value);
    document.querySelector(':root').style.setProperty('--text2-light', text2Light.value);

    document.querySelector(':root').style.setProperty('--text1-dark', text1Dark.value);
    document.querySelector(':root').style.setProperty('--text2-dark', text2Dark.value);

    document.querySelector(':root').style.setProperty('--text1-dim', text1Dim.value);
    document.querySelector(':root').style.setProperty('--text2-dim', text2Dim.value);

    document.querySelector(':root').style.setProperty('--surface1-light', surface1Light.value);
    document.querySelector(':root').style.setProperty('--surface2-light', surface2Light.value);
    document.querySelector(':root').style.setProperty('--surface3-light', surface3Light.value);
    document.querySelector(':root').style.setProperty('--surface4-light', surface4Light.value);
    document.querySelector(':root').style.setProperty('--surface-shadow-light', 'var(--brand-hue) 10% 20%');
    document.querySelector(':root').style.setProperty('--shadow-strength-light', .2);

    document.querySelector(':root').style.setProperty('--surface1-dark', surface1Dark.value);
    document.querySelector(':root').style.setProperty('--surface2-dark', surface2Dark.value);
    document.querySelector(':root').style.setProperty('--surface3-dark', surface3Dark.value);
    document.querySelector(':root').style.setProperty('--surface4-dark', surface4Dark.value);
    document.querySelector(':root').style.setProperty('--surface-shadow-dark', `${chroma(brandDark.value).hsl()[0]} 50% 3%`);
    document.querySelector(':root').style.setProperty('--shadow-strength-dark', .8);

    document.querySelector(':root').style.setProperty('--surface1-dim', surface1Dim.value);
    document.querySelector(':root').style.setProperty('--surface2-dim', surface2Dim.value);
    document.querySelector(':root').style.setProperty('--surface3-dim', surface3Dim.value);
    document.querySelector(':root').style.setProperty('--surface4-dim', surface4Dim.value);
    document.querySelector(':root').style.setProperty('--surface-shadow-dim', `${chroma(brandDim.value).hsl()[0]} 30% 13%`);
    document.querySelector(':root').style.setProperty('--shadow-strength-dim', .2);

    document.querySelector(':root').style.setProperty('--fail-hue', fail_hue);

    document.querySelector(':root').style.setProperty('--success-hue', success_hue);

    document.querySelector(':root').style.setProperty('--caution-hue', caution_hue);

    document.querySelector(':root').style.setProperty('--info-hue', info_hue);

    document.querySelector(':root').style.setProperty('--saturation', `${saturation}%`);

    document.querySelector(':root').style.setProperty('--lightness-status', `${lightness}%`);

    document.querySelector(':root').style.setProperty('--lightness-light', `${lightness * 0.7}%`);

    document.querySelector(':root').style.setProperty('--info-hex', HSLToHex(info_hue, saturation, lightness));
    document.querySelector(':root').style.setProperty('--success-hex', HSLToHex(success_hue, saturation, lightness));
    document.querySelector(':root').style.setProperty('--caution-hex', HSLToHex(caution_hue, saturation, lightness));
    document.querySelector(':root').style.setProperty('--fail-hex', HSLToHex(fail_hue, saturation, lightness));




  })

  return { infoVar, css, changeColorScheme, scheme, colorScheme, schemes }
}