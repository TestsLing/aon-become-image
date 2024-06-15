import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import commonjs from 'vite-plugin-commonjs';
import { createHtmlPlugin } from 'vite-plugin-html'
import fs from 'fs';

const appData = JSON.parse(fs.readFileSync('./public/templates/app.json', 'utf8'));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    commonjs(),
    vue(),
    vueJsx(),
    VueDevTools(),
    createHtmlPlugin({
      entry: '/src/main.ts',
      template: 'public/index.html',
      inject:{
        data:{
          title: appData.name,
        }
      }
    })
  ],
  base: './',
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

  ,define: {
    'process.env.appData': appData
  }
})
