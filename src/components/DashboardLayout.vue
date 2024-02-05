<script setup lang="ts">
import MenuBar from './MenuBar.vue'
</script>

<template>
  <div class="w-full">
    <MenuBar />
    <div class="w-full min-h-screen pt-12 px-4">
      <RouterView />
    </div>
  </div>
</template>
