import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum RegisterError {
  UserAlreadyExist = 'UserAlreadyExist',
  IncorrectPasswordFormat = 'IncorrectPasswordFormat',
}

export enum AuthError {
  WrongCredentialsProvided = 'WrongCredentialsProvided',
}

export type TTokenPayload = {
  userId: string;
  isEmailConfirmed?: boolean;
};

export type TRegisterRes = Result<User, RegisterError>;

export type TLoginRes = Result<User, AuthError>;

export type TResetPasswordRes = Result<boolean, RegisterError | AuthError>;
