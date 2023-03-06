<template>
  <button
    ref="button"
    @touchstart="handleExpand"
    class="hamburger__nav"
    aria-controls="primary-navigation"
    aria-expanded="false"
  >
    <svg
      ref="icon"
      class="hamburger__icon stroke-clr-200 fill-none"
      viewBox="-10 -10 120 120"
      width="75"
    >
      <path stroke-width="10" stroke-linecap="square" stroke-linejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
      </path>
    </svg>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useMobileStore } from '@store/mobile.js'

const mobileStore = useMobileStore()
const { toggleOpen } = mobileStore
const button = ref(null)
const icon = ref(null)

const handleExpand = () => {
  toggleOpen()
  button.value.setAttribute('aria-expanded', mobileStore.isOpen)
}

</script>

<style lang="scss" scoped>
.hamburger__nav {
  position: relative;
  z-index: 999999;
  overflow: hidden;

  .hamburger__icon {
    transition: translate 0.2s ease-in-out, rotate 0.2s ease-in-out;

    path {
      transition: 0.2s ease-in-out;
      stroke-dasharray: 60 31 60 300
    }
  }

  &[aria-expanded="true"] {
    
    .hamburger__icon {
      translate: 0.5rem -0.5rem;
      rotate: 0.125turn;

      path {
        stroke-dasharray: 60 105 60 300;
        stroke-dashoffset: -90;
      }
    }
  }
}

</style>