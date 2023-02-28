<template>
  <canvas
    @click="spawnNewCircle"
    @mousedown="controlsStore.panelOpen = false"
    ref="canvasRef"
    class="bg-white dark:bg-clr-800"
  ></canvas>
  <ControlPanel />

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCirclesStore } from '@store/circles.js'
import { useHeaderStore } from '@store/header.js'
import { useDarkModeStore } from '@store/darkMode.js'
import { useControlsStore } from '@store/controls.js'
import ControlPanel from '@component/globals/ControlPanel.vue'

const circleStore = useCirclesStore()
const headerStore = useHeaderStore()
const {
  isCollapsed,
  headerVhMax,
  headerVhMin
} = headerStore
const darkModeStore = useDarkModeStore()
const {
  setCircleData,
  drawToCanvas,
  updateCircleColor,
  spawnNewCircle,
} = circleStore
const controlsStore = useControlsStore()

const canvasRef = ref(null)

watch(() => headerStore.headerVhMax, (val) => {
  canvasRef.value.height = window.innerHeight - (window.innerHeight * val / 100)
  canvasRef.value.width = window.innerWidth
  canvasRef.value.style.top = `${val}vh`

  setCircleData({
    canvas: canvasRef.value,
    ctx: canvasRef.value.getContext('2d'),
    minCircleSize: 10,
    maxCircleSize: 120,
    minCirclePopulation: 8,
    maxCirclePopulation: 12,
    initialVelocity: 0.125,
    offset: headerVhMax,
  })

  drawToCanvas()
})

watch(() => headerStore.isCollapsed, (val) => {
  if ( val === true ) {
    canvasRef.value.height = window.innerHeight - (window.innerHeight * headerStore.headerVhMin / 100)
    canvasRef.value.style.top = `${headerStore.headerVhMin}vh`
  } else {
    console.log('expanded')
    canvasRef.value.height = window.innerHeight - (window.innerHeight * headerStore.headerVhMax / 100)
    canvasRef.value.style.top = `${headerStore.headerVhMax}vh`
  }
})

watch(() => darkModeStore.isDark, (val) => {
  updateCircleColor()
})

onMounted(() => {
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

canvas {
  position: absolute;
  left: 0;
  z-index: -1;
  transition: top 0.3s ease-in-out, height 0.3s ease-in-out;
}
</style>