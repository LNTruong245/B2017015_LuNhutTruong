import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
const vm = createApp(App).use(createPinia()).use(router).mount("#app")

export default vm;