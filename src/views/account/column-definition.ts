import {
  createActionColumn,
  createSelectionColumn,
  createSortableHeader,
  type actionColumnOptions
} from '@/components/datatable'
import type { ColumnStructType } from '@/components/datatable/DataTableComponent.vue'
import { formatDateTime, formatDollar } from '@/lib/composables'
import { BankConfig, GenderConfig, PostConfig, StatusConfig } from '@/lib/config'
import type { AccountType } from '@/stores/account'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const accountColumnStruct: ColumnStructType[] = [
  { key: 'full_name', label: 'Nama Lengkap' },
  { key: 'code', label: 'Kode' },
  { key: 'gender', label: 'Jenis Kelamin' },
  { key: 'city', label: 'Kota' },
  { key: 'email', label: 'Email' },
  { key: 'email_password', label: 'Password Email' },
  { key: 'bank', label: 'Bank' },
  { key: 'bank_account_number', label: 'Nomor Rekening' },
  { key: 'internet_bank_account_number', label: 'Internet Banking' },
  { key: 'post', label: 'Post' },
  { key: 'account_number', label: 'Nomor Akun' },
  { key: 'account_password', label: 'Password Akun' },
  { key: 'account_ib', label: 'Akun IB' },
  { key: 'phone_number', label: 'Nomor HP' },
  { key: 'mac_address', label: 'MAC Address' },
  { key: 'bonus', label: 'Bonus' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Created at' },
  { key: 'updated_at', label: 'Updated at' }
]

export const createAccountColumnDefinitions = (
  actionColumnOptions: actionColumnOptions<AccountType>
): ColumnDef<AccountType>[] => {
  return [
    createSelectionColumn(),
    {
      accessorKey: 'full_name',
      header: ({ column }) => createSortableHeader(column, 'Nama Lengkap'),
      cell: ({ row }) =>
        h(
          'div',
          {
            class: 'text-left text-sm min-w-max cursor-pointer',
            onClick: () => console.log('Detail', row.original.id)
          },
          row.original.full_name || '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'code',
      header: ({ column }) => createSortableHeader(column, 'Kode'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.code || '-'),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => createSortableHeader(column, 'Jenis Kelamin'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          GenderConfig.find((v) => v.value === row.original.gender)?.label ||
            row.original.gender ||
            '-'
        ),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'city',
      header: ({ column }) => createSortableHeader(column, 'Kota'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.city || '-'),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'email',
      header: ({ column }) => createSortableHeader(column, 'Email'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.email || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'email_password',
      header: ({ column }) => createSortableHeader(column, 'Password Email'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.email_password || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'bank',
      header: ({ column }) => createSortableHeader(column, 'Bank'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          BankConfig.find((v) => v.value === row.original.bank)?.label || row.original.bank || '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'bank_account_number',
      header: ({ column }) => createSortableHeader(column, 'Nomor Rekening'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.bank_account_number || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'internet_bank_account_number',
      header: ({ column }) => createSortableHeader(column, 'Internet Banking'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          row.original.internet_bank_account_number || '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'post',
      header: ({ column }) => createSortableHeader(column, 'Post'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          PostConfig.find((v) => v.value === row.original.post)?.label || row.original.post || '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'account_number',
      header: ({ column }) => createSortableHeader(column, 'Nomor Akun'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.account_number || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'account_password',
      header: ({ column }) => createSortableHeader(column, 'Password Akun'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.account_password || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'account_ib',
      header: ({ column }) => createSortableHeader(column, 'Akun IB'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          row.original.related_account_ib
            ? (row.original.related_account_ib.account_number || '-') +
                ' - ' +
                (row.original.related_account_ib.full_name || '-')
            : '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'phone_number',
      header: ({ column }) => createSortableHeader(column, 'Nomor HP'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.phone_number || '-'),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'mac_address',
      header: ({ column }) => createSortableHeader(column, 'MAC Address'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.mac_address || '-'),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'mac_address',
      header: ({ column }) => createSortableHeader(column, 'MAC Address'),
      cell: ({ row }) =>
        h('div', { class: 'text-left text-sm min-w-max' }, row.original.mac_address || '-'),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'bonus',
      header: ({ column }) => createSortableHeader(column, 'Bonus'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          row.original.bonus ? formatDollar(row.original.bonus) : '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'status',
      header: ({ column }) => createSortableHeader(column, 'Status'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          StatusConfig.find((v) => v.value === row.original.status)?.label ||
            row.original.status ||
            '-'
        ),
      enableHiding: false,
      enableSorting: true
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => createSortableHeader(column, 'Created at'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          row.original.created_at ? formatDateTime(row.original.created_at) : '-'
        ),
      enableHiding: true,
      enableSorting: true
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => createSortableHeader(column, 'Updated at'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-left text-sm min-w-max' },
          row.original.updated_at ? formatDateTime(row.original.updated_at) : '-'
        ),
      enableHiding: true,
      enableSorting: true
    },
    createActionColumn(actionColumnOptions)
  ]
}
