import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationModule } from './authentication';
import { GoogleAuthenticationModule } from './authentication/google';
import { DashboardModule } from './dashboard';
import { PingController } from './ping.controller';

@Module({
  imports: [
    { module: ConfigModule, global: true },
    { module: JwtModule, global: true },
    AuthenticationModule,
    GoogleAuthenticationModule,
    DashboardModule,
  ],
  controllers: [PingController],
})
export class AppModule {}
