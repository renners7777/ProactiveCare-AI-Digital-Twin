import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthDataPoint {
  date: string;
  steps: number;
  heartRate: number[];
  sleepHours: number;
  activeMinutes: number;
  distance: number;
}

interface HealthDataChartProps {
  data: HealthDataPoint[];
}

const HealthDataChart: React.FC<HealthDataChartProps> = ({ data }) => {
  const [metric, setMetric] = useState<'steps' | 'heartRate' | 'sleep' | 'active'>('steps');

  const getMetricData = (point: HealthDataPoint) => {
    switch (metric) {
      case 'steps':
        return point.steps;
      case 'heartRate':
        return point.heartRate.length > 0
          ? Math.round(point.heartRate.reduce((a, b) => a + b, 0) / point.heartRate.length)
          : 0;
      case 'sleep':
        return point.sleepHours;
      case 'active':
        return point.activeMinutes;
      default:
        return 0;
    }
  };

  const chartData = {
    labels: data.map(point => format(new Date(point.date), 'MMM d')),
    datasets: [
      {
        label: metric === 'steps' ? 'Daily Steps'
          : metric === 'heartRate' ? 'Avg Heart Rate'
          : metric === 'sleep' ? 'Sleep Hours'
          : 'Active Minutes',
        data: data.map(point => getMetricData(point)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setMetric('steps')}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === 'steps'
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Steps
        </button>
        <button
          onClick={() => setMetric('heartRate')}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === 'heartRate'
              ? 'bg-danger-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Heart Rate
        </button>
        <button
          onClick={() => setMetric('sleep')}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === 'sleep'
              ? 'bg-accent-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Sleep
        </button>
        <button
          onClick={() => setMetric('active')}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === 'active'
              ? 'bg-success-600 text-white'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Active Time
        </button>
      </div>

      <div className="h-64">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default HealthDataChart;