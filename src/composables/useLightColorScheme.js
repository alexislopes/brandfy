import chroma from "chroma-js";
import { computed } from 'vue';

export const useLightColorScheme = (brandColor) => {

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

  return { brand, text1, text2, surface1, surface2, surface3, surface4 }
}