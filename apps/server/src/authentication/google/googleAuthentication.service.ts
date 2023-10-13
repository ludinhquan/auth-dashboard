import { Err, Ok, omit } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UserInfoClient } from 'auth0';

import { AuthenticationService } from '../authentication.service';

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
    // if (!user.isRegisteredWithGoogle)
    //   return Err('User is not registered with google');

    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(
        user.id,
        user.isRegisteredWithGoogle!,
      );

    return Ok({
      accessTokenCookie,
      user: omit(user, ['password']),
    });
  }

  async registerUser(email: string, name: string) {
    const createResult = await this.usersService.createWithGoogle(email, name);
    if (createResult.fail) return createResult;

    const user = createResult.value;
    return this.handleRegisteredUser(user);
  }

  async authenticate(token: string) {
    try {
      const tokenInfo = await this.oauthClient.getUserInfo(token);

      const { email, name } = tokenInfo.data;

      const userResult = await this.usersService.getByEmail(email);

      if (userResult.fail) return this.registerUser(email, name);

      return this.handleRegisteredUser(userResult.value);
    } catch (error) {
      return Err(error);
    }
  }
}
