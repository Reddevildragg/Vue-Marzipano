<template>
  <div class="sceneListToggle" @click="toggleSceneList">
    <img v-if="isOpen" class="w-100 h-100 cursor-pointer" src="@/assets/img/expand.png">
    <img v-else class="w-100 h-100 cursor-pointer" src="@/assets/img/collapse.png">
  </div>

  <div class="sceneList" v-if="isOpen">
    <ul class="scenes">
      <a v-for="item in data.scenes" :key="item.id" class="scene cursor-pointer" :data-id="item.id"
         :class="{current : currentScene?.data.id === item.id}" @click="handleClick(item)">
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
const emits = defineEmits(['select-scene'])

const isOpen = ref(false)

const handleClick = (item) => {
  // Emit a custom event named 'custom-click' with optional payload
  emits('select-scene', item);
};

function showSceneList() {
  //sceneListElement.value.classList.add('enabled');
  //sceneListToggleElement.value.classList.add('enabled');
}

function hideSceneList() {
  //sceneListElement.value.classList.remove('enabled');
  //sceneListToggleElement.value.classList.remove('enabled');
}

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
  padding: 5px;
  background-color: rgb(103, 115, 131);
  background-color: rgba(103, 115, 131, 0.8);

  .scenes
  {
    padding: 5px;

    .scene
    {

    }
  }
}
</style>