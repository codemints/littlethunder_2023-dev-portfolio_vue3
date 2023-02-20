<template>
  <div class="progress-bar__outer bg-clr-800">
    <div class="progress-bar__inner bg-clr-orange" :style="{ width: `${scrollPercentage}vw`}"></div>
    <p class="text-white" :style="{ left: updateTextPosition }">document.scroll({{ scrollPercentage }}%)</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scrollPercentage = ref(18)

const updateScrollPercentage = () => {
  const docElement = document.documentElement.scrollTop
  scrollPercentage.value = docElement.scrollTop / (docElement.scrollHeight - document.documentElement.clientHeight) * 100
}

const updateTextPosition = computed(() => {
  return `${scrollPercentage.value}vw`
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
    z-index: 2;
  }
}
</style>