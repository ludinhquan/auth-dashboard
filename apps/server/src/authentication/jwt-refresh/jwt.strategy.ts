import { UnauthorizedError } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TTokenPayload } from '../authentication.type';

import { UsersService } from '@/users';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TTokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    const result = await this.userService.getUserIfRefreshTokenMatches(
      payload.userId,
      refreshToken,
    );

    if (result.fail) throw new UnauthorizedError("User don't exists");

    result.value.password = null;

    return result.value;
  }
}
