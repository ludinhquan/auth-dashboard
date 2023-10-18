import { ApiProperty } from '@nestjs/swagger';

import { DEFAULT_PAGE_LIMIT } from '@/utils';

export class GetUserDto {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false, default: DEFAULT_PAGE_LIMIT })
  limit?: number;
}
