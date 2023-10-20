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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';

import { AuthenticationService } from './authentication.service';
import { RegisterDto, UpdatePasswordDto, UserDto } from './dto';
import { JwtAuthenticationGuard } from './jwt';
import JwtRefreshGuard from './jwt-refresh/jwt.guard';
import { LocalAuthenticationGuard } from './local';

import { CurrentUser } from '@/common';

@Controller()
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Req() req: Request) {
    try {
      const registerResult =
        await this.authenticationService.register(registrationData);

      if (registerResult.fail)
        return new BadRequestError(registerResult.error as string);

      const { user, accessTokenCookie, refreshTokenCookie } =
        registerResult.value;

      req.res?.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

      return user;
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(
    @CurrentUser() user: User,
    @Req() req: Request,
    @Body() loginDto: RegisterDto, // for swagger document
  ) {
    console.log('loginDto:', loginDto);
    const { accessTokenCookie, refreshTokenCookie } =
      await this.authenticationService.handleLoggedUser(user);

    req.res?.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
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

  @ApiOkResponse({ status: 200, type: UserDto })
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

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@CurrentUser() user: User, @Req() request: Request) {
    const { accessTokenCookie } =
      this.authenticationService.getCookieWithJwtAccessToken(user);

    request.res!.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
