import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaDashboardRepository } from '@route/dashboard/dashboard.repository';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    {
      provide: 'DashboardRepository',
      useClass: PrismaDashboardRepository,
    },
  ],
})
export class DashboardModule {}
