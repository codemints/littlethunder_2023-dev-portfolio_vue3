<template>
  <section id="section__expertise" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Expertise" />
          <div class="skillcard-wrapper">
            <div class="skillcard-container">
              <SkillCard
              title="Graphic Design"
              :skills="propData.focus.design"
              :tools="propData.tools.design"
              icon="fa-sharp fa-solid fa-pen-nib"
              >
                <p class="text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </SkillCard>
              <SkillCard
              title="Frontend Dev"
              :skills="propData.focus.dev"
              :tools="propData.tools.dev"
              icon="fa-sharp fa-solid fa-code"
              >
                <p class="text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </SkillCard>
              <SkillCard
              title="Photography"
              :skills="propData.focus.photo"
              :tools="propData.tools.photo"
              icon="fa-sharp fa-solid fa-aperture"
              >
                <p class="text-clr-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </SkillCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@comps/globals/SectionTitle.vue'
import SkillCard from '@comps/globals/SkillCard.vue'

const propData = {
  focus: {
    design: [
      'UX',
      'UI',
      'Web Design',
      'Logo Design',
    ],
    dev: [
      'HTML',
      'Sass',
      'Vue',
      'React',
      'Firebase',
    ],
    photo: [
      'Landscape',
      'Portrait',
      'Macro',
      'Street',
    ],
  },
  tools: {
    design: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Adobe XD',
      'Figma',
      'Canva'
    ],
    dev: [
      'VS Code',
      'Git',
      'Vite',
      'Wordpress',
      'Netlify',
      'Github',    ],
    photo: [
      'Canon EOS 5D Mark IV',
      'Canon L-Series Lenses',
      'Adobe Lightroom',
      'Capture One Pro',
    ],
  },
}
</script>

<style lang="scss" scoped>
.skillcard-wrapper {
  
  .skillcard-container {
    display: flex;
    flex-flow: row wrap;
    margin-top: 3.6rem;

    > div {
      flex: 1 1 33%;
      min-width: 35rem;
    }
  }
}
</style>