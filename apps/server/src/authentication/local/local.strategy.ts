import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { BadRequestError } from '@lib/core';
import { User } from '@prisma/client';

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
