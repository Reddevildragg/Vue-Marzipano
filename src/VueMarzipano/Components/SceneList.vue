<template>
  <div class="sceneListToggle cursor-pointer p-2" @click="toggleSceneList">
    <img v-if="isOpen"  src="@/assets/img/street-view-solid.svg">
    <img v-else src="@/assets/img/street-view-solid.svg">


    <ul class="sceneList p-0 m-0" :class="{open : isOpen}">
      <li v-for="item in data.scenes" :key="item.id" class="scene p-3 cursor-pointer d-flex align-content-center"
          :data-id="item.id"
          :class="{current : currentScene?.data.id === item.id}" @click="handleClick(item)">
        <div class="text pe-5">{{ item.name }}</div>
        <img v-if="currentScene?.data.id === item.id" class="align-self-center" style="height: 20px"
             src="@/assets/img/eye-regular.svg"/>
      </li>
    </ul>

  </div>

</template>

<script setup>
import {data} from "@/data";
import {computed, onMounted, onUnmounted, ref} from "vue";

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

const offscreenPosition = computed(() =>
{
  // Calculate the offscreen position dynamically based on content size
  const contentContainer = document.querySelector('.sceneList');
  return `calc(-${contentContainer.offsetWidth}px - 100px)`;
})

</script>

<style scoped lang="scss">
.sceneListToggle {
  position: absolute;
  bottom: 10%;
  left: 40px;
  background-color:  rgba(25,45,56,0.8);

  img
  {
    width: 35px;
    height: 35px;
  }
}

.sceneList {
  z-index: 5;
  position: absolute;
  bottom: 100%;
  left: v-bind(offscreenPosition); /* Default value */
  transition: left 1s ease; /* Smooth transition when changing the left property */

  &.open {
    left: 0px; /* Ending position at 50px from the left */
  }

  .scene {
    background-color: white;
    opacity: 0.7;

    &.current {
      opacity: 1;
    }
  }
}
</style>