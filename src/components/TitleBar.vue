<template>
  <div id="titleBar">
    <h1 class="sceneName" ref="sceneNameElement">{{sanitize(currentScene?.data.name)}}</h1>
  </div>
</template>
<script setup>
const props = defineProps({
  currentScene: Object,
})

function updateSceneName(scene) {
  sceneNameElement.value.innerHTML = sanitize(scene.data.name);
}

function sanitize(s) {
  return s?.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}
</script>