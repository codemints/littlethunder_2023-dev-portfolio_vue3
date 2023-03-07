import { defineStore } from 'pinia'
import { useHeaderStore } from '@store/header.js'

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
      cursorInner: null,
      cursorOuter: null,
    }
  },
  actions: {
    addButton(HTMLElement, buttonOffset) {
      this.buttons.push({
        button: HTMLElement,
        order: this.buttonCount + 1,
        id: HTMLElement.id
      })
      this.buttonCount++
    },
    updateButton(id, property, value) {
      const button = this.buttons.find(button => button.id === id)
      button[property] = value
    },
    toggleCursors(bool) {
      if ( bool ) {
        this.cursorInner.classList.add('is-hidden')
        this.cursorOuter.classList.add('is-hidden')
      } else {
        this.cursorInner.classList.remove('is-hidden')
        this.cursorOuter.classList.remove('is-hidden')
      }
    }
  }
})