<template>
<div
  v-if="toastData.show"
  class="toast__overlay"
></div>
<Transition name="show">
  <div
    v-if="toastData.show"
    class="[ toast__container ] [ bg-clr-100 dark:bg-clr-600 border-clr-orange dark:border-clr-blue text-center ]"
  >
    <h2 class="text-clr-orange dark:text-clr-blue">ERROR!</h2>
    <p class="text-clr-400 dark:text-clr-200 font-body">{{ toastData.message }}</p>
  </div>
</Transition>
</template>

<script setup>
import { defineProps, onMounted, watch } from 'vue'
const props = defineProps({
  toastData: {
    type: Object,
    required: true,
  },
})

watch(() => props.toastData.show, (newVal) => {
  if ( newVal ) {
    document.body.classList.add('toast--active')
    setTimeout(() => {
      props.toastData.show = false
      document.body.classList.remove('toast--active')
    }, 2750)
  }
})
</script>

<style lang="scss" scoped>
@use "@style/abstracts/variables" as *;

.toast__overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
}
.toast__container {
  $width: 45rem;
  $height: 15rem;

  position: fixed;
  top: calc(100vh / 2 - ($height / 2));
  left: calc(100vw / 2 - ($width / 2));

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: $width;
  height: $height;

  padding: 2rem;
  border-style: solid;
  border-width: 0.24rem;
  box-shadow: 0.24rem 0.24rem 0.5rem rgba(0, 0, 0, 0.25);
  z-index: 10000;

  h2 {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: 0.1rem
  }
}

.show-enter-active {
  animation: wobble 0.5s ease-in-out;
}
.show-leave-to {
  transform: translateY(-6rem);
  opacity: 0;
}
.show-leave-active {
  transition: all 0.3s ease-in-out;
}

@keyframes wobble {
  0% { transform: translateY(-6rem); opacity: 0 }
  50% { transform: translateY(0); }
  60% { transform: translateX(1rem); }
  65% { transform: translateX(-1rem); }
  70% { transform: translateX(0.8rem); }
  75% { transform: translateX(-0.8rem); }
  80% { transform: translateX(0.6rem); }
  85% { transform: translateX(-0.6rem); }
  90% { transform: translateX(0.4rem); }
  95% { transform: translateX(-0.4rem); }
  100% { transform: translateX(0); }
}
</style>