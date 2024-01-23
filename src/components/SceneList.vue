<template>
  <div class="sceneListToggle" @click="toggleSceneList">
    <img v-if="isOpen" class="w-100 h-100 cursor-pointer" src="@/assets/img/expand.png">
    <img v-else class="w-100 h-100 cursor-pointer" src="@/assets/img/collapse.png">
  </div>

  <ul class="sceneList p-0" v-if="isOpen">
      <li v-for="item in data.scenes" :key="item.id" class="scene p-3 cursor-pointer d-flex align-content-center" :data-id="item.id"
         :class="{current : currentScene?.data.id === item.id}" @click="handleClick(item)">
        <div class="text pe-5">{{ item.name }}</div>
        <img v-if="currentScene?.data.id === item.id" class="align-self-center" style="height: 20px" src="@/assets/img/eye-regular.svg"/>
      </li>
  </ul>

</template>

<script setup>
import {data} from "@/data";
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  currentScene: Object,
})
const emits = defineEmits(['select-scene'])

const isOpen = ref(false)

const handleClick = (item) => {
  // Emit a custom event named 'custom-click' with optional payload
  emits('select-scene', item);
};

function toggleSceneList() {
  isOpen.value = !isOpen.value
}

</script>

<style scoped lang="scss">
.sceneListToggle {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  padding: 5px;
  background-color: rgb(103, 115, 131);
  background-color: rgba(103, 115, 131, 0.8);
}

.sceneList
{
  z-index: 5;
  position: absolute;
  top: 40px;
  left: 0;
  list-style: none; /* Remove numbers */

  .scene
  {
    background-color: white;
    opacity: 0.7;

    &.current
    {
      opacity: 1;
    }
  }
}
</style>