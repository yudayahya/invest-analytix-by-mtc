import {
  createActionColumn,
  createSelectionColumn,
  createSortableHeader
} from '@/components/datatable'
import type { ColumnStructType } from '@/components/datatable/DataTableComponent.vue'
import { formatDateTime, formatDollar } from '@/lib/composables'
import { BankConfig, GenderConfig, PostConfig, StatusConfig } from '@/lib/config'
import type { AccountType } from '@/stores/account'
import type { ColumnDef, Row } from '@tanstack/vue-table'
import { h } from 'vue'

export const accountColumnStruct: ColumnStructType[] = [
  { key: 'full_name', label: 'Nama Lengkap', enableHiding: false, enableSorting: true },
  { key: 'code', label: 'Kode', enableHiding: true, enableSorting: true },
  { key: 'gender', label: 'Jenis Kelamin', enableHiding: true, enableSorting: true },
  { key: 'city', label: 'Kota', enableHiding: true, enableSorting: true },
  { key: 'email', label: 'Email', enableHiding: false, enableSorting: true },
  { key: 'email_password', label: 'Password Email', enableHiding: false, enableSorting: true },
  { key: 'bank', label: 'Bank', enableHiding: false, enableSorting: true },
  { key: 'bank_account_number', label: 'Nomor Rekening', enableHiding: false, enableSorting: true },
  {
    key: 'internet_bank_account_number',
    label: 'Internet Banking',
    enableHiding: false,
    enableSorting: true
  },
  { key: 'post', label: 'Post', enableHiding: false, enableSorting: true },
  { key: 'account_number', label: 'Nomor Akun', enableHiding: false, enableSorting: true },
  { key: 'account_password', label: 'Password Akun', enableHiding: false, enableSorting: true },
  { key: 'account_ib', label: 'Akun IB', enableHiding: false, enableSorting: true },
  { key: 'phone_number', label: 'Nomor Telepon', enableHiding: true, enableSorting: true },
  { key: 'mac_address', label: 'MAC Address', enableHiding: true, enableSorting: true },
  { key: 'bonus', label: 'Bonus', enableHiding: false, enableSorting: true },
  { key: 'status', label: 'Status', enableHiding: false, enableSorting: true },
  { key: 'created_at', label: 'Created at', enableHiding: true, enableSorting: true },
  { key: 'updated_at', label: 'Updated at', enableHiding: true, enableSorting: true }
]

const createFormattedCell = (row: Row<AccountType>, key: string) => {
  const value = row.getValue(key) as string

  if (key === 'created_at' || key === 'updated_at') {
    return h('div', { class: 'text-left text-sm min-w-max' }, value ? formatDateTime(value) : '-')
  }

  if (key === 'bonus') {
    return h(
      'div',
      { class: 'text-left text-sm min-w-max' },
      value ? formatDollar(parseFloat(value)) : '-'
    )
  }

  if (key === 'status') {
    return h(
      'div',
      { class: 'text-left text-sm min-w-max' },
      StatusConfig.find((v) => v.value === value)?.label || value || '-'
    )
  }

  if (key === 'post') {
    return h(
      'div',
      { class: 'text-left text-sm min-w-max' },
      PostConfig.find((v) => v.value === value)?.label || value || '-'
    )
  }

  if (key === 'bank') {
    return h(
      'div',
      { class: 'text-left text-sm min-w-max' },
      BankConfig.find((v) => v.value === value)?.label || value || '-'
    )
  }

  if (key === 'gender') {
    return h(
      'div',
      { class: 'text-left text-sm min-w-max' },
      GenderConfig.find((v) => v.value === value)?.label || value || '-'
    )
  }

  if (key === 'full_name') {
    return h(
      'div',
      {
        class: 'text-left text-sm min-w-max cursor-pointer',
        onClick: () => console.log('Detail', row.original.id)
      },
      value || '-'
    )
  }

  return h('div', { class: 'text-left text-sm min-w-max' }, value || '-')
}

export const createAccountColumnDefinitions = (): ColumnDef<AccountType>[] => {
  const result: ColumnDef<AccountType>[] = [createSelectionColumn()]

  accountColumnStruct.forEach((v) => {
    result.push({
      accessorKey: v.key,
      header: ({ column }) => createSortableHeader(column, v.label),
      cell: ({ row }) => createFormattedCell(row, v.key),
      enableHiding: v.enableHiding || false,
      enableSorting: v.enableSorting || false
    })
  })

  result.push(
    createActionColumn(
      (data) => console.log('Detail', data.original.id),
      (data) => console.log('Hapus', data.original.id)
    )
  )

  return result
}
