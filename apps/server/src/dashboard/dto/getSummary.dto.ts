import { ApiProperty } from '@nestjs/swagger';

export class GetSummaryResponse {
  @ApiProperty()
  totalUser: number;

  @ApiProperty()
  totalActiveUser: number;

  @ApiProperty()
  averageActiveUser: number;
}
