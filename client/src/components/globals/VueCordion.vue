<template>
  <div class="vuecordion-wrapper" ref="vueCordion">
    <VueCordionTab
      v-for="(item, index) in accordionStore.panelData"
      :key="item.company"
      :panelData="item"
      :panelIndex="index"
      @toggleOpen="handleToggle"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueCordionTab from '@component/globals/VueCordionTab.vue'
import { useAccordionStore } from '@store/accordion.js'

const accordionStore = useAccordionStore()
const {  toggleOpen, setAccordionHeight, setActivePanel } = accordionStore

const vueCordion = ref(null)

const handleToggle = (payload) => {
  const [panel, index] = payload

  if ( accordionStore.activePanel === index ) return

  const newAccordionHeight = accordionStore.accordionHeight - accordionStore.panelData[accordionStore.activePanel].panelHeight + accordionStore.panelData[index].panelHeight

  vueCordion.value.style.setProperty('--accordion-height', `${newAccordionHeight}px`)

  setActivePanel(index)
  setAccordionHeight(newAccordionHeight)

  const allPanels = Array.from(vueCordion.value.children)
  toggleOpen(index)

  panel.classList.remove('is-closed')

  accordionStore.panelData.forEach((item, i) => {
    if ( i !== index ) {
      allPanels[i].classList.add('is-closed')
      item.isOpen = false
    }
  })
}

onMounted(() => {
  window.addEventListener('load', () => {
    const accordionHeight = vueCordion.value.clientHeight
    setAccordionHeight(accordionHeight)
    vueCordion.value.style.setProperty('--accordion-height', `${accordionHeight}px`)
  })
})
</script>

<style lang="scss" scoped>
  .vuecordion-wrapper {
    height: var(--accordion-height);
    overflow: hidden;
    position: relative;
    z-index: 10;
  }
</style>