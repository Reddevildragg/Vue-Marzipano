<template>
  <div class="control-buttons w-100 d-flex justify-content-center align-content-center">
    <div class="button-layout d-flex justify-content-center align-content-center" style="gap: 1rem">
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

  .button-layout
  {

  }
}
</style>