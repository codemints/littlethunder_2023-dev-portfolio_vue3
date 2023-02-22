import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@comps': path.resolve(__dirname, './src/components'),
      '@font': path.resolve(__dirname, './src/assets/fonts'),
      '@ico': path.resolve(__dirname, './src/assets/icons/fontawesome/scss'),
      '@img': path.resolve(__dirname, './src/assets/img'), 
      '@lib': path.resolve(__dirname, './src/libs'), 
      '@style': path.resolve(__dirname, './src/assets/scss'),
    },
  },
})
