import { ForbiddenError } from '@lib/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

import { AuthError } from './authentication.type';

@Injectable()
export class EmailVerifyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user as User;

    const emailVerified =
      user.isRegisteredWithGoogle || user.isEmailConfirmed == true;

    if (!emailVerified)
      throw new ForbiddenError(AuthError.UserEmailNotVerified);

    return true;
  }
}
