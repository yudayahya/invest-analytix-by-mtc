export const GenderConfig = [
  {
    value: 'male',
    label: 'Laki-laki'
  },
  {
    value: 'female',
    label: 'Perempuan'
  }
]

export const GenderEnum = Object.fromEntries(
  GenderConfig.map((obj) => obj.value).map((value) => [value, value])
)

export const BankConfig = [
  {
    value: 'bca',
    label: 'BCA'
  },
  {
    value: 'bri',
    label: 'BRI'
  },
  {
    value: 'bni',
    label: 'BNI'
  },
  {
    value: 'mandiri',
    label: 'Mandiri'
  }
]

export const BankEnum = Object.fromEntries(
  BankConfig.map((obj) => obj.value).map((value) => [value, value])
)

export const PostConfig = [
  {
    value: 'ib',
    label: 'IB'
  },
  {
    value: 'client',
    label: 'Client'
  }
]

export const PostEnum = Object.fromEntries(
  PostConfig.map((obj) => obj.value).map((value) => [value, value])
)

export const StatusConfig = [
  {
    value: 'primary',
    label: 'Primary'
  },
  {
    value: 'verified',
    label: 'Verified'
  },
  {
    value: 'unverified',
    label: 'Unverified'
  },
  {
    value: 'deactivated',
    label: 'Deactivated'
  }
]

export const StatusEnum = Object.fromEntries(
  StatusConfig.map((obj) => obj.value).map((value) => [value, value])
)
