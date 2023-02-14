import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      info: {
        min: 221,
        max: 240
      },
      fail: {
        min: 0,
        max: 15
      },
      caution: {
        min: 51,
        max: 60
      },
      success: {
        min: 81,
        max: 140
      }
    }
  }
})