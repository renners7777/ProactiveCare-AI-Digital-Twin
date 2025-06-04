import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Heart, Activity, Clock } from 'lucide-react';
import { usePatient } from '../contexts/PatientContext';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import ActivityChart from '../components/charts/ActivityChart';
import RiskIndicator from '../components/ui/RiskIndicator';
import MetricCard from '../components/ui/MetricCard';
import RecommendationsPanel from '../components/ui/RecommendationsPanel';
import RiskFactorsPanel from '../components/ui/RiskFactorsPanel';
import EnvironmentalRisksPanel from '../components/ui/EnvironmentalRisksPanel';
import TimeBasedRiskPanel from '../components/ui/TimeBasedRiskPanel';
import HealthDataCard from '../components/health/HealthDataCard';
import HealthDataChart from '../components/health/HealthDataChart';
import { analyzePatientData } from '../services/analysisService';

interface HealthData {
  recorded_at: string;
  steps: number;
  heart_rate: number[];
  sleep_hours: number;
  active_minutes: number;
  distance: number;
}

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, currentDate, selectPatient, alerts } = usePatient();
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const patient = patients.find(p => p.id === id);
  const patientAlerts = alerts.filter(alert => alert.patientId === id);
  
  useEffect(() => {
    if (id) {
      selectPatient(id);
      fetchHealthData();
    }
  }, [id, selectPatient]);

  const fetchHealthData = async () => {
    try {
      const { data, error } = await supabase
        .from('health_data')
        .select('*')
        .eq('user_id', id) // Changed from patient_id to user_id
        .order('recorded_at', { ascending: false })
        .limit(14);

      if (error) throw error;
      setHealthData(data || []);
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Patient Not Found</h2>
        <p className="text-neutral-600 mb-4">The patient you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} variant="secondary">
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  // Get the last 14 days of activity or all if less than 14
  const recentActivity = patient.activityHistory.slice(-14);
  
  // Get the most recent day's activity
  const todayActivity = patient.activityHistory[patient.activityHistory.length - 1];
  
  // Analyze patient data
  const analysis = analyzePatientData(patient);

  // Get the most recent health data
  const latestHealthData = healthData[0];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Dashboard</span>
        </button>
        
        <span className="text-neutral-500 flex items-center">
          <Clock size={16} className="mr-1" />
          Last Updated: {format(currentDate, 'MMMM d, yyyy')}
        </span>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{patient.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-neutral-500">
                {patient.age} years • {patient.gender}
              </span>
              <RiskIndicator riskLevel={patient.riskLevel} />
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button
              onClick={() => {/* Open medical records */}}
              variant="secondary"
              className="mr-2"
            >
              Medical Records
            </Button>
            <Button
              onClick={() => {/* Open care plan */}}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Care Plan
            </Button>
          </div>
        </div>

        {latestHealthData && (
          <HealthDataCard
            date={latestHealthData.recorded_at}
            steps={latestHealthData.steps}
            heartRate={latestHealthData.heart_rate}
            sleepHours={latestHealthData.sleep_hours}
            activeMinutes={latestHealthData.active_minutes}
            distance={latestHealthData.distance}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Medical Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-600">Conditions</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.conditions.map((condition, index) => (
                    <span 
                      key={index}
                      className="bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-neutral-600">Medications</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.medications.map((medication, index) => (
                    <span 
                      key={index}
                      className="bg-primary-50 text-primary-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      <Heart size={12} className="mr-1" /> {medication}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Current Activity Metrics</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <MetricCard 
                title="Daily Steps"
                value={todayActivity?.steps.toLocaleString() || '-'}
                icon={<Activity className="text-primary-500" />}
                baseline={patient.baseline.steps}
                current={todayActivity?.steps || 0}
              />
              
              <MetricCard 
                title="Standing Time"
                value={`${todayActivity?.standingTime || '-'} min`}
                icon={<Activity className="text-secondary-500" />}
                baseline={patient.baseline.standingTime}
                current={todayActivity?.standingTime || 0}
              />
              
              <MetricCard 
                title="Movement Frequency"
                value={todayActivity?.movementFrequency.toString() || '-'}
                icon={<Activity className="text-accent-500" />}
                baseline={patient.baseline.movementFrequency}
                current={todayActivity?.movementFrequency || 0}
              />
              
              <MetricCard 
                title="Sleep Quality"
                value={`${todayActivity?.sleepQuality || '-'}/10`}
                icon={<Activity className="text-accent-500" />}
                baseline={patient.baseline.sleepQuality}
                current={todayActivity?.sleepQuality || 0}
                isRating={true}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Activity Trends</h2>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <ActivityChart activityData={recentActivity} baseline={patient.baseline} />
          </div>
        </div>

        {healthData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Health Data Trends</h2>
            <HealthDataChart data={healthData} />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Risk Factors</h2>
            <RiskFactorsPanel analysis={analysis} />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Environmental Risks</h2>
            <EnvironmentalRisksPanel risks={analysis.environmentalRisks} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Time-Based Risk Analysis</h2>
            <TimeBasedRiskPanel timeBasedRisk={analysis.timeBasedRisk} />
          </div>
          
          {patientAlerts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Active Alerts & Recommendations</h2>
              <RecommendationsPanel alerts={patientAlerts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;