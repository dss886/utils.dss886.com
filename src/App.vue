<script setup lang="ts">
import MahjongCalculator from "./components/MahjongCalculator.vue";
</script>

<template>
  <div class="app-container">
    <MahjongCalculator />
  </div>
</template>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>