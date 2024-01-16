<template>
  <div ref="panoElement" class="pano">
    <TitleBar :current-scene="currentScene"/>

    <scene-list :current-scene="currentScene"/>

  </div>

  <a id="fullscreenToggle" ref="fullscreenToggleElement">
    <img class="icon off" src="@/assets/img/fullscreen.png">
    <img class="icon on" src="@/assets/img/windowed.png">
  </a>

  <a  id="sceneListToggle" ref="sceneListToggleElement">
    <img class="icon off" src="@/assets/img/expand.png">
    <img class="icon on" src="@/assets/img/collapse.png">
  </a>

</template>

<script setup>
import Marzipano from "marzipano";
import {data} from '../data';
import {onMounted, provide, ref} from "vue";
import SceneList from "@/components/SceneList.vue";
import TitleBar from "@/components/TitleBar.vue";

const bowser = window.bowser;
let screenfull;

const panoElement = ref();

const sceneListToggleElement = ref();
const autorotateToggleElement = ref();
const fullscreenToggleElement = ref();

let viewer;

const scenes = ref()
const currentScene = ref();

provide("scenes", scenes);

const autorotate = Marzipano.autorotate({
  yawSpeed: 0.03,
  targetPitch: 0,
  targetFov: Math.PI / 2
});

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
  scenes.value = data.scenes.map(function (data) {
    const urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
    const source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
        {cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg"});

    const geometry = new Marzipano.CubeGeometry(data.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function (hotspot) {
      const element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, {yaw: hotspot.yaw, pitch: hotspot.pitch});
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function (hotspot) {
      const element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, {yaw: hotspot.yaw, pitch: hotspot.pitch});
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  /*// Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.value.addEventListener('click', function () {
      screenfull.toggle();`
    });
    screenfull.on('change', function () {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.value.classList.add('enabled');
      } else {
        fullscreenToggleElement.value.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }*/

// Start with the scene list open on desktop.
/*  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }*/

  /*// Set handler for scene switch.
  scenes.forEach(function (scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    console.log(el)
    el.addEventListener('click', function () {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });*/

// Display the initial scene.
  switchScene(scenes.value[0]);
})

function switchScene(scene) {
  scene.view.setParameters(scene.data.initialViewParameters);
  scene.scene.switchTo();
  currentScene.value = scene;
}

function createLinkHotspotElement(hotspot) {

  // Create wrapper element to hold icon and tooltip.
  const wrapper = document.createElement('div');
  wrapper.classList.add('hotspot');
  wrapper.classList.add('link-hotspot');

  // Create image element.
  const icon = document.createElement('img');
  icon.src = 'img/link.png';
  icon.classList.add('link-hotspot-icon');

  // Set rotation transform.
  const transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
  for (let i = 0; i < transformProperties.length; i++) {
    const property = transformProperties[i];
    icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
  }

  // Add click event handler.
  wrapper.addEventListener('click', function () {
    switchScene(findSceneById(hotspot.target));
  });

  // Prevent touch and scroll events from reaching the parent element.
  // This prevents the view control logic from interfering with the hotspot.
  stopTouchAndScrollEventPropagation(wrapper);

  // Create tooltip element.
  const tooltip = document.createElement('div');
  tooltip.classList.add('hotspot-tooltip');
  tooltip.classList.add('link-hotspot-tooltip');
  tooltip.innerHTML = findSceneDataById(hotspot.target).name;

  wrapper.appendChild(icon);
  wrapper.appendChild(tooltip);

  return wrapper;
}

function createInfoHotspotElement(hotspot) {

  // Create wrapper element to hold icon and tooltip.
  const wrapper = document.createElement('div');
  wrapper.classList.add('hotspot');
  wrapper.classList.add('info-hotspot');

  // Create hotspot/tooltip header.
  const header = document.createElement('div');
  header.classList.add('info-hotspot-header');

  // Create image element.
  const iconWrapper = document.createElement('div');
  iconWrapper.classList.add('info-hotspot-icon-wrapper');
  const icon = document.createElement('img');
  icon.src = 'img/info.png';
  icon.classList.add('info-hotspot-icon');
  iconWrapper.appendChild(icon);

  // Create title element.
  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('info-hotspot-title-wrapper');
  const title = document.createElement('div');
  title.classList.add('info-hotspot-title');
  title.innerHTML = hotspot.title;
  titleWrapper.appendChild(title);

  // Create close element.
  const closeWrapper = document.createElement('div');
  closeWrapper.classList.add('info-hotspot-close-wrapper');
  const closeIcon = document.createElement('img');
  closeIcon.src = 'img/close.png';
  closeIcon.classList.add('info-hotspot-close-icon');
  closeWrapper.appendChild(closeIcon);

  // Construct header element.
  header.appendChild(iconWrapper);
  header.appendChild(titleWrapper);
  header.appendChild(closeWrapper);

  // Create text element.
  const text = document.createElement('div');
  text.classList.add('info-hotspot-text');
  text.innerHTML = hotspot.text;

  // Place header and text into wrapper element.
  wrapper.appendChild(header);
  wrapper.appendChild(text);

  // Create a modal for the hotspot content to appear on mobile mode.
  const modal = document.createElement('div');
  modal.innerHTML = wrapper.innerHTML;
  modal.classList.add('info-hotspot-modal');
  document.body.appendChild(modal);

  const toggle = function () {
    wrapper.classList.toggle('visible');
    modal.classList.toggle('visible');
  };

  // Show content when hotspot is clicked.
  wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

  // Hide content when close icon is clicked.
  modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

  // Prevent touch and scroll events from reaching the parent element.
  // This prevents the view control logic from interfering with the hotspot.
  stopTouchAndScrollEventPropagation(wrapper);

  return wrapper;
}

// Prevent touch and scroll events from reaching the parent element.
function stopTouchAndScrollEventPropagation(element, eventList) {
  var eventList = [
    'touchstart', 'touchmove', 'touchend', 'touchcancel',
    'pointerdown', 'pointermove', 'pointerup', 'pointercancel',
    'wheel'
  ];
  for (let i = 0; i < eventList.length; i++) {
    element.addEventListener(eventList[i], function (event) {
      event.stopPropagation();
    });
  }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->