import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './index.css'
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App)
app.use(Antd);
app.use(router)
app.mount('#app')
