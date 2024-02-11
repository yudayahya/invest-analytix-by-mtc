<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Form, Field, ErrorMessage } from 'vee-validate'
import accountCommand, { validationZodSchema, formData } from '@/commands/account-command'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/components/ui/toast'
import { Input, InputCurrency, Select } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRoute, useRouter } from 'vue-router'
import { GenderConfig, BankConfig, PostConfig, StatusConfig } from '@/lib/config'
import { useAccountStore } from '@/stores/account'

const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const accountStore = useAccountStore()

const isLoading = ref(false)

const validationSchema = toTypedSchema(validationZodSchema)

const setInitialFormData = () => {
  const paramId = route.params.id as string
  if (!paramId) return

  const account = accountStore.accounts.find((account) => account.id === parseInt(paramId))
  if (!account) return

  formData.id = account.id
  formData.full_name = account.full_name
  formData.code = account.code
  formData.gender = account.gender
  formData.city = account.city
  formData.email = account.email
  formData.email_password = account.email_password
  formData.bank = account.bank
  formData.bank_account_number = account.bank_account_number
  formData.internet_bank_account_number = account.internet_bank_account_number
  formData.post = account.post
  formData.account_number = account.account_number
  formData.account_password = account.account_password
  formData.account_ib = account.account_ib
  formData.phone_number = account.phone_number
  formData.mac_address = account.mac_address
  formData.bonus = account.bonus
  formData.status = account.status
}

const onSubmit = async () => {
  isLoading.value = true

  try {
    const isUpdateProcess = formData.id ? true : false

    await accountCommand.formSubmit()
    await accountStore.fetch_accounts()
    await accountStore.fetch_account_ib_list()
    accountCommand.formDataReset()
    isLoading.value = false

    toast({
      title: 'Yeah!',
      description: isUpdateProcess ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan',
      duration: 3000
    })

    if (isUpdateProcess) router.push({ name: 'account' })
  } catch (error: any) {
    isLoading.value = false

    toast({
      title: 'Ooopps...',
      description: error.message || 'an uncaught error occurred',
      duration: 3000
    })
  }
}

onMounted(() => {
  accountCommand.formDataReset()
  if (accountStore.account_ib_list.length === 0) accountStore.fetch_account_ib_list()
  setInitialFormData()
})
</script>

