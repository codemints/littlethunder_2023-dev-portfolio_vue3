<template>
  <div class="cursor__container">
    <div ref=cursorOuterRef class="cursor cursor__outer border-clr-blue dark:border-clr-orange"></div>
    <div ref=cursorInnerRef class="cursor cursor__inner bg-clr-blue dark:bg-clr-orange"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCursor } from '@compose/cursor.js'

const outerCursor = useCursor()
const innerCursor = useCursor()
const cursorOuterRef = ref(null)
const cursorInnerRef = ref(null)

onMounted(() => {
  outerCursor.setCursorData({
    liveCursor: cursorOuterRef.value,
    drag: 1,
  })
  outerCursor.animateCursor()

  innerCursor.setCursorData({
    liveCursor: cursorInnerRef.value,
    drag: 0.1,
  })
  innerCursor.animateCursor()
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.cursor__container {
  $innerSize: 0.75rem;
  $outerSize: 2.8rem;
  --posX: 0;
  --posY: 0;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;

  .cursor__outer {
    position: absolute;
    left: var(--posX);
    top: var(--posY);
    width: $outerSize;
    height: $outerSize;
    margin-top: calc( $outerSize / 2 * -1);
    margin-left: calc( $outerSize / 2 * -1);
    border-radius: 50%;
    border-width: 0.15rem;
    border-style: solid;
  }

  .cursor__inner {
    position: absolute;
    left: var(--posX);
    top: var(--posY);
    width: $innerSize;
    height: $innerSize;
    margin-top: calc( $innerSize/ 2 * -1);
    margin-left: calc( $innerSize/ 2 * -1);
    border-radius: 50%;
  }
}
</style>