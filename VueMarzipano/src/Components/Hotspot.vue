<template>
  <component
      :is="getHotspotComponentName(hotspot)"
      :id="hotspot.id"
      :hotspot="hotspot" />
</template>

<script setup lang="ts">
import {defineProps, resolveComponent} from 'vue';
import NavigationHotspot from "./NavigationHotspot.vue";

const { hotspot } = defineProps(['hotspot'])
function getHotspotComponentName(hotspot)
{
  if(hotspot.type)
  {
    return resolveComponent(hotspot.type);
  }
  else
  {
    return NavigationHotspot
  }
}
</script>

<style scoped lang="scss">

</style>