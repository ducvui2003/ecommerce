import { Inject, Injectable } from '@nestjs/common';
import { DashboardRepository } from '@route/dashboard/dashboard.repository';
import { DashboardType } from '@route/dashboard/dashboard.schema';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('DashboardRepository')
    private readonly dashboardRepository: DashboardRepository,
  ) {}
  getDashboard(): Promise<DashboardType> {
    return this.dashboardRepository.getDashboard();
  }
}
