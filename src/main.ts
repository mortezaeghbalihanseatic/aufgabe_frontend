import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const customData = {
    API_URI: "http://localhost:1021"
  };
  
const app = createApp(App,customData)

app.use(router)

app.mount('#app')
