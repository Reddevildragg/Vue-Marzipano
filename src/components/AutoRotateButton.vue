<template>
  <a class="autorotateToggle" @click="toggle">
    <img v-if="!enableAutoRotate" class="w-100 h-100" src="@/assets/img/play.png">
    <img v-else class="w-100 h-100" src="@/assets/img/pause.png">
  </a>
</template>
<script setup>
import Marzipano from "marzipano";
import {inject, onMounted, ref, watch} from "vue";

const props = defineProps({
  currentScene: Object,
})

const viewer = inject('viewer')

const enableAutoRotate = inject('enableAutoRotate')
const autorotateSettings = inject('autorotateSettings')

onMounted(() =>
{
  Set(enableAutoRotate)
})

function Set(state)
{
  enableAutoRotate.value = state
  if (enableAutoRotate.value)
  {
    startAutorotate();
  }
  else
  {
    stopAutorotate()
  }
}

function toggle()
{
  enableAutoRotate.value = !enableAutoRotate.value

  if (enableAutoRotate.value)
  {
    startAutorotate();
  }
  else
  {
    stopAutorotate()
  }
}

watch(() => enableAutoRotate.value, (newVal, oldVal) => {
Set(enableAutoRotate.value)
});

watch(() => props.currentScene, (newVal, oldVal) => {
  stopAutorotate()
  startAutorotate()
});

function startAutorotate()
{
  if (!enableAutoRotate.value) {
    return;
  }
  viewer.value?.startMovement(autorotateSettings);
  viewer.value?.setIdleMovement(3000, autorotateSettings);
}

function stopAutorotate() {
  viewer.value?.stopMovement();
  viewer.value?.setIdleMovement(Infinity);
}

</script>

<style>
.autorotateToggle
{
  z-index: 5;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  padding: 5px;
  background-color: rgb(103, 115, 131);
  background-color: rgba(103, 115, 131, 0.8);
}
</style>