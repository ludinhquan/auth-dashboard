import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { JwtAuthenticationGuard } from '../authentication/jwt';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post(':userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() userData: UpdateUserDto,
  ) {
    console.log(userData);
    this.usersService.updateProfile(userId, userData);
  }
}
