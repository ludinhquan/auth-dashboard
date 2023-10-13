import { Err, Ok } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dto';
import {
  GetUserByEmailError,
  TCreateUserRes,
  TCreateUserWithGoogleRes,
  TGetUserByEmailRes,
  TGetUserByIdRes,
} from './users.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getById(userId: string): Promise<TGetUserByIdRes> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user) return Ok(user);

    return Err(GetUserByEmailError.UserDoseNotExist);
  }

  async getByEmail(email: string): Promise<TGetUserByEmailRes> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) return Ok(user);

    return Err(GetUserByEmailError.UserDoseNotExist);
  }

  async create(userData: CreateUserDto): Promise<TCreateUserRes> {
    const newUser = await this.prisma.user.create({ data: userData });
    newUser.password = null;

    return Ok(newUser);
  }

  async createWithGoogle(
    email: string,
    name: string,
  ): Promise<TCreateUserWithGoogleRes> {
    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        isRegisteredWithGoogle: true,
        isEmailConfirmed: true,
      },
    });

    return Ok(newUser);
  }

  async updateProfile(userId: string, userData: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { name: userData.name },
    });
  }
}
