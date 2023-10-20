import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { GetSummaryResponse, GetUserDto } from './dto';
import { GetUsersResponse } from './dto/getUsers.dto';

import { Authentication } from '@/common';
import { DEFAULT_PAGE_LIMIT } from '@/utils';

@Controller('dashboard')
@ApiTags('Dashboard')
@Authentication()
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOkResponse({ type: GetSummaryResponse })
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('users')
  @ApiOkResponse({ type: GetUsersResponse })
  getUsers(@Query() getUserDto: GetUserDto) {
    const params: GetUserDto = {
      ...getUserDto,
      page: getUserDto.page ? Number(getUserDto.page) : 1,
      limit: getUserDto.limit ? Number(getUserDto.limit) : DEFAULT_PAGE_LIMIT,
    };
    return this.dashboardService.getUsers(params);
  }
}
