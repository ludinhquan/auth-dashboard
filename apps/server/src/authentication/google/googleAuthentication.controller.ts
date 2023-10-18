import { UnauthorizedError } from '@lib/core';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import TokenVerificationDto from './googleAuthentication.dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';

@Controller('google-authentication')
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
