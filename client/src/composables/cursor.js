import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue'
import { useDarkModeStore } from '@store/darkmode.js'
import { useMouse } from '@compose/mouse.js'

export const useCursor = () => {
  const root = document.documentElement
  const body = document.body
  const cursorData = reactive({

  })

  const setData = (config) => {
    for(const [key, val] of Object.entries(config)) {
      cursorData[key] = val
    }
  }
}
export const useCursorStore = defineStore('cursor', {
  state: () => {
    return {
      cursors: [],
      body: document.body,
      root: document.documentElement,
    }
  },
  actions: {
    setState(property, value) {
      this[property] = value
    },
  }
})