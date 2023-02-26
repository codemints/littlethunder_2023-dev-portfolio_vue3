import { defineStore } from 'pinia'

export const useControlsStore = defineStore('controls', {
  state: () => {
    return {
      panelOpen: false,
      titleHidden: false,
      titleWrapperHeight: null,
      titleWrapperNode: null
    }
  },
  actions: {
    togglePanelOpen() {
      this.panelOpen = !this.panelOpen
    },
    toggleTitleHidden() {
      this.titleHidden = !this.titleHidden
    }
  }
})