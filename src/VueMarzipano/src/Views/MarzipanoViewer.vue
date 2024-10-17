<template>
  <div ref="panoElement" class="pano">
    <TitleBar :current-scene="currentScene"/>

    <Hotspot v-for="hotspot in allHotspots" :key="hotspot.id" :id="hotspot.id" :hotspot="hotspot" @click="switchScene(findSceneById(hotspot.target))"/>

    <content-buttons>
      <navigate-button class="p-2" :zoom-factor="0.8" imageName="assets/img/plus.png" @nav-clicked="navButtonClicked"/>
      <navigate-button class="p-2" :zoom-factor="1.2" imageName="assets/img/minus.png" @nav-clicked="navButtonClicked"/>

      <navigate-button class="p-2" :x-factor="-10" imageName="assets/img/left.png" @nav-clicked="navButtonClicked"/>
      <navigate-button class="p-2" :x-factor="10" imageName="assets/img/right.png" @nav-clicked="navButtonClicked"/>
      <navigate-button class="p-2" :y-factor="-10" imageName="assets/img/up.png" @nav-clicked="navButtonClicked"/>
      <navigate-button class="p-2" :y-factor="10" imageName="assets/img/down.png" @nav-clicked="navButtonClicked"/>

      <auto-rotate-button class="p-2" :current-scene="currentScene"/>

      <fullscreen-button class="p-2"/>
    </content-buttons>

    <scene-list :current-scene="currentScene" @select-scene="(x) => switchScene(findSceneById(x.id))"/>
  </div>
</template>

<script setup>
import Marzipano from "marzipano";
import {nextTick, onMounted, provide, ref} from "vue";
import SceneList from "../Components/SceneList.vue";
import TitleBar from "../Components/TitleBar.vue";
import AutoRotateButton from "../Components/AutoRotateButton.vue";
import Hotspot from "../Components/Hotspot.vue";
import ContentButtons from "../Components/content-buttons.vue";
import NavigateButton from "../Components/NavigateButton.vue";
import FullscreenButton from "../Components/FullscreenButton.vue";
import {updateHotspots} from "../helpers";

const bowser = window.bowser;
const params = defineProps(
    {
      data: Object
    }
)

const panoElement = ref();

const enableAutoRotate = ref(params.data.settings.autorotateEnabled);
const autorotateSettings = Marzipano.autorotate({
  yawSpeed: 0.03,
  targetPitch: 0,
  targetFov: Math.PI / 2
});


const viewer = ref();
const scenes = ref()
const currentScene = ref();

provide("scenes", scenes);
provide("data", params.data);
provide("viewer", viewer);
provide("currentScene", currentScene);
provide("panoElement", panoElement);

provide("enableAutoRotate", enableAutoRotate);
provide("autorotateSettings", autorotateSettings);

provide('switchScene', switchScene) // Provide the switchScene function


const allHotspots = ref([])


onMounted(() => {

// Viewer options.
  const viewerOpts = {
    controls: {
      mouseViewMode: params.data.settings.mouseViewMode,
      scrollZoom: true,
    }
  };

// Initialize viewer.
  const newViewer = new Marzipano.Viewer(panoElement.value, viewerOpts);
// Create scenes.
  scenes.value = params.data.scenes.map(function (sceneData) {
    const urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
    const source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
        {cubeMapPreviewUrl: urlPrefix + "/" + sceneData.id + "/preview.jpg"});

    const geometry = new Marzipano.CubeGeometry(sceneData.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(Math.min(sceneData.faceSize * 8, 4096), 100 * Math.PI / 180, 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);


    const createdScene = newViewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    sceneData.linkHotspots = updateHotspots(sceneData.linkHotspots)
    sceneData.infoHotspots = updateHotspots(sceneData.infoHotspots)


    allHotspots.value.push(...[...sceneData.linkHotspots, ...sceneData.infoHotspots])

    //wait for all the divs to load on the next tick
    nextTick(() => {
      ;[...sceneData.linkHotspots, ...sceneData.infoHotspots].forEach((x) => {
        createdScene
            .hotspotContainer()
            .createHotspot(document.getElementById(x.id), {
              yaw: x.yaw,
              pitch: x.pitch,
            })
      })
    })

    return {
      data: sceneData,
      scene: createdScene,
      view: view
    };
  });

  viewer.value = newViewer
// Display the initial scene.
  switchScene(scenes.value[0]);
})

function switchScene(scene)
{
  if(scene == null)
  {
    return;
  }

  scene.view.setParameters(scene.data.initialViewParameters);
  scene.scene.switchTo();
  currentScene.value = scene;
}

function findSceneById(id) {
  for (let i = 0; i < scenes.value.length; i++) {
    if (scenes.value[i].data.id === id) {
      return scenes.value[i];
    }
  }
  return null;
}

function findSceneDataById(id) {
  for (let i = 0; i < params.data.scenes.length; i++) {
    if (params.data.scenes[i].id === id) {
      return params.data.scenes[i];
    }
  }
  return null;
}

function navButtonClicked() {
  enableAutoRotate.value = false
}

</script>

<style lang="scss">
.pano {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  > *:not(:nth-last-child(-n+2)) //we exclude the last 2 children as these are the pano components that need to be at the back
  {
    z-index: 2;
  }
}
</style>