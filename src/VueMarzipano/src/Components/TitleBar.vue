<template>
  <div class="titleBar d-flex justify-content-center align-items-center">
    <h1 class="sceneName m-0 font-gamechanger">{{sanitize(currentScene?.data.name)}}</h1>
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
h1
{
  font-size: 24px!important;
}
.titleBar
{
  z-index: 10;
  position: absolute;
  top: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  background-color:  rgba(25,45,56,0.8);
}

.sceneName
{
  color: white;
}
</style>