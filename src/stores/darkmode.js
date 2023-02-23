import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('toggle',{
  state: () => ({
    isDark: true,
  }),
  actions: {
    toggleDarkMode() {
      this.isDark = !this.isDark
    }

  }
})