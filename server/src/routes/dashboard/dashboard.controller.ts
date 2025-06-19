import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  DashboardType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeResponseType,
} from '@route/dashboard/dashboard.schema';
import { MessageHttp } from '@shared/decorators/message.decorator';
import { Auth } from '@shared/decorators/auth.decorator';
import { AuthType } from '@shared/constants/auth.constant';
import { AuthenticationGuard } from '@shared/guards/authentication.guard';
import { RolesGuard } from '@shared/guards/role.guard';
import { Roles } from '@shared/decorators/roles.decorator';
import { z } from 'zod';
import {
  RevenueByTimeAndCategoryRequestDto,
  RevenueByTimeRequestDto,
} from '@route/dashboard/dashboard.dto';

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

  @Post('/revenue-by-time')
  @MessageHttp('Revenue statistics by time')
  statRevenueByTime(
    @Body() dto: RevenueByTimeRequestDto,
  ): Promise<RevenueByTimeResponseType> {
    return this.dashboardService.getRevenueByTime(dto);
  }
  @Post('/revenue-by-time-and-category')
  @MessageHttp('Revenue statistics by time and category')
  statRevenueByTimeAndCategory(
    @Body() dto: RevenueByTimeAndCategoryRequestDto,
  ): Promise<RevenueByTimeAndCategoryResponseType> {
    const date = new Date(dto.year, dto.month - 1, 1);

    return this.dashboardService.getRevenueByTimeAndCategory(date);
  }
}
