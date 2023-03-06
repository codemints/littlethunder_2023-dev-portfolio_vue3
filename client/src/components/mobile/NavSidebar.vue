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
        @touchstart="handleClick(item, index)"
        class="linklist-item"
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
import SocialMedia from '@component/header/SocialMedia.vue'
import { useNavStore } from '@store/navigation.js'
import { useMobileStore } from '@store/mobile.js'
import { useDarkModeStore } from '@store/darkmode.js'
import siteColors from '@lib/site-colors.js'

const navStore = useNavStore()
const mobileStore = useMobileStore()
const darkModeStore = useDarkModeStore()

const linkListItems = ref([])
const mobileNav = ref(null)

const handleClick = (item, index) => {
  scroll(0, item.top)
  linkListItems.value[index].classList.add('is-active')
  linkListItems.value.forEach((item, i) => {
    if (i !== index) {
      item.classList.remove('is-active')
    }
  })
  if ( mobileStore.isOpen ) {
    mobileStore.toggleOpen()
  }
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

watch(() => darkModeStore.isDark, (val) => {
  setColorProps()
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