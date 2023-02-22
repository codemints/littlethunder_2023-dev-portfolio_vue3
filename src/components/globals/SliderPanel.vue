<template>
  <div class="slider-panel">
    <div class="panel-heading">
      <p class="text-clr-blue">featured product</p>
    </div>
    <div class="panel-details">
      <div class="panel-title">
        <h3 class="text-white">{{ title }}</h3>
      </div>
      <div class="panel-icons">
        <a :href="links.repo" target="_blank">
          <i class="fa-brands fa-github text-clr-200 hover:text-clr-400"></i>
        </a>
        <a :href="links.site" target="_blank">
          <i class="fa-sharp fa-solid fa-arrow-up-right-from-square text-clr-blue hover:text-clr-400"></i>
        </a>
      </div>
    </div>
    <div class="panel-body">
      <img :src="img" alt="" draggable="false">
      <div class="panel-description bg-clr-400">
        <slot />
      </div>
    </div>
    <div class="panel-tech">
      <ul>
        <li
        v-for="skill in skills"
        key="skill"
        class="text-clr-orange">
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  links: {
    type: Object,
    required: true
  },
  skills: {
    type: Array,
    required: true
  }
})

</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
.slider-panel {
  max-width: 48rem;
  
  .panel-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      line-height: 1;
    }

    i {
      font-size: 2.1rem;
      transition: all 0.2s ease;

      &:last-of-type {
        margin-left: 1rem;
      }
    }
  }

  .panel-body {
    margin-top: 1.5rem;
    // cursor: grab;

    &:active {
      // cursor: grabbing;
    }

    .panel-description {
      position: relative;
      width: 85%;
      min-height: 12rem;
      text-align: center;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-inline: auto;
      margin-top: -4rem;
      box-shadow: 0.5rem 0.5rem 0.8rem rgba(0, 0, 0, 0.35);
    }
  }

  .panel-tech {
    margin-top: 1.5rem;

    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;

      li {
        font-size: 1.2rem;
      }
    }
  }
}

</style>