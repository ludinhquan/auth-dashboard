import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { Authentication, CurrentUser } from '../decorators';

import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('user')
@Authentication()
@ApiTags('User')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch()
  updateProfile(@CurrentUser() user: User, @Body() userData: UpdateUserDto) {
    this.usersService.updateProfile(user.id, userData);
  }
}
