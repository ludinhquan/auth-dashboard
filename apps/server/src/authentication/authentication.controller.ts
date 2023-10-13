import { BadRequestError, InternalServerError } from '@lib/core';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

import { CurrentUser } from '../decorators';

import { AuthenticationService } from './authentication.service';
import { RegisterDto, UpdatePasswordDto } from './dto';
import { JwtAuthenticationGuard } from './jwt';
import { LocalAuthenticationGuard } from './local';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    try {
      const registerResult =
        await this.authenticationService.register(registrationData);

      if (registerResult.ok) return registerResult.value;

      return new BadRequestError(registerResult.error as string);
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@CurrentUser() user: User, @Req() req: Request) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(
        user.id,
        user.isEmailConfirmed!,
      );

    req.res?.setHeader('Set-Cookie', [accessTokenCookie]);

    if (user.isEmailConfirmed) return;

    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() req: Request) {
    req.res?.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('reset-password')
  async resetPassword(
    @CurrentUser() user: User,
    @Body() data: UpdatePasswordDto,
  ) {
    const result = await this.authenticationService.resetPassword(
      user.id,
      data,
    );

    if (result.ok) return;

    return new BadRequestError(result.error!);
  }
}
