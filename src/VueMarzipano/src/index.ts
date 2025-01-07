import VueMarzipano from "./VueMarzipano";

import MarzipanoViewer from "./Views/MarzipanoViewer.vue";

import AutoRotateButton from "./Components/AutoRotateButton.vue";
import FullscreenButton from "./Components/FullscreenButton.vue";
import Hotspot from "./Components/Hotspot.vue";
import NavigateButton from "./Components/NavigateButton.vue";
import NavigationHotspot from "./Components/NavigationHotspot.vue";
import SceneList from "./Components/SceneList.vue";
import TitleBar from "./Components/TitleBar.vue";
import VueMarzipanoButton from "./Components/VueMarzipanoButton.vue";

import {findEnvVariableByKey,GetImage,generateGUID,updateHotspots} from "./helpers";

import "./style.scss"

export { VueMarzipano as default };
export {
    MarzipanoViewer,
    AutoRotateButton,
    FullscreenButton,
    Hotspot,
    NavigateButton,
    NavigationHotspot,
    SceneList,
    TitleBar,
    VueMarzipanoButton,
};

export {VueMarzipano, findEnvVariableByKey,GetImage,generateGUID,updateHotspots}