/* eslint-disable */
export type RegisterDto = {
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
}
