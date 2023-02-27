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
          <p class="text-clr-400 dark:text-clr-200">use these controls to control the circles. Stop movement, clear the canvas, redraw the canvas, and hide the intro title text. click around and have some fun!</p>
        </div>
        <div class="content-controls">
          <button
            @click="controlsStore.toggleTitleHidden"
            class="bg-clr-orange hover:-translate-y-1 hover:brightness-105"
          >toggleTitle()</button>
          <button
            @click=""
            class="bg-clr-200 dark:bg-clr-400 hover:-translate-y-1 hover:brightness-105"
          >velocity(increase)</button>
          <button
            @click=""
            class="bg-clr-400 dark:bg-clr-800 hover:-translate-y-1 hover:brightness-105"
          >velocity(decrease)</button>
          <button
            @click=""
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105"
          >canvas.clear()</button>
          <button
            @click=""
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105"
          >canvase.stop()</button>
          <button
            @click=""
            class="bg-clr-blue hover:-translate-y-1 hover:brightness-105"
          >canvase.redraw()</button>
        </div>
      </div>
    </div>
    <div
      @click="controlsStore.togglePanelOpen"
      class="control-panel--tab bg-clr-blue dark:bg-clr-orange text-white hover:translate-x-3 hover:brightness-105"
    >
      <h4>{{ controlsStore.panelOpen ? 'Close' : 'Open' }} Control Panel</h4>
      <i
        v-if="!controlsStore.panelOpen"
        class="fa-sharp fa-solid fa-arrows-from-line"
      ></i>
      <i
        v-if="controlsStore.panelOpen"
        class="fa-sharp fa-solid fa-arrows-to-line"
      ></i>
    </div>
  </aside>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'
import { useHeaderStore } from '@store/header.js'
import { useControlsStore } from '@store/controls.js'

const props = defineProps({
  changeVelocity: {
    type: Function,
    required: true,
  },
  clearCanvas: {
    type: Function,
    required: true,
  },
  toggleSuspend: {
    type: Function,
    required: true,
  },
  redrawCanvas: {
    type: Function,
    required: true,
  },
})

const headerStore = useHeaderStore()
const controlsStore = useControlsStore()
const controlPanelRef = ref(null)
const panelBodyRef = ref(null)
const panelBodyWidth = ref(0)

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
  max-width: 35rem;
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
    max-width: 30rem;
    overflow: visible;
    align-items: center;
    height: 100%;
    box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.3);
    transition: all 0.15s linear;

    &.is-closed {
      max-width: 0;
      overflow: hidden;
    }

    &-inner {
      padding: 2.4rem;

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
    cursor: pointer;

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