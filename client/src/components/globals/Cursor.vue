<template>
  <div ref="cursorContainerRef" class="cursor__container">
    <div ref=cursorOuterRef class="cursor cursor__outer border-clr-blue dark:border-clr-orange"></div>
    <div ref=cursorInnerRef class="cursor cursor__inner bg-clr-blue dark:bg-clr-orange"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMouse } from '@compose/mouse.js'

const { x, y } = useMouse()
const cursorContainerRef = ref(null)
const cursorOuterRef = ref(null)
const cursorInnerRef = ref(null)
const cursors = [cursorOuterRef, cursorInnerRef]

const updatePosition = (newX, newY) => {
    cursors.forEach(cursor => {
      cursor.value.style.transform = `translate(${newX}px, ${newY}px)`
    })
}

watch([x, y], ([newX, newY]) => {
  updatePosition(newX, newY)
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.cursor__container {
  $innerSize: 0.75rem;
  $outerSize: 2.8rem;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;

  .cursor__outer {
    position: absolute;
    width: $outerSize;
    height: $outerSize;
    margin-top: calc( $outerSize / 2 * -1);
    margin-left: calc( $outerSize / 2 * -1);
    border-radius: 50%;
    border-width: 0.15rem;
    border-style: solid;
    transform: translate(0, 0);
  }

  .cursor__inner {
    position: absolute;
    width: $innerSize;
    height: $innerSize;
    margin-top: calc( $innerSize/ 2 * -1);
    margin-left: calc( $innerSize/ 2 * -1);
    border-radius: 50%;
    transform: translate(0, 0);
  }
}
</style>