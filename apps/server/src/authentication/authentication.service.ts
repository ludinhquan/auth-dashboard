import { Injectable } from '@nestjs/common';
import { Err } from '@lib/core';
import { Password } from './password';
import { RegisterError, TRegisterRes } from './authentication.type';
import { RegisterDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  public async register(registrationData: RegisterDto): Promise<TRegisterRes> {
    const invalidPassword = Password.validate(registrationData.password);

    if (invalidPassword) return Err(RegisterError.PasswordInvalid);

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
