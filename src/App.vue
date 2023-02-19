<script setup> 
import { ref } from 'vue'
const isHovered = ref(false)
const setHover = (value) => {
  isHovered.value = value
}
</script>

<template>
  <div class="rounded-xl bg-slate-200 text-center">
    <i class="fa-brands fa-github-alt"></i>
    <h2 class="text-clr-200">hello<span class="text-clr-orange">.</span><span class="text-clr-blue">_</span></h2>
    <h1
      class="animate__animated"
      :class="{ 'animate__rubberBand': isHovered }"
      @mouseover="setHover(true)"
      @mouseleave="setHover(false)"
    >
      My Name Is Daniel<span class="text-clr-orange">.</span>
    </h1>
    <h3>i'm a frontend developer with roots in design<span class="text-clr-blue">.</span></h3>
  </div>
</template>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
div {
  margin-top: 50px;
  padding-inline: 50px;
  padding-block: 25px;
  margin-inline: auto;
  width: max-content;
}
h1 {
  color: $clr-400;
  line-height: 1;
  cursor: pointer;
}
</style>