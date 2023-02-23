<template>
  <header class="header__main">
    <section class="header__progress-bar">
      <ProgressBar />
    </section>

    <section
      class="header__main-content bg-clr-100 dark:bg-clr-600"
      :class="{ 'is-collapsed': headerStore.isCollapsed }"
    >
      <div class="header__main-content--inner">
        <div>
          <SocialMedia />
        </div>
    
        <div>
          <a href="/">
            <img
              id="site-logo"
              class="text-center"
              :src="logoSource"
              alt="website logo"
            >
            <h4 id="site-title" class="text-center uppercase text-clr-orange"><span class="text-clr-400 dark:text-white">Little</span>Thunder.<span class="text-clr-blue">_</span></h4>
          </a>
        </div>
    
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </section>

    <section class="header__navigation bg-clr-400">
      <Navigation />
    </section>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useHeaderStore } from '@store/header.js'
import { useDarkModeStore } from '@store/darkmode.js'
import SocialMedia from '@comps/header/SocialMedia.vue'
import ThemeSwitcher from '@comps/header/ThemeSwitcher.vue'
import ProgressBar from '@comps/header/ProgressBar.vue'
import Navigation from '@comps/header/Navigation.vue'

const headerStore = useHeaderStore()
const darkModeStore = useDarkModeStore()

const handleScroll = () => {
  const scrollPosition = window.scrollY
  scrollPosition >= 50
    ? (headerStore.isCollapsed = true)
    : (headerStore.isCollapsed = false)

  if ( scrollPosition === 0 ) {
    headerStore.isCollapsed = null
  }
}

const logoSource = computed(() => {
  return darkModeStore.isDark
    ? './src/assets/img/logo_light-header.png'
    : './src/assets/img/logo_dark-header.png'
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/_variables.scss' as *;

.header__main {
  position: fixed;
  width: 100vw;
  z-index: 100;

  .header__main-content {
    max-height: 300rem;
    transition: max-height 0.3s cubic-bezier(1,.03,.3,.93);
    
    &.is-collapsed {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(1,.03,.3,.93);
    }
    &--inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 5rem;
      padding-block: 2rem;

      > div {
        flex: 1 1 33.3333%;
      }
    }
  }
  #site-logo {
    width: auto;
    height: 6rem;
    margin-inline: auto;
  }

  #site-title {
    font-family: $title;
    font-size: 2.4rem;
    margin-top: 1rem;
  }
}
</style>