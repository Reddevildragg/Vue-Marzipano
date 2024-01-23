<template>
  <a class="zoomButton" @click="zoom()">
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
  factor:
      {
        default: 1,
        type: Number
      },
})

import {computed, inject, onMounted} from "vue";
const emits = defineEmits(['zoom-clicked'])

const currentScene = inject('currentScene')

function zoom() {
  const currentFov = currentScene.value.view.fov();
  currentScene.value.view.setFov(currentFov * props.factor);
  emits('zoom-clicked')
}
</script>

<style scoped>
.zoomButton
{
  width: 50px;
  height: 50px;
}
</style>