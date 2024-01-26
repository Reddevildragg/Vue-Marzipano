<template>
  <a class="autorotateToggle cursor-pointer" @click="toggle">
    <img v-if="!enableAutoRotate" src="@/assets/img/play.png">
    <img v-else src="@/assets/img/pause.png">
  </a>
</template>
<script setup>
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
  background-color:  rgba(25,45,56,0.8);
  img
  {
    width: 35px;
    height: 35px;
  }
}
</style>