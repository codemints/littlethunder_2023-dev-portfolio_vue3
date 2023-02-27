import { computed, onMounted, onUnmounted } from 'vue'
import { useDarkModeStore } from '@store/darkmode.js'

export const useColorScheme = () => {
  const root = document.documentElement
  const storedColorScheme = localStorage.getItem('colorScheme')
  const toggleDarkMode = useDarkModeStore().toggleDarkMode

  const updateColorScheme = () => {
    const colorScheme = getColorScheme.value.matches ? 'dark' : 'light'
    root.setAttribute('class', colorScheme)
    localStorage.setItem('colorScheme', colorScheme)
    colorScheme === 'dark'
    ? useDarkModeStore().isDark = true
    : useDarkModeStore().isDark = false
  }

  const getColorScheme = computed(() => {
    return window.matchMedia('(prefers-color-scheme: dark)')
  })

  const setColorScheme = () => {
    const colorScheme = getColorScheme.value.matches ? 'dark' : 'light'
    if ( getColorScheme.value && !storedColorScheme ) {
      root.setAttribute('class', colorScheme)
      toggleDarkMode()
      localStorage.setItem('colorScheme', colorScheme)
    }
    
    if (!getColorScheme.value && !storedColorScheme) {
      root.setAttribute('class', colorScheme)
      localStorage.setItem('colorScheme', colorScheme)
    }

    if ( storedColorScheme ) {
      if ( storedColorScheme === 'dark' ) {
        root.setAttribute('class', 'dark')
        toggleDarkMode()
      }
    }
  }
  
  onMounted(() => {
    getColorScheme.value.addEventListener('change', updateColorScheme)
  })
  onUnmounted(() => {
    getColorScheme.value.removeEventListener('change', updateColorScheme)
  })

  return {
    updateColorScheme,
    getColorScheme,
    setColorScheme,
  }
}