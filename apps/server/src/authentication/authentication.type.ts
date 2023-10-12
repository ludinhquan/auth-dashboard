import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum RegisterError {
  UserAlreadyExist = 'UserAlreadyExist',
  PasswordInvalid = 'PasswordInvalid',
}

export type TRegisterRes = Result<User, RegisterError>;
