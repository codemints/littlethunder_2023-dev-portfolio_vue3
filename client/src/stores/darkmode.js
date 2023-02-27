import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkModeStore = defineStore('toggle',{
  state: () => ({
    isDark: null,
  }),
  getters: {
    logoSource: (state) => {
      return state.isDark
    ? './src/assets/img/logo_light-header.png'
    : './src/assets/img/logo_dark-header.png'
    },
    profileSource: (state) => {
      return state.isDark
      ? './src/assets/img/dlittlethunder_portrait-illustration_v2-01.png'
      : './src/assets/img/dlittlethunder_portrait-illustration_v2-02.png'
    },
  },
  actions: {
    toggleDarkMode() {
      this.isDark = !this.isDark
    }
  }
})