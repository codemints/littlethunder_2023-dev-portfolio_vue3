<template>
  <section id="section__expertise" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Expertise" />
          <div class="skillcard-wrapper content-wrapper">
            <div class="skillcard-container">
              <SkillCard
              title="Graphic Design"
              :skills="propData.focus.design"
              :tools="propData.tools.design"
              icon="fa-sharp fa-solid fa-pen-nib"
              >
                <p class="text-clr-400 dark:text-clr-100">I love the balance good design gives to communication.</p>
              </SkillCard>
              <SkillCard
              title="Frontend Dev"
              :skills="propData.focus.dev"
              :tools="propData.tools.dev"
              icon="fa-sharp fa-solid fa-code"
              >
                <p class="text-clr-400 dark:text-clr-100">Putting the pieces together to create function beauty in the browser.</p>
              </SkillCard>
              <SkillCard
              title="Photography"
              :skills="propData.focus.photo"
              :tools="propData.tools.photo"
              icon="fa-sharp fa-solid fa-aperture"
              >
                <p class="text-clr-400 dark:text-clr-100">I am constantly drawn to the interaction between light and shadow.</p>
              </SkillCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@component/globals/SectionTitle.vue'
import SkillCard from '@component/globals/SkillCard.vue'

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
@use '@style/abstracts/' as *;
.skillcard-wrapper {
  
  .skillcard-container {
    display: flex;
    flex-flow: row wrap;
    column-gap: 0;
    row-gap: 2rem;

    > div {
      flex: 1 1 33%;
      min-width: 28rem;
      p {
        font-family: $heading;
        font-size: 1.6rem;
      }
    }
  }
}
</style>