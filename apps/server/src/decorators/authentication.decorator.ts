import { UseGuards, applyDecorators } from '@nestjs/common';

import { JwtAuthenticationGuard } from '../authentication/jwt';

export function Authentication() {
  return applyDecorators(UseGuards(JwtAuthenticationGuard));
}
