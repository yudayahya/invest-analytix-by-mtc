<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { onMounted } from 'vue'

const accountStore = useAccountStore()

onMounted(() => {
  accountStore.fetch_accounts()
})
</script>

<template>
  <div>
    <h1>Account</h1>
  </div>
  <div>{{ accountStore.accounts }}</div>
</template>
