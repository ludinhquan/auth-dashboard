import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterError } from './authentication.type';
import { RegisterDto } from './dto';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const registerResult =
      await this.authenticationService.register(registrationData);

    if (registerResult.ok) return registerResult.value;

    if (registerResult.error === RegisterError.UserAlreadyExist)
      throw new BadRequestException('User with that email already exists');
  }
}
