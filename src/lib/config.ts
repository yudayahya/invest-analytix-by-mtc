export const GenderEnum = ['male', 'female'] as const
export const BankEnum = ['bca', 'bri', 'bni', 'mandiri'] as const
export const PostEnum = ['ib', 'client'] as const
export const StatusEnum = ['primary', 'verified', 'unverified', 'deactivated'] as const

export type GenderType = (typeof GenderEnum)[number]
export type BankType = (typeof BankEnum)[number]
export type PostType = (typeof PostEnum)[number]
export type StatusType = (typeof StatusEnum)[number]

export const GenderConfig = GenderEnum.map((v) => {
  return { value: v, label: v === 'male' ? 'Laki-laki' : 'Perempuan' }
})
export const BankConfig = BankEnum.map((v) => {
  return { value: v, label: v.toUpperCase() }
})
export const PostConfig = PostEnum.map((v) => {
  return { value: v, label: v.toUpperCase() }
})
export const StatusConfig = StatusEnum.map((v) => {
  return { value: v, label: v.toUpperCase() }
})
