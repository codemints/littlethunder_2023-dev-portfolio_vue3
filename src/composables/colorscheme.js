import { computed } from 'vue'
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

  const mountDarkModeListener = () => {
    getColorScheme.value.addEventListener('change', updateColorScheme)
  }

  const unmountDarkModeListener = () => {
    getColorScheme.value.removeEventListener('change', updateColorScheme)
  }

  //when a user first visits the site, we need to check if they have a stored color scheme preference
  //if they do, we need to set the color scheme to that preference
  //if they don't, we need to check if they have a preferred color scheme set in their OS
  //if they do, we need to set the color scheme to that preference
  //if they don't, we need to set the color scheme to light
  //we also need to add an event listener to listen for changes to the color scheme preference
  //if the color scheme preference changes, we need to update the color scheme
  //we also need to store the color scheme preference in local storage so that we can use it on subsequent visits
  //we also need to remove the event listener when the component is unmounted
  //we also need to update the color scheme when the user clicks the toggle button
  //when the user clicks the toggle button, we need to update the local storage color scheme preference

  return {
    updateColorScheme,
    getColorScheme,
    setColorScheme,
    mountDarkModeListener,
    unmountDarkModeListener
  }
}