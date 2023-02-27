<template>
  <div
    ref="panel"
    class="vuecordion-item"
  >
    <div
      @click="$emit('toggleOpen', [ panel, panelIndex ])"
      class="vuecordion-title bg-clr-blue"
    >
      <h3 class="title text-white">{{ panelData.position }} @ <span class="text-clr-400">{{ panelData.company }}</span></h3>
      <h3 class="date text-white">{{  panelData.date }}</h3>
      <i
        class="fa-sharp fa-solid fa-minus text-clr-400"
      ></i>
      <i
        class="fa-sharp fa-solid fa-plus text-clr-400"
      ></i>
    </div>
    <div
      ref="panelBody"
      class="vuecordion-body dark:bg-clr-600"
    >
      <div class="vuecordion-body--inner">
        <div class="location">
          <i class="fa-sharp fa-regular fa-map-marker-alt text-clr-orange"></i>
          <h4 class="text-clr-400 dark:text-white">{{ panelData.location }}</h4>
        </div>
        <p class="description text-clr-200">{{ panelData.description }}</p>
        <div class="skills">
          <div
            v-for="skill in panelData.skills"
            :key="skill"
            class="text-white bg-clr-200 dark:bg-clr-400"
          >
            <p class="text-center">{{ skill }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useAccordionStore } from '@store/accordion.js'

const accordionStore = useAccordionStore()
const { setPanelHeight, setActivePanel } = accordionStore
const panel = ref(null)
const panelBody = ref(null)
const panelBodyHeight = ref(null)

const props = defineProps({
  panelData: {
    type: Object,
    required: true,
  },
  panelIndex: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  window.addEventListener('load', () => {
    if ( props.panelData.isOpen ) setActivePanel(props.panelIndex)
    panelBodyHeight.value = panelBody.value.clientHeight
    panel.value.style.setProperty('--panel-height', `${panelBodyHeight.value}px`)
    setPanelHeight(props.panelIndex, panelBodyHeight.value)
    if ( !props.panelData.isOpen ) {
      panel.value.classList.add('is-closed')
    }
    panel.value.style.opacity = 1
  })
})
</script>

<style lang="scss" scoped>
  .vuecordion-item {
    opacity: 0;

    &.is-closed {

      .vuecordion-body {
        max-height: 0;
        overflow: hidden;
        margin-bottom: 0;
      }
    }

    .vuecordion-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-inline: 2rem;
      padding-block: 1.5rem;
      cursor: pointer;

      h3 {
        font-size: 1.8rem;
        text-transform: uppercase;
        line-height: 1;
        margin: 0;
        padding: 0;
      }

      .date {
        margin-left: auto;
      }

      i {
        margin-left: 1.5rem;
      }
    }

    .vuecordion-body {
      max-height: var(--panel-height);
      overflow: hidden;
      margin-bottom: 2.4rem;
      margin-top: 1.5rem;
      box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
      transition: all 0.2s linear;

      &--inner {
        padding-inline: 2rem;
        padding-block: 1.5rem;
      }

      .location {
        display: flex;
        align-items: center;

        i {
          margin-right: 1rem;
        }
      }

      .description {
        margin-top: 1.5rem;
      }

      .skills {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        gap: 1rem;
        
        > div {
          flex: 1 0 auto;
          padding-inline: 1.2rem;
          padding-block: 0.6rem;
          border-radius: 100rem;
          margin-top: 2rem;
          
          p {
            font-size: 1.2rem;
          }
        }
      }
    }

    i {
      font-size: 2.4rem;
    }

    li {
      font-size: 1.4rem;
      line-height: 1;
      border-radius: 100rem;
      padding-inline: 1.2rem;
      padding-block: 0.6rem;
      margin: 0;
      padding: 0;
    }
  }
</style>