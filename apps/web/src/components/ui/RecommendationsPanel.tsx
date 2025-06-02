import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Alert } from '../../types/patient';
import Button from './Button';

interface RecommendationsPanelProps {
  alerts: Alert[];
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-center text-neutral-500">
        No recommendations at this time.
      </div>
    );
  }
  
  // Just show the most recent alert's recommendations
  const latestAlert = alerts[alerts.length - 1];
  
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'mobility-decline':
        return <AlertTriangle className="text-warning-500" size={20} />;
      case 'medication-effect':
        return <AlertTriangle className="text-danger-500" size={20} />;
      case 'deconditioning':
        return <AlertTriangle className="text-warning-500" size={20} />;
      default:
        return <AlertTriangle className="text-warning-500" size={20} />;
    }
  };
  
  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'mobility-decline':
        return 'border-warning-500 bg-warning-50';
      case 'medication-effect':
        return 'border-danger-500 bg-danger-50';
      case 'deconditioning':
        return 'border-warning-500 bg-warning-50';
      default:
        return 'border-warning-500 bg-warning-50';
    }
  };
  
  return (
    <div className={`border-l-4 rounded-lg p-4 ${getAlertTypeColor(latestAlert.type)}`}>
      <div className="flex items-center mb-3">
        {getAlertTypeIcon(latestAlert.type)}
        <h3 className="font-medium ml-2">{latestAlert.message}</h3>
      </div>
      
      <div className="space-y-2 mb-4">
        {latestAlert.recommendations.map((rec, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle2 className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
            <p className="text-sm">{rec}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm">
          Implement Recommendations
        </Button>
        <Button variant="outline" size="sm">
          Schedule Assessment
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsPanel;