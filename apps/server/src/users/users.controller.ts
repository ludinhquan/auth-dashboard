import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

import { Authentication, CurrentUser } from '@/common';

@Authentication()
@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch()
  updateProfile(@CurrentUser() user: User, @Body() userData: UpdateUserDto) {
    this.usersService.updateProfile(user.id, userData);
  }
}
