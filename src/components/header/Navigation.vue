<template>
  <div class="nav-content__wrapper">
    <div
    class="nav-content__toggle"
    @click="handleResize"
    >
      <i
        v-if="!headerStore.isCollapsed && headerStore.isCollapsed !== null"
        class="fa-sharp fa-solid fa-arrow-up-to-line text-clr-blue hover:text-clr-600"
      ></i>
      <i
        v-if="headerStore.isCollapsed"
        class="fa-sharp fa-solid fa-arrow-down-to-line text-clr-blue hover:text-clr-600"
      ></i>
    </div>

    <nav class="nav-content__menu">
      <ul
        ref="navLinksRef"
        class="nav-links"
      >
        <li
          v-for="(item, index) in navStore.navItems"
          :key="item.name"
          @click="currentIndex = index"
          class="nav-links__item hover:bg-clr-600"
        >
          <a
            :href="`#${item.scrollTo}`"
            class="nav-links__link text-clr-200 hover:text-white hover:bg-clr-600 border-b-2 border-transparent hover:border-b-2 hover:border-clr-blue"
            :class="{'nav-links__link--active': item.isActive}"
          >
            <span class="link-before">//</span>
              {{ item.name }}
          </a>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNavStore } from '@store/navigation.js'
import { useHeaderStore } from '@store/header.js'

const navStore = useNavStore()
const headerStore = useHeaderStore()

const resumeUrl = '@/assets/docs/resume.pdf'

const navLinksRef = ref(null)
const currentIndex = ref(0)

const handleResize = () => {
  headerStore.isCollapsed = !headerStore.isCollapsed
}

const scrollSpy = () => {
  navStore.navItems.forEach((item, index) => {
    const section = navStore.sections[index]
    const sectionTop = item.top
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 100 && window.pageYOffset < sectionTop + sectionHeight - 100) {
      item.isActive = true
    } else {
      item.isActive = false
    }
  })

  //I need to set the prevIndex, currIndex, and nextIndex here so scroll buttons work
  //Try setting the index valuse of navStore inside of a click event rather than a scroll event
  //I need to set an out mouseover and mouseout event and attempt to get the background to shuttle
}

onMounted(() => {
  window.addEventListener('scroll', scrollSpy)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollSpy)
})
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

          .link-before {
            margin-right: 0.2rem;
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

.dark {
  .nav-links__link--active {
    color: white;
    background-color: $clr-600;
    border-color: $clr-blue;

    &::before {
      color: $clr-blue;
    }

    .link-before {
      color: $clr-blue;
    }
  }

  .nav-links__link {
    &:hover {
      &::before {
        color: $clr-blue;
      }
      .link-before {
        color: $clr-blue;
      }
    }
  }
}
</style>