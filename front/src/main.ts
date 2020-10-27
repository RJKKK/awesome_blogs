import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './index.css'
import router from "./router";

createApp(App).use(router).mount('#app')
