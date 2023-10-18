/* eslint-disable */
export type RegisterDto = {
  email: string
  password: string
}

export type UserDto = {
  id: string
  email: string
  name: string
  avatar: string
  isEmailConfirmed: boolean
  isRegisteredWithGoogle: boolean
  lastTimeSendEmailConfirmation: string
}

export type UpdatePasswordDto = {
  oldPassword: string
  newPassword: string
}

export type UpdateUserDto = {
  name: string
}

export type ConfirmEmailDto = {
  token: string
}

export type ResendEmailResponseDto = {
  lastTimeSendEmailConfirmation: string
  resendTimeConfig: number
}

export type TokenVerificationDto = {
  token: string
}

export type GetSummaryResponse = {
  totalUser: number
  totalActiveUser: number
  averageActiveUser: number
}

export type User = {
  id: string
  name: string
  email: string
  createdDate: string
  loginCount: number
  lastSessionTimestamp: string
  isRegisteredWithGoogle: string
}

export type Pagination = {
  total: number
  page: number
  limit: number
}

export type GetUsersResponse = {
  data: User[]
  pagination: Pagination
}
