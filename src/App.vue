<template>
  <div class="w-100 h-100">
    <pano v-if="data" :data="data"/>
  </div>
</template>

<script setup lang="ts">
import pano from '@VueMarzipano/Views/MarzipanoViewer.vue'
import {data} from '@/data/data';
</script>

<style scoped>
</style>
