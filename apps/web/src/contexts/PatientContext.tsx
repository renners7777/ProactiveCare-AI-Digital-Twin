import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format, addDays } from 'date-fns';
import { generatePatientData, simulateDay, simulateHypertensiveCrisis, simulateDementiaEpisode } from '../services/simulationService';
import { analyzePatientData } from '../services/analysisService';
import { Patient, DailyActivity, Alert } from '../types/patient';

interface PatientContextType {
  patients: Patient[];
  currentDate: Date;
  loading: boolean;
  alerts: Alert[];
  selectedPatientId: string | null;
  advanceDay: () => void;
  selectPatient: (id: string) => void;
  dismissAlert: (id: string) => void;
  simulateScenario: (scenarioType: string, patientId: string) => void;
}

const PatientContext = createContext<PatientContextType | null>(null);

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Initialize with sample patients
  useEffect(() => {
    const initialPatients = [
      generatePatientData('P001', 'Thomas Williams', 78, 'male'),
      generatePatientData('P002', 'Margaret Johnson', 82, 'female'),
      generatePatientData('P003', 'Robert Davis', 75, 'male'),
      generatePatientData('P004', 'Elizabeth Brown', 85, 'female'),
      generatePatientData('P005', 'James Wilson', 79, 'male')
    ];
    
    setPatients(initialPatients);
    setSelectedPatientId(initialPatients[0].id);
    setLoading(false);
  }, []);

  // Advance simulation by one day
  const advanceDay = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
    
    // Simulate activities for each patient for the new day
    const updatedPatients = patients.map(patient => {
      const newActivity = simulateDay(patient, format(newDate, 'yyyy-MM-dd'));
      
      // Add the new activity to the patient's history
      const updatedPatient = {
        ...patient,
        activityHistory: [...patient.activityHistory, newActivity]
      };
      
      // Analyze the updated data for anomalies
      const analysis = analyzePatientData(updatedPatient);
      
      // If an alert is detected, add it to the alerts list
      if (analysis.alert) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}-${patient.id}`,
          patientId: patient.id,
          patientName: patient.name,
          date: format(newDate, 'yyyy-MM-dd'),
          type: analysis.alertType || 'general',
          message: analysis.alertMessage || 'Potential risk detected',
          recommendations: analysis.recommendations || [],
          dismissed: false,
          severity: analysis.riskLevel,
          category: 'activity'
        };
        
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
      }
      
      return updatedPatient;
    });
    
    setPatients(updatedPatients);
  };

  const selectPatient = (id: string) => {
    setSelectedPatientId(id);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, dismissed: true } : alert
      )
    );
  };

  const simulateScenario = (scenarioType: string, patientId: string) => {
    const targetPatient = patients.find(p => p.id === patientId);
    if (!targetPatient) return;

    let simulatedActivities: DailyActivity[] = [];
    const today = format(currentDate, 'yyyy-MM-dd');
    
    // Create different scenarios based on the type
    switch (scenarioType) {
      case 'subtle-slowdown':
        // Simulate gradual decline in mobility over 7 days
        for (let i = 0; i < 7; i++) {
          const day = format(addDays(currentDate, i), 'yyyy-MM-dd');
          const declineFactor = 1 - (i * 0.05); // 5% decline each day
          
          simulatedActivities.push({
            date: day,
            steps: Math.round(targetPatient.baseline.steps * declineFactor),
            standingTime: Math.round(targetPatient.baseline.standingTime * declineFactor),
            movementFrequency: Math.round(targetPatient.baseline.movementFrequency * declineFactor),
            sleepQuality: targetPatient.baseline.sleepQuality,
            medications: [...targetPatient.medications],
            stairUse: Math.round(Math.random() * 10),
            rapidMovements: Math.round(Math.random() * 5),
            inactivityPeriods: Math.round(Math.random() * 3),
            timeOfDay: 'morning',
            gaitMetrics: targetPatient.gaitMetrics
          });
        }
        break;
        
      case 'hypertensive-crisis':
        // Simulate hypertensive crisis scenario
        simulatedActivities = simulateHypertensiveCrisis(targetPatient, 14);
        break;
        
      case 'dementia-episode':
        // Simulate dementia-related episode
        simulatedActivities = simulateDementiaEpisode(targetPatient, 14);
        break;
    }
    
    // Update the patient with simulated activities
    const updatedPatient = {
      ...targetPatient,
      activityHistory: [...targetPatient.activityHistory, ...simulatedActivities]
    };
    
    // Update the patients list
    setPatients(prevPatients => 
      prevPatients.map(p => p.id === patientId ? updatedPatient : p)
    );
    
    // Generate appropriate alerts
    const analysis = analyzePatientData(updatedPatient);
    
    if (analysis.alert) {
      const newAlert: Alert = {
        id: `alert-${Date.now()}-${patientId}`,
        patientId: patientId,
        patientName: targetPatient.name,
        date: today,
        type: analysis.alertType || 'general',
        message: analysis.alertMessage || 'Potential risk detected',
        recommendations: analysis.recommendations || [],
        dismissed: false,
        severity: analysis.riskLevel,
        category: 'activity'
      };
      
      setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        currentDate,
        loading,
        alerts: alerts.filter(a => !a.dismissed),
        selectedPatientId,
        advanceDay,
        selectPatient,
        dismissAlert,
        simulateScenario
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};