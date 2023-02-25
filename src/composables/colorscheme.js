import { computed, onMounted, onUnmounted } from 'vue'

export const useColorScheme = () => {
  const root = document.documentElement
  const storedColorScheme = localStorage.getItem('colorScheme')

  const updateColorScheme = () => {

  }

  const getColorScheme = computed(() => {
    return windows.matchMedia('(prefers-color-scheme: dark)')
  })

  const setColorScheme = () => {
    console.log(storedColorScheme, preferredColorScheme)
  }

  onMounted(() => {

  })

  onUnmounted(() => {

  })

  return {
    updateColorScheme,
    getColorScheme,
    setColorScheme
  }
}