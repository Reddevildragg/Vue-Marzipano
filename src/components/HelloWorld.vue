<template>
  <div id="pano" class="pano" ref="panoElement"/>

  <div ref="autoRotateToggleElement"></div>

  <div ref="sceneListElement">
    <ul class="scenes">
      <a v-for="item in data.scenes" :key="item.id" class="scene" ref="sceneElements" :data-id="item.id">
        <li class="text">{{item.name}}</li>
      </a>
    </ul>
  </div>

  <div ref="titleBar" class="titleBar">
    <h1 ref="sceneNameElement" class="sceneName"></h1>
  </div>

  <a href="javascript:void(0)" ref="autoRotateToggleElement">
    <img class="icon off" src="@/assets/img/play.png">
    <img class="icon on" src="@/assets/img/pause.png">
  </a>

  <a href="javascript:void(0)" ref="fullscreenToggle">
    <img class="icon off" src="@/assets/img/fullscreen.png">
    <img class="icon on" src="@/assets/img/windowed.png">
  </a>

  <a href="javascript:void(0)" ref="sceneListToggle">
    <img class="icon off" src="@/assets/img/expand.png">
    <img class="icon on" src="@/assets/img/collapse.png">
  </a>

  <div id='info'><a href="/">
    <div class='info'></div>
  </a></div>

</template>

<script setup>
import Marzipano from "marzipano";
import {onMounted, ref} from "vue";
import {data, data2} from '../data';

const panoElement = ref();
const sceneNameElement = ref();

const sceneListElement = ref()
const sceneElements = ref([])


const autoRotateToggleElement = ref()
const sceneListToggle = ref()
const fullscreenToggle = ref()


const viewer = ref(undefined);

var autorotate = Marzipano.autorotate({
  yawSpeed: 2,
  targetPitch: 0,
  targetFov: Math.PI / 2
});

