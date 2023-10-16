import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isEmailConfirmed: boolean;

  @ApiProperty()
  isRegisteredWithGoogle: boolean;
}
