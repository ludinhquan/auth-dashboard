import { Module } from '@nestjs/common';

import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from './emailConfirmation.service';

import { EmailModule } from '@/common';
import { UsersModule } from '@/users';

@Module({
  imports: [EmailModule, UsersModule],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
