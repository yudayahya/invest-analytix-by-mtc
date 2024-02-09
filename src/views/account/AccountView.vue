<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { onMounted } from 'vue'
import { createAccountColumnDefinitions, accountColumnStruct } from './column-definition'
import { DataTable } from '@/components/datatable'

const accountStore = useAccountStore()
const accountColumnDefinitions = createAccountColumnDefinitions()

onMounted(() => {
  accountStore.fetch_accounts()
})
</script>

<template>
  <div class="container py-8 mx-auto">
    <DataTable
      :columns="accountColumnDefinitions"
      :data="accountStore.accounts"
      :column-struct="accountColumnStruct"
    />
  </div>
</template>
