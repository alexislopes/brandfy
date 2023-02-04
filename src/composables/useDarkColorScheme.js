import chroma from "chroma-js";
import { computed } from 'vue';

export const useDarkColorScheme = (brandColor) => {

  const brand = computed(() => {
    const [h, s, l] = chroma(brandColor).hsl();
    return chroma.hsl(h, s / 2, l / 1.5).hex();
  });

  const text1 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.15, 0.85)
  });

  const text2 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.65);
  });

  const surface1 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.1, 0.1)
  })

  const surface2 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.1, 0.15);
  })

  const surface3 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.20);
  })

  const surface4 = computed(() => {
    const [h] = chroma(brand.value).hsl();
    return chroma.hsl(h, 0.05, 0.25);
  });

  return { brand, text1, text2, surface1, surface2, surface3, surface4 }
}