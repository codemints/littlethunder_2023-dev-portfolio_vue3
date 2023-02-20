<template>
  <main id="site-wrapper" class="bg-clr-800">
    <Header ref="headerRef" />
    <SectionIntro :sectionHeight="sectionHeight" />
    <SectionAbout />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import Header from '@comps/header/Header.vue'
import SectionIntro from '@comps/home/SectionIntro.vue'
import SectionAbout from '@comps/home/SectionAbout.vue'

const headerRef = ref(null)
const sectionHeight = ref(0)

const getHeaderHeight = computed(() => {
  return headerRef.value.$el.offsetHeight
})

const getWindowHeight = computed(() => {
  return window.innerHeight
})

const heightData = () => {
  return {
    headerHeight: getHeaderHeight.value,
    windowHeight: getWindowHeight.value
  }
}

onMounted(() => {
  document.documentElement.classList.add('dark');
  const [headerHeight, windowHeight] = Object.values(heightData())
  const hH = 100*headerHeight/windowHeight
  const wH = 100*windowHeight/windowHeight
  sectionHeight.value = wH - hH
})
</script>

<style lang="scss" scoped>
</style>