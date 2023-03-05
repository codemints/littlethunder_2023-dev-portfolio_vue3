import { ref, reactive, watch, computed } from 'vue'
import { useDarkModeStore } from '@store/darkmode.js'
import { useMouse } from '@compose/mouse.js'

export const useCursor = () => {
  const { x, y } = useMouse()

  const root = document.documentElement
  const body = document.body

  const cursorData = reactive({
    liveCursor: undefined,
    deadCursor: undefined,
    offset: body.offsetLeft,
    drag: null,
    mouseX: x.value,
    mouseY: y.value,
    cursorX: undefined,
    cursorY: undefined,
    dx: undefined,
    dy: undefined,
    animationFrame: null,
  })

  const animateCursor = () => {
    cursorData.animationFrame = requestAnimationFrame(animateCursor)
    
    if ( !cursorData.cursorX || !cursorData.cursorY ) {
      cursorData.cursorX = cursorData.mouseX
      cursorData.cursorY = cursorData.mouseY
    } else {
      cursorData.dx = (cursorData.mouseX - cursorData.cursorX) * cursorData.drag
      cursorData.dy = (cursorData.mouseY - cursorData.cursorY) * cursorData.drag

      if ( Math.abs(cursorData.dx) + Math.abs(cursorData.dy) < 0.1 ) {
        cursorData.cursorX = cursorData.mouseX
        cursorData.cursorY = cursorData.mouseY
      } else {
        cursorData.cursorX += cursorData.dx
        cursorData.cursorY += cursorData.dy
      }
    }
    setProperties(cursorData.liveCursor, {
      '--posX': `${cursorData.cursorX}px`,
      '--posY': `${cursorData.cursorY}px`,
    })
  }

  const setProperties = (el, props) => {
    for ( const [key, val] of Object.entries(props) ) {
      el.style.setProperty(key, val)
    }
  }

  const setCursorData = (config) => {
    for ( const [key, val] of Object.entries(config) ) {
      cursorData[key] = val
    }
  }

  watch(() => [x.value, y.value], ([newX, newY]) => {
    cursorData.mouseX = newX
    cursorData.mouseY = newY
  })

  return {
    cursorData,
    animateCursor,
    setCursorData,
  }
}