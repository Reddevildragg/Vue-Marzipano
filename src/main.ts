import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'



import InfoHotspot from "./components/InfoHotspot.vue";

import '../VueMarzipano/dist/vue-marzipano.scss';
import VueMarzipano from '@greener-games/vue-marzipano/vue-marzipano.es.js';

const app = createApp(App)

app.use(VueMarzipano)
app.component('InfoHotspot', InfoHotspot);

app.mount('#app')
