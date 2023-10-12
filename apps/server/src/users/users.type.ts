import { Result } from '@lib/core';
import { User } from '@prisma/client';

export enum GetUserByEmailError {
  UserDoseNotExist = 'UserDoseNotExist',
}

export type TGetUserByIdRes = Result<User, GetUserByEmailError>;

export type TGetUserByEmailRes = Result<User, GetUserByEmailError>;

export type TCreateUserRes = Result<User>;

export type TCreateUserWithGoogleRes = Result<User>;
