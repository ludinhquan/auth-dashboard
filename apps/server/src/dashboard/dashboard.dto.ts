import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 20 })
  limit: number;
}
