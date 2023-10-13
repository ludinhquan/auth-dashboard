import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, PrismaClient],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
