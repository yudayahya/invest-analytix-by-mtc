<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="w-full mt-4 pb-4 border-b">
    <h2 class="text-2xl font-bold tracking-tight">Halaman {{ route.meta.title ?? '-' }}</h2>
    <p class="text-muted-foreground">{{ route.meta.subtitle ?? '-' }}</p>
  </div>
</template>
