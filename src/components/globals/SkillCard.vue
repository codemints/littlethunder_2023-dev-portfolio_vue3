<template>
  <div class="skillcard-card text-white">
    <div class="skillcard-header">
      <i class="skillcard-icon text-clr-blue" :class="icon"></i>
      <h3 class="skillcard-title text-clr-400 dark:text-white">{{ title }}</h3>
      <ul class="text-clr-orange">
        <li
        v-for="skill in skills"
        :key="skill"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
    <div class="skillcard-body">
      <slot />
    </div>
    <div class="skillcard-footer">
      <h4 class="text-clr-400 dark:text-white">Tools & Softward</h4>
      <ul class="text-clr-200">
        <li
        v-for="tool in tools"
        :key="tool"
        class="text-clr-400 dark:text-clr-100"
        >
          {{ tool }}
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
  skills: {
    type: Array,
    required: true
  },
  tools: {
    type: Array,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/variables' as *;
.skillcard-card {
  border: 2px solid $clr-400;
  padding-inline: 3.2rem;
  padding-block: 2rem;

  &:not(:last-child) {
    border-right-width: 0;
  }

  .skillcard-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    margin-bottom: 2rem;

    .skillcard-icon {
      font-size: 3rem;
      margin-right: 1rem;
    }

    ul {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex: 1 0 100%;

      li {
        font-size: 1.2rem;
      }
    }
  }

  .skillcard-body {
    position: relative;
    border-left: 0.175rem solid $clr-200;
    padding-left: 1.6rem;
    margin-left: 0.6rem;
    margin-top: 3.6rem;

    &:before, &:after {
      position: absolute;
      left: -1.8rem;
      color: $clr-200;
      font-size: 1.5rem;
      font-family: $body;
    }

    &:before {
      content: '<h4>';
      top: -2.4rem;
    }
    
    &:after {
      content: '</h4>';
      bottom: -2.8rem;
    }
  }

  .skillcard-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3.6rem;

    h4 {
      font-size: 1.8rem;
    }

    ul {
      font-size: 1.5rem;
      list-style-type: disc;
      margin-top: 1rem;
    }
  }
}

.dark {
  .skillcard-card {
    border-color: $clr-100;
  }
  .skillcard-body {
    border-color: $clr-400;
    
    &:before, &:after {
      color: $clr-400;
    }
  }
}
</style>