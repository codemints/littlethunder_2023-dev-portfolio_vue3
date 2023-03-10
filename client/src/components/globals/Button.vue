<template>
  <a
    class="block px-10 py-5"
    @click="$emit('buttonClicked', $event)"
    @mouseover="handleHover"
    @mouseout="handleHover"
    :href="hrefAttribute"
    :target="target"
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
import { ref, computed, onMounted } from 'vue'
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
  linkTo: {
    type: String,
    required: false
  },
  target: {
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

const emits = defineEmits(['buttonClicked', 'buttonHovered'])

const thisButton = ref(null)
const isHovered = ref(false)

const handleHover = (event) => {
  isHovered.value = !isHovered.value
  emits('buttonHovered', event)
}

const getStyles = computed(() => {
  return Object.entries(props.cssProps).map(([key, value]) => {
    return `${key}: ${value}`
  }).join(';')
})

const downloadAttribute = computed(() => {
  return props.download ? props.download : null
})

const hrefAttribute = computed(() => {
  return props.linkTo ? props.linkTo : null
})

onMounted(() => {
  addButton(thisButton.value)
})

defineExpose({
  thisButton
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
  a {
    font-family: $heading;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
</style>