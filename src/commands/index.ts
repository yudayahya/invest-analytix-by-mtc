import { invoke } from '@tauri-apps/api'
import { z } from 'zod'

z.setErrorMap((issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return { message: 'Mohon diisi' }
  }

  return { message: ctx.defaultError }
})

type CommandResponse<T> = {
  message: string
  data: T
}

const CommandList = ['sign_in', 'create_account', 'get_account', 'get_ib_account'] as const

export const InvokeCommand = async <R>(command: (typeof CommandList)[number], data?: object) => {
  const result = await invoke<CommandResponse<R>>(command, {
    data: data ? { ...data } : undefined
  })

  return result
}
