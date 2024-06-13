import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import VueDevTools from 'vite-plugin-vue-devtools'
import commonjs from 'vite-plugin-commonjs';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    commonjs(),
    vue(),
    vueJsx(),
    // VueDevTools(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.aonet.ai/', 
        changeOrigin: true,
      },
    },
  }
})
