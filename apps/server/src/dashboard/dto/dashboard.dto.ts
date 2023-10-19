import { ApiProperty } from '@nestjs/swagger';

import { DEFAULT_PAGE_LIMIT } from '@/utils';

export class GetUserDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @ApiProperty({ required: false, default: DEFAULT_PAGE_LIMIT })
  limit?: number;
}
