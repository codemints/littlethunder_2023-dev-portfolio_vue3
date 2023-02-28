import { ref, onMounted, onUnmounted } from 'vue'

export const useWindow = () => {
  const x = ref(window.innerWidth) 
  const y = ref(window.innerHeight)

  const update = () => {
    x.value = window.innerWidth
    y.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { x, y }
}