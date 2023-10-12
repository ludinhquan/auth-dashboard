import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto';
import { BadRequestError, InternalServerError } from '@lib/core';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    try {
      const registerResult =
        await this.authenticationService.register(registrationData);

      if (registerResult.ok) return registerResult.value;

      return new BadRequestError(registerResult.error as string);
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }
}
