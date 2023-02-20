<template>
  <div
  class="floater__email-link"
  ref="emailLinkRef"
  >
    <div class="bg-clr-200"></div>
    <a href="mailto:hello@codemints.io" class="text-clr-200 hover:text-clr-blue">hello@codemints.io</a>
  </div>
  <div class="floater__page-nav">
    <div class="page-prev text-center text-clr-200 hover:text-clr-orange">
      <i class="fa-sharp fa-solid fa-arrow-up-from-line"></i>
      <p>page.scroll(prev)</p>
    </div>
    <div class="page-next text-center text-clr-200 hover:text-clr-orange">
      <i class="fa-sharp fa-solid fa-arrow-down-from-line"></i>
      <p>page.scroll(next)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const emailLinkRef = ref(null)
const getEmailLinkWidth = computed(() => {
  return emailLinkRef.value.offsetWidth
})

onMounted(() => {
  const doc = document.documentElement
  doc.style.setProperty('--email-link-width', `${getEmailLinkWidth.value}px`)
})
</script>

<style lang="scss" scoped>
$padding: 5rem;

.floater__email-link,
.floater__page-nav {
  position: fixed;
  z-index: 100;
}

.floater__email-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  top: var(--header-height);
  right: $padding;
  transform-origin: top left;
  transform: rotate(90deg) translateY(calc(var(--email-link-width) * -1));

  > div {
    height: 0.1rem;
    width: 16vh;
  }

  a {
    font-size: 1.2rem;
    line-height: 1;
  }
}

.floater__page-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: $padding;
  left: $padding;
  width: calc(100vw - $padding * 2);

  > div {
    cursor: pointer;
    
    &:last-of-type {
      margin-right: calc($padding / 2);
    }

    p {
      font-size: 1.2rem;
      line-height: 1;
      margin-top: 0.5rem;
    }
  }

  i {
    font-size: 1.6rem;
  }
}
</style>