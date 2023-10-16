/* eslint-disable */
export type RegisterDto = {
}

export type UserDto = {
  id: string
  email: string
  name: string
  isEmailConfirmed: boolean
  isRegisteredWithGoogle: boolean
  lastTimeSendEmailConfirmation: string
}

export type UpdatePasswordDto = {
}

export type UpdateUserDto = {
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
