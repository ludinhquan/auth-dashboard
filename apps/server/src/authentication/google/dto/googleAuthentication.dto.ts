import { ApiProperty } from '@nestjs/swagger';

export class TokenVerificationDto {
  @ApiProperty()
  token: string;
}

export default TokenVerificationDto;
