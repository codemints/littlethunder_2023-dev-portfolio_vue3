<template>
  <h2 class="text-white section-title"><span class="text-clr-400">//</span>{{  title }}</h2>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
h2 {
  position: relative;

  &::before {
    content: "0" counter(section);
    position: absolute;
    top: -2.4rem;
    right: 0;
    color: $clr-orange;
    font-family: $body;
    font-size: 3.2rem;
  }
}
</style>