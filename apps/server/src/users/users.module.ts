import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [UsersService, PrismaClient],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
