import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { usePatient } from '../../contexts/PatientContext';

const AlertsPanel: React.FC = () => {
  const { alerts, dismissAlert } = usePatient();
  const navigate = useNavigate();
  
  if (alerts.length === 0) {
    return (
      <div className="text-center py-4 text-neutral-500">
        No active alerts at this time.
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className="flex items-start justify-between bg-neutral-50 border border-neutral-200 rounded-lg p-3 hover:bg-neutral-100 transition-colors"
        >
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-warning-100 text-warning-600 mr-3">
              <AlertTriangle size={16} />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{alert.patientName}</h3>
                <span className="mx-2 text-neutral-300">•</span>
                <span className="text-sm text-neutral-500">{alert.date}</span>
              </div>
              <p className="text-sm text-neutral-700 mt-1">{alert.message}</p>
              <button 
                onClick={() => navigate(`/patient/${alert.patientId}`)}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center mt-2"
              >
                View Details <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => dismissAlert(alert.id)} 
            className="text-neutral-400 hover:text-neutral-600 p-1"
            aria-label="Dismiss alert"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel;