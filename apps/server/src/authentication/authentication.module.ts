import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

import { UsersModule } from '../users';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt';
import { LocalStrategy } from './local';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, PrismaClient],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
