<template>
  <div
    class="vuecordion-item"
    ref="thisItem"
  >
    <div
      @click="$emit('toggleOpen', index)"
      class="vuecordion-title bg-clr-blue"
    >
      <h3 class="title text-white">{{ data.position }} @ <span class="text-clr-400">{{ data.company }}</span></h3>
      <h3 class="date text-white">{{  data.date }}</h3>
      <i
        v-if="isOpen"
        class="fa-sharp fa-solid fa-minus text-clr-400"
      ></i>
      <i
        v-else
        class="fa-sharp fa-solid fa-plus text-clr-400"
      ></i>
    </div>
    <div class="vuecordion-body bg-clr-600">
      <div class="vuecordion-body--inner">
        <div class="location">
          <i class="fa-sharp fa-regular fa-map-marker-alt text-clr-orange"></i>
          <h4 class="text-white">{{ data.location }}</h4>
        </div>
        <p class="description text-clr-200">{{ data.description }}</p>
        <div class="skills">
          <div
            v-for="skill in data.skills"
            :key="skill"
            class="text-white bg-clr-400"
          >
            <p class="text-center">{{ skill }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const thisItem = ref(null)
const isOpen = ref(props.data.isOpen)

watch(() => props.data.isOpen, (cur, prev) => {
  isOpen.value = cur
})
</script>

<style lang="scss" scoped>
  .vuecordion-item {

    &.tab-active {
      .vuecordion-body {
        max-height: 100vh;
        opacity: 1;
        margin-bottom: 3.2rem;
        transition: all 0.2s linear;
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
      margin-top: 1.5rem;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0.2rem 0.2rem 8rem rgba(0, 0, 0, 0.2);
      transition: all 0.4s linear;

      &--inner {
        padding-inline: 2rem;
        padding-block: 1.5rem;
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