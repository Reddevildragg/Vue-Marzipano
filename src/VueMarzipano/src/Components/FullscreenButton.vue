<template>
  <div class="navigationButton cursor-pointer" @click="toggle()">
    <img src="@/assets/img/fullscreen.png">
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import {inject} from "vue";

const panoElement = inject('panoElement')
const { toggle } = useFullscreen(panoElement)

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