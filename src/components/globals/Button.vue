<template>
  <button
    class="block px-10 py-5"
    @click="onClick"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    :class="classNames"
    :style="getStyles"
    :id="id"
    :data-button="dataType"
    ref="thisButton"
  >
    {{ isHovered ? hovText : text }}
  </button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps(['onClick', 'classNames', 'cssProps', 'id', 'dataType', 'text', 'hovText'])

const thisButton = ref(null)
const isHovered = ref(false)

const getStyles = computed(() => {
  return Object.entries(props.cssProps).map(([key, value]) => {
    return `${key}: ${value}`
  }).join(';')
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