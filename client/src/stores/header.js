import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => {
    return {
      isCollapsed: null,
      headerVhMin: 0,
      headerVhMax: 0,
      sectionVh: 0,
      windowVh: 0,
      headerElement: null,
      mobileHeaderElement: null,
      mobileHeaderVh: 0,
    }
  },
})