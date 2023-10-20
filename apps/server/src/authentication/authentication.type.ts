import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum RegisterError {
  UserAlreadyExist = 'UserAlreadyExist',
  IncorrectPasswordFormat = 'IncorrectPasswordFormat',
}

export enum AuthError {
  WrongCredentialsProvided = 'WrongCredentialsProvided',
  UserEmailNotVerified = 'UserEmailNotVerified',
}

export type TTokenPayload = {
  userId: string;
  isEmailConfirmed?: boolean | null;
};

export type TRegisterRes = Result<
  { user: User; accessTokenCookie: string; refreshTokenCookie: string },
  RegisterError
>;

export type TLoginRes = Result<User, AuthError>;

export type TResetPasswordRes = Result<boolean, RegisterError | AuthError>;
