import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
      '@component': path.resolve(__dirname, './src/components'),
      '@compose': path.resolve(__dirname, './src/composables'),
      '@doc': path.resolve(__dirname, './src/assets/docs'),
      '@font': path.resolve(__dirname, './src/assets/fonts'),
      '@ico': path.resolve(__dirname, './src/assets/icons/fontawesome/scss'),
      '@img': path.resolve(__dirname, './src/assets/img'), 
      '@lib': path.resolve(__dirname, './src/libs'),
      '@store': path.resolve(__dirname, './src/stores'),
      '@style': path.resolve(__dirname, './src/assets/scss'),
    },
  },
  server: {
    proxy: {
      '/api/google_map': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
      '/api/form_submission': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    }
  },
})