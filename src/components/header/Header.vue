<template>
  <header>
    <section class="header__progress-bar">
      <ProgressBar />
    </section>

    <section class="header__main-content">
      <div>
        <SocialMedia />
      </div>
  
      <div>
        <a href="/">
          <img id="site-logo" class="text-center" src="@img/logo_light-header.png" alt="website logo">
          <h4 id="site-title" class="text-center uppercase"><span class="text-white">Little</span>Thunder.<span class="text-clr-blue">_</span></h4>
        </a>
      </div>
  
      <div>
        <ThemeSwitcher />
      </div>
    </section>

    <section class="header__navigation">
      <Navigation />
    </section>
  </header>
</template>

<script setup>
import SocialMedia from '@comps/header/SocialMedia.vue'
import ThemeSwitcher from '@comps/header/ThemeSwitcher.vue'
import ProgressBar from '@comps/header/ProgressBar.vue'
import Navigation from '@comps/header/Navigation.vue'
</script>

<style lang="scss" scoped>
@use '@style/abstracts/_variables.scss' as *;
.header__main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $clr-600;
  padding-inline: 5rem;
  padding-block: 2rem;

  > div {
    flex: 1 1 33.3333%;
  }
}
.header__navigation {
  background-color: $clr-400;
  padding-inline: 5rem;
}
#site-logo {
  width: auto;
  height: 6rem;
  margin-inline: auto;
}
#site-title {
  color: $clr-orange;
  font-family: $title;
  font-size: 2.4rem;
  margin-top: 1rem;
}
</style>