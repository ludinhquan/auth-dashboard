import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  loginCount: number;

  @ApiProperty()
  lastSessionTimestamp: Date;

  @ApiProperty()
  isRegisteredWithGoogle: Date;
}

class Pagination {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class GetUsersResponse {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty()
  pagination: Pagination;
}