<template>
  <div class="w-full max-w-screen-lg mx-auto py-8 px-2">
    <Form :validation-schema="validationSchema" @submit="onSubmit">
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="grid gap-2 auto-rows-max">
          <Label for="full_name">Nama Lengkap</Label>
          <Field
            name="full_name"
            type="text"
            class="hidden"
            v-model="formData.full_name"
            :validate-on-input="true"
          />
          <Input
            placeholder="Nama Lengkap"
            type="text"
            v-model="formData.full_name"
            auto-capitalize="none"
          />
          <ErrorMessage name="full_name" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="code">Kode</Label>
          <Field
            name="code"
            type="text"
            class="hidden"
            v-model="formData.code"
            :validate-on-input="true"
          />
          <Input placeholder="Kode" type="text" v-model="formData.code" auto-capitalize="none" />
          <ErrorMessage name="code" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="gender">Jenis Kelamin</Label>
          <Field
            name="gender"
            type="text"
            class="hidden"
            v-model="formData.gender"
            :validate-on-input="true"
          />
          <Select
            v-model="formData.gender"
            :options="GenderConfig"
            placeholder="Pilih salah satu"
          />
          <ErrorMessage name="gender" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="city">Kota</Label>
          <Field
            name="city"
            type="text"
            class="hidden"
            v-model="formData.city"
            :validate-on-input="true"
          />
          <Input placeholder="Kota" type="text" v-model="formData.city" auto-capitalize="none" />
          <ErrorMessage name="city" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="email">Email</Label>
          <Field
            name="email"
            type="email"
            class="hidden"
            v-model="formData.email"
            :validate-on-input="true"
          />
          <Input placeholder="Email" type="email" v-model="formData.email" auto-capitalize="none" />
          <ErrorMessage name="email" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="email_password">Password Email</Label>
          <Field
            name="email_password"
            type="text"
            class="hidden"
            v-model="formData.email_password"
            :validate-on-input="true"
          />
          <Input
            placeholder="Password Email"
            type="text"
            v-model="formData.email_password"
            auto-capitalize="none"
          />
          <ErrorMessage name="email_password" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="bank">Bank</Label>
          <Field
            name="bank"
            type="text"
            class="hidden"
            v-model="formData.bank"
            :validate-on-input="true"
          />
          <Select v-model="formData.bank" :options="BankConfig" placeholder="Pilih salah satu" />
          <ErrorMessage name="bank" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="bank_account_number">No Rekening</Label>
          <Field
            name="bank_account_number"
            type="text"
            class="hidden"
            v-model="formData.bank_account_number"
            :validate-on-input="true"
          />
          <Input
            placeholder="No Rekening"
            type="text"
            v-model="formData.bank_account_number"
            auto-capitalize="none"
          />
          <ErrorMessage name="bank_account_number" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="internet_bank_account_number">Internet Banking</Label>
          <Field
            name="internet_bank_account_number"
            type="text"
            class="hidden"
            v-model="formData.internet_bank_account_number"
            :validate-on-input="true"
          />
          <Input
            placeholder="Internet Banking"
            type="text"
            v-model="formData.internet_bank_account_number"
            auto-capitalize="none"
          />
          <ErrorMessage name="internet_bank_account_number" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="post">Post</Label>
          <Field
            name="post"
            type="text"
            class="hidden"
            v-model="formData.post"
            :validate-on-input="true"
          />
          <Select v-model="formData.post" :options="PostConfig" placeholder="Pilih salah satu" />
          <ErrorMessage name="post" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="account_number">No ID Akun</Label>
          <Field
            name="account_number"
            type="text"
            class="hidden"
            v-model="formData.account_number"
            :validate-on-input="true"
          />
          <Input
            placeholder="No ID Akun"
            type="text"
            v-model="formData.account_number"
            auto-capitalize="none"
          />
          <ErrorMessage name="account_number" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="account_password">Password Akun</Label>
          <Field
            name="account_password"
            type="text"
            class="hidden"
            v-model="formData.account_password"
            :validate-on-input="true"
          />
          <Input
            placeholder="Password Akun"
            type="text"
            v-model="formData.account_password"
            auto-capitalize="none"
          />
          <ErrorMessage name="account_password" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="account_ib">Kode IB/Ref</Label>
          <Field
            name="account_ib"
            type="text"
            class="hidden"
            v-model="formData.account_ib"
            :validate-on-input="true"
          />
          <Select
            v-model="formData.account_ib"
            :options="accountStore.account_ib_list"
            placeholder="Pilih salah satu"
          />
          <ErrorMessage name="account_ib" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="phone_number">No HP</Label>
          <Field
            name="phone_number"
            type="text"
            class="hidden"
            v-model="formData.phone_number"
            :validate-on-input="true"
          />
          <Input
            placeholder="No HP"
            type="text"
            v-model="formData.phone_number"
            auto-capitalize="none"
          />
          <ErrorMessage name="phone_number" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="mac_address">Mac Address</Label>
          <Field
            name="mac_address"
            type="text"
            class="hidden"
            v-model="formData.mac_address"
            :validate-on-input="true"
          />
          <Input
            placeholder="Mac Address"
            type="text"
            v-model="formData.mac_address"
            auto-capitalize="none"
          />
          <ErrorMessage name="mac_address" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="bonus">Bonus</Label>
          <Field
            name="bonus"
            type="text"
            class="hidden"
            v-model="formData.bonus"
            :validate-on-input="true"
          />
          <InputCurrency v-model="formData.bonus" currency="USD" />
          <ErrorMessage name="bonus" as="p" class="text-red-500 text-xs" />
        </div>
        <div class="grid gap-2 auto-rows-max">
          <Label for="status">Status</Label>
          <Field
            name="status"
            type="text"
            class="hidden"
            v-model="formData.status"
            :validate-on-input="true"
          />
          <Select
            v-model="formData.status"
            :options="StatusConfig"
            placeholder="Pilih salah satu"
          />
          <ErrorMessage name="status" as="p" class="text-red-500 text-xs" />
        </div>
      </div>
      <div class="w-full mt-6 pt-4 border-t flex justify-end items-center gap-x-2">
        <Button type="button" variant="secondary" @click="router.push({ name: 'account' })"
          >Back</Button
        >
        <Button :disabled="isLoading" type="submit">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Submit
        </Button>
      </div>
    </Form>
  </div>
</template>
