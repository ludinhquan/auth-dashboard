import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum RegisterError {
  UserAlreadyExist = 'UserAlreadyExist',
  PasswordInvalid = 'PasswordInvalid',
}

export enum AuthError {
  WrongCredentialsProvided = 'WrongCredentialsProvided',
}

export type TRegisterRes = Result<User, RegisterError>;

export type TLoginRes = Result<User, AuthError>;

export type TTokenPayload = {
  userId: string;
  isEmailConfirmed?: boolean;
};
