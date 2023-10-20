import { Err, Ok, omit } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UserInfoClient } from 'auth0';

import { AuthenticationService } from '../authentication.service';
import { AuthError } from '../authentication.type';

import { UsersService } from '@/users';

@Injectable()
export class GoogleAuthenticationService {
  private readonly oauthClient: UserInfoClient;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private authenticationService: AuthenticationService,
  ) {
    this.oauthClient = new UserInfoClient({
      domain: this.configService.get('AUTH0_DOMAIN') as string,
    });
  }

  async handleRegisteredUser(user: User) {
    const { accessTokenCookie, refreshTokenCookie } =
      await this.authenticationService.getCookiesForAuthenticatedUser(user);

    return Ok({
      accessTokenCookie,
      refreshTokenCookie,
      user: omit(user, ['password']),
    });
  }

  async registerUser(data: { email: string; name: string; avatar: string }) {
    const createResult = await this.usersService.createWithGoogle(data);
    if (createResult.fail) return createResult;

    const user = createResult.value;
    return this.handleRegisteredUser(user);
  }

  async authenticate(token: string) {
    try {
      const tokenInfo = await this.oauthClient.getUserInfo(token);

      const { email, name, picture: avatar } = tokenInfo.data;

      const userResult = await this.usersService.getByEmail(email);

      if (userResult.fail)
        return this.registerUser({ email, name, avatar: avatar as string });

      const user = userResult.value;
      this.usersService.increaseLoginCount(user.id);
      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.statusCode === 401)
        return Err(AuthError.WrongCredentialsProvided);

      return Err(error.message);
    }
  }
}
