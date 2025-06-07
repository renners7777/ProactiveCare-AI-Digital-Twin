import React from 'react';
import { Card } from '../ui/Card';
import { Heart, Moon, Footprints } from 'lucide-react';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-4">
            <Heart className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="font-semibold">Heart Rate</h3>
              <p className="text-2xl">72 BPM</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <Moon className="w-8 h-8 text-indigo-500" />
            <div>
              <h3 className="font-semibold">Sleep Quality</h3>
              <p className="text-2xl">7.5 hrs</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <Footprints className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Daily Steps</h3>
              <p className="text-2xl">8,432</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}