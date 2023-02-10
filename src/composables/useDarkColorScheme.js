import chroma from "chroma-js";
import { computed } from 'vue';

export const useDarkColorScheme = (brandColor) => {

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const brand = computed(() => {
    const [h, s, l] = chroma(brandColor).hsl();
    return chroma.hsl(h, s / 2, l / 1.5).hex();
  });

  const text1 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.15, 0.85).hex()
  });

  const text2 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.65).hex();
  });

  const surface1 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.1, 0.1).hex()
  })

  const surface2 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.1, 0.15).hex();
  })

  const surface3 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.20).hex();
  })

  const surface4 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.25).hex();
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

  return { brand, text1, text2, surface1, surface2, surface3, surface4, info, success, caution, fail }
}