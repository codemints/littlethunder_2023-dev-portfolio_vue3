import { defineStore } from 'pinia'
import { useButtonsStore } from '@store/buttons.js'
import { useDarkModeStore } from '@store/darkmode.js'
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