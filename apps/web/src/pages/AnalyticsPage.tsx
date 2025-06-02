import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { Activity, Users, AlertTriangle, Heart } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { patients } = usePatient();

  // Calculate analytics
  const totalPatients = patients.length;
  const highRiskPatients = patients.filter(p => p.riskLevel === 'high').length;
  const averageSteps = Math.round(
    patients.reduce((acc, patient) => {
      const latestActivity = patient.activityHistory[patient.activityHistory.length - 1];
      return acc + (latestActivity?.steps || 0);
    }, 0) / totalPatients
  );
  const averageStandingTime = Math.round(
    patients.reduce((acc, patient) => {
      const latestActivity = patient.activityHistory[patient.activityHistory.length - 1];
      return acc + (latestActivity?.standingTime || 0);
    }, 0) / totalPatients
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Analytics Overview</h1>
        <p className="text-neutral-500 mt-1">Key metrics and insights across all patients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Patients</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">{totalPatients}</h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">High Risk Patients</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">{highRiskPatients}</h3>
            </div>
            <div className="bg-danger-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Average Daily Steps</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">{averageSteps.toLocaleString()}</h3>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Standing Time</p>
              <h3 className="text-2xl font-bold text-neutral-900 mt-1">{averageStandingTime} min</h3>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold mb-4">Patient Risk Distribution</h2>
        <div className="flex items-center space-x-4">
          {['high', 'medium', 'low'].map(risk => {
            const count = patients.filter(p => p.riskLevel === risk).length;
            const percentage = Math.round((count / totalPatients) * 100) || 0;
            
            return (
              <div key={risk} className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize">{risk} Risk</span>
                  <span className="text-sm text-neutral-500">{percentage}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      risk === 'high' ? 'bg-danger-500' :
                      risk === 'medium' ? 'bg-warning-500' :
                      'bg-success-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;