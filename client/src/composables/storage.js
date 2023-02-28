import { ref, watch } from 'vue'

export function useLocalStorage(key, initialValue) {
  const storedValue = ref(localStorage.getItem(key) ?? initialValue)

  watch(storedValue, value => {
    localStorage.setItem(key, value)
  })

  function clear() {
    localStorage.removeItem(key)
    storedValue.value = initialValue
  }

  return {
    storedValue, 
    clear
  }
}