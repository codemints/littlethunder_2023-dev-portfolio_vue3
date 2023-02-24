<template>
  <section id="section__about" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--6">
        <div class="section-content">
          <SectionTitle title="About Me" />
          <p class="text-clr-400 dark:text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo nulla facilisi nullam vehicula ipsum a. Ut placerat orci nulla pellentesque dignissim enim. Vitae nunc sed velit dignissim sodales ut eu sem integer. Dictum fusce ut placerat orci. Ut pharetra sit amet aliquam id diam maecenas ultricies. Ut sem nulla pharetra diam sit amet nisl suscipit. Id volutpat lacus laoreet non curabitur gravida. Turpis egestas pretium aenean pharetra. In nibh mauris cursus mattis. Quis varius quam quisque id diam vel quam elementum. Mattis nunc sed blandit libero volutpat sed cras. Dictumst quisque sagittis purus sit.</p>
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
import SectionTitle from '@comps/globals/SectionTitle.vue'
import { useDarkModeStore } from '@store/darkmode.js'

const darkModeStore = useDarkModeStore()

</script>

<style lang="scss" scoped>
img {
  width: 40rem;
  margin-inline: auto;
}
</style>