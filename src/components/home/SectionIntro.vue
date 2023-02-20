<template>
  <section id="section__intro" :style="{ height: `${sectionHeight}vh` }">
    <div class="intro-title text-center text-white">
      <h2 class="font-body">hello<span class="text-clr-orange">.</span><span class="text-clr-blue">_</span></h2>
      <h1>My Name Is Daniel<span class="text-clr-orange">.</span></h1>
      <h3 class="font-body">i'm a creative frontend developer with roots in design<span class="text-clr-orange">.</span></h3>
    </div>
  </section>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  sectionHeight: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  console.log(props.sectionHeight)
})
</script>

<style lang="scss" scoped>
  #section__intro {
    display: flex;
    align-items: center;
    justify-content: center;

    .intro-title {
      margin-top: -15vh;

      h3 {
        font-size: 2.4rem;
      }
    }
  }
</style>