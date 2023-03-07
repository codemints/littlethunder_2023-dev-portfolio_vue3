<template>
  <Floaters v-if="!mobileStore.isMobile"/>
  <MobileHeader v-if="mobileStore.isMobile" ref="mobileHeaderRef"/>
  <Header v-else ref="headerRef" />
  <main ref="contentRef" class="page-content bg-white dark:bg-clr-800">
    <SectionIntro class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50" />
    <SectionAbout class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50"/>
    <SectionExpertise class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50"/>
    <SectionWork class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50"/>
    <SectionExperience class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50"/>
    <SectionContact class="bg-gradient-to-b from-white to-clr-100/25 dark:from-clr-800 dark:to-clr-600/50" />
  </main>
  <Footer />
  <Cursor v-if="!mobileStore.isMobile"/>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useHeaderStore } from '@store/header.js'
import { useNavStore } from '@store/navigation.js'
import { useColorScheme } from '@compose/colorscheme.js'
import { useWindow } from '@compose/window.js'
import { useMobileStore } from '@store/mobile.js'

import Floaters from '@component/page/Floaters.vue'
import Header from '@component/header/Header.vue'
import MobileHeader from '@component/mobile/MobileHeader.vue'
import SectionIntro from '@component/home/SectionIntro.vue'
import SectionAbout from '@component/home/SectionAbout.vue'
import SectionExpertise from '@component/home/SectionExpertise.vue'
import SectionWork from '@component/home/SectionWork.vue'
import SectionExperience from '@component/home/SectionExperience.vue'
import SectionContact from '@component/home/SectionContact.vue'
import Footer from '@component/footer/Footer.vue'
import Cursor from '@component/globals/Cursor.vue'

const headerStore = useHeaderStore()
const navStore = useNavStore()
const headerRef = ref(null)
const mobileHeaderRef = ref(null)
const contentRef = ref(null)
const { setColorScheme } = useColorScheme()
const { x } = useWindow()
const mobileStore = useMobileStore()
const { setIsMobile } = mobileStore

const calculateHeights = () => {
  let headerInnerHeight
  let headerHeight
  if ( mobileStore.isMobile ) {
    headerInnerHeight = null
    headerHeight = mobileHeaderRef.value.$el.offsetHeight
  } else {
    headerInnerHeight = headerRef.value.$el.querySelector('.header__main-content').offsetHeight
    headerHeight = headerRef.value.$el.offsetHeight
  }
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
  mobileStore.isMobile
    ? headerStore.headerElement = mobileHeaderRef.value.$el
    : headerStore.headerElement = headerRef.value.$el
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
  let headerInnerVh

  mobileStore.isMobile
    ? headerInnerVh = null
    : headerInnerVh = 100*headerInnerHeight/windowHeight
  
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

watch(() => x.value, (newX) => {
  newX < 768 ? setIsMobile(true) : setIsMobile(false)
})

onBeforeMount(() => {
  x.value < 768 ? setIsMobile(true) : setIsMobile(false)
})

onMounted(() => {
  window.addEventListener('load', () => {
    setColorScheme()
    const rootEl = document.documentElement
    setCSSProperties(rootEl)
    setHeaderState()
    getSectionTops()
    navStore.sections = contentRef.value.children
  })
})
</script>

<style lang="scss" scoped>
</style>