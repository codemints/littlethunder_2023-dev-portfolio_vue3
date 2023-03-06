import { reactive, watch, onMounted, onUnmounted } from 'vue'
import { useMouse } from '@compose/mouse.js'
import { useButtonsStore } from '@store/buttons.js'

export const useCursor = () => {
  const { x, y } = useMouse()
  const buttonsStore = useButtonsStore()
  
  const body = document.body

  const cursorData = reactive({
    liveCursor: null,
    deadCursor: null,
    width: null,
    height: null,
    offset: body.offsetLeft,
    drag: null,
    mouseX: x.value,
    mouseY: y.value,
    cursorX: null,
    cursorY: null,
    dx: null,
    dy: null,
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

  const initMorph = () => {
    buttonsStore.buttons.forEach(item => {
      item.button.addEventListener('mouseenter', () => {
        morphCursor(item)
      })
      item.button.addEventListener('mouseleave', () => {
        unmorphCursor()
      })
    })
  }

  const morphCursor = (item) => {
    cancelAnimationFrame(cursorData.animationFrame)
    const cursor = cursorData.liveCursor
    const buttonRadius = window.getComputedStyle(item.button).borderRadius
    const buttonRect = item.button.getBoundingClientRect()
    const buttonWidth = buttonRect.width
    const buttonHeight = buttonRect.height
    const buttonX = buttonRect.x
    const buttonY = buttonRect.y

    cursorData.width = window.getComputedStyle(cursor).getPropertyValue('--outerW')
    cursorData.height = window.getComputedStyle(cursor).getPropertyValue('--outerH')

    cursor.classList.add('is-morphed')
    setProperties(cursor, {
      '--outerW': `${buttonWidth}px`,
      '--outerH': `${buttonHeight}px`,
      '--posX': `${(buttonX) + buttonWidth / 2}px`,
      '--posY': `${(buttonY) + buttonHeight / 2}px`,
    })
    cursor.style.borderRadius = buttonRadius
    cursorData.deadCursor.style.opacity = 0
  }

  const unmorphCursor = () => {
    cursorData.animationFrame = requestAnimationFrame(animateCursor)
    const cursor = cursorData.liveCursor
    cursor.classList.remove('is-morphed')
    setProperties(cursor, {
      '--outerW': ``,
      '--outerH': ``,
    })
    cursor.style.borderRadius = ''
    cursorData.deadCursor.style.opacity = ''
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
    animateCursor,
    setCursorData,
    initMorph,
    morphCursor,
    unmorphCursor,
  }
}