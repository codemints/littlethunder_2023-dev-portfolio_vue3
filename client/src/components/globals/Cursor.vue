<template>
    <div ref=cursorOuterRef class="cursor cursor__outer border-clr-400 dark:border-clr-200"></div>
    <div ref=cursorInnerRef class="cursor cursor__inner bg-clr-orange dark:bg-clr-blue"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCursor } from '@compose/cursor.js'
import { useButtonsStore } from '@store/buttons.js'

const outerCursor = useCursor()
const innerCursor = useCursor()
const buttonsStore = useButtonsStore()
const cursorOuterRef = ref(null)
const cursorInnerRef = ref(null)

onMounted(() => {
  buttonsStore.cursorOuter = cursorOuterRef.value
  buttonsStore.cursorInner = cursorInnerRef.value
  outerCursor.setCursorData({
    liveCursor: cursorOuterRef.value,
    deadCursor: cursorInnerRef.value,
    drag: 0.25,
  })
  outerCursor.animateCursor()
  outerCursor.initMorph()

  innerCursor.setCursorData({
    liveCursor: cursorInnerRef.value,
    drag: 1,
  })
  innerCursor.animateCursor()
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
  
  .cursor {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;

    &.is-hidden {
      opacity: 0;
    }
  }
  
  .cursor__outer {
    --posX: 0;
    --posY: 0;
    --outerW: 2.8rem;
    --outerH: 2.8rem;
    left: 0;
    top: 0;
    width: var(--outerW);
    height: var(--outerH);
    border-width: 0.2rem;
    border-style: solid;
    transform: translate(calc(var(--posX) - (var(--outerW) / 2)), calc(var(--posY) - (var(--outerH) / 2)));
    
    will-change: transform;
    
    &.is-morphed {
      border-color: $clr-blue;
      border-width: 0.35rem;
      transition: 
      width 0.2s cubic-bezier(.39, .575, .565, 1),
      height 0.2s cubic-bezier(.39, .575, .565, 1),
      transform 0.2s cubic-bezier(.39, .575, .565, 1);
    }
  }
  
  .cursor__inner {
    --posX: 0;
    --posY: 0;
    --innerW: 0.75rem;
    --innerH: 0.75rem;
    left: calc(var(--posX) - (var(--innerW) / 2));
    top: calc(var(--posY) - (var(--innerH) / 2));
    width: var(--innerW);
    height: var(--innerH);
  }

.dark {
  .is-morphed {
    border-color: $clr-orange !important;
    border-width: 0.35rem;
  }
}
</style>