import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import VueMarzipano from "@VueMarzipano/index.ts";
import "@VueMarzipano/style.scss";

import InfoHotspot from "./components/InfoHotspot.vue";

const app = createApp(App)

app.component('InfoHotspot', InfoHotspot);
app.use(VueMarzipano)
app.mount('#app')
