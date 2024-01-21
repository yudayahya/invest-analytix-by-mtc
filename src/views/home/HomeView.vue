<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
  <div>Ini Home</div>
  <div>{{ userStore.user }}</div>
</template>
