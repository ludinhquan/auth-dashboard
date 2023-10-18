import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { GetSummaryResponse, GetUserDto } from './dto';
import { GetUsersResponse } from './dto/getUsers.dto';

@Controller('dashboard')
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
    return this.dashboardService.getUsers(getUserDto);
  }
}
