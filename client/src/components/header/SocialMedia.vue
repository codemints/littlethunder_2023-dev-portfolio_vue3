<template>
  <ul class="social-nav">
    <li v-for="link in socialLinks" :key="link.name">
      <a
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer">
        <i
        :class="{
          [`fa-${link.icon}`]: true,
          'text-clr-blue': mobileStore.isMobile,
          'text-clr-200': !mobileStore.isMobile,
        }"
        class="fa-brands header-icon hover:text-clr-blue"
        ></i>
      </a>
    </li>
  </ul>
</template>

<script setup>
  import { socialLinks } from '@compose/links.js'
  import { useMobileStore } from '@store/mobile.js'

  const mobileStore = useMobileStore()
</script>

<style lang="scss" scoped>
.social-nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  .header-icon {
    font-size: 2.1rem;
    transition: color 0.2s ease-in-out;
  }
}
</style>