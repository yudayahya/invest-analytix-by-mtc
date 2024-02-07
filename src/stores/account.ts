import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { InvokeCommand } from '@/commands'

type AccountIbType = {
  id: number
  full_name: string
}

export type AccountType = {
  id: number
  full_name: string
  code: string
  gender: string
  city: string | null
  email: string
  email_password: string
  bank: string
  bank_account_number: string
  internet_bank_account_number: string | null
  post: string
  account_number: string
  account_password: string
  account_ib: number | null
  phone_number: string | null
  mac_address: string | null
  bonus: number | null
  status: string
  created_at: string
  updated_at: string
}

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<AccountType[]>([])
  const account_ib_list = ref<{ value: number; label: string }[]>([])

  const fetch_account_ib_list = async () => {
    try {
      const response = await InvokeCommand<AccountIbType[]>('get_ib_account')
      account_ib_list.value = response.data.map((v) => {
        return { value: v.id, label: v.full_name }
      })
    } catch {
      account_ib_list.value = []
    }
  }

  const fetch_accounts = async () => {
    try {
      const response = await InvokeCommand<AccountType[]>('get_account')
      accounts.value = response.data
    } catch {
      accounts.value = []
    }
  }

  return { accounts, account_ib_list, fetch_accounts, fetch_account_ib_list }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
