import { Err, Ok } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  async createWithGoogle(createData: {
    email: string;
    name: string;
    avatar: string;
  }): Promise<TCreateUserWithGoogleRes> {
    const newUser = await this.prisma.user.create({
      data: {
        ...createData,
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

  async markEmailAsConfirmed(email: string) {
    await this.prisma.user.update({
      where: { email },
      data: { isEmailConfirmed: true },
    });
  }

  async updateTimeResendEmailConfirmation(email: string) {
    return await this.prisma.user.update({
      where: { email },
      data: { lastTimeSendEmailConfirmation: new Date() },
    });
  }

  async setCurrentRefreshToken(userId: string, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { currentHashedRefreshToken },
    });
  }

  async getUserIfRefreshTokenMatches(userId: string, refreshToken: string) {
    const userResult = await this.getById(userId);

    if (userResult.fail) return userResult;

    const user = userResult.value;

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken ?? '',
    );

    if (isRefreshTokenMatching) return Ok(user);

    return Err();
  }

  async increaseLoginCount(userId: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { loginCount: { increment: 1 }, lastLoginTimestamp: new Date() },
    });
  }

  async createUserSession(userId: string) {
    const lastSessionTimestamp = new Date();
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastSessionTimestamp,
        UserSession: { create: { time: lastSessionTimestamp } },
      },
    });
  }
}
