import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum RegisterError {
  UserAlreadyExist = 'UserAlreadyExist',
}

export type TRegisterRes = Result<User, RegisterError>;
