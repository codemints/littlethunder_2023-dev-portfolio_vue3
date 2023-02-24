<template>
  <div class="switcher-container">
    <p :class="Colors.themeSwitcher.false">isDark(false)</p>
    <div
      class="switcher-toggle__wrapper bg-clr-100 dark:bg-clr-800"
      @click="handleDarkMode"
    >
      <div
        class="switcher-toggle switcher-static bg-clr-200 dark:bg-clr-400"></div>
      <div
        class="switcher-toggle switcher-static bg-clr-200 dark:bg-clr-400"></div>
      <div
        class="switcher-toggle switcher-toggle__main bg-clr-orange dark:bg-clr-blue"
        :class="{ 'dark-mode' : darkModeStore.isDark }"></div>
      <div
        class="switcher-toggle switcher-toggle__overlap bg-clr-100 dark:bg-clr-800"
        :class="{ 'dark-mode' : darkModeStore.isDark }"></div>
    </div>
    <p :class="Colors.themeSwitcher.true">isDark(true)</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { themeColors as Colors } from '../../composables/colors.js'
import { useDarkModeStore } from '@store/darkmode.js'

const darkModeStore = useDarkModeStore()

const handleDarkMode = () => {
  const rootEl = document.documentElement
  darkModeStore.toggleDarkMode()
  darkModeStore.isDark ? rootEl.classList.add('dark') : rootEl.classList.remove('dark')
}

onMounted(() => {
  const rootEl = document.documentElement
  darkModeStore.isDark ? rootEl.classList.add('dark') : rootEl.classList.remove('dark')
})
</script>

<style lang="scss" scoped>
$dimensions: 2.1rem;
$padding: 0.5rem;
$gap: 1.2rem;

.switcher-container,
.switcher-toggle__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.switcher-container {
  gap: $gap;

  p {
    font-size: 1.2rem;
  }

  .switcher-toggle__wrapper {
    position: relative;
    gap: 1.5rem;
    border-radius: calc($dimensions + ($padding * 2));
    padding: $padding;
    cursor: pointer;
    overflow: hidden;

    .switcher-toggle {
      height: $dimensions;
      width: $dimensions;
      border-radius: calc($dimensions/2);

      &.switcher-static {
        opacity: 0.25;
      }

      &:not(.switcher-static) {
        position: absolute;
        transition: color 0.2s ease-in-out;

        &.switcher-toggle__main {
          top: $padding;
          left: $padding;
          transition: all 0.2s ease-in-out;

          &.dark-mode {
            left: calc(100% - ($dimensions + $padding));
          }
        }

        &.switcher-toggle__overlap {
          top: -0.1rem;
          left: -1.5rem;
          transition: none;
          
          &.dark-mode {
            transition: left 0.25s ease-in-out;
            left: calc(100% - ($dimensions + $padding) - 0.75rem);
          }
        }
      }
    }
  }
}

</style>