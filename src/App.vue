<template>
  <div class="w-100 h-100">
    <MarzipanoViewer ref="marzipanoViewer" v-if="data" :data="data"/>
  </div>

  <button class="position-absolute top-50" @click="toggleAutoRotate">Toggle Auto Rotate</button>

</template>

<script setup lang="ts">
import {data} from '@/data/data';
import {ref} from "vue";

const marzipanoViewer = ref(null);

function toggleAutoRotate() {
  if (marzipanoViewer.value) {
    marzipanoViewer.value.enableAutoRotate = !marzipanoViewer.value.enableAutoRotate;
  }
}
</script>

<style scoped>

</style>
