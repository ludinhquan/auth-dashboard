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

export type T = Result<boolean, ConfirmEmailError>;
