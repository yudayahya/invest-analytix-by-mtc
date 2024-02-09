<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, Row, SortingState, VisibilityState } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { valueUpdater } from '@/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Settings2, PlusCircle, Trash2 } from 'lucide-vue-next'
import { DataTablePagination } from '.'

export type ColumnStructType = {
  key: string
  label: string
  enableHiding?: boolean
  enableSorting?: boolean
}

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnStruct: ColumnStructType[]
  newRecordRedirection: () => void
  deleteSelectedRowFn: (row: Row<TData>[]) => void
}>()

const sorting = ref<SortingState>([])
const globalFilters = ref('')
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  enableRowSelection: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    }
  }
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between py-4">
      <div class="flex gap-x-4">
        <Input
          class="w-72 h-8"
          placeholder="Search..."
          :model-value="table.getState().globalFilter || ''"
          @update:model-value="table.setGlobalFilter($event)"
        />
        <Button variant="secondary" class="ml-auto h-8" size="sm" @click="newRecordRedirection">
          <PlusCircle class="mr-2 h-4 w-4" />
          New
        </Button>
        <Button
          v-if="table.getFilteredSelectedRowModel().rows.length > 0"
          variant="destructive"
          class="ml-auto h-8"
          size="sm"
          @click="deleteSelectedRowFn(table.getFilteredSelectedRowModel().rows)"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete Selected Items
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto h-8" size="sm">
            <Settings2 class="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ columnStruct.find((v) => v.key === column.id)?.label || column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colSpan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination :table="table" />
  </div>
</template>
