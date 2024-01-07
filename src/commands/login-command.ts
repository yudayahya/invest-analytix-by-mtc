import * as zod from 'zod'
import { reactive } from 'vue'
import { invoke } from '@tauri-apps/api'
import { type CommandResponse } from '.'

type Response = {
  id: number
  email: string
  created_at?: string
}

export const validationZodSchema = zod.object({
  email: zod.string().email({ message: 'email tidak valid' }),
  password: zod.string().min(8, { message: 'minimal 8 karakter' })
})

export const formData = reactive({
  email: '',
  password: ''
})

const formDataReset = () => {
  formData.email = ''
  formData.password = ''
}

const commandInvoke = async () => {
  const result = await invoke<CommandResponse<Response>>('sign_in', {
    data: { ...formData }
  })

  return result
}

export default {
  formDataReset,
  commandInvoke
}
