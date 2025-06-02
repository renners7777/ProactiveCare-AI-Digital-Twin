import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { ActivityAnalysis } from '../../types/patient';

interface TimeBasedRiskPanelProps {
  timeBasedRisk: ActivityAnalysis['timeBasedRisk'];
}

const TimeBasedRiskPanel: React.FC<TimeBasedRiskPanelProps> = ({ timeBasedRisk }) => {
  const { highRiskPeriods, recommendations } = timeBasedRisk;

  if (!highRiskPeriods.length) {
    return (
      <div className="text-center py-4 text-neutral-500">
        No high-risk time periods identified.
      </div>
    );
  }

  return (
    <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Clock className="text-warning-500 mr-2" size={20} />
        <h4 className="font-medium text-warning-800">High Risk Time Periods</h4>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {highRiskPeriods.map((period, index) => (
            <span
              key={index}
              className="bg-warning-100 text-warning-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <AlertTriangle size={14} className="mr-1" />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-warning-800 mb-2">Recommendations</h5>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-warning-700 flex items-start">
                <span className="mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimeBasedRiskPanel;