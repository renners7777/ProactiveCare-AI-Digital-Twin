import React from 'react';
import { format } from 'date-fns';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  timestamp: Date;
  value: number;
}

interface HealthChartProps {
  data: DataPoint[];
  label: string;
  color: string;
}

export function HealthChart({ data, label, color }: HealthChartProps) {
  const chartData = {
    labels: data.map(point => format(point.timestamp, 'HH:mm')),
    datasets: [
      {
        label,
        data: data.map(point => point.value),
        borderColor: color,
        backgroundColor: color + '20',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
}