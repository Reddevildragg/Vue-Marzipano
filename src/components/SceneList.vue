<template>
  <div ref="sceneListElement">
    <ul class="scenes">
      <a v-for="item in data.scenes" :key="item.id" class="scene" ref="sceneElements" :data-id="item.id"
         :class="{current : currentScene?.data.id === item.id}">
        <li class="text">{{ item.name }}</li>
      </a>
    </ul>
  </div>
</template>

<script setup>
import {data} from "@/data";
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  currentScene: Object,
})

const sceneListElement = ref();
const sceneElements = ref();

function showSceneList() {
  //sceneListElement.value.classList.add('enabled');
  //sceneListToggleElement.value.classList.add('enabled');
}

function hideSceneList() {
  //sceneListElement.value.classList.remove('enabled');
  //sceneListToggleElement.value.classList.remove('enabled');
}

function toggleSceneList() {
  sceneListElement.value.classList.toggle('enabled');
  sceneListToggleElement.value.classList.toggle('enabled');
}

</script>

<style scoped lang="scss">

</style>