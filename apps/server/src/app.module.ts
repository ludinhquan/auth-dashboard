import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationModule } from './authentication';
import { PingController } from './ping.controller';

@Module({
  imports: [
    { module: ConfigModule, global: true },
    { module: JwtModule, global: true },
    AuthenticationModule,
  ],
  controllers: [PingController],
})
export class AppModule {}
