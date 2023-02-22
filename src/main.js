import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Font Awesome loaded
import '@ico/fontawesome.scss'
import '@ico/brands.scss'
import '@ico/sharp-regular.scss'
import '@ico/sharp-solid.scss'

import '@style/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')