import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import VueMarzipano from "@greener-games/vue-marzipano/index.ts";
import "@greener-games/vue-marzipano/style.scss";

import InfoHotspot from "./components/InfoHotspot.vue";

const app = createApp(App)

app.component('InfoHotspot', InfoHotspot);
app.use(VueMarzipano, {
    env: import.meta.env
});
app.mount('#app')
