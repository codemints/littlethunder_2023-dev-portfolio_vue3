<template>
  <section id="section__contact" class="page-section">
    <div class="section-row section-row--fullwidth flex-wrap">
      <div class="section-col section-col--6 section-col--center">
        <div class="section-content">
          <SectionTitle title="Contact Me" />
          <h3 class="text-clr-blue">Available For Hire</h3>
          <p class="text-clr-400 dark:text-clr-200">Interesting in having me as part of your team? Send me an email at <a href="mailto:hello@codemints.io" class="underline text-clr-blue hover:text-clr-100 dark:text-clr-orange dark:hover:text-clr-400">hello@codemints.io</a>. Thank you for visiting my portfolio. I hope you enjoyed it.</p>
          <Button
            @buttonClicked="handleContact"
            linkTo="mailto:hello@codemints.io"
            target="_blank"
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
          <!-- <Map /> -->
          <Form />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@component/globals/SectionTitle.vue'
import Button from '@component/globals/Button.vue'
import Map from '@component/globals/Map.vue'
import Form from '@component/globals/Form.vue'

const handleContact = (e) => {
  console.log(e.target)
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