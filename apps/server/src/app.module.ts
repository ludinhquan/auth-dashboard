import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication';
import { PingController } from './ping.controller';

@Module({
  imports: [AuthenticationModule],
  controllers: [PingController],
})
export class AppModule {}
