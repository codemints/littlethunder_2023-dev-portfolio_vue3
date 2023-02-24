<template>
  <section id="section__work" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Work" />
          <div class="content-wrapper panel-wrapper">
            <SliderPanel
              title="GitHub DevFinder"
              img="./src/assets/img/project_03.jpg"
              :links="propData.links.devFinder"
              :skills="propData.skills.devFinder"
            >
              <p class="text-clr-400 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </SliderPanel>
            
            <SliderPanel
              title="PokeDex"
              img="./src/assets/img/project_02.jpg"
              :links="propData.links.pokeDex"
              :skills="propData.skills.pokeDex"
            >
              <p class="text-clr-400 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </SliderPanel>
            
            <SliderPanel
              title="VueDrop"
              img="./src/assets/img/project_01.jpg"
              :links="propData.links.vueDrop"
              :skills="propData.skills.vueDrop"
            >
              <p class="text-clr-400 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </SliderPanel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionTitle from '@comps/globals/SectionTitle.vue'
import SliderPanel from '@comps/globals/SliderPanel.vue'

const propData = {
  skills: {
    devFinder: ['HTML', 'CSS', 'Vue3', 'Vite', 'Netlify', 'GitHub API', 'Axios'],
    vueDrop: ['HTML', 'Sass', 'Vue3', 'Vite', 'Netlify', 'Custom Drag & Drop'],
    pokeDex: ['HTML', 'Tailwind', 'React', 'Vite', 'Netlify', 'PokeAPI'],
  },
  links: {
    devFinder: {
      site: 'https://vue3-github-usersearch.netlify.app/',
      repo: 'https://github.com/codemints/vue3-github-search',
    },
    vueDrop: {
      site: 'https://vuedrop.netlify.app/',
      repo: 'https://github.com/codemints/vuedrop',
    },
    pokeDex: {
      site: 'https://codemints-pokedex.netlify.app/',
      repo: 'https://github.com/codemints/pokedex',
    },
  }
}
</script>
<style lang="scss" scoped>
.panel-wrapper {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>