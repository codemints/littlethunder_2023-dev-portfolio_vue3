import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', {
  state: () => {
    return {
      isMobile: false,
      isOpen: false,
    }
  },
  actions: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    setIsMobile(bool) {
      this.isMobile = bool
    }
  }
})