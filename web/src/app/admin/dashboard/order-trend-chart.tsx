'use client';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
);

type OrderTrendChartProps = {
  trendData: Array<{
    day: string; // format: 'YYYY-MM-DD'
    count: number;
  }>;
};

const OrderTrendChart = ({ trendData }: OrderTrendChartProps) => {
  const labels = trendData.map((item) => {
    const date = new Date(item.day);
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    }).format(date); // Example: "T2, 09/06"
  });

  const counts = trendData.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Số đơn hàng mỗi ngày',
        data: counts,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,

        // ✅ Point styling
        pointRadius: 6, // size of the point
        pointHoverRadius: 8, // size on hover
        pointBackgroundColor: '#4bc0c0', // fill color of the point
        pointBorderColor: '#006666', // border color of the point
        pointBorderWidth: 2, // border width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ số đơn hàng theo ngày',
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
          label: (context: any) => `Số đơn: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default OrderTrendChart;
