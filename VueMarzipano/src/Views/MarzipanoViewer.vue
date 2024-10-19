<template>
  <div ref="panoElement" class="pano">
    <TitleBar :current-scene="currentScene"/>
    <Hotspot v-for="hotspot in allHotspots" :key="hotspot.id" :id="hotspot.id" :hotspot="hotspot" @click="switchScene(findSceneById(hotspot.target))"/>
    <slot name="content-buttons">
      <div class="control-buttons w-100 d-flex justify-content-center align-content-center">
        <div class="button-layout d-flex justify-content-center align-content-center" style="gap: 1rem">
          <navigate-button v-for="button in navigateButtons" :key="button.imageName" class="p-2" v-bind="button"/>
          <auto-rotate-button class="p-2" :current-scene="currentScene"/>
          <fullscreen-button class="p-2"/>
        </div>
      </div>
    </slot>
    <slot name="scenes">
      <scene-list :current-scene="currentScene" @select-scene="switchScene(findSceneById($event.id))"/>
    </slot>
  </div>
</template>

<script setup>
import Marzipano from "marzipano";
import { nextTick, onMounted, provide, ref, defineExpose } from "vue";
import SceneList from "../Components/SceneList.vue";
import TitleBar from "../Components/TitleBar.vue";
import AutoRotateButton from "../Components/AutoRotateButton.vue";
import Hotspot from "../Components/Hotspot.vue";
import NavigateButton from "../Components/NavigateButton.vue";
import FullscreenButton from "../Components/FullscreenButton.vue";
import { updateHotspots } from "../helpers";

const { data } = defineProps({ data: Object });
const panoElement = ref();
const enableAutoRotate = ref(data.settings.autorotateEnabled);
const autorotateSettings = Marzipano.autorotate({ yawSpeed: 0.03, targetPitch: 0, targetFov: Math.PI / 2 });
const viewer = ref();
const scenes = ref([]);
const currentScene = ref();
const allHotspots = ref([]);

provide("data", data);
provide("scenes", scenes);
provide("viewer", viewer);
provide("data", data);
provide("currentScene", currentScene);
provide("panoElement", panoElement);
provide("enableAutoRotate", enableAutoRotate);
provide("autorotateSettings", autorotateSettings);
provide("marzipanoViewFunctions", { switchScene });

defineExpose({ enableAutoRotate, switchScene, findSceneById, findSceneDataById });

onMounted(() => {
  const viewerOpts = { controls: { mouseViewMode: data.settings.mouseViewMode, scrollZoom: true } };
  const newViewer = new Marzipano.Viewer(panoElement.value, viewerOpts);

  scenes.value = data.scenes.map(sceneData => {
    const urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
    const source = Marzipano.ImageUrlSource.fromString(`${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`, { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` });
    const geometry = new Marzipano.CubeGeometry(sceneData.levels);
    const limiter = Marzipano.RectilinearView.limit.traditional(Math.min(sceneData.faceSize * 8, 4096), 100 * Math.PI / 180, 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
    const createdScene = newViewer.createScene({ source, geometry, view, pinFirstLevel: true });

    sceneData.linkHotspots = updateHotspots(sceneData.linkHotspots);
    sceneData.infoHotspots = updateHotspots(sceneData.infoHotspots);
    allHotspots.value.push(...sceneData.linkHotspots, ...sceneData.infoHotspots);

    nextTick(() => {
      [...sceneData.linkHotspots, ...sceneData.infoHotspots].forEach(x => {
        createdScene.hotspotContainer().createHotspot(document.getElementById(x.id), { yaw: x.yaw, pitch: x.pitch });
      });
    });

    return { data: sceneData, scene: createdScene, view };
  });

  viewer.value = newViewer;
  switchScene(scenes.value[0]);
});

function switchScene(scene) {
  if (!scene) return;
  scene.view.setParameters(scene.data.initialViewParameters);
  scene.scene.switchTo();
  currentScene.value = scene;
}

function findSceneById(id) {
  return scenes.value.find(scene => scene.data.id === id) || null;
}

function findSceneDataById(id) {
  return data.scenes.find(scene => scene.id === id) || null;
}

const navigateButtons = [
  { zoomFactor: data.settings?.controlOptions?.zoomInJump || 0.8, imageName: "plus.png" },
  { zoomFactor: data.settings?.controlOptions?.zoomOutJump || 1.2, imageName: "minus.png" },
  { xFactor: -data.settings?.controlOptions?.xJump || -10, imageName: "left.png" },
  { xFactor: data.settings?.controlOptions?.xJump || 10, imageName: "right.png" },
  { yFactor: data.settings?.controlOptions?.yJump || 10, imageName: "up.png" },
  { yFactor: -data.settings?.controlOptions?.yJump || -10, imageName: "down.png" }
];
</script>

<style lang="scss">
.pano {
  position: relative;
  width: 100%;
  height: 100%;
  > *:not(:nth-last-child(-n+2)) {
    z-index: 2;
  }
}
.control-buttons {
  position: absolute;
  bottom: 10%;
}
</style>