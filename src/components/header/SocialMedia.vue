<template>
  <ul class="social-nav">
    <li v-for="link in socialLinks" :key="link.name">
      <a
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer">
        <i
        class="fa-brands header-icon"
        :class="[`fa-${link.icon}`, Colors.socialIcons]"
        ></i>
      </a>
    </li>
  </ul>
</template>

<script setup>
  import { socialLinks } from '../../composables/links.js'
  import { themeColors as Colors } from '../../composables/colors.js'

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