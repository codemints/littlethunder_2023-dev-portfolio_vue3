<template>
  <section id="section__contact" class="page-section">
    <div class="section-row section-row--fullwidth flex-wrap">
      <div class="section-col section-col--6">
        <div class="section-content">
          <SectionTitle title="Contact Me" />
          <h3 class="text-clr-blue">Available For Hire</h3>
          <p class="text-clr-400 dark:text-clr-200">Interested in having me as part of your team? Send me an email at <a href="mailto:hello@codemints.io" class="underline text-clr-blue hover:text-clr-100 dark:text-clr-orange dark:hover:text-clr-400">hello@codemints.io</a>. Thank you for visiting my portfolio. I hope you enjoyed it.</p>
        </div>
      </div>
      <div
        @mouseover="buttonsStore.toggleCursors(true)"
        @mouseout="buttonsStore.toggleCursors(false)"
        class="section-col section-col--6"
      >
        <div class="section-content">
          <Form />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@component/globals/SectionTitle.vue'
import Form from '@component/globals/Form.vue'
import { useButtonsStore } from '@store/buttons.js'

const buttonsStore = useButtonsStore()
</script>

<style lang="scss" scoped>
.page-section {
  overflow: hidden;

  .section-col {

    &:first-of-type {
      .section-content {
        max-width: 60rem;
        margin-left: auto;
      }
    }

    &:last-of-type {
      .section-content {
        max-width: 80rem;
      }
    }

    .section-content {
      // margin-inline: auto;
    }
  }
}

</style>