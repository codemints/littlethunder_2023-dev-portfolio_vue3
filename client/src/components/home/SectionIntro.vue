<template>
  <section id="section__intro" class="page-section">
    <div
      ref="introWrapperRef"
      class="intro-title text-center text-clr-400 dark:text-white"
      :class="{ 'is-hidden': controlsStore.titleHidden }"
    >
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
        i'm a creative frontend developer with roots in design<span class="text-clr-orange">.</span>
      </h3>
      <Button
        ref="introButtonRef"
        @buttonClicked=""
        @buttonHovered=""
        href="#section__contact"
        id="hero__button"
        text="Let's Work Together"
        hovText="Contact Me Today"
        :classNames="[ 'bg-clr-orange', 'hover:bg-clr-100', 'dark:hover:bg-clr-800', 'text-white', 'hover:text-clr-400', 'dark:hover:text-white', 'font-hf', 'uppercase']"
        :cssProps="{
          fontSize: '1.5rem',
          letterSpacing: '0.1rem',
          width: '30rem',
        }"
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
import { useControlsStore } from '@store/controls.js'

const controlsStore = useControlsStore()
const sectionTitle = ref('My Name Is Daniel.')
const introWrapperRef = ref(null)
const introTitleRef = ref(null)
const introHeadingRef = ref(null)
const introSubTitleRef = ref(null)
const introButtonRef = ref(null)

const getHeadingChars = computed(() => {
  return Array.from(introHeadingRef.value.children)
  .reduce((acc, curr) => {
    const chars =
      Array.from(curr.children)
      .filter(char => char.classList.contains('char'))

    return [...acc, ...chars]
  }, [])
})

onMounted(() => {
  controlsStore.titleWrapperHeight = introWrapperRef.value.clientHeight
  document.documentElement.style.setProperty(`--title-wrapper-height`, `${controlsStore.titleWrapperHeight}px`)
  controlsStore.titleWrapperNode = introWrapperRef.value
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
  }, 1250)
})
</script>

<style lang="scss" scoped>

#section__intro {
  position: relative;
  z-index: 1;

  .intro-title {
    max-height: var(--title-wrapper-height);
    padding: 2rem;
    margin-top: 7.5rem;
    overflow: visible;
    opacity: 0;
    transition: max-height 0.2s ease-in-out;

    @media (min-width: 768px) {
      margin-top: 15rem;
    }

    &.is-hidden {
      max-height: 0;
      opacity: 0 !important;
      overflow: hidden;
    }

    h1 {
      font-size: clamp(5.6rem, 4vw, 9.6rem);
      cursor: pointer;
    }

    h2 {
      font-size: clamp(3.6rem, 2.7vw, 4.8rem);
    }

    h3 {
      font-size: clamp(1.8rem, 1.8vw, 2.4rem);
    }
  }

  #hero__button {
    margin-top: 7.5rem;
    margin-inline: auto;
  }
}
</style>