<template>
  <a id="autorotateToggle" ref="autorotateToggleElement">
    <img class="icon off" src="@/assets/img/play.png">
    <img class="icon on" src="@/assets/img/pause.png">
  </a>
</template>
<script setup>
import Marzipano from "marzipano";
import {inject, onMounted, watch} from "vue";

const props = defineProps({
  currentScene: Object,
})

const autorotate = Marzipano.autorotate({
  yawSpeed: 0.03,
  targetPitch: 0,
  targetFov: Math.PI / 2
});

const data = inject('data')
const viewer = inject('viewer')
onMounted(() =>
{
  // Set up autorotate, if enabled.
  if (data.settings.autorotateEnabled) {
    //autorotateToggleElement.value.classList.add('enabled');
  }

  // Set handler for autorotate toggle.
  //autorotateToggleElement.value.addEventListener('click', toggleAutorotate);
})

watch(() => props.currentScene, (newVal, oldVal) => {
  stopAutorotate()
  startAutorotate()
});

function startAutorotate() {
/*  if (!autorotateToggleElement.value.classList.contains('enabled')) {
    return;
  }*/
  viewer.value.startMovement(autorotate);
  viewer.value.setIdleMovement(3000, autorotate);
}

function stopAutorotate() {
  viewer.value.stopMovement();
  viewer.value.setIdleMovement(Infinity);
}

function toggleAutorotate() {
  if (autorotateToggleElement.value.classList.contains('enabled')) {
    autorotateToggleElement.value.classList.remove('enabled');
    stopAutorotate();
  } else {
    autorotateToggleElement.value.classList.add('enabled');
    startAutorotate();
  }
}
</script>