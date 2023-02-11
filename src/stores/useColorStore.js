import { defineStore } from 'pinia'
import chroma from 'chroma-js'
import { useLightColorScheme } from '../composables/useLightColorScheme'
import { useDarkColorScheme } from '../composables/useDarkColorScheme'
import { useDimColorScheme } from '../composables/useDimColorScheme'
import { usePreferredColorScheme } from '@vueuse/core'




export const useColorStore = () => {
  const colorStore = defineStore('color', {
    state: () => {
      return {
        brand: undefined,
        colorScheme: undefined
      }
    },
    actions: {
      changeColorScheme(preferredColorScheme) {
        if (preferredColorScheme === 'light') {
          this.colorScheme = useLightColorScheme(this.brand)
        } else if (preferredColorScheme === 'dark') {
          this.colorScheme = useDarkColorScheme(this.brand)
        } else {
          this.colorScheme = useDimColorScheme(this.brand)
        }
      },

    },
    getters: {
      getSurface1Contrast() {
        const { text1, text2, info, success, fail, caution, surface1, brand } = this.colorScheme
        return {
          brand: chroma.contrast(brand, surface1),
          text1: chroma.contrast(text1, surface1),
          text2: chroma.contrast(text2, surface1),
          info: chroma.contrast(info, surface1),
          caution: chroma.contrast(caution, surface1),
          success: chroma.contrast(success, surface1),
          fail: chroma.contrast(fail, surface1),
        }
      },
      getSurface2Contrast() {
        const { text1, text2, info, success, fail, caution, surface2, brand } = this.colorScheme
        return {
          brand: chroma.contrast(brand, surface2),
          text1: chroma.contrast(text1, surface2),
          text2: chroma.contrast(text2, surface2),
          info: chroma.contrast(info, surface2),
          caution: chroma.contrast(caution, surface2),
          success: chroma.contrast(success, surface2),
          fail: chroma.contrast(fail, surface2),
        }
      },
      getSurface3Contrast() {
        const { text1, text2, info, success, fail, caution, surface3, brand } = this.colorScheme
        return {
          brand: chroma.contrast(brand, surface3),
          text1: chroma.contrast(text1, surface3),
          text2: chroma.contrast(text2, surface3),
          info: chroma.contrast(info, surface3),
          caution: chroma.contrast(caution, surface3),
          success: chroma.contrast(success, surface3),
          fail: chroma.contrast(fail, surface3),
        }
      },
      getSurface4Contrast() {
        const { text1, text2, info, success, fail, caution, surface4, brand } = this.colorScheme
        return {
          brand: chroma.contrast(brand, surface4),
          text1: chroma.contrast(text1, surface4),
          text2: chroma.contrast(text2, surface4),
          info: chroma.contrast(info, surface4),
          caution: chroma.contrast(caution, surface4),
          success: chroma.contrast(success, surface4),
          fail: chroma.contrast(fail, surface4),
        }
      }
    }
  });

  const store = colorStore();

  if (!store.brand) {
    store.brand = chroma.random().hex();
    store.changeColorScheme(usePreferredColorScheme())
  }

  return store;
}

