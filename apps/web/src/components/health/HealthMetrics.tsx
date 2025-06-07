import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { HealthChart } from './HealthChart';
import { Card } from '../ui/Card';
import { useHealthData } from '../../hooks/useHealthData';

export function HealthMetrics() {
  const { user } = useAuth();
  const { heartRate, bloodOxygen, steps } = useHealthData(user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Health Metrics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Heart Rate</h2>
          <HealthChart 
            data={heartRate}
            label="BPM"
            color="#ef4444"
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Blood Oxygen</h2>
          <HealthChart 
            data={bloodOxygen}
            label="SpO2 %"
            color="#3b82f6"
          />
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Daily Steps</h2>
          <HealthChart 
            data={steps}
            label="Steps"
            color="#22c55e"
          />
        </Card>
      </div>
    </div>
  );
}