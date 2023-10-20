import { BadRequestError, TooManyAttemptsError } from '@lib/core';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { JwtAuthenticationGuard } from '../jwt';

import {
  ConfirmEmailDto,
  ResendEmailResponseDto,
} from './emailConfirmation.dto';
import { EmailConfirmationService } from './emailConfirmation.service';
import { ResendEmailError } from './emailConfirmation.type';

import { CurrentUser } from '@/common';

@Controller('email-confirmation')
@ApiTags('Email Confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const result = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );

    if (result.ok) return;

    return new BadRequestError(result.error!);
  }

  @ApiOkResponse({ status: 200, type: ResendEmailResponseDto })
  @Post('resend-confirmation-link')
  @UseGuards(JwtAuthenticationGuard)
  async resendConfirmationLink(@CurrentUser() user: User) {
    const result = await this.emailConfirmationService.resendConfirmationLink(
      user.id,
    );
    if (result.ok) return result.value;

    if (result.error === ResendEmailError.TooManyAttempts)
      return new TooManyAttemptsError(result.error, result.detail);

    return new BadRequestError(result.error!, result.detail);
  }
}
