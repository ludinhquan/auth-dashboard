import { BadRequestError } from '@lib/core';
import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';

import { ConfirmEmailDto } from './emailConfirmation.dto';
import { EmailConfirmationService } from './emailConfirmation.service';

import { Authentication, CurrentUser } from '@/decorators';

@Controller('email-confirmation')
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

  @Post('resend-confirmation-link')
  @Authentication()
  async resendConfirmationLink(@CurrentUser() user: User) {
    const result = await this.emailConfirmationService.resendConfirmationLink(
      user.id,
    );
    if (result.ok) return;

    return new BadRequestError(result.error!);
  }
}
