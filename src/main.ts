import './assets/main.css'

import { createApp } from 'vue'
import { Uploader } from 'vant';

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(router)
app.use(Uploader)

app.mount('#app')
