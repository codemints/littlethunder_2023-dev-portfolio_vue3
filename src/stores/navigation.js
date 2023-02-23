import { defineStore } from 'pinia'

export const useNavStore = defineStore('navigation', {
  state: () => {
    return {
      navItems: [
        {
          name: 'intro',
          scrollTo: 'section__intro',
          isActive: true,
          top: null,
        },
        {
          name: 'about',
          scrollTo: 'section__about',
          isActive: null,
          top: null,
        },
        {
          name: 'expertise',
          scrollTo: 'section__expertise',
          isActive: null,
          top: null,
        },
        {
          name: 'work',
          scrollTo: 'section__work',
          isActive: null,
          top: null,
        },
        {
          name: 'experience',
          scrollTo: 'section__experience',
          isActive: null,
          top: null,
        },
        {
          name: 'contact',
          scrollTo: 'section__contact',
          isActive: null,
          top: null,
        },
      ],
      sections: null,
      links: null,
      prevSection: null,
      currentSection: 0,
      nextSection: 1,
      scrolled: 0,
    }
  },
})