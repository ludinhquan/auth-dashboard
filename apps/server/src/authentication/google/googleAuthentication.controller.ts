import { UnauthorizedError } from '@lib/core';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { TokenVerificationDto } from './dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';

@Controller('google-authentication')
@ApiTags('Google Authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const result = await this.googleAuthenticationService.authenticate(
      tokenData.token,
    );

    if (result.fail) return new UnauthorizedError(result.error!);

    const { accessTokenCookie, refreshTokenCookie, user } = result.value;
    request.res!.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }
}
