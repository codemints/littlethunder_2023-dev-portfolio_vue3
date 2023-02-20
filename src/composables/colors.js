import { reactive } from 'vue'

export const themeColors = reactive({
  socialIcons: 'text-clr-200 hover:text-clr-blue',
  themeSwitcher: {
    'false': 'text-clr-400',
    'true': 'text-clr-200',
    'background': 'bg-clr-800',
    'main': 'bg-clr-blue',
    'static': 'bg-clr-400',
  },
})