onMounted(() => {

  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Create viewer.
  viewer.value = new Marzipano.Viewer(panoElement.value, viewerOpts);

  var scenes = data.scenes.map(function (data) {
    //better way to do this but for now just remove it off for testing
    var urlPrefix = new URL("/tiles", import.meta.url.replace("/@fs", "")).toString();
    var source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
        {cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg"});

    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.value.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function (hotspot) {
      console.log("hotspot")
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    //scene.hotspotContainer().createHotspot(document.querySelector('#info'), {yaw: -3.85, pitch: 0.38})

    /*

        // Create info hotspots.
        data.infoHotspots.forEach(function(hotspot) {
          var element = createInfoHotspotElement(hotspot);
          scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });*/

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  switchScene(scenes[0]);
})

function switchScene(scene) {
  stopAutorotate();
  scene.view.setParameters(scene.data.initialViewParameters);
  scene.scene.switchTo();
  startAutorotate();
  updateSceneName(scene);
  updateSceneList(scene);
}

function updateSceneName(scene) {
  sceneNameElement.value.innerHTML = sanitize(scene.data.name);
}

function sanitize(s) {
  return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

function updateSceneList(scene) {
  for (var i = 0; i < sceneElements.value.length; i++) {
    var el = sceneElements.value[i];
    if (el.getAttribute('data-id') === scene.data.id) {
      el.classList.add('current');
    } else {
      el.classList.remove('current');
    }
  }
}

function showSceneList() {
  sceneListElement.value.classList.add('enabled');
  sceneListToggleElement.classList.add('enabled');
}

function hideSceneList() {
  sceneListElement.value.classList.remove('enabled');
  sceneListToggleElement.classList.remove('enabled');
}

function toggleSceneList() {
  sceneListElement.value.classList.toggle('enabled');
  sceneListToggleElement.classList.toggle('enabled');
}

function startAutorotate() {
  if (!autoRotateToggleElement.value.classList.contains('enabled')) {
    return;
  }
  viewer.value.startMovement(autorotate);
  viewer.value.setIdleMovement(3000, autorotate);
}

function stopAutorotate() {
  viewer.value.stopMovement();
  viewer.value.setIdleMovement(Infinity);
}

function toggleAutorotate() {
  if (autoRotateToggleElement.value.classList.contains('enabled')) {
    autoRotateToggleElement.value.classList.remove('enabled');
    stopAutorotate();
  } else {
    autoRotateToggleElement.value.classList.add('enabled');
    startAutorotate();
  }
}

function createLinkHotspotElement(hotspot) {

  // Create wrapper element to hold icon and tooltip.
  const wrapper = document.createElement('div');
  wrapper.classList.add('hotspot');
  wrapper.classList.add('link-hotspot');

  // Create image element.
  const icon = document.createElement('img');
  icon.src = 'https://getwallpapers.com/wallpaper/full/b/b/c/643051.jpg';
  icon.classList.add('link-hotspot-icon');

  // Set rotation transform.
  var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
  for (var i = 0; i < transformProperties.length; i++) {
    var property = transformProperties[i];
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
  var tooltip = document.createElement('div');
  tooltip.classList.add('hotspot-tooltip');
  tooltip.classList.add('link-hotspot-tooltip');
  tooltip.innerHTML = findSceneDataById(hotspot.target).name;

  wrapper.appendChild(icon);
  wrapper.appendChild(tooltip);

  return wrapper;
}

function createInfoHotspotElement(hotspot) {

  // Create wrapper element to hold icon and tooltip.
  var wrapper = document.createElement('div');
  wrapper.classList.add('hotspot');
  wrapper.classList.add('info-hotspot');

  // Create hotspot/tooltip header.
  var header = document.createElement('div');
  header.classList.add('info-hotspot-header');

  // Create image element.
  var iconWrapper = document.createElement('div');
  iconWrapper.classList.add('info-hotspot-icon-wrapper');
  var icon = document.createElement('img');
  icon.src = 'img/info.png';
  icon.classList.add('info-hotspot-icon');
  iconWrapper.appendChild(icon);

  // Create title element.
  var titleWrapper = document.createElement('div');
  titleWrapper.classList.add('info-hotspot-title-wrapper');
  var title = document.createElement('div');
  title.classList.add('info-hotspot-title');
  title.innerHTML = hotspot.title;
  titleWrapper.appendChild(title);

  // Create close element.
  var closeWrapper = document.createElement('div');
  closeWrapper.classList.add('info-hotspot-close-wrapper');
  var closeIcon = document.createElement('img');
  closeIcon.src = 'img/close.png';
  closeIcon.classList.add('info-hotspot-close-icon');
  closeWrapper.appendChild(closeIcon);

  // Construct header element.
  header.appendChild(iconWrapper);
  header.appendChild(titleWrapper);
  header.appendChild(closeWrapper);

  // Create text element.
  var text = document.createElement('div');
  text.classList.add('info-hotspot-text');
  text.innerHTML = hotspot.text;

  // Place header and text into wrapper element.
  wrapper.appendChild(header);
  wrapper.appendChild(text);

  // Create a modal for the hotspot content to appear on mobile mode.
  var modal = document.createElement('div');
  modal.innerHTML = wrapper.innerHTML;
  modal.classList.add('info-hotspot-modal');
  document.body.appendChild(modal);

  var toggle = function () {
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
  for (var i = 0; i < eventList.length; i++) {
    element.addEventListener(eventList[i], function (event) {
      event.stopPropagation();
    });
  }
}

function findSceneById(id) {
  for (var i = 0; i < scenes.length; i++) {
    if (scenes[i].data.id === id) {
      return scenes[i];
    }
  }
  return null;
}

function findSceneDataById(id) {
  for (var i = 0; i < data.scenes.length; i++) {
    if (data.scenes[i].id === id) {
      return data.scenes[i];
    }
  }
  return null;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>