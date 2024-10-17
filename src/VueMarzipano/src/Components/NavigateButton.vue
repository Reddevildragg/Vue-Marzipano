<template>
  <div class="navigationButton cursor-pointer" @click="navigate()">
    <img :src="useImages().getImageSrc(props.imageName)">
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  imageName:
      {
        type:String
      },
  xFactor:
      {
        default: 0,
        type: Number
      },
  yFactor:
      {
        default: 0,
        type: Number
      },
  zoomFactor:
      {
        default: 1,
        type: Number
      },
})

import {inject} from "vue";
import {useImages} from "../Composables/ImagesComposable.ts";
const emits = defineEmits(['nav-clicked'])

const currentScene = inject('currentScene')

function navigate()
{
  const currentPitch = currentScene.value.view.pitch() * 180 / Math.PI;
  const currentYaw = currentScene.value.view.yaw() * 180 / Math.PI;
  const currentFov = currentScene.value.view.fov();

  const targetPitch = currentPitch + props.yFactor;
  const targetYaw = currentYaw + props.xFactor;

  currentScene.value.view.setPitch(targetPitch * Math.PI / 180);
  currentScene.value.view.setYaw(targetYaw * Math.PI / 180);
  currentScene.value.view.setFov(currentFov * props.zoomFactor);

  emits('nav-clicked')
}

</script>

<style scoped>
.navigationButton
{
  background-color:  rgba(25,45,56,0.8);
  img
  {
    width: 35px;
    height: 35px;
  }
}
</style>