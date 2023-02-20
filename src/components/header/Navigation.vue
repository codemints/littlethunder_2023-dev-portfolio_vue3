<template>
  <div class="nav-content__wrapper">
    <div
    class="nav-content__toggle"
    @click="isCollapsed = !isCollapsed"
    >
      <i
      class="fa-sharp fa-solid fa-arrow-up-from-line text-clr-blue hover:text-clr-600"
      v-if="!isCollapsed"
      ></i>
      <i
      class="fa-sharp fa-solid fa-arrow-down-from-line text-clr-blue hover:text-clr-600"
      v-else
      ></i>
    </div>

    <nav class="nav-content__menu">
      <ul class="nav-links">
        <li
        v-for="link in navLinks"
        :key="link.name"
        class="nav-links__item hover:bg-clr-600"
        >
          <a
          :href="`#${link.scrollTo}`"
          class="nav-links__link text-clr-200 hover:text-white hover:bg-clr-600 border-b-2 border-transparent hover:border-b-2 hover:border-clr-blue"
          :class="{'nav-links__link--active': link.isActive}"
          ><span hover:color->//</span>{{ link.name }}</a>
        </li>
      </ul>
    </nav>

    <div class="nav-content__button">
      <a
      :href="resumeUrl"
      class="button bg-clr-blue text-white hover:bg-clr-600"
      data-button="alt"
      download
      >resumé</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navLinks } from '../../composables/links.js'

const isCollapsed = ref(false)
const resumeUrl = '@/assets/docs/resume.pdf'

</script>

<style lang="scss" scoped>
@use '@style/abstracts/_variables.scss' as *;

.nav-content__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    flex: 1 1 33.3333%;
  }

  .nav-content__toggle {

    i {
      font-size: 1.6rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }

  .nav-content__menu {
    height: 60px;

    & :is(.nav-links, .nav-links__item, .nav-links__link) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;

      .nav-links__item {
        counter-increment: number;

        .nav-links__link {
          position: relative;
          font-family: $heading;
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
          padding-inline: 1.6rem;
          padding-top: 1rem;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

          &::before {
            content: "0" counter(number);
            display: inline-block;
            position: absolute;
            top: 1.25rem;
            right: 1.5rem;
            font-family: $body;
            font-size: 1.1rem;
            font-weight: 800
          }
        }
      }
    }
  }

  .nav-content__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.dark .nav-links__link--active {
  color: white;
  background-color: $clr-600;
  border-color: $clr-blue;

  &::before {
    color: $clr-blue;
  }
}
</style>