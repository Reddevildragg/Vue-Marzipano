<template>
  <div class="control-buttons w-100 d-flex justify-content-center align-content-center">
    <div class="button-layout d-flex justify-content-center align-content-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.control-buttons
{
  position: absolute;
  bottom: 10%;
  z-index: 2;

  .button-layout
  {
    background-color: rgba(58,68,84,0.8);
  }
}
</style>