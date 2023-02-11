import chroma from "chroma-js";
import { ref } from 'vue';

export const useDarkColorScheme = (brandColor) => {

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [hue, saturation, lightness] = chroma(brandColor).hsl();

  const brand = ref(chroma.hsl(hue, saturation / 2, lightness / 1.5).hex());
  const text1 = ref(chroma.hsl(hue, 0.15, 0.85).hex());
  const text2 = ref(chroma.hsl(hue, 0.05, 0.65).hex());
  const surface1 = ref(chroma.hsl(hue, 0.1, 0.1).hex());
  const surface2 = ref(chroma.hsl(hue, 0.1, 0.15).hex());
  const surface3 = ref(chroma.hsl(hue, 0.05, 0.20).hex());
  const surface4 = ref(chroma.hsl(hue, 0.05, 0.25).hex());
  const info = ref(chroma.hsl(randomIntFromInterval(221, 240), saturation, lightness).hex());
  const fail = ref(chroma.hsl(randomIntFromInterval(0, 15), saturation, lightness).hex());
  const success = ref(chroma.hsl(randomIntFromInterval(81, 140), saturation, lightness).hex());
  const caution = ref(chroma.hsl(randomIntFromInterval(51, 60), saturation, lightness).hex());
  const shadowStrength = ref(0.8)
  const surfaceShadow = ref(`${hue} 50% 3%`)

  return {
    brand,
    text1,
    text2,
    surface1,
    surface2,
    surface3,
    surface4,
    info,
    success,
    caution,
    fail,
    hue,
    saturation,
    lightness,
    shadowStrength,
    surfaceShadow
  }
}