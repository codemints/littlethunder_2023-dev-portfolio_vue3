import { ref, reactive, watch, computed } from 'vue'
import { useDarkModeStore } from '@store/darkmode.js'
import { useMouse } from '@compose/mouse.js'

export const useCursor = () => {
  const { x, y } = useMouse()

  const root = document.documentElement
  const body = document.body

  const cursorData = reactive({
    cursor: undefined,
    mouseX: x.value,
    mouseY: y.value,
  })

  const setCursorData = (config) => {
    for(const [key, val] of Object.entries(config)) {
      cursorData[key] = val
    }
  }

  return {
    cursorData,
  }
}