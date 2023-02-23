<template>
  <div class="progress-bar__outer bg-clr-200 dark:bg-clr-800">
    <div class="progress-bar__inner bg-clr-orange" :style="{ width: `${scrolled + 2}vw`}"></div>
    <p
      class="text-white"
      :style="{ left: `${scrolled / 1.1}vw` }"
    >
        document.scroll({{ parseInt(scrolled) }}%)
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavStore } from '@store/navigation.js'

const navStore = useNavStore()
const scrolled = ref(0)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.body.scrollHeight
  const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100

  scrolled.value = scrollPercentage
  navStore.scrolled = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.progress-bar__outer {
  position:relative;
  display: flex;
  align-items: center;
  height: 2rem;

  .progress-bar__inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  p {
    position: relative;
    font-size: 1.2rem;
    margin-left: 2.4rem;
    z-index: 2;
  }
}
</style>