import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardType } from '@route/dashboard/dashboard.schema';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';

@Controller('/api/v1/manager/dashboard')
export class DashboardController {
  constructor(@Inject() private readonly dashboardService: DashboardService) {}

  @Get('/stats')
  @UseGuards(AuthenticationGuard)
  @MessageHttp('Stats dashboard for admin')
  @Auth([AuthType.Bearer])
  getDashboard(): Promise<DashboardType> {
    return this.dashboardService.getDashboard();
  }
}
