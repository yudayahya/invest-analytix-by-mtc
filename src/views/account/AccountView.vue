<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import { onMounted } from 'vue'
import { createAccountColumnDefinitions, accountColumnStruct } from './column-definition'
import { DataTable } from '@/components/datatable'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()
const accountColumnDefinitions = createAccountColumnDefinitions({
  callbackEdit: (row) => {
    router.push({ name: 'account-edit', params: { id: row.original.id } })
  }
})

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
      :new-record-redirection="() => router.push({ name: 'account-create' })"
      :delete-selected-row-fn="(rows) => console.log('Selected Rows:', rows)"
    />
  </div>
</template>
