<template>
  <div class="titleBar">
    <h1 class="sceneName" ref="sceneNameElement">{{sanitize(currentScene?.data.name)}}</h1>
  </div>
</template>
<script setup>
const props = defineProps({
  currentScene: Object,
})

function sanitize(s) {
  return s?.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}
</script>

<style>
.titleBar
{
  position: absolute;
  top: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  background-color: rgba(58,68,84,0.8);
  z-index: 2;
}
</style>