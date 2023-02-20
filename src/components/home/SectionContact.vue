<template>
  <section id="section__contact" class="page-section">
    <div class="section-row section-row--fullwidth">
      <div class="section-col section-col--6 section-col--center">
        <div class="section-content">
          <SectionTitle title="Contact Me" />
          <h3 class="text-clr-blue">Available For Hire</h3>
          <p class="text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo nulla facilisi nullam vehicula ipsum a. Ut placerat orci nulla pellentesque dignissim enim.</p>
          <Button
          :onClick="scrollTo"
          :classNames="[ 'bg-clr-orange', 'hover:bg-clr-200', 'text-white', 'hover:text-clr-600']"
          :cssProps="{
            'font-size': '1.5rem',
            'width': '30rem',
            'margin-top': '5rem',
          }"
          id="hero__button"
          text="Let's Work Together"
          hovText="Contact Me Today"/>
        </div>
      </div>
      <div class="section-col section-col--6">
        <div class="section-content">
          <img src="@img/map-placeholder.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@comps/globals/SectionTitle.vue'
import Button from '@comps/globals/Button.vue'
</script>

<style lang="scss" scoped>
</style>