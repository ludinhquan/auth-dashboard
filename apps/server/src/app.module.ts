import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationModule } from './authentication';
import { PingController } from './ping.controller';

@Module({
  imports: [{ module: ConfigModule, global: true }, AuthenticationModule],
  controllers: [PingController],
})
export class AppModule {}
