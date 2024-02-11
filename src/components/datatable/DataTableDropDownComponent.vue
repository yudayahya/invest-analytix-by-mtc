<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Trash2, List, Pencil } from 'lucide-vue-next'

defineProps<{
  handleDetail?: () => void
  handleEdit?: () => void
  handleDelete?: () => void
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-if="handleDetail" @click="handleDetail">
        <List class="mr-2 h-4 w-4" />
        <span>Detail</span>
      </DropdownMenuItem>
      <DropdownMenuItem v-if="handleEdit" @click="handleEdit">
        <Pencil class="mr-2 h-4 w-4" />
        <span>Ubah</span>
      </DropdownMenuItem>
      <DropdownMenuItem v-if="handleDelete" @click="handleDelete">
        <Trash2 class="mr-2 h-4 w-4" />
        <span>Hapus</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
