import type {App} from 'vue'
import {AutoRotateButton,FullscreenButton,NavigateButton} from "./index";

export default {
    install(app: App, options: { env: Record<string, any> })
    {
        console.log('VueMarzipano installed');
        app.component('FullscreenButton', FullscreenButton);
        app.component('NavigateButton', NavigateButton);
        app.component('AutoRotateButton', AutoRotateButton);

        app.config.globalProperties.$vueMarzipano = { env: options.env };
    },
}