import React from 'react';
import { Activity, Heart, Moon, Timer, Navigation } from 'lucide-react';

interface HealthDataCardProps {
  date: string;
  steps: number;
  heartRate: number[];
  sleepHours: number;
  activeMinutes: number;
  distance: number;
}

const HealthDataCard: React.FC<HealthDataCardProps> = ({
  date,
  steps,
  heartRate,
  sleepHours,
  activeMinutes,
  distance
}) => {
  const avgHeartRate = heartRate.length > 0
    ? Math.round(heartRate.reduce((a, b) => a + b, 0) / heartRate.length)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Health Data</h3>
        <span className="text-sm text-neutral-500">{date}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="p-2 bg-primary-100 rounded-full">
            <Activity className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Steps</p>
            <p className="text-lg font-semibold">{steps.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="p-2 bg-danger-100 rounded-full">
            <Heart className="w-5 h-5 text-danger-600" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Heart Rate</p>
            <p className="text-lg font-semibold">{avgHeartRate} bpm</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="p-2 bg-accent-100 rounded-full">
            <Moon className="w-5 h-5 text-accent-600" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Sleep</p>
            <p className="text-lg font-semibold">{sleepHours.toFixed(1)}h</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="p-2 bg-success-100 rounded-full">
            <Timer className="w-5 h-5 text-success-600" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Active Time</p>
            <p className="text-lg font-semibold">{activeMinutes} min</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="p-2 bg-warning-100 rounded-full">
            <Navigation className="w-5 h-5 text-warning-600" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Distance</p>
            <p className="text-lg font-semibold">{distance.toFixed(2)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDataCard;