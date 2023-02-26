<template>
  <section id="section__intro" class="page-section">
    <div class="intro-title text-center text-clr-400 dark:text-white">
      <h2
      ref="introTitleRef"
        class="font-body">hello<span class="text-clr-orange">.</span>
          <span class="text-clr-blue">_</span>
      </h2>
      <h1
      ref="introHeadingRef"
        class="text-clr-400 dark:text-clr-100">
        <Splitting
        :textContent="sectionTitle"
        :specialChars="['.']"
        wordClass="word"
        charClass="char"
        :specialCharClasses="['text-clr-blue', 'hover:text-clr-orange','dark:text-clr-orange', 'dark:hover:text-clr-blue', 'char-special']"
        :extraClassNames="[]"
        @charHover="useAnimateChars($event, ['animate__animated', 'animate__bounce', 'text-clr-100', 'dark:text-clr-400'])"
        />
      </h1>
      <h3
        ref="introSubTitleRef"
        class="font-body"
      >
        i'm a creative frontend developer with roots in design
        <span class="text-clr-orange">.</span>
      </h3>
      <Button
        ref="introButtonRef"
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
    </div>
    <CircleCanvas />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Splitting from '@component/globals/Splitting.vue'
import Button from '@component/globals/Button.vue'
import CircleCanvas from '@component/globals/CircleCanvas.vue'
import { useAnimateChars, useAnimateIntro } from '@compose/animations.js'

const sectionTitle = ref('My Name Is Daniel.')
const introTitleRef = ref(null)
const introHeadingRef = ref(null)
const introSubTitleRef = ref(null)
const introButtonRef = ref(null)

const scrollTo = () => {
  console.log('I have been clicked')
}

const getHeadingChars = computed(() => {
  return Array.from(introHeadingRef.value.children)
  .reduce((acc, curr, index) => {
    const chars =
      Array.from(curr.children)
      .filter(char => char.classList.contains('char'))

    return [...acc, ...chars]
  }, [])
})

onMounted(() => {
  const animateElements = [
    introTitleRef.value,
    getHeadingChars.value,
    introSubTitleRef.value,
    introButtonRef.value.$el,
  ]
  const animateClassNames = [
    'text-clr-blue',
    'dark:text-clr-orange',
    'animate__animated',
    'animate__bounce',
  ]

  setTimeout(() => {
    useAnimateIntro(animateElements, animateClassNames)
  }, 250)
})
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

  .intro-title {
    margin-top: 15rem;
    opacity: 0;

    h1 {
      cursor: pointer;
    }

    h3 {
      font-size: 2.4rem;
    }
  }

  #hero__button {
    margin-top: 7.5rem;
    margin-inline: auto;
  }
}
</style>