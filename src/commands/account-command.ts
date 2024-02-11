import { z } from 'zod'
import { reactive } from 'vue'
import { BankEnum, GenderEnum, PostEnum, StatusEnum } from '@/lib/config'
import { InvokeCommand } from '.'
import type { AccountType } from '@/stores/account'

type FormDataType = {
  id: number | null
  full_name: string | null
  code: string | null
  gender: string | null
  city: string | null
  email: string | null
  email_password: string | null
  bank: string | null
  bank_account_number: string | null
  internet_bank_account_number: string | null
  post: string | null
  account_number: string | null
  account_password: string | null
  account_ib: number | null
  phone_number: string | null
  mac_address: string | null
  bonus: number | null
  status: string | null
}

export const validationZodSchema = z
  .object({
    id: z.number().nullable().optional(),
    full_name: z.string().min(1, { message: 'minimal 1 karakter' }),
    code: z.string().min(1, { message: 'minimal 1 karakter' }),
    gender: z.enum(GenderEnum, {
      errorMap: () => {
        return { message: 'Pilih salah satu' }
      }
    }),
    city: z.string().min(1, { message: 'minimal 1 karakter' }).nullable(),
    email: z
      .string()
      .min(1, { message: 'minimal 1 karakter' })
      .email({ message: 'email tidak valid' }),
    email_password: z.string().min(1, { message: 'minimal 1 karakter' }),
    bank: z.enum(BankEnum, {
      errorMap: () => {
        return { message: 'Pilih salah satu' }
      }
    }),
    bank_account_number: z.string().min(1, { message: 'minimal 1 karakter' }),
    internet_bank_account_number: z.string().min(1, { message: 'minimal 1 karakter' }).nullable(),
    post: z.enum(PostEnum, {
      errorMap: () => {
        return { message: 'Pilih salah satu' }
      }
    }),
    account_number: z.string().min(1, { message: 'minimal 1 karakter' }),
    account_password: z.string().min(1, { message: 'minimal 1 karakter' }),
    account_ib: z.number().nullable(),
    phone_number: z.string().min(1, { message: 'minimal 1 karakter' }).nullable(),
    mac_address: z.string().min(1, { message: 'minimal 1 karakter' }).nullable(),
    bonus: z.number().nullable(),
    status: z.enum(StatusEnum, {
      errorMap: () => {
        return { message: 'Pilih salah satu' }
      }
    })
  })
  .superRefine(({ post, account_ib }, ctx) => {
    if (post === 'client' && !account_ib) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['account_ib'],
        message: 'Harus diisi'
      })
    }
  })

const intialFormState: FormDataType = {
  id: null,
  full_name: null,
  code: null,
  gender: null,
  city: null,
  email: null,
  email_password: null,
  bank: null,
  bank_account_number: null,
  internet_bank_account_number: null,
  post: null,
  account_number: null,
  account_password: null,
  account_ib: null,
  phone_number: null,
  mac_address: null,
  bonus: null,
  status: null
}

export const formData = reactive<FormDataType>({ ...intialFormState })

const formDataReset = () => Object.assign(formData, intialFormState)

const formSubmit = async () => {
  const data = validationZodSchema.parse(formData)
  const payload = { ...data, account_ib: data.post === 'ib' ? null : data.account_ib }
  const result = await InvokeCommand<AccountType>(
    payload.id ? 'update_account' : 'create_account',
    payload
  )

  return result
}

export default {
  formDataReset,
  formSubmit
}
