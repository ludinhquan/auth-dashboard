import { UseGuards, applyDecorators } from '@nestjs/common';

import { EmailVerifyGuard } from '@/authentication/emailVerify.guard';
import { JwtAuthenticationGuard } from '@/authentication/jwt';

export function Authentication() {
  return applyDecorators(
    UseGuards(JwtAuthenticationGuard),
    UseGuards(EmailVerifyGuard),
  );
}
