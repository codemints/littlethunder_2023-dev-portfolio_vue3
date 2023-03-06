<template>
  <header class="header__mobile bg-clr-100 dark:bg-clr-600">
    <div
      class="nav__sidebar bg-clr-100 dark:bg-clr-400 border-clr-orange"
      :class="{ 'is-open': mobileStore.isOpen}"
    >
      <NavSidebar />
    </div>
    
    <div class="hamburger__wrapper">
      <Hamburger />
    </div>

    <div class="logo__wrapper">
      <a href="/">
        <img
          id="site-logo"
          class="text-center mx-auto"
          :src="darkModeStore.logoSource"
          alt="website logo"
        >
        <h4 id="site-title" class="text-center uppercase text-clr-orange"><span class="text-clr-400 dark:text-white">Little</span>Thunder.<span class="text-clr-blue">_</span></h4>
      </a>
    </div>

    <div class="themeswitcher__wrapper">
      <ThemeSwitcher />
    </div>
  </header>
</template>

<script setup>
import ThemeSwitcher from '@component/header/ThemeSwitcher.vue'
import Hamburger from '@component/mobile/Hamburger.vue'
import NavSidebar from '@component/mobile/NavSidebar.vue'
import { useDarkModeStore } from '@store/darkmode.js'
import { useMobileStore } from '@store/mobile.js'

const darkModeStore = useDarkModeStore()
const mobileStore = useMobileStore()

</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.header__mobile {
  $pX: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: $pX;
  padding-block: 1.8rem;

  .nav__sidebar {
    position: absolute;
    top: 0;
    left: -100%;
    min-width: 75vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left-width: 1rem;
    padding: 2rem;
    z-index: 999998;
    transition: left 0.2s linear;
    box-shadow: 0.24rem 0 0.36rem rgba(0, 0, 0, 0.25);

    &.is-open {
      left: 0;
    }
  }

  .logo__wrapper {

    img {
      width: auto;
      height: 4.8rem;
    }

    h4 {
      margin-top: 1rem;
    }
  }
}

</style>