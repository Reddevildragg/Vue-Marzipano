<template>
  <div class="hotspot" @click="TriggerSceneSwitch">
    <img class="w-100 h-100 cursor-pointer" src="@/assets/img/link.png">
  </div>
</template>

<script setup lang="ts">
import {defineProps, inject} from "vue";

const { hotspot } = defineProps(['hotspot'])
const scenes: any = inject('scenes')
const switchScene = inject('switchScene') // Inject the switchScene function

// Switch to the selected scene
function TriggerSceneSwitch()
{
  switchScene(findSceneById(hotspot.target));
}

function findSceneById() {
  for (let i = 0; i < scenes.value.length; i++) {
    if (scenes.value[i].data.id === hotspot.target) {
      return scenes.value[i]
    }
  }
  return null
}
</script>

<style scoped>
.hotspot {
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
}
</style>