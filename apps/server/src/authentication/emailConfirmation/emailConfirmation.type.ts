import { Result } from '@lib/core';

export interface VerificationTokenPayload {
  email: string;
}

export enum ConfirmEmailError {
  EmailAlreadyConfirmed = 'EmailAlreadyConfirmed',
  TokenExpired = 'TokenExpired',
  InvalidToken = 'InvalidToken',
  BadRequest = 'BadRequest',
}

export enum ResendEmailError {
  EmailAlreadyConfirmed = 'EmailAlreadyConfirmed',
  TooManyAttempts = 'TooManyAttempts',
}

export type TConfirmEmailRes = Result<boolean, ConfirmEmailError>;

export type TResendEmailRes = Result<boolean, ResendEmailError>;
