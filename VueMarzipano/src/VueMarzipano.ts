import {App} from 'vue'
import {MarzipanoViewer} from "./index.ts";

export default {
    install(app: App)
    {
        console.log('VueMarzipano installed');
        app.component('MarzipanoViewer', MarzipanoViewer);
    }
}