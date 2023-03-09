<template>
  <section id="section__about" class="page-section">
    <div class="section-row flex-wrap-reverse">
      <div class="section-col section-col--6">
        <div class="section-content">
          <SectionTitle title="About Me" />
          <h4 class="text-clr-orange dark:text-clr-blue">Hi, I'm Daniel. Thanks for visiting.</h4>
          <p class="text-clr-400 dark:text-clr-200">I like making magic in the browser. My journey started off in graphic design, but somewhere along the way, I got bit by the Javascript bug.</p>
          <p class="text-clr-400 dark:text-clr-200">Over the past 10 years I've experimented with many languages, including PHP, C++, and Python, but JavaScript of choice. My current work focuses on the Vue and React libraries — using them to build rich, functional, and beautiful online experiences. Recently I have started using Node.js to improve the frontend experience — implementing REST and GraphQL APIs.</p>
          <p class="text-clr-400 dark:text-clr-200">I've loved the journey up to this point — and there is still so much to learn — but I am naturally curious and confident in my ability. I am perpetually looking for ways to level up — one problem at a time.</p>
          <p class="text-clr-400 dark:text-clr-200">Outside of coding, I enjoy hiking, camping, mountain biking, skateboarding, and road trips. Below are some technologies I've been using in my work recently.</p>
          <ul>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              JavaScript (ES6+)
            </li>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              Vue
            </li>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              Pinia
            </li>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              React
            </li>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              Node.js
            </li>
            <li class="text-clr-200">
              <i class="fa-sharp fa-solid fa-caret-right text-clr-blue dark:text-clr-orange"></i>
              WordPress
            </li>
          </ul>
        </div>
      </div>
      <div class="section-col section-col--6">
        <div class="section-content">
          <img :src="darkModeStore.profileSource" class="text-center" alt="developer bio pic">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@component/globals/SectionTitle.vue'
import { useDarkModeStore } from '@store/darkmode.js'

const darkModeStore = useDarkModeStore()

</script>

<style lang="scss" scoped>
.section-content {
  h4 {
    font-size: 2.4rem;
  }
  ul {
    column-count: 3;
    margin-top: 2rem;
    li {
      &:not(:first-of-type) {
        margin-top: 1rem;
      }
    }
  }
  i {
    font-size: 1.4rem;
  }
  img {
    width: clamp(24rem, 20vw, 40rem);
    margin-inline: auto;
  }
}
</style>