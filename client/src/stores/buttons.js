import { defineStore } from 'pinia'
import siteColors from '@lib/site-colors.js'

export const useButtonsStore = defineStore('buttons', {
  state: () => {
    return {
      //{
      //  id: 1,
      //  button: element
      //  borderColor: 
      //}
      buttons: [],
      buttonCount: 0,
    }
  },
  actions: {
    addButton(element, color) {
      this.buttons.push({
        id: `button--${this.buttonCount + 1}`,
        button: element,
        borderColor: siteColors[color],
      })
      this.buttonCount++
    }
  }
})