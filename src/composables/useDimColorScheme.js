import chroma from "chroma-js";
import { computed } from 'vue';

export const useDimColorScheme = (brandColor) => {

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const brand = computed(() => {
    const [h, s, l] = chroma(brandColor).hsl();
    return chroma.hsl(h, s / 1.25, l / 1.25).hex()
  });

  const text1 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.15, 0.75).hex()
  });

  const text2 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.10, 0.61).hex()
  });


  const surface1 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.1, 0.1).hex()
  });

  const surface2 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.1, 0.15).hex()
  });

  const surface3 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.05, 0.20).hex()
  });

  const surface4 = computed(() => {
    const [h] = chroma(brandColor).hsl();
    return chroma.hsl(h, 0.05, 0.25).hex()
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

  const hue = computed(() => {
    return chroma(brandColor).hsl()[0]
  })

  const shadowStrength = computed(() => {
    return 0.2
  })

  const surfaceShadow = computed(() => {
    return `${hue.value} 30% 13%`
  })

  return { brand, text1, text2, surface1, surface2, surface3, surface4, info, success, fail, caution, hue, shadowStrength, surfaceShadow }
}