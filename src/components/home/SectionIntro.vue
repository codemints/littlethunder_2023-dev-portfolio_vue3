<template>
  <section id="section__intro" class="page-section">
    <canvas class="animation-canvas"></canvas>
    <div class="intro-title text-center text-white">
      <h2 class="font-body">hello<span class="text-clr-orange">.</span><span class="text-clr-blue">_</span></h2>
      <h1 class="animate__animated"
      @mouseover="handleMouseover"
      @mouseout="handleMouseover"
      ref="introTitle"
      >My Name Is Daniel<span class="text-clr-orange">.</span></h1>
      <h3 class="font-body">i'm a creative frontend developer with roots in design<span class="text-clr-orange">.</span></h3>
    </div>
    <Button
        :onClick="scrollTo"
        :classNames="[ 'bg-clr-orange', 'hover:bg-clr-200', 'text-white', 'hover:text-clr-600']"
        :cssProps="{
          'font-size': '1.5rem',
          'width': '30rem',
        }"
        id="hero__button"
        text="Let's Work Together"
        hovText="Contact Me Today"
      />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from '@/components/globals/Button.vue'

const introTitle = ref(null)

const handleMouseover = (e) => {
  (e.type === 'mouseover') ? introTitle.value.classList.add('animate__pulse') : introTitle.value.classList.remove('animate__pulse')
}

const scrollTo = () => {
  console.log('I have been clicked')
}
</script>

<style lang="scss" scoped>

#section__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;

  canvas[data-engine="three.js r140"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  // .animation-canvas {
  //   position: absolute;
  //   left: 0;
  //   top: var(--header-height);
  //   width: 100vw;
  //   height: var(--canvas-height);
  //   z-index: -1;
  // }

  .intro-title {
    margin-top: 10rem;

    h3 {
      font-size: 2.4rem;
    }
  }

  #hero__button {
    margin-top: 7.5rem;
  }
}
</style>