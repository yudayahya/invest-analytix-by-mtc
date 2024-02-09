import { DataTableDropDown } from '@/components/datatable'
import type { Column, ColumnDef, Row } from '@tanstack/vue-table'
import { ChevronsUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { h } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

export { default as DataTable } from './DataTableComponent.vue'
export { default as DataTableDropDown } from './DataTableDropDownComponent.vue'
export { default as DataTablePagination } from './DataTablePaginationComponent.vue'

export const createSortableHeader = <T>(column: Column<T>, label: string) => {
  return h(
    Button,
    {
      variant: 'ghost',
      class: 'min-w-max',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    },
    () => [label, h(ChevronsUpDown, { class: 'ml-2 h-4 w-4' })]
  )
}

export const createSelectionColumn = <T>(): ColumnDef<T> => {
  return {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      })
  }
}

export const createActionColumn = <T>(
  callbackDetail: (data: Row<T>) => void,
  callbackDelete: (data: Row<T>) => void
): ColumnDef<T> => {
  return {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const handleDetail = () => callbackDetail(row)
      const handleDelete = () => callbackDelete(row)

      return h(
        'div',
        { class: 'relative text-center' },
        h(DataTableDropDown, {
          handleDetail,
          handleDelete
        })
      )
    }
  }
}
