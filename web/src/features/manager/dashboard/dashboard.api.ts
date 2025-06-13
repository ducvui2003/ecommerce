import dashboardService from '@/service/manager/dashboard-manager.service';
import { DashboardResType } from '@/types/dashboard.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  tagTypes: ['DashboardManager'],

  endpoints: (builder) => ({}),
});
export const {} = dashboardApi;
