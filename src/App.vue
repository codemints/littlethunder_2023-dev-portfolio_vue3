<template>
  <Floaters />
  <Header ref="headerRef" />
  <main ref="contentRef" class="page-content bg-clr-800">
    <SectionIntro class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
    <SectionAbout class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
    <SectionExpertise class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
    <SectionWork class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
    <SectionExperience class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
    <SectionContact class="bg-gradient-to-b from-white to-clr-100 dark:from-clr-800 dark:to-clr-600"/>
  </main>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useHeaderStore } from '@store/header.js'
import { useNavStore } from '@store/navigation.js'
import { useDarkModeStore } from '@store/darkmode.js'

import Floaters from '@comps/page/Floaters.vue'
import Header from '@comps/header/Header.vue'
import SectionIntro from '@comps/home/SectionIntro.vue'
import SectionAbout from '@comps/home/SectionAbout.vue'
import SectionExpertise from '@comps/home/SectionExpertise.vue'
import SectionWork from '@comps/home/SectionWork.vue'
import SectionExperience from '@comps/home/SectionExperience.vue'
import SectionContact from '@comps/home/SectionContact.vue'
import Footer from '@comps/footer/Footer.vue'

const headerStore = useHeaderStore()
const navStore = useNavStore()
const darkModeStore = useDarkModeStore()
const headerRef = ref(null)
const contentRef = ref(null)

const calculateHeights = () => {
  const headerInnerHeight = headerRef.value.$el.querySelector('.header__main-content').offsetHeight
  const headerHeight = headerRef.value.$el.offsetHeight
  const windowHeight = window.innerHeight
  const sectionHeight = windowHeight - headerHeight

  return {
    headerInnerHeight,
    headerHeight,
    windowHeight,
    sectionHeight
  }
}

const setCSSProperties = (rootEl) => {
  for (const [key, value] of Object.entries(convertHeightToVh.value)) {
    rootEl.style.setProperty(`--${key}`, `${value}vh`)
  }
}

const setHeaderState = () => {
  const { headerInnerVh, headerVh, windowVh, sectionVh } = convertHeightToVh.value
  headerStore.headerVhMin = headerVh - headerInnerVh
  headerStore.headerVhMax = headerVh
  headerStore.sectionVh = sectionVh
  headerStore.windowVh = windowVh
  headerStore.headerElement = headerRef.value.$el
}

const getSectionTops = () => {
  const sections = Array.from(contentRef.value.children)
  const sectionTops = sections.map(section => section.offsetTop)
  
  sectionTops.forEach((top, index) => {
    navStore.navItems[index].top = top
  })
}

const convertHeightToVh = computed(() => {
  const { headerInnerHeight, headerHeight, windowHeight, sectionHeight } = calculateHeights()
  const headerInnerVh = 100*headerInnerHeight/windowHeight
  const headerVh = 100*headerHeight/windowHeight
  const windowVh = 100*windowHeight/windowHeight
  const sectionVh = 100*sectionHeight/windowHeight

  return {
    headerInnerVh,
    headerVh,
    windowVh,
    sectionVh,
  }
})

onMounted(() => {
  const rootEl = document.documentElement
  setCSSProperties(rootEl)
  setHeaderState()
  getSectionTops()
  navStore.sections = contentRef.value.children
})
</script>

<style lang="scss" scoped>
</style>