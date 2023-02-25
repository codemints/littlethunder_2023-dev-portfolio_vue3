<template>
  <section id="section__experience" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Experience" />
          <div class="content-wrapper">
            <VueCordion
              :data="experienceData"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import SectionTitle from '@component/globals/SectionTitle.vue'
import VueCordion from '@component/globals/VueCordion.vue'



const experienceData = reactive([
  {
    position: 'Frontend Developer & Designer',
    company: 'MadWire',
    date: '2019 to Present',
    location: 'Fort Collins, CO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    skills: [
      'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Shopify', 'Photoshop', 'Illustrator', 'InDesign', 'Figma',
    ],
    isOpen: true
  },
  {
    position: 'Frontend Developer & Designer',
    company: 'MadWire',
    date: '2019 to Present',
    location: 'Fort Collins, CO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    skills: [
      'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Shopify', 'Photoshop', 'Illustrator', 'InDesign', 'XD', 'Figma', 'Canva'
    ],
    isOpen: false
  },
  {
    position: 'Frontend Developer & Designer',
    company: 'MadWire',
    date: '2019 to Present',
    location: 'Fort Collins, CO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    skills: [
      'JavaScript', 'PHP', 'HTML', 'CSS', 'WordPress', 'Shopify', 'Photoshop', 'Illustrator', 'InDesign', 'XD', 'Figma', 'Canva'
    ],
    isOpen: false
  }
])
</script>

<style lang="scss" scoped>

</style>