<template>
  <section id="section__intro" class="page-section">
    <canvas class="animation-canvas"></canvas>
    <div class="intro-title text-center text-clr-400 dark:text-white">
      <h2
      @mouseover="(e) => e.target.classList.add('animate__animated', 'animate__bounce')"
      @animationend="(e) => e.target.classList.remove('animate__animated', 'animate__bounce')"
        class="font-body">hello<span class="text-clr-orange">.</span><span class="text-clr-blue">_</span></h2>
      <h1 class="text-clr-400 dark:text-clr-100">
        <Splitting
        :textContent="sectionTitle"
        :specialChars="['.']"
        wordClass="word"
        charClass="char"
        :specialCharClasses="['dark:text-clr-orange', 'dark:hover:text-clr-blue']"
        :extraClassNames="['animate__animated', 'animate__bounce']"
        @charHover="handleCharAnimation($event, ['animate__animated', 'animate__bounce'])"
        />
      </h1>
      <h3 class="font-body">i'm a creative frontend developer with roots in design<span class="text-clr-orange">.</span></h3>
    </div>
    <Button
        :onClick="scrollTo"
        :classNames="[ 'bg-clr-orange', 'hover:bg-clr-100', 'dark:hover:bg-clr-200', 'text-white', 'hover:text-clr-400', 'dark:hover:text-clr-600']"
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
import Splitting from '@comps/globals/Splitting.vue'
import Button from '@/components/globals/Button.vue'
import { handleCharAnimation, handleIntroAnimation } from '@lib/animation-utils.js'

const sectionTitle = ref('My Name Is Daniel.')

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

    h1 {
      cursor: pointer;
    }

    h3 {
      font-size: 2.4rem;
    }
  }

  #hero__button {
    margin-top: 7.5rem;
  }
}
</style>