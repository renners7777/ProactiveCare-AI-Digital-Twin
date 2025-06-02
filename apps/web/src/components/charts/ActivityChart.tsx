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
import { DailyActivity } from '../../types/patient';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityChartProps {
  activityData: DailyActivity[];
  baseline: {
    steps: number;
    standingTime: number;
    movementFrequency: number;
    sleepQuality: number;
  };
}

const ActivityChart: React.FC<ActivityChartProps> = ({ activityData, baseline }) => {
  const [selectedMetric, setSelectedMetric] = useState<'steps' | 'standingTime' | 'movementFrequency' | 'sleepQuality'>('steps');
  
  const dates = activityData.map(day => day.date.slice(5)); // Format as MM-DD
  
  const getDataForMetric = () => {
    switch (selectedMetric) {
      case 'steps':
        return activityData.map(day => day.steps);
      case 'standingTime':
        return activityData.map(day => day.standingTime);
      case 'movementFrequency':
        return activityData.map(day => day.movementFrequency);
      case 'sleepQuality':
        return activityData.map(day => day.sleepQuality);
      default:
        return activityData.map(day => day.steps);
    }
  };
  
  const getBaselineForMetric = () => {
    switch (selectedMetric) {
      case 'steps': return baseline.steps;
      case 'standingTime': return baseline.standingTime;
      case 'movementFrequency': return baseline.movementFrequency;
      case 'sleepQuality': return baseline.sleepQuality;
      default: return baseline.steps;
    }
  };
  
  const metricLabels = {
    steps: 'Daily Steps',
    standingTime: 'Standing Time (min)',
    movementFrequency: 'Movement Frequency',
    sleepQuality: 'Sleep Quality'
  };
  
  const metricColors = {
    steps: 'rgb(59, 130, 246)',
    standingTime: 'rgb(20, 184, 166)',
    movementFrequency: 'rgb(168, 85, 247)',
    sleepQuality: 'rgb(249, 115, 22)'
  };
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: metricLabels[selectedMetric],
        data: getDataForMetric(),
        borderColor: metricColors[selectedMetric],
        backgroundColor: `${metricColors[selectedMetric]}33`,
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Baseline',
        data: Array(dates.length).fill(getBaselineForMetric()),
        borderColor: 'rgba(156, 163, 175, 0.5)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      }
    ],
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <MetricButton 
          label="Steps"
          active={selectedMetric === 'steps'}
          onClick={() => setSelectedMetric('steps')}
          color={metricColors.steps}
        />
        <MetricButton 
          label="Standing Time"
          active={selectedMetric === 'standingTime'}
          onClick={() => setSelectedMetric('standingTime')}
          color={metricColors.standingTime}
        />
        <MetricButton 
          label="Movement"
          active={selectedMetric === 'movementFrequency'}
          onClick={() => setSelectedMetric('movementFrequency')}
          color={metricColors.movementFrequency}
        />
        <MetricButton 
          label="Sleep"
          active={selectedMetric === 'sleepQuality'}
          onClick={() => setSelectedMetric('sleepQuality')}
          color={metricColors.sleepQuality}
        />
      </div>
      
      <div className="h-72">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

interface MetricButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}

const MetricButton: React.FC<MetricButtonProps> = ({ label, active, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm ${
        active 
          ? 'bg-neutral-800 text-white' 
          : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
      } transition-colors`}
      style={{ 
        backgroundColor: active ? color : undefined,
        borderColor: color,
      }}
    >
      {label}
    </button>
  );
};

export default ActivityChart;