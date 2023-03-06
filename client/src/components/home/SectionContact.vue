<template>
  <section id="section__contact" class="page-section">
    <div class="section-row section-row--fullwidth">
      <div class="section-col section-col--6 section-col--center">
        <div class="section-content">
          <SectionTitle title="Contact Me" />
          <h3 class="text-clr-blue">Available For Hire</h3>
          <p class="text-clr-400 dark:text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo nulla facilisi nullam vehicula ipsum a. Ut placerat orci nulla pellentesque dignissim enim.</p>
          <Button
            @buttonClicked="handleClick"
            href="#section__contact"
            id="contact__button"
            text="Let's Work Together"
            hovText="Contact Me Today"
            :classNames="[ 'bg-clr-orange', 'hover:bg-clr-100', 'dark:hover:bg-clr-800', 'text-white', 'hover:text-clr-400', 'dark:hover:text-white', 'font-hf', 'uppercase', 'text-center']"
            :cssProps="{
              'font-size': '1.5rem',
              'letter-spacing': '0.1rem',
              'width': '30rem',
              'margin-top': '5rem',
            }"
          />
        </div>
      </div>
      <div class="section-col section-col--6 map-col">
        <div class="section-content">
          <Map />
          <!-- <img src="@img/map-placeholder.png" alt=""> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@component/globals/SectionTitle.vue'
import Button from '@component/globals/Button.vue'
import Map from '@component/globals/Map.vue'

const handleClick = () => {
  console.log('I have been clicked')
}
</script>

<style lang="scss" scoped>
.page-section {
  overflow: hidden;

  .section-col {

    &:last-of-type {
      height: 100vh;
      width: 100%;
      
      &.map-col {
        padding: 0;
      }

      .section-content {
        height: 100%;
        width: 100%;
      }
  
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

</style>