import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum GetUserByEmailError {
  UserDoseNotExist = 'UserDoseNotExist',
}

export type TGetUserByEmailRes = Result<User, GetUserByEmailError>;
