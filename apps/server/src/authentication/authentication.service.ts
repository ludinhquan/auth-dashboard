import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Err } from '@lib/core';
import { Password } from './password';
import { RegisterError } from './authentication.type';
import { RegisterDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  public async register(registrationData: RegisterDto) {
    const userResult = await this.usersService.getByEmail(
      registrationData.email,
    );

    const existed = userResult.ok;
    if (existed) return Err(RegisterError.UserAlreadyExist);

    const hashedPassword = await Password.hash(registrationData.password);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });

    return createdUser;
  }
}
