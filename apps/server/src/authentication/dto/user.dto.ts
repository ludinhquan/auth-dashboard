import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  isEmailConfirmed: boolean;

  @ApiProperty()
  isRegisteredWithGoogle: boolean;

  @ApiProperty()
  lastTimeSendEmailConfirmation: Date;
}
