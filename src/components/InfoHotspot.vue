<template>
  <div class="info-hotspot">
    <h3>{{ hotspot.title }}</h3>
    <p>{{ hotspot.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  hotspot: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.info-hotspot {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}
</style>