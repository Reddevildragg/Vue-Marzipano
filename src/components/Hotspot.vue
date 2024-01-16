<template>
  <div class="hotspot" @click="handleClick">
    test world
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const { text, onClick } = defineProps(['text', 'onClick']);

const handleClick = () => {
  // Call the parent component's click handler
  onClick();
};
</script>

<style scoped lang="scss">
.hotspot {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
}
</style>