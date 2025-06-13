'use client';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Tick,
} from 'chart.js';
import { currency, formatDate } from '@/lib/utils';

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type RevenueChartProps = {
  revenueData: Array<{
    month: string;
    revenue: number;
  }>;
};

const RevenueChart = ({ revenueData }: RevenueChartProps) => {
  const labels = revenueData.map((item) => item.month);
  const data = revenueData.map((item) => Number(item.revenue));
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Doanh thu theo tháng',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ doanh thu theo tháng',
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        align: 'center' as const,
      },
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any[]) => {
            const label = tooltipItems[0].label; // e.g., '2025-06'
            const date = new Date(`${label}-01`);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `Tháng ${month}, ${year}`;
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return currency(value);
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (
            value: string | number,
            index: number,
            values: Tick[],
          ): string => {
            const raw = labels[index]; // raw = '2025-06'
            const date = new Date(`${raw}-01`);
            return new Intl.DateTimeFormat('vi-VN', {
              month: 'short',
              year: 'numeric',
            }).format(date); // e.g., "thg 6, 2025"
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: unknown): string {
            if (typeof value === 'number') {
              return currency(value);
            }
            return '';
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RevenueChart;
