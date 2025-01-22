<template>
  <div ref="panoElement" class="pano">
    <slot name="titleBar">
      <TitleBar/>
    </slot>
    <Hotspot v-for="hotspot in allHotspots" :key="hotspot.id" :id="hotspot.id" :hotspotInfo="hotspot"/>
    <slot name="contentButtons">
      <div class="control-buttons">
        <div class="button-layout" style="gap: 1rem">
          <vue-marzipano-button v-for="button in navigationButtons" :key="button" class="marzipano-button" :buttonData="button"/>
        </div>
      </div>
    </slot>
    <slot name="scenes">
      <scene-list @select-scene="switchScene(findSceneById($event.id))"/>
    </slot>
  </div>
</template>

<script setup>
import Marzipano from "marzipano";
import {computed, defineExpose, nextTick, onMounted, provide, ref} from "vue";
import SceneList from "../Components/SceneList.vue";
import TitleBar from "../Components/TitleBar.vue";
import Hotspot from "../Components/Hotspot.vue";
import {findEnvVariableByKey, updateHotspots} from "../helpers";
import VueMarzipanoButton from "../Components/VueMarzipanoButton.vue";

const {data} = defineProps({data: Object});
const panoElement = ref();
const enableAutoRotate = ref(data.settings.autorotateEnabled);
const autorotateSettings = Marzipano.autorotate({yawSpeed: 0.03, targetPitch: 0, targetFov: Math.PI / 2});
const viewer = ref();
const scenes = ref([]);
const currentScene = ref();
const allHotspots = ref([]);

provide("scenes", scenes);
provide("viewer", viewer);
provide("data", data);
provide("currentScene", currentScene);
provide("panoElement", panoElement);
provide("enableAutoRotate", enableAutoRotate);
provide("autorotateSettings", autorotateSettings);
provide("marzipanoViewFunctions", {switchScene, findSceneById, findSceneDataById});

defineExpose({enableAutoRotate, switchScene, findSceneById, findSceneDataById});

const navigationButtons = computed(() => data.settings.navigationButtons)

onMounted(() => {
  const viewerOpts = {controls: {mouseViewMode: data.settings.mouseViewMode, scrollZoom: true}};
  const newViewer = new Marzipano.Viewer(panoElement.value, viewerOpts);

  scenes.value = data.scenes.map(sceneData => {
    let urlPrefix;
    let source
    if (data?.cloud?.enabled) {
      urlPrefix = data.cloud.url;
      source = Marzipano.ImageUrlSource.fromString(`${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg?${findEnvVariableByKey(data.cloud.key)}`, {cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg?${findEnvVariableByKey(data.cloud.key)}`});
    } else {
      urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
      source = Marzipano.ImageUrlSource.fromString(`${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`, {cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg`});
    }

    const geometry = new Marzipano.CubeGeometry(sceneData.levels);
    const limiter = Marzipano.RectilinearView.limit.traditional(Math.min(sceneData.faceSize * 8, 4096), 100 * Math.PI / 180, 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
    const createdScene = newViewer.createScene({source, geometry, view, pinFirstLevel: true});

    sceneData.linkHotspots = updateHotspots(sceneData.linkHotspots);
    sceneData.infoHotspots = updateHotspots(sceneData.infoHotspots);
    allHotspots.value.push(...sceneData.linkHotspots, ...sceneData.infoHotspots);

    nextTick(() => {
      [...sceneData.linkHotspots, ...sceneData.infoHotspots].forEach(x => {
        createdScene.hotspotContainer().createHotspot(document.getElementById(x.id), {yaw: x.yaw, pitch: x.pitch});
      });
    });

    return {data: sceneData, scene: createdScene, view};
  });

  viewer.value = newViewer;
  switchScene(scenes.value[0]);
});

function switchScene(scene, params) {
  if (!scene) return;
  scene.view.setParameters(params || scene.data.initialViewParameters);
  scene.scene.switchTo();
  currentScene.value = scene;
}

function findSceneById(id) {
  return scenes.value.find(scene => scene.data.id === id) || null;
}

function findSceneDataById(id) {
  return data.scenes.find(scene => scene.id === id) || null;
}

</script>

<style lang="scss">
.pano {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > *:not(:nth-last-child(-n+2)) {
    z-index: 2;
  }
}

.control-buttons {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.button-layout
{
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>