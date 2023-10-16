import { Err, Ok } from '@lib/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  ConfirmEmailError,
  ResendEmailError,
  VerificationTokenPayload,
} from './emailConfirmation.type';

import { EmailService } from '@/common';
import { UsersService } from '@/users';

@Injectable({})
export class EmailConfirmationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    private usersService: UsersService,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };

    const options = {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      ),
    };

    const token = this.jwtService.sign(payload, options);

    const host = this.configService.get('EMAIL_VERIFICATION_URL');
    const url = `${host}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.send({
      to: email,
      subject: 'Verify your account | Auth Dashboard',
      text,
    });
  }

  public async resendConfirmationLink(userId: string) {
    const userResult = await this.usersService.getById(userId);
    if (userResult.fail) return userResult;

    const user = userResult.value;

    if (user.isEmailConfirmed)
      return Err(ResendEmailError.EmailAlreadyConfirmed);

    const resendTimeConfig = Number(
      this.configService.get('EMAIL_VERIFICATION_TIME_RESEND'),
    );

    const timeRemainingInMilliseconds =
      new Date().getTime() -
      new Date(user.lastTimeSendEmailConfirmation!).getTime();

    const timeRemaining = Math.floor(
      resendTimeConfig - timeRemainingInMilliseconds / 1000,
    );

    if (timeRemaining >= 0)
      return Err(ResendEmailError.TooManyAttempts, {
        lastTimeSendEmailConfirmation: user.lastTimeSendEmailConfirmation,
        resendTimeConfig,
      });

    this.sendVerificationLink(user.email);

    const updateResult =
      await this.usersService.updateTimeResendEmailConfirmation(user.email);

    return Ok({
      lastTimeSendEmailConfirmation: updateResult.lastTimeSendEmailConfirmation,
      resendTimeConfig,
    });
  }

  public async confirmEmail(email: string) {
    const userResult = await this.usersService.getByEmail(email);
    if (userResult.fail) return userResult;

    const user = userResult.value;

    if (user.isEmailConfirmed)
      return Err(ConfirmEmailError.EmailAlreadyConfirmed);

    await this.usersService.markEmailAsConfirmed(email);

    return Ok(true);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const options = {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      };

      const payload: VerificationTokenPayload = this.jwtService.verify(
        token,
        options,
      );

      if (typeof payload === 'object' && 'email' in payload) {
        return this.confirmEmail(payload.email);
      }

      return Err(ConfirmEmailError.BadRequest);
    } catch (error) {
      if (error?.name === 'TokenExpiredError')
        return Err(ConfirmEmailError.TokenExpired);

      return Err(ConfirmEmailError.InvalidToken);
    }
  }
}
