<template>
  <a class="zoomButton cursor-pointer" @click="zoom()">
    <img  class="w-100 h-100" :src="useImages().getImageSrc(props.imageName)">
  </a>
</template>

<script setup lang="ts">

const props = defineProps({
  imageName:
      {
        type:String
      },
  factor:
      {
        default: 1,
        type: Number
      },
})

import { inject} from "vue";
import {useImages} from "@/VueMarzipano/Composables/ImagesComposable.ts";
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
  width: 40px;
  height: 40px;
}
</style>