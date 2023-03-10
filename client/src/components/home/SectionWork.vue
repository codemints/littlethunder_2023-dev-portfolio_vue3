<template>
  <section id="section__work" class="page-section">
    <div class="section-row">
      <div class="section-col section-col--12">
        <div class="section-content">
          <SectionTitle title="My Work" />
            <div ref="sliderContainer" class="slider-container">
              <div
                @mouseover="(e) => buttonsStore.toggleCursors(true)"
                @mouseout="(e) => buttonsStore.toggleCursors(false)"
                class="slides"
              >
                <Flicking
                  ref="slider"
                  :options="{
                    align: 'center',
                    circular: true,
                    defaultIndex: center,
                    gap: 50,
                    horizontal: true,
                    noPanelStyleOverride: true,
                  }"
                  :plugins="plugins"
                  @changed="changeSlide"
                >
                  <div
                    v-for="(slide, index) in experienceData"
                    :key="slide.title"
                    :ref="el => panelItems[index] = el"
                    class="slider-panel"
                    :class="`slider-panel--${index + 1}`"
                  >
                    <div class="panel-title">
                      <h4 class="text-clr-orange dark:text-clr-blue">Featured Project</h4>
                      <div class="panel-details">
                        <div>
                          <h3 class="text-clr-400 dark:text-white">{{ slide.title }}</h3>
                        </div>
                        <div>
                          <a :href="slide.repo" target="_blank">
                            <i class="fa-brands fa-github text-clr-400 hover:text-clr-200 dark:text-clr-200 dark:hover:text-clr-400"></i>
                          </a>
                          <a :href="slide.site" target="_blank">
                            <i class="fa-sharp fa-solid fa-arrow-up-right-from-square text-clr-orange hover:text-clr-blue dark:text-clr-blue dark:hover:text-clr-400"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <img :src="slide.image" :alt="slide.title" draggable="false" class="border-clr-100 dark:border-clr-400 border-solid border-4"/>
                    <div class="panel-content bg-clr-100 dark:bg-clr-400">
                      <p class="text-clr-400 dark:text-clr-200 text-center">{{ slide.description }}</p>
                    </div>
                    <div class="panel-skills">
                      <ul>
                        <li
                          v-for="(skill, index) in slide.skills"
                          :key="skill"
                          class="text-clr-blue dark:text-clr-orange"
                        >{{ skill }}</li>
                      </ul>
                    </div>
                  </div>
                </Flicking>
              </div>

              <div
                v-if="isReady"
                class="slider-controls"
              >
                <div
                  @click="slider.prev()"
                  class="slider-arrow slider-arrow-prev"
                  data-slide="prev"
                >
                  <i class="fa-sharp fa-solid fa-chevron-left text-clr-blue dark:text-clr-orange hover:text-clr-100 dark:hover:text-clr-400"></i>
                </div>
                <div class="slider-pagination">
                  <button
                  v-for="(slide, index) in slider.panels"
                  @click="() => paginationClick(index)"
                  :key="index"
                  :ref="el => paginationItems[index] = el"
                  :class="`slider-pagination--item-${index + 1}`"
                  class="slider-pagination--item bg-clr-100 dark:bg-clr-400"
                  data-slide="pagination"
                  ></button>
                </div>
                <div
                  @click="slider.next()"
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
import { ref, onMounted, watchEffect, computed } from 'vue'
import SectionTitle from '@component/globals/SectionTitle.vue'
import siteColors from '@lib/site-colors.js'
import experienceData from '@lib/experience.js'
import { useDarkModeStore } from '@store/darkmode.js'
import { useButtonsStore } from '@store/buttons.js'

import Flicking from "@egjs/vue3-flicking";
import { AutoPlay, Sync, Pagination, Arrow, Perspective } from "@egjs/flicking-plugins";
const plugins = [
  // new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  // new Arrow({ parentEl: controls }),
  // new Pagination({ type: 'bullet' }),
  // new Perspective({ rotate: 0.45, perspective: 1000 }),
];

const darkModeStore = useDarkModeStore()
const buttonsStore = useButtonsStore()
const sliderContainer = ref(null)
const paginationItems = ref([])
const panelItems = ref([])
const slider = ref(null)
const useIndex = ref(0)
const isReady = ref(false)
const center = ref(0)

const paginationClick = (index) => {
  slider.value.moveTo(index, 1000)
}

const changeSlide = (e) => {
  paginationItems.value.forEach((item, i) => {
    i === e.index
      ? item.classList.add('is-active')
      : item.classList.remove('is-active')
  })
}

const setCustomProp = () => {
  sliderContainer.value.style.setProperty(
    '--active-color',
    darkModeStore.isDark
      ? siteColors.clrOrange
      : siteColors.clrBlue
  )
}

const getCenterIndex = computed(() => {
  return Math.floor((slider.value.panels.length / 2) + 1);
});

watchEffect(() => {
  setCustomProp()
  useIndex.value = slider.value.defaultIndex
  if( paginationItems.value.length > 0 ) {
    const index = slider.value.currentPanel._index
    paginationItems.value[index].classList.add('is-active')
  }
}, {
  flush: 'post',
  reactive: [darkModeStore.isDark]
})

onMounted(() => {
  setCustomProp()
  center.value = getCenterIndex.value
  window.addEventListener('load', () => {
    isReady.value = true
  })
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;

.slider-container {
  --active-color: '';
  position: relative;
  max-width: 84vw;
  height: auto;
  margin-top: 3.5rem;

  @media (min-width: 768px) {
    max-width: 96rem;
  }

  .slides {

    .slider-panel {
      width: 100%;
      margin-right: 7.5rem;
      cursor: grab;

      @media (min-width: 768px) {
        width: 60%;
      }

      &:active {
        cursor: grabbing;
      }

      .panel-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-content {
        padding: 2.4rem;

        p {
          font-size: 1.5rem;
        }
      }

      img {
        margin-inline: auto;
        margin-top: 2.4rem;
      }

      h4 {
        font-family: $body;
        font-size: 1.4rem;
      }

      h3 {
        font-size: clamp(2.8rem, 2vw, 3.6rem);
        line-height: 1;
      }

      i {
        font-size: clamp(1.8rem, 2vw, 2.4rem);

        &:last-of-type {
          margin-left: 1rem;
        }
      }

      .panel-skills {
        margin-top: 1.8rem;
        ul {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;

          li {
            font-size: clamp(1.2rem, 2vw, 1.4rem);
          }
        }
      }
    }
  }

  .slider-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-inline: 2.4rem;
    margin-top: 4.8rem;

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
        transition: all 0.1s ease-in-out;

        &:hover, &.is-active {
          scale: 1.2;
          background-color: var(--active-color);
        }
      }
    }
  }
}

</style>