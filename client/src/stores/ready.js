import { defineStore } from 'pinia'

export const useReadyStore = defineStore('ready', {
  state: () => {
    return {
      isReady: false,
    }
  },
  actions: {
    setIsReady(bool) {
      this.isReady = bool
    },
  }
})