<template>
  <div ref="panoElement" class="pano">
    <TitleBar :current-scene="currentScene"/>

    <scene-list :current-scene="currentScene" @select-scene="(x) => switchScene(findSceneById(x.id))"/>

<!--    <auto-rotate-button :current-scene="currentScene"/>-->

    <Hotspot v-for="hotspot in allHotspots" :key="hotspot.id" :id="hotspot.id"
             @click="switchScene(findSceneById(hotspot.target))"/>
  </div>
  <!--
    <a id="fullscreenToggle" ref="fullscreenToggleElement">
      <img class="icon off" src="@/assets/img/fullscreen.png">
      <img class="icon on" src="@/assets/img/windowed.png">
    </a>

    <a id="sceneListToggle" ref="sceneListToggleElement">
      <img class="icon off" src="@/assets/img/expand.png">
      <img class="icon on" src="@/assets/img/collapse.png">
    </a>-->

</template>

<script setup>
import Marzipano from "marzipano";
import {data} from '../data';
import {createApp, defineAsyncComponent, nextTick, onMounted, provide, ref} from "vue";
import SceneList from "@/components/SceneList.vue";
import TitleBar from "@/components/TitleBar.vue";
import AutoRotateButton from "@/components/AutoRotateButton.vue";
import Hotspot from "@/components/Hotspot.vue";

const bowser = window.bowser;

const panoElement = ref();

const sceneListToggleElement = ref();
const autorotateToggleElement = ref();
const fullscreenToggleElement = ref();

let viewer = undefined;

const scenes = ref()
const currentScene = ref();

provide("scenes", scenes);
provide("data", data);
provide("viewer", viewer);

const allHotspots = ref([])

onMounted(() => {

// Viewer options.
  const viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

// Initialize viewer.
  viewer = new Marzipano.Viewer(panoElement.value, viewerOpts);

// Create scenes.
  scenes.value = data.scenes.map(function (sceneData) {
    const urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
    const source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
        {cubeMapPreviewUrl: urlPrefix + "/" + sceneData.id + "/preview.jpg"});

    const geometry = new Marzipano.CubeGeometry(sceneData.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    const createdScene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    allHotspots.value.push(sceneData.linkHotspots);
    allHotspots.value = allHotspots.value.flat();

    //wait for all the divs to load on the next tick
    nextTick(() => {
      sceneData.linkHotspots.forEach(x => {
        createdScene.hotspotContainer().createHotspot(document.getElementById(x.id), {yaw: 0.5, pitch: 0.5});
      })
    })

    return {
      data: sceneData,
      scene: createdScene,
      view: view
    };
  });

// Display the initial scene.
  switchScene(scenes.value[0]);
})

function switchScene(scene) {
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
  for (let i = 0; i < data.scenes.length; i++) {
    if (data.scenes[i].id === id) {
      return data.scenes[i];
    }
  }
  return null;
}
</script>

<style>
.pano {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->