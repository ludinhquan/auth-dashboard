import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationModule } from './authentication';
import { GoogleAuthenticationModule } from './authentication/google';
import { DashboardModule } from './dashboard';
import { PingController } from './ping.controller';
import { validateEnvs } from './utils';

@Module({
  imports: [
    { module: JwtModule, global: true },
    AuthenticationModule,
    GoogleAuthenticationModule,
    DashboardModule,
    ConfigModule.forRoot({
      validate: validateEnvs,
      isGlobal: true,
    }),
  ],
  controllers: [PingController],
})
export class AppModule {}
