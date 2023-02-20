import { reactive } from 'vue'

export const socialLinks = reactive([
  {
    name: 'github',
    icon: 'github-alt',
    url: 'https://www.github.com/codemints'
  },
  {
    name: 'codepen',
    icon: 'codepen',
    url: 'https://www.codepen.io/codemints'
  },
  {
    name: 'twitter',
    icon: 'twitter',
    url: 'https://twitter.com/iamcodemints'
  },
  {
    name: 'linkedin',
    icon: 'linkedin-in',
    url: 'https://www.linkedin.com/in/codemints'
  },
])

export const navLinks = reactive([
  {
    name: 'intro',
    scrollTo: 'section__intro',
    isActive: true,
  },
  {
    name: 'about',
    scrollTo: 'section__about',
    isActive: null,
  },
  {
    name: 'expertise',
    scrollTo: 'section__expertise',
    isActive: null,
  },
  {
    name: 'work',
    scrollTo: 'section__work',
    isActive: null,
  },
  {
    name: 'experience',
    scrollTo: 'section__experience',
    isActive: null,
  },
  {
    name: 'contact',
    scrollTo: 'section__contact',
    isActive: null,
  },
])