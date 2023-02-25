<template>
  <div class="vuecordion-wrapper" ref="vueCordion">
    <VueCordionTab
      v-for="(item, index) in data"
      :key="item"
      :data="item"
      :index="index"
      :class="{ 'tab-active': item.isOpen }"
      @toggleOpen="toggleOpen"
    />
  </div>
</template>

<script setup>
import { ref, toRef, defineProps, onMounted } from 'vue'
import VueCordionTab from '@component/globals/VueCordionTab.vue'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const vueCordion = ref(null)
const isOpen = toRef(props.data, 'isOpen')
const tabHeights = ref([])

const toggleOpen = (index) => {
  isOpen._object[index].isOpen = !isOpen._object[index].isOpen

  isOpen._object = isOpen._object.map((item, i) => {
    if (i !== index) {
      item.isOpen = false
    }
    return item
  })
}

onMounted(() => {
  const initialAccordionHeight = vueCordion.value.offsetHeight
  vueCordion.value.style.height = `${initialAccordionHeight + 25}px`

  const accordionTabs = Array.from(vueCordion.value.children)
  tabHeights.value = accordionTabs.map(tab => {
    return tab.offsetHeight
  })
})
</script>

<style lang="scss" scoped>
  .vuecordion-wrapper {
    position: relative;
    height: 100%;
    z-index: 10;
  }
</style>