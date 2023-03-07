import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', {
  state: () => {
    return {
      isMobile: undefined,
      isOpen: undefined,
    }
  },
  actions: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    setIsMobile(bool) {
      this.isMobile = bool
    },
    getIsMobile() {
      return this.isMobile;
    }
  }
})