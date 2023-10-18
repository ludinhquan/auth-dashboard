import { Controller, Get, Query } from '@nestjs/common';

import { GetUserDto } from './dashboard.dto';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('users')
  getUsers(@Query() getUserDto: GetUserDto) {
    return this.dashboardService.getUsers(getUserDto);
  }
}
