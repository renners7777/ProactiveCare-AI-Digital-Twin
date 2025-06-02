import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Patient } from '../../types/patient';
import RiskIndicator from '../ui/RiskIndicator';

interface PatientSummaryCardProps {
  patient: Patient;
  onClick: () => void;
}

const PatientSummaryCard: React.FC<PatientSummaryCardProps> = ({ patient, onClick }) => {
  const lastActivity = patient.activityHistory[patient.activityHistory.length - 1];
  const stepsTrend = lastActivity ? 
    ((lastActivity.steps - patient.baseline.steps) / patient.baseline.steps) * 100 : 0;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-neutral-900 truncate">{patient.name}</h3>
          <div className="flex flex-wrap gap-2 items-center text-sm text-neutral-500 mt-1">
            <span>{patient.age} years</span>
            <span className="hidden sm:inline">•</span>
            <span>{patient.gender}</span>
            <span className="hidden sm:inline">•</span>
            <span>{patient.conditions.length} conditions</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="flex flex-col items-end">
            <RiskIndicator riskLevel={patient.riskLevel} />
            <div className="flex items-center mt-2">
              <span className="text-sm mr-2">Activity:</span>
              <span className={`text-sm font-medium ${
                stepsTrend > 5 ? 'text-success-600' : 
                stepsTrend < -5 ? 'text-danger-600' : 
                'text-neutral-600'
              }`}>
                {stepsTrend > 0 ? '+' : ''}
                {stepsTrend.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <ChevronRight className="text-neutral-400 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryCard;