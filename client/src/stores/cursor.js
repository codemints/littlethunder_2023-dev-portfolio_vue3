import { defineStore } from 'pinia'
import { useButtonsStore } from '@store/buttons.js'
import { useMouse } from '@compose/mouse.js'

export const useCursorStore = defineStore('cursor', {
  state: () => {
    return {
      cursor: null,
      documentBody: null,
      documentRoot: null,
    }
  }
})