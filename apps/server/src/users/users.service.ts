import { Err, Ok } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetUserByEmailError, TGetUserByEmailRes } from './users.type';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getByEmail(email: string): Promise<TGetUserByEmailRes> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) return Ok(user);

    return Err(GetUserByEmailError.UserDoseNotExist);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: { ...userData },
    });

    newUser.password = null;

    return Ok(newUser);
  }

  async createWithGoogle(email: string, name: string) {
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
}
