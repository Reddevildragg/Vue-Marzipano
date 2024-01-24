<template>
  <a class="navigationButton cursor-pointer" @click="navigate()">
    <img  class="w-100 h-100" :src="useImages().getImageSrc(props.imageName)">
  </a>
</template>

<script setup lang="ts">

const props = defineProps({
  imageName:
      {
        type:String
      },
  xFactor:
      {
        default: 1,
        type: Number
      },
  yFactor:
      {
        default: 1,
        type: Number
      },
})

import {inject} from "vue";
import {useImages} from "@/VueMarzipano/Composables/ImagesComposable.ts";
const emits = defineEmits(['zoom-clicked'])

const currentScene = inject('currentScene')

function navigate()
{
  const currentPitch = currentScene.value.view.pitch() * 180 / Math.PI;
  const currentYaw = currentScene.value.view.yaw() * 180 / Math.PI;
  const targetPitch = currentPitch + props.yFactor;
  const targetYaw = currentYaw + props.xFactor;
  currentScene.value.view.setPitch(targetPitch * Math.PI / 180);
  currentScene.value.view.setYaw(targetYaw * Math.PI / 180);
  emits('zoom-clicked')
}

</script>

<style scoped>
.navigationButton
{
  width: 40px;
  height: 40px;
}
</style>