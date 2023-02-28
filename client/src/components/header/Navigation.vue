<template>
  <div class="nav-content__wrapper">
    <div ref="navShuttleRef" class="nav-shuttle border-b-2 border-clr-orange bg-clr-100 dark:border-clr-blue dark:bg-clr-600"></div>
    <div
    @click="handleResize"
    class="nav-content__toggle"
    >
      <i
        v-if="!headerStore.isCollapsed"
        class="fa-sharp fa-solid fa-arrow-up-to-line text-clr-blue hover:text-clr-600"
      ></i>
      <i
        v-if="headerStore.isCollapsed"
        class="fa-sharp fa-solid fa-arrow-down-to-line text-clr-blue hover:text-clr-600"
      ></i>
    </div>

    <nav class="nav-content__menu">
      <ul ref="navLinksRef" class="nav-links"
      >
        <li
          v-for="(item, index) in navStore.navItems"
          :key="item.name"
          class="nav-links__item"
        >
          <a
            @mouseover="handleShuttle"
            @mouseout="handleShuttle"
            :href="`#${item.scrollTo}`"
            class="nav-links__link text-clr-200 hover:text-clr-400 dark:hover:text-white"
            :class="{'nav-links__link--active': item.isActive}"
          >
            <span class="link-before">//</span>
              {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="nav-content__button">
      <Button
        ref="contactButtonRef"
        @buttonClicked=""
        :href="resumeUrl"
        download="dLittleThunder_resume.pdf"
        id="resume__button"
        text="resumé"
        hovText="resumé"
        :classNames="[ 'bg-clr-blue', 'hover:bg-clr-600', 'text-white', 'hover:text-white', 'font-hf', 'uppercase']"
        :cssProps="{
          fontSize: '1.5rem',
          letterSpacing: '0.1rem',
          paddingInline: '1.2rem',
          paddingBlock: '0.6rem',
          transition: 'all 0.2s ease-in-out',
        }"
        borderColor="clrBlue"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNavStore } from '@store/navigation.js'
import { useHeaderStore } from '@store/header.js'
import Button from '@component/globals/Button.vue'

const navStore = useNavStore()
const headerStore = useHeaderStore()

const resumeUrl = '@/assets/docs/resume.pdf'

const navLinksRef = ref(null)
const navShuttleRef = ref(null)

const handleResize = () => {
  headerStore.isCollapsed = !headerStore.isCollapsed
}

const setShuttlePosition = () => {
  const shuttle = navShuttleRef.value
  navStore.navItems.forEach((item, index) => {
    const el = navStore.links[index]
    const position = el.getBoundingClientRect().left
    const width = el.getBoundingClientRect().width
    if (item.isActive) {
      shuttle.style.left = `${position}px`
      shuttle.style.width = `${width}px`
    }
  })
  shuttle.classList.add('is-positioned')
}

const handleShuttle = (e) => {
  const shuttle = navShuttleRef.value
  const items = navStore.navItems
  const links = navLinksRef.value.children

  if ( e.type === 'mouseover' ) {
    const position = e.target.getBoundingClientRect().left 
    const width = e.target.getBoundingClientRect().width
    shuttle.style.left = `${position}px`
    shuttle.style.width = `${width}px`

    items.forEach((item, index) => {
      if ( item.isActive ) {
        const activeLink = links[index].firstElementChild
        const hoveredLink = e.currentTarget
        
        if ( activeLink.href !== hoveredLink.href ) {
          activeLink.style.color = '#9EA7B3'
        }
      }
    })
  } else {
    setShuttlePosition()
    items.forEach((item, index) => {
      if ( item.isActive ) {
        links[index].firstElementChild.style.color = ''
      }
    })
  }
}

const scrollSpy = () => {
  navStore.navItems.forEach((item, index) => {
    const section = navStore.sections[index]
    const sectionTop = item.top
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 100 && window.pageYOffset < sectionTop + sectionHeight - 100) {
      item.isActive = true
      navStore.currentSection = index
      navStore.prevSection = index - 1
      navStore.nextSection = index + 1
      setShuttlePosition()
    } else {
      item.isActive = false
    }

  })
}

onMounted(() => {
  navStore.links = Array.from(navLinksRef.value.children)
  navStore.links[0].firstElementChild.style.color = '#9EA7B3'
  window.addEventListener('scroll', scrollSpy)
  window.addEventListener('load', () => {
    setShuttlePosition()
    navStore.links[0].firstElementChild.style.color = ''
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollSpy)
})
</script>

<style lang="scss" scoped>
@use '@style/abstracts/_variables.scss' as *;

.nav-content__wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    flex: 1 1 33.3333%;
  }

  .nav-shuttle {
    position: absolute;
    top: 0;
    left: 0;
    width:5rem;
    height: 100%;
    opacity: 0;

    &.is-positioned {
      opacity: 1;
      transition: left 0.3s cubic-bezier(.89,-0.48,.59,1.5);
    }
  }
  
  .nav-content__toggle {
    padding-inline: 5rem;

    i {
      font-size: 1.6rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }

  .nav-content__menu {
    position: relative;
    height: 60px;

    & :is(.nav-links, .nav-links__item, .nav-links__link) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }


    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;

      .nav-links__item {
        counter-increment: number;

        .nav-links__link {
          position: relative;
          font-family: $heading;
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
          padding-inline: 1.6rem;
          padding-top: 1rem;
          transition: color 0.2s ease-in-out;

          &.nav-links__link--active {
            color: $clr-400;

            &::before {
              color: $clr-orange;
            }

            .link-before {
              color: $clr-orange;
            }
          }
          
          &:hover {
            &::before {
              color: $clr-orange;
            }
            .link-before {
              color: $clr-orange;
            }
          }

          &::before {
            content: "0" counter(number);
            display: inline-block;
            position: absolute;
            top: 1.25rem;
            right: 1.5rem;
            font-family: $body;
            font-size: 1.1rem;
            font-weight: 800
          }

          .link-before {
            margin-right: 0.2rem;
            pointer-events: none;
          }
        }
      }
    }
  }

  .nav-content__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-inline: 5rem;
  }
}

.dark {
  .nav-links__link--active {
    color: white !important;

    &::before {
      color: $clr-blue !important;
    }

    .link-before {
      color: $clr-blue !important;
    }
  }

  .nav-links__link {
    &:hover {
      &::before {
        color: $clr-blue !important;
      }
      .link-before {
        color: $clr-blue !important;
      }
    }
  }
}
</style>