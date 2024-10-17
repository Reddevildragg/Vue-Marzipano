import {createApp} from 'vue'
import './design/main.scss'
import App from './App.vue'

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'


import InfoHotspot from "./components/InfoHotspot.vue";

const app = createApp(App)

app.component('InfoHotspot', InfoHotspot);

app.mount('#app')
