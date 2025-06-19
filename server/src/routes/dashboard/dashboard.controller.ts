import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardType } from '@route/dashboard/dashboard.schema';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { RolesGuard } from '@shared/guards/role.guard';
import { Roles } from '@shared/decorators/roles.decorator';

@Controller('/api/v1/manager/dashboard')
@UseGuards(AuthenticationGuard, RolesGuard)
@Auth([AuthType.Bearer])
@Roles('ADMIN')
export class DashboardController {
  constructor(@Inject() private readonly dashboardService: DashboardService) {}

  @Get('/stats')
  @MessageHttp('Stats dashboard for admin')
  getDashboard(): Promise<DashboardType> {
    return this.dashboardService.getDashboard();
  }
}
