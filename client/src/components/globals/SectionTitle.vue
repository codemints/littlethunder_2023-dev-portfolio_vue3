<template>
  <h2 class="text-clr-400 dark:text-white section-title"><span class="text-clr-100 dark:text-clr-400">//</span>{{  title }}</h2>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
h2 {
  font-size: clamp(3.6rem, 2.7vw, 4.8rem);
  position: relative;

  &::before {
    content: "0" counter(section);
    position: absolute;
    top: -2.4rem;
    right: 0;
    color: $clr-orange;
    font-family: $body;
    font-size: clamp(24px, 2vw, 32px);
  }
}
</style>