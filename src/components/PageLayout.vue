<script setup lang="ts">
import MenuBar from './MenuBar.vue'
import { BreadCrumb } from './ui/breadcrumb'
import { PageTitle } from './ui/title'
</script>

<template>
  <div class="w-full">
    <MenuBar />
    <div class="w-full min-h-screen pt-12 px-4">
      <BreadCrumb />
      <PageTitle />
      <RouterView />
    </div>
  </div>
</template>
