<template>
  <Floaters />
  <Header ref="headerRef" />
  <main class="content-wrapper bg-clr-800">
    <SectionIntro />
    <SectionAbout />
    <SectionExpertise />
    <SectionWork />
    <SectionExperience />
    <SectionContact />
  </main>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import Floaters from '@comps/page/Floaters.vue'
import Header from '@comps/header/Header.vue'
import SectionIntro from '@comps/home/SectionIntro.vue'
import SectionAbout from '@comps/home/SectionAbout.vue'
import SectionExpertise from '@comps/home/SectionExpertise.vue'
import SectionWork from '@comps/home/SectionWork.vue'
import SectionExperience from '@comps/home/SectionExperience.vue'
import SectionContact from '@comps/home/SectionContact.vue'
import Footer from '@comps/footer/Footer.vue'

const headerRef = ref(null)

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
  const doc = document.documentElement
  doc.classList.add('dark');
  const [headerHeight, windowHeight] = Object.values(heightData())
  const headerVerticalHeight = 100*headerHeight/windowHeight
  const windowVerticalHeight = 100*windowHeight/windowHeight
  doc.style.setProperty('--header-height', `${headerVerticalHeight}vh`)
  doc.style.setProperty('--canvas-height', `${windowVerticalHeight - headerVerticalHeight}vh`)
})
</script>

<style lang="scss" scoped>
</style>