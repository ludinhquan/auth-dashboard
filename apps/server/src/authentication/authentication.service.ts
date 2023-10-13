import { Err, Ok } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import {
  AuthError,
  RegisterError,
  TLoginRes,
  TRegisterRes,
  TTokenPayload,
} from './authentication.type';
import { RegisterDto, UpdatePasswordDto } from './dto';
import { EmailConfirmationService } from './emailConfirmation';
import { Password } from './password';

import { JwtService } from '@/modules';
import { UsersService } from '@/users';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaClient,
    private emailConfirmationService: EmailConfirmationService,
  ) {}

  public async register(registrationData: RegisterDto): Promise<TRegisterRes> {
    const invalidPassword = Password.validate(registrationData.password);

    if (invalidPassword) return Err(RegisterError.IncorrectPasswordFormat);

    const userResult = await this.usersService.getByEmail(
      registrationData.email,
    );

    const existed = userResult.ok;
    if (existed) return Err(RegisterError.UserAlreadyExist);

    const hashedPassword = await Password.hash(registrationData.password);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });

    if (createdUser.ok)
      this.emailConfirmationService.sendVerificationLink(
        registrationData.email,
      );

    return createdUser;
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<TLoginRes> {
    const userResult = await this.usersService.getByEmail(email);
    if (userResult.fail) return Err(AuthError.WrongCredentialsProvided);

    const isMatch = await Password.compare(
      plainTextPassword,
      userResult.value.password!,
    );

    if (!isMatch) return Err(AuthError.WrongCredentialsProvided);

    return Ok(userResult.value);
  }

  public getCookieWithJwtAccessToken(
    userId: string,
    isEmailConfirmed: boolean,
  ) {
    const payload: TTokenPayload = { userId, isEmailConfirmed };

    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async resetPassword(userId: string, data: UpdatePasswordDto) {
    const { oldPassword, newPassword } = data;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return Err(AuthError.WrongCredentialsProvided);

    const isOldPasswordMatch = await Password.compare(
      oldPassword,
      user.password!,
    );
    if (!isOldPasswordMatch) return Err(AuthError.WrongCredentialsProvided);

    const invalidPassword = Password.validate(newPassword);

    if (invalidPassword) return Err(RegisterError.IncorrectPasswordFormat);

    const hashedPassword = await Password.hash(newPassword);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return Ok(true);
  }
}
