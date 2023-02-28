<template>
  <a
    class="block px-10 py-5"
    @click="$emit('buttonClicked')"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    :href="hrefAttribute"
    :download="downloadAttribute"
    :class="classNames"
    :style="getStyles"
    :id="id"
    :data-button="dataType"
    ref="thisButton"
  >
    {{ isHovered ? hovText : text }}
  </a>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from 'vue'
import { useButtonsStore } from '@store/buttons.js'
const { addButton } = useButtonsStore()

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  hovText: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: false
  },
  dataType: {
    type: String,
    required: false
  },
  href: {
    type: String,
    required: false
  },
  download: {
    type: String,
    required: false
  },
  classNames: {
    type: Array,
    required: false
  },
  cssProps: {
    type: Object,
    required: false
  },
  borderColor: {
    type: String,
    required: false
  },
})

const thisButton = ref(null)
const isHovered = ref(false)

const getStyles = computed(() => {
  return Object.entries(props.cssProps).map(([key, value]) => {
    return `${key}: ${value}`
  }).join(';')
})

const downloadAttribute = computed(() => {
  return props.download ? props.download : null
})

const hrefAttribute = computed(() => {
  return props.href ? props.href : null
})

onMounted(() => {
  addButton(thisButton.value, props.borderColor)
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
  button {
    font-family: $heading;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: background-color 0.2s ease-in-out;
  }
</style>