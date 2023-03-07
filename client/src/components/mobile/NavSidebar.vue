<template>
  <nav
    ref="mobileNav"
    class="mobile__nav"
  >
    <ul ref="linkList" class="linklist"
    >
      <li
        v-for="(item, index) in navStore.navItems"
        :key="item.name"
        :ref="el => linkListItems[index] = el"
        class="linklist-item"
        :class="{'is-active': item.isActive}"
      >
        <a
          :href="`#${item.scrollTo}`"
          class="nav-links__link text-clr-200 active:text-white"
        >
          <span class="link-before">//</span>
            {{ item.name }}
        </a>
      </li>
    </ul>

    <div class="mobile__social">
      <SocialMedia />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useNavStore } from '@store/navigation.js'
import { useDarkModeStore } from '@store/darkmode.js'
import { useMobileStore } from '@store/mobile.js'
import SocialMedia from '@component/header/SocialMedia.vue'
import siteColors from '@lib/site-colors.js'

const navStore = useNavStore()
const darkModeStore = useDarkModeStore()
const mobileStore = useMobileStore()

const linkListItems = ref([])
const mobileNav = ref(null)

const scrollSpy = () => {
  navStore.navItems.forEach((item, index) => {
    const section = navStore.sections[index]
    const sectionTop = item.top
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 100 && window.pageYOffset < sectionTop + sectionHeight - 100) {
      item.isActive = true
      navStore.currentSection = index
      navStore.prevSection = index - 1
      navStore.nextSection = index + 1
    } else {
      item.isActive = false
    }
  })

  mobileStore.isOpen ? mobileStore.toggleOpen() : null
}

const setColorProps = () => {
  const linkColor = darkModeStore.isDark
    ? 'white'
    : siteColors.clr400

  const beforeColor = darkModeStore.isDark
    ? siteColors.clrBlue
    : siteColors.clrOrange

  const props = {
    '--active-color': linkColor,
    '--before-color': beforeColor,
  }

  for ( const [key, val ] of Object.entries(props) ) {
    mobileNav.value.style.setProperty(key, val)
  }
}

watch(() => darkModeStore.isDark, () => {
  setColorProps()
})

watch(() => navStore.navItems[0].top, () => {
  window.addEventListener('scroll', scrollSpy)
})

onMounted(() => {
  setColorProps()
  linkListItems.value[0].classList.add('is-active')
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.mobile__nav {
  --active-color: white;
  --before-color: white;

  .mobile__social {
    margin-top: 5rem;
  }

  .linklist-item {
    counter-increment: number;
    position: relative;

    &:not(:first-of-type) {
      margin-top: 3.2rem;
    }

    a {
      font-family: $heading;
      font-size: 2rem;
    }

    .link-before {
      margin-right: 0.2rem;
    }

    &.is-active {
      a {
        color: var(--active-color);
      }

      .link-before {
        color: var(--before-color);
      }

      &::before {
        color: var(--before-color);
      }
    }

    &::before {
      content: "0" counter(number);
      display: inline-block;
      position: absolute;
      top: -1.5rem;
      left: 2.5rem;
      color: $clr-200;
      font-family: $body;
      font-size: 1.5rem;
    }
  }
}
</style>