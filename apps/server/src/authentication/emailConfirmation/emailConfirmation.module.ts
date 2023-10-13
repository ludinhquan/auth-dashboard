import { Module } from '@nestjs/common';

import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from './emailConfirmation.service';

import { EmailModule, JwtModule } from '@/modules';
import { UsersModule } from '@/users';

@Module({
  imports: [EmailModule, UsersModule, JwtModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
