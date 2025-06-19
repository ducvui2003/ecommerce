import { Inject, Injectable } from '@nestjs/common';
import { DashboardRepository } from '@route/dashboard/dashboard.repository';
import {
  DashboardType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeRequestType,
  RevenueByTimeResponseType,
} from '@route/dashboard/dashboard.schema';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('DashboardRepository')
    private readonly dashboardRepository: DashboardRepository,
  ) {}
  getDashboard(): Promise<DashboardType> {
    return this.dashboardRepository.getDashboard();
  }

  getRevenueByTime(
    req: RevenueByTimeRequestType,
  ): Promise<RevenueByTimeResponseType> {
    return this.dashboardRepository.getRevenueByTime(req.from, req.to);
  }
  getRevenueByTimeAndCategory(
    date: Date,
  ): Promise<RevenueByTimeAndCategoryResponseType> {
    return this.dashboardRepository.getRevenueByTimeAndCategory(date);
  }
}
