<template>
  <section id="section__work" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Work" />
          <div
            v-if="mobileStore.isMobile"
            class="content-wrapper panel-wrapper"
          >
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
            <div ref="sliderContainer" class="slider-container">
              <div class="slides">
                <Flicking
                  ref="slider"
                  :options="{
                    align: 'center',
                    circular: true,
                    defaultIndex: 1,
                    gap: 50,
                  }"
                  :plugins="plugins"
                >
                  <div class="slider-panel slider-panel-1">
                    <h1>Div 1</h1>
                  </div>
                  <div class="slider-panel slider-panel-2">
                    <h1>Div 2</h1>
                  </div>
                  <div class="slider-panel slider-panel-3">
                    <h1>Div 3</h1>
                  </div>
                </Flicking>
              </div>

              <div
                v-if="isReady"
                class="slider-controls"
              >
                <div
                  @click="(e) => changeSlide(e)"
                  class="slider-arrow slider-arrow-prev"
                  data-slide="prev"
                >
                  <i class="fa-sharp fa-solid fa-chevron-left text-clr-blue dark:text-clr-orange hover:text-clr-100 dark:hover:text-clr-400"></i>
                </div>
                <div class="slider-pagination">
                  <button
                  v-for="(slide, index) in slider.panels"
                  @click="(e) => changeSlide(e, index)"
                  :key="index"
                  :class="`slider-pagination--item-${index + 1}`"
                  class="slider-pagination--item bg-clr-100 dark:bg-clr-400"
                  data-slide="pagination"
                  ></button>
                </div>
                <div
                  @click="(e) => changeSlide(e)"
                  class="slider-arrow slider-arrow-next"
                  data-slide="next"
                >
                  <i class="fa-sharp fa-solid fa-chevron-right text-clr-blue dark:text-clr-orange hover:text-clr-100 dark:hover:text-clr-400"></i>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMobileStore } from '@store/mobile.js'
import SectionTitle from '@component/globals/SectionTitle.vue'
import SliderPanel from '@component/globals/SliderPanel.vue'
import Flicking from "@egjs/vue3-flicking";
import { AutoPlay, Sync, Pagination, Arrow, Perspective } from "@egjs/flicking-plugins";
import siteColors from '@lib/site-colors.js'
import { useDarkModeStore } from '@store/darkmode.js'

const mobileStore = useMobileStore()
const darkModeStore = useDarkModeStore()
const sliderContainer = ref(null)
const slider = ref(null)
const isReady = ref(false)
const plugins = [
  // new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  // new Arrow({ parentEl: controls }),
  // new Pagination({ type: 'bullet' }),
  // new Perspective({ rotate: 0.45, perspective: 1000 }),
];

const changeSlide = (e, index) => {
  const dataSlide = e.currentTarget.dataset.slide
  if ( dataSlide === 'prev' ) slider.value.prev()
  if ( dataSlide === 'next' ) slider.value.next()
  if ( dataSlide === 'pagination' ) slider.value.moveTo(index, 1000)

  // slider.moveTo(index, 1000)
  // e.target.dataset.slide === 'prev' ? slider.value.prev() : slider.value.next()
  // const panels = slider.value.panels
  // const panelIndex = slider.value.currentPanel
  // const panelElement = slider.value.currentPanel._elProvider.element
  // panelElement.style.backgroundColor = 'pink'
}

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

const setCustomProp = () => {
  sliderContainer.value.style.setProperty(
    '--active-color',
    darkModeStore.isDark
      ? siteColors.clrOrange
      : siteColors.clrBlue
  )
}

watch(() => darkModeStore.isDark, () => {
  setCustomProp()
})

onMounted(() => {
  setCustomProp()
  window.addEventListener('load', () => isReady.value = true)
})
</script>

<style lang="scss" scoped>
.panel-wrapper {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  gap: 5rem 2rem;
}
.slider-panel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 60%;
  color: white;
  background-color: goldenrod;
  margin-right: 2rem;
}

.slider-container {
  --active-color: '';
  position: relative;

  .slides {

  }

  .slider-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    padding-inline: 2.4rem;
    margin-top: 1.8rem;

    .slider-arrow {
      font-size: 3.6rem;

      &.slider-arrow--prev {

      }
      
      &.slider-arrow--next {

      }
    }
    
    
    .slider-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .slider-pagination--item {
        height: 1.25rem;
        width: 1.25rem;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;

        &:hover {
          scale: 1.2;
          background-color: var(--active-color);
        }
      }
    }
  }
}

</style>