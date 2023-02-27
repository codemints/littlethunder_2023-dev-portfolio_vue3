<template>
  <div
    ref="emailLinkRef"
    :class="{ 'is-collapsed': headerStore.isCollapsed }"
    class="floater__email-link"
  >
    <div class="bg-clr-200"></div>
    <a href="mailto:hello@codemints.io" class="text-clr-200 hover:text-clr-blue">hello@codemints.io</a>
  </div>
  <div
    ref="floaterNavRef"
    class="floater__page-nav"
  >
    <div
    @click="handleNavigation"
    :class="{ 'is-hidden': navStore.prevSection < 0 || navStore.prevSection === null }"
    class="page-prev text-center text-clr-200 hover:text-clr-blue dark:hover:text-clr-orange"
    >
    <i class="fa-sharp fa-solid fa-arrow-up-from-line"></i>
    <p>page.scroll(prev)</p>
  </div>
  <div
    @click="handleNavigation"
    :class="{ 'is-hidden': navStore.nextSection > navStore.navItems.length - 1 }"
    class="page-next text-center text-clr-200 hover:text-clr-blue dark:hover:text-clr-orange"
    >
      <i class="fa-sharp fa-solid fa-arrow-down-from-line"></i>
      <p>page.scroll(next)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHeaderStore } from '@store/header.js'
import { useNavStore } from '@store/navigation.js'
const headerStore = useHeaderStore()
const navStore = useNavStore()

const emailLinkRef = ref(null)
const floaterNavRef = ref(null)

const getEmailLinkWidth = computed(() => {
  return emailLinkRef.value.offsetWidth
})

const handleNavigation = (e) => {
  if ( e.currentTarget.classList.contains('page-prev') ) {
    if ( navStore.prevSection < 0 || navStore.prevSection === null ) return
    const top = navStore.navItems[navStore.prevSection].top
    window.scrollTo(0, top)
  }
  if ( e.currentTarget.classList.contains('page-next') ) {
    if ( navStore.nextSection > navStore.navItems.length - 1 ) return
    const top = navStore.navItems[navStore.nextSection].top
    window.scrollTo(0, top)
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.body.offsetHeight
  const footer = document.querySelector('.footer__main')

  const start = documentHeight - (scrollPosition + windowHeight)

  if (scrollPosition + windowHeight >= documentHeight - footer.offsetHeight) {
    floaterNavRef.value.style.bottom = `${375 - start}px`
  } else {
    floaterNavRef.value.style.bottom = '5rem'
  }
}

onMounted(() => {
  const root = document.documentElement

  root.style.setProperty('--email-link-width', `${getEmailLinkWidth.value}px`)

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  top: var(--headerVh);
  right: $padding;
  transform-origin: top left;
  transform: rotate(90deg) translateY(calc(var(--email-link-width) * -1));
  transition: top 0.3s cubic-bezier(1,.03,.3,.93);

  &.is-collapsed {
    top: calc(var(--headerVh) - var(--headerInnerVh));
  }

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

    &.is-hidden {
      // opacity: 0;
    }
    
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