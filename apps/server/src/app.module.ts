import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { AuthenticationModule } from './authentication';

@Module({
  imports: [AuthenticationModule],
  controllers: [PingController],
})
export class AppModule {}
