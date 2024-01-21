<script setup lang="ts">
import Toaster from '@/components/ui/toast/ToasterComponent.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.querySelector('body')?.classList.add('dark')
})
</script>

<template>
  <RouterView />
  <Toaster />
</template>
