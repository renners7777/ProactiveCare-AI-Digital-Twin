import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { ActivityAnalysis } from '../../types/patient';

interface EnvironmentalRisksPanelProps {
  risks: ActivityAnalysis['environmentalRisks'];
}

const EnvironmentalRisksPanel: React.FC<EnvironmentalRisksPanelProps> = ({ risks }) => {
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-danger-50 border-danger-200 text-danger-800';
      case 'medium':
        return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'low':
        return 'bg-success-50 border-success-200 text-success-800';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-800';
    }
  };

  if (!risks.length) {
    return (
      <div className="text-center py-4 text-neutral-500">
        No environmental risks detected at this time.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {risks.map((risk, index) => (
        <div
          key={index}
          className={`border rounded-lg overflow-hidden ${getRiskLevelColor(risk.riskLevel)}`}
        >
          <div className="p-4">
            <div className="flex items-center mb-3">
              <Home className="mr-2" size={20} />
              <h4 className="font-medium">{risk.location}</h4>
              <span className="ml-auto flex items-center">
                <AlertTriangle size={16} className="mr-1" />
                {risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1)} Risk
              </span>
            </div>
            
            <ul className="space-y-2">
              {risk.recommendations.map((rec, recIndex) => (
                <li key={recIndex} className="text-sm flex items-start">
                  <span className="mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnvironmentalRisksPanel;