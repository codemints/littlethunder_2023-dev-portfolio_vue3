import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('toggle',{
  state: () => ({
    isDark: true,
  }),
  getters: {
    logoSource: (state) => {
      return state.isDark
    ? './src/assets/img/logo_light-header.png'
    : './src/assets/img/logo_dark-header.png'
    }
  },
  actions: {
    toggleDarkMode() {
      this.isDark = !this.isDark
    }
  }
})