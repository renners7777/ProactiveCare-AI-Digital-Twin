import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, AlertTriangle, ArrowRightCircle, Activity, Heart, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';
import AlertsPanel from '../components/alerts/AlertsPanel';
import PatientSummaryCard from '../components/patients/PatientSummaryCard';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { patients, currentDate, advanceDay, alerts } = usePatient();
  const navigate = useNavigate();
  const [showAllScenarios, setShowAllScenarios] = useState(false);
  
  const patientsByRisk = {
    high: patients.filter(p => p.riskLevel === 'high'),
    medium: patients.filter(p => p.riskLevel === 'medium'),
    low: patients.filter(p => p.riskLevel === 'low')
  };

  const scenarios = [
    {
      title: "The Subtle Slowdown",
      description: "Gradual mobility decline over a week",
      type: "subtle-slowdown",
      icon: Activity
    },
    {
      title: "Hypertensive Crisis",
      description: "Sharp decline during blood pressure spike",
      type: "hypertensive-crisis",
      icon: Heart
    },
    {
      title: "Cognitive Episode",
      description: "Impact of missed medications and confusion",
      type: "dementia-episode",
      icon: Brain
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">ProactiveCare Dashboard</h1>
          <p className="text-neutral-500 mt-1 flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Current Date: {format(currentDate, 'MMMM d, yyyy')}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={advanceDay}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Advance Day
          </Button>
        </div>
      </div>
      
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-card p-4 border-l-4 border-warning-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="text-warning-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold">Active Alerts ({alerts.length})</h2>
            </div>
          </div>
          <AlertsPanel />
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Patient Overview</h2>
          <span className="text-sm text-neutral-500">Total: {patients.length} patients</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-danger-800">High Risk</h3>
              <span className="bg-danger-500 text-white text-xs py-1 px-2 rounded-full">
                {patientsByRisk.high.length}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">Patients requiring immediate attention</p>
          </div>
          
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-warning-800">Medium Risk</h3>
              <span className="bg-warning-500 text-white text-xs py-1 px-2 rounded-full">
                {patientsByRisk.medium.length}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">Patients to monitor closely</p>
          </div>
          
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-success-800">Low Risk</h3>
              <span className="bg-success-500 text-white text-xs py-1 px-2 rounded-full">
                {patientsByRisk.low.length}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1">Patients with stable conditions</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {patients.map(patient => (
            <PatientSummaryCard 
              key={patient.id}
              patient={patient}
              onClick={() => navigate(`/patient/${patient.id}`)}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold mb-4">Demonstration Scenarios</h2>
        <p className="text-neutral-600 mb-4">
          Select a scenario to demonstrate how the Digital Twin detects different fall risk patterns.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => (
            <ScenarioCard 
              key={index}
              title={scenario.title}
              description={scenario.description}
              type={scenario.type}
              patientId={patients[0]?.id}
              icon={scenario.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ScenarioCardProps {
  title: string;
  description: string;
  type: string;
  patientId: string;
  icon: React.ElementType;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description, type, patientId, icon: Icon }) => {
  const { simulateScenario } = usePatient();
  
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 hover:bg-neutral-100 transition-colors">
      <div className="flex items-center mb-2">
        <Icon className="text-primary-500 mr-2" size={20} />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-neutral-600 mb-3">{description}</p>
      <button
        onClick={() => simulateScenario(type, patientId)}
        className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
      >
        Run Simulation <ArrowRightCircle size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default Dashboard;