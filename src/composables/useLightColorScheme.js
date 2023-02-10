import chroma from "chroma-js";
import { computed } from 'vue';

export const useLightColorScheme = (brandColor) => {

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const brand = computed(() => {
    return chroma(brandColor).hex()
  })

  const text1 = computed(() => {
    const [h, s] = chroma(brand.value).hsl()
    return chroma.hsl(h, s, 0.1).hex()
  });

  const text2 = computed(() => {
    const [h] = chroma(brand.value).hsl()
    return chroma.hsl(h, 0.3, 0.3).hex()
  });

  const surface1 = computed(() => {
    const [h] = chroma(brand.value).hsl()
    return chroma.hsl(h, 0.25, 0.9).hex()
  });

  const surface2 = computed(() => {
    const [h] = chroma(brand.value).hsl()
    return chroma.hsl(h, 0.20, 0.99).hex()
  });

  const surface3 = computed(() => {
    const [h] = chroma(brand.value).hsl()
    return chroma.hsl(h, 0.20, 0.92).hex()
  });

  const surface4 = computed(() => {
    const [h] = chroma(brand.value).hsl()
    return chroma.hsl(h, 0.20, 0.85).hex()
  });

  const info = computed(() => {
    const [, s, l] = chroma(brand.value).hsl();
    return chroma.hsl(randomIntFromInterval(221, 240), s, l).hex()
  });

  const fail = computed(() => {
    const [, s, l] = chroma(brand.value).hsl();
    return chroma.hsl(randomIntFromInterval(0, 15), s, l).hex()
  });

  const success = computed(() => {
    const [, s, l] = chroma(brand.value).hsl();
    return chroma.hsl(randomIntFromInterval(81, 140), s, l).hex()
  });
  const caution = computed(() => {
    const [, s, l] = chroma(brand.value).hsl();
    return chroma.hsl(randomIntFromInterval(51, 60), s, l).hex()
  });

  const fail_hue = randomIntFromInterval(0, 15)
  const success_hue = randomIntFromInterval(81, 140)
  const caution_hue = randomIntFromInterval(51, 60)
  const info_hue = randomIntFromInterval(221, 240)

  return { brand, text1, text2, surface1, surface2, surface3, surface4, info, fail, success, caution }
}