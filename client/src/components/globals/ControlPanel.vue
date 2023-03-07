<template>
  <aside ref="controlPanelRef" class="control-panel">
    <div class="control-panel--bar bg-clr-orange dark:bg-clr-blue"></div>
    <div
      ref="panelBodyRef"
      class="control-panel--content bg-clr-100 dark:bg-clr-600"
      :class="{ 'is-closed': !controlsStore.panelOpen }"
    >
      <div class="control-panel--content-inner">
        <div class="content-body text-center">
          <h4 class="text-clr-400 dark:text-white">Canvas Controls</h4>
          <p class="text-clr-400 dark:text-clr-200">manipulate the canvas animation. <span v-if="!mobileStore.isMobile">click around. have some fun.</span></p>
        </div>
        <div class="content-controls">
          <button
            @click="controlsStore.toggleTitleHidden"
            class="bg-clr-orange hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >toggleTitle()</button>
          <button
            @click="changeVelocity"
            data-function="increase"
            class="bg-clr-200 dark:bg-clr-200 hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >velocity(increase)</button>
          <button
            @click="changeVelocity"
            data-function="decrease"
            class="bg-clr-400 dark:bg-clr-400 hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >velocity(decrease)</button>
          <button
            @click="scatterCanvas"
            class="bg-clr-600 dark:bg-clr-800 hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >scatter()</button>
          <button
            @click="handleClear"
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >canvas.clear()</button>
          <button
            @click="handleStop"
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >canvas.stop()</button>
          <button
            @click="handleRedraw"
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105 active:translate-y-0 active:brightness-90"
          >canvas.redraw()</button>
        </div>
      </div>
    </div>
    <div
      @click="controlsStore.togglePanelOpen"
      class="control-panel--tab bg-clr-blue dark:bg-clr-orange text-white hover:translate-x-3 hover:brightness-105"
    >
      <h4 v-if="!mobileStore.isMobile">{{ controlsStore.panelOpen ? 'Close' : 'Open' }} Control Panel</h4>
      <i
        v-if="!controlsStore.panelOpen"
        class="fa-sharp fa-solid fa-arrows-from-line"
      ></i>
      <i
        v-if="controlsStore.panelOpen"
        class="fa-sharp fa-solid fa-arrows-to-line"
      ></i>
    </div>

    <Teleport to="body">
      <Toast :toastData="toastData" />
    </Teleport>
  </aside>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Toast from '@component/globals/Toast.vue'
import { useHeaderStore } from '@store/header.js'
import { useControlsStore } from '@store/controls.js'
import { useCirclesStore } from '@store/circles.js'
import { useMobileStore } from '@store/mobile.js'

const headerStore = useHeaderStore()
const controlsStore = useControlsStore()
const circlesStore = useCirclesStore()
const mobileStore = useMobileStore()
const {
  changeVelocity,
  scatterCanvas,
  clearCanvas,
  stopCanvas,
  redrawCanvas,
} = circlesStore
const controlPanelRef = ref(null)
const panelBodyRef = ref(null)
const panelBodyWidth = ref(0)
const isStopped = ref(false)
const toastData = reactive({
  message: 'Some string of text',
  show: false,
})

const handleClear = () => {
  const isCleared = clearCanvas()

  if ( !isCleared ) {
    toastData.message = 'The canvas has already been cleared. Click the "canvas.redraw()" button to redraw the canvas.'
    toastData.show = true
    return
  }

  isStopped.value = false
}

const handleStop = () => {
  const isCleared = stopCanvas(isStopped.value)

  if ( isCleared ) {
    toastData.message = 'The canvas must be redrawn before the animation can be stopped. Click the "canvas.redraw()" button to redraw the canvas.'
    toastData.show = true
    return
  }

  isStopped.value = !isStopped.value
}

const handleRedraw = () => {
  const isCleared = redrawCanvas()
  if ( !isCleared ) {
    toastData.message = 'The canvas must be cleared before it can be redrawn. Click the "canvas.clear()" button to clear the canvas.'
    toastData.show = true
    return
  }
  isStopped.value = false
}

watch(() => headerStore.isCollapsed, (val) => {
  const panel = controlPanelRef.value
  if ( val === true ) {
    panel.style.height = `calc(100vh - ${headerStore.headerVhMin}vh)`
    panel.style.top = `${headerStore.headerVhMin}vh`
  } else {
    panel.style.height = `calc(100vh - ${headerStore.headerVhMax}vh)`
    panel.style.top = `${headerStore.headerVhMax}vh`
  }
})

watch(() => controlsStore.titleHidden, (val) => {
  controlsStore.titleWrapperNode.style.overflow = 'hidden'
})

onMounted(() => {
  panelBodyWidth.value = panelBodyRef.value.clientWidth
  panelBodyRef.value.classList.add('is-closed')
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.control-panel {
  position:absolute;
  left: 0;
  top: var(--headerVh);
  max-width: 25rem;
  height: calc(100vh - var(--headerVh));
  z-index: 100;
  display: flex;
  align-items: center;
  transition: top 0.3s ease-in-out, height 0.3s ease-in-out;
  
  &--bar {
    width: 0.5rem;
    height: 100%;
  }
  
  &--content {
    display: flex;
    max-width: 28rem;
    overflow: hidden;
    align-items: center;
    height: 100%;
    box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: max-width 0.15s linear;

    @media (min-width: 768px) {
      max-width: 35rem;
    }

    &.is-closed {
      max-width: 0;

      .control-panel--content-inner {
        opacity: 0;
      }
    }

    &-inner {
      padding: 0.75rem;

      @media (min-width: 768px) {
        padding: 2.4rem;
      }

      h4 {
        font-size: 2.4rem;
      }

      p {
        font-size: 1.4rem;
        margin-top: 1.25rem;
      }

      .content-controls {
        margin-top: 2.4rem;

        button {
          display: block;
          color: white;
          font-size: 1.4rem;
          font-family: $body;
          width: 100%;
          padding-inline: 1.6rem;
          padding-block: 0.8rem;

          &:not(:first-of-type) {
            margin-top: 1.6rem;
          }
        }
      }
    }
  }

  &--tab {
    padding-inline: 0.75rem;
    padding-block: 1.25rem;
    box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.3);
    align-self: flex-start;
    margin-top: 2rem;
    cursor: pointer;

    @media (min-width: 768px) {
      align-self: center;
      margin-top: 0;
    }

    h4 {
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      line-height: 1;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    i {
      font-size: 1.8rem;
      margin-top: 0.5rem;
      rotate: 90deg;
    }
  }
}

</style>