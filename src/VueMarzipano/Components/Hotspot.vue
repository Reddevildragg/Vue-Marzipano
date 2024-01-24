<template>
  <div class="hotspot" @click="handleClick">
    <img class="w-100 h-100 cursor-pointer" src="@/assets/img/link.png">
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
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
}
</style>