import { invoke } from '@tauri-apps/api'

type CommandResponse<T> = {
  message: string
  data: T
}

const CommandList = ['sign_in', 'create_account'] as const

export const InvokeCommand = async <R>(command: (typeof CommandList)[number], data: object) => {
  const result = await invoke<CommandResponse<R>>(command, {
    data: { ...data }
  })

  return result
}
