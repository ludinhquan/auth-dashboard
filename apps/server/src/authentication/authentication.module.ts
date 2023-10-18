import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UsersModule } from '../users';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { EmailConfirmationModule } from './emailConfirmation';
import { JwtStrategy } from './jwt';
import { JwtRefreshTokenStrategy } from './jwt-refresh';
import { LocalStrategy } from './local';

@Module({
  imports: [UsersModule, EmailConfirmationModule],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    PrismaClient,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
