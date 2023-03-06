import { ref, onMounted, onUnmounted } from 'vue'

export const useMouse = () => {
  const x = ref(0)
  const y = ref(0)

  const update = (e) => {
    x.value = e.clientX || e.pageX
    y.value = e.clientY || e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}