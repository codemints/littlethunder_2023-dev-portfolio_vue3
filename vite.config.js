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
      '@style': path.resolve(__dirname, './src/assets/scss'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@ico/fontawesome.scss";
  //         @import "@ico/brands.scss";
  //         @import "@ico/sharp-regular.scss";
  //         @import "@ico/sharp-solid.scss";
  //         @import "@style/main.scss";
  //         @import "@style/core/_typography.scss";
  //         `
  //     }
  //   }
  // },
})
