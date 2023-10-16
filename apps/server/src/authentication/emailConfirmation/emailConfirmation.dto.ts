import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty()
  token: string;
}

export class ResendEmailResponseDto {
  @ApiProperty()
  lastTimeSendEmailConfirmation: Date;

  @ApiProperty()
  resendTimeConfig: number;
}
