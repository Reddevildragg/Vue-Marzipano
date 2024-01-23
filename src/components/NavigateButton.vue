<template>
  <a class="navigationButton" @click="navigate()">
    <img  class="w-100 h-100" :src="getImageUrl(props.image)">
  </a>
</template>

<script setup lang="ts">

import {getImageUrl} from "@/utils.ts";

const props = defineProps({
  image:
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

import {computed, inject} from "vue";
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