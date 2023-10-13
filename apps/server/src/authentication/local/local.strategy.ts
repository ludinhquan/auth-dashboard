import { BadRequestError } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const userResult = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );

    if (userResult.fail) throw new BadRequestError(userResult.error!);

    userResult.value.password = null;

    return userResult.value;
  }
}
