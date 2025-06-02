import React from 'react';
import { AlertTriangle, Activity, User, Home, Stethoscope } from 'lucide-react';
import { ActivityAnalysis } from '../../types/patient';

interface RiskFactorsPanelProps {
  analysis: ActivityAnalysis;
}

const RiskFactorsPanel: React.FC<RiskFactorsPanelProps> = ({ analysis }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'activity':
        return <Activity className="text-primary-500\" size={20} />;
      case 'age':
        return <User className="text-warning-500" size={20} />;
      case 'environmental':
        return <Home className="text-danger-500" size={20} />;
      case 'medical':
        return <Stethoscope className="text-accent-500" size={20} />;
      default:
        return <AlertTriangle className="text-warning-500" size={20} />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-danger-100 text-danger-800 border-danger-200';
      case 'medium':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'low':
        return 'bg-success-100 text-success-800 border-success-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  if (!analysis.riskFactors.length) {
    return (
      <div className="text-center py-4 text-neutral-500">
        No significant risk factors identified at this time.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {analysis.riskFactors.map((factor, index) => (
        <div
          key={index}
          className={`border rounded-lg p-3 ${getRiskLevelColor(factor.level)}`}
        >
          <div className="flex items-start">
            <div className="mr-3">
              {getCategoryIcon(factor.category)}
            </div>
            <div>
              <h4 className="font-medium">{factor.category}</h4>
              <p className="text-sm mt-1">{factor.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskFactorsPanel;