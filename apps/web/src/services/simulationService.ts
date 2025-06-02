import { Patient, DailyActivity, EnvironmentalFactors, MedicalProfile, GaitMetrics } from '../types/patient';
import { format, subDays } from 'date-fns';

// Generate initial patient data with enhanced risk factors
export function generatePatientData(
  id: string,
  name: string,
  age: number,
  gender: 'male' | 'female' | 'other'
): Patient {
  // Base metrics adjusted for age and gender
  const baseSteps = gender === 'male' 
    ? Math.round(6000 - (age - 65) * 100) 
    : Math.round(5500 - (age - 65) * 100);
    
  const baseStandingTime = gender === 'male'
    ? Math.round(180 - (age - 65) * 2)
    : Math.round(160 - (age - 65) * 2);
    
  const baseMovementFrequency = Math.round(40 - (age - 65) * 0.5);
  const baseSleepQuality = Math.round(8 - (age - 65) * 0.05);
  
  // Gait metrics based on age
  const baseGaitSpeed = Math.max(0.6, 1.2 - (age - 65) * 0.01);
  const baseBalanceScore = Math.max(3, 10 - (age - 65) * 0.1);

  // Generate conditions and medications
  const conditions = generateConditions(age);
  const medications = generateMedications(conditions);
  
  // Generate environmental factors
  const environmentalFactors = generateEnvironmentalFactors();
  
  // Generate medical profile
  const medicalProfile = generateMedicalProfile(age, conditions, medications);
  
  // Generate gait metrics
  const gaitMetrics = generateGaitMetrics(age, conditions);
  
  // Generate activity history
  const activityHistory = generateActivityHistory(
    14,
    {
      baseSteps,
      baseStandingTime,
      baseMovementFrequency,
      baseSleepQuality,
      baseGaitSpeed,
      baseBalanceScore
    },
    medications,
    gaitMetrics
  );
  
  // Calculate initial risk level
  const riskLevel = calculateInitialRiskLevel(age, conditions, medicalProfile, environmentalFactors);
  
  return {
    id,
    name,
    age,
    gender,
    conditions: conditions.map(c => c.name),
    medications: medications.map(m => m.name),
    riskLevel,
    activityHistory,
    baseline: {
      steps: baseSteps,
      standingTime: baseStandingTime,
      movementFrequency: baseMovementFrequency,
      sleepQuality: baseSleepQuality,
      gaitSpeed: baseGaitSpeed,
      balanceScore: baseBalanceScore
    },
    environmentalFactors,
    medicalProfile,
    gaitMetrics
  };
}

function generateConditions(age: number) {
  const possibleConditions = [
    { name: 'Hypertension', probability: 0.4 },
    { name: 'Arthritis', probability: 0.3 },
    { name: 'Diabetes Type 2', probability: 0.25 },
    { name: 'Mild Cognitive Impairment', probability: 0.2 },
    { name: 'COPD', probability: 0.15 },
    { name: 'Osteoporosis', probability: 0.2 },
    { name: 'Chronic Pain', probability: 0.25 },
    { name: 'Heart Disease', probability: 0.3 },
    { name: 'Parkinson\'s Disease', probability: 0.1 },
    { name: 'Depression', probability: 0.15 },
    { name: 'Dementia', probability: 0.15 }
  ];
  
  return possibleConditions
    .filter(() => Math.random() < (age - 60) / 100)
    .map(condition => ({
      name: condition.name,
      severity: Math.random() < 0.3 ? 'severe' : Math.random() < 0.6 ? 'moderate' : 'mild',
      duration: Math.floor(Math.random() * 10) + 1
    }));
}

function generateMedications(conditions: any[]) {
  const medicationsByCondition: { [key: string]: string[] } = {
    'Hypertension': ['Amlodipine', 'Lisinopril', 'Metoprolol'],
    'Diabetes Type 2': ['Metformin', 'Glipizide'],
    'Arthritis': ['Ibuprofen', 'Celebrex'],
    'Chronic Pain': ['Gabapentin', 'Tramadol'],
    'Depression': ['Sertraline', 'Escitalopram'],
    'Parkinson\'s Disease': ['Levodopa', 'Carbidopa'],
    'Osteoporosis': ['Alendronate', 'Calcium + Vitamin D'],
    'Heart Disease': ['Metoprolol', 'Aspirin'],
    'COPD': ['Albuterol', 'Tiotropium'],
    'Dementia': ['Donepezil', 'Memantine']
  };
  
  return conditions.flatMap(condition => 
    (medicationsByCondition[condition.name] || []).map(name => ({
      name,
      category: condition.name,
      affectsBalance: Math.random() < 0.3,
      startDate: format(subDays(new Date(), Math.floor(Math.random() * 365)), 'yyyy-MM-dd')
    }))
  );
}

function generateEnvironmentalFactors(): EnvironmentalFactors {
  return {
    looseRugs: Math.floor(Math.random() * 4),
    poorLighting: Math.floor(Math.random() * 4),
    clutteredWalkways: Math.floor(Math.random() * 4),
    missingHandrails: Math.random() < 0.3,
    bathroomSafety: Math.floor(Math.random() * 4),
    bedroomSafety: Math.floor(Math.random() * 4),
    stairsPresent: Math.random() < 0.7,
    outdoorHazards: Math.floor(Math.random() * 4)
  };
}

function generateMedicalProfile(
  age: number,
  conditions: any[],
  medications: any[]
): MedicalProfile {
  return {
    previousFalls: Math.floor(Math.random() * 3),
    chronicConditions: conditions,
    medications,
    visionImpairment: Math.random() < 0.3,
    hearingImpairment: Math.random() < 0.25,
    cognitiveStatus: Math.max(3, 10 - (age - 65) * 0.15),
    lastAssessmentDate: format(subDays(new Date(), Math.floor(Math.random() * 90)), 'yyyy-MM-dd')
  };
}

function generateGaitMetrics(age: number, conditions: any[]): GaitMetrics {
  const hasGaitImpairingCondition = conditions.some(c => 
    ['Parkinson\'s Disease', 'Arthritis', 'Stroke', 'Dementia'].includes(c.name)
  );
  
  const baseSpeed = hasGaitImpairingCondition ? 0.6 : 1.0;
  
  return {
    speed: Math.max(0.4, baseSpeed - (age - 65) * 0.01),
    strideLength: Math.max(0.3, 0.6 - (age - 65) * 0.005),
    stepSymmetry: Math.max(0.3, 1 - (age - 65) * 0.01),
    balanceScore: Math.max(3, 10 - (age - 65) * 0.1),
    turnSpeed: Math.max(30, 90 - (age - 65) * 0.5),
    strideLengthVariability: Math.min(0.4, 0.1 + (age - 65) * 0.005)
  };
}

function generateActivityHistory(
  days: number,
  baseline: any,
  medications: any[],
  baseGaitMetrics: GaitMetrics
): DailyActivity[] {
  const history: DailyActivity[] = [];
  const today = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    const timeOfDay = determineTimeOfDay();
    const dailyVariation = generateDailyVariation(medications, timeOfDay);
    
    history.push({
      date,
      steps: Math.round(baseline.baseSteps * dailyVariation.activity),
      standingTime: Math.round(baseline.baseStandingTime * dailyVariation.activity),
      movementFrequency: Math.round(baseline.baseMovementFrequency * dailyVariation.activity),
      sleepQuality: Math.min(10, Math.max(1, Math.round(baseline.baseSleepQuality * dailyVariation.sleep))),
      medications: medications.map(m => m.name),
      stairUse: Math.round(Math.random() * 10),
      rapidMovements: Math.round(Math.random() * 5),
      inactivityPeriods: Math.round(Math.random() * 3),
      timeOfDay,
      gaitMetrics: {
        speed: baseGaitMetrics.speed * dailyVariation.gait,
        strideLength: baseGaitMetrics.strideLength * dailyVariation.gait,
        stepSymmetry: baseGaitMetrics.stepSymmetry * dailyVariation.gait,
        balanceScore: baseGaitMetrics.balanceScore * dailyVariation.gait,
        turnSpeed: baseGaitMetrics.turnSpeed * dailyVariation.gait,
        strideLengthVariability: baseGaitMetrics.strideLengthVariability * (2 - dailyVariation.gait)
      }
    });
  }
  
  return history;
}

function determineTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

function generateDailyVariation(medications: any[], timeOfDay: string) {
  const baseVariation = () => 0.8 + Math.random() * 0.4; // 80-120% of baseline
  
  // Medication effects
  const medicationEffect = medications.some(m => m.affectsBalance) ? 0.9 : 1;
  
  // Time of day effects
  const timeEffect = {
    morning: 1,
    afternoon: 0.95,
    evening: 0.9,
    night: 0.8
  }[timeOfDay] || 1;
  
  return {
    activity: baseVariation() * medicationEffect * timeEffect,
    sleep: baseVariation(),
    gait: baseVariation() * medicationEffect * timeEffect
  };
}

function calculateInitialRiskLevel(
  age: number,
  conditions: any[],
  medicalProfile: MedicalProfile,
  environmentalFactors: EnvironmentalFactors
): 'low' | 'medium' | 'high' {
  let riskScore = 0;
  
  // Age factor
  riskScore += age >= 85 ? 3 : age >= 75 ? 2 : age >= 65 ? 1 : 0;
  
  // Conditions factor
  riskScore += conditions.length >= 3 ? 3 : conditions.length >= 2 ? 2 : conditions.length >= 1 ? 1 : 0;
  
  // Previous falls
  riskScore += medicalProfile.previousFalls * 2;
  
  // Environmental hazards
  const environmentalRisk = 
    environmentalFactors.looseRugs +
    environmentalFactors.poorLighting +
    environmentalFactors.clutteredWalkways +
    (environmentalFactors.missingHandrails ? 2 : 0);
  riskScore += environmentalRisk >= 6 ? 3 : environmentalRisk >= 3 ? 2 : environmentalRisk >= 1 ? 1 : 0;
  
  // Determine risk level
  if (riskScore >= 8) return 'high';
  if (riskScore >= 4) return 'medium';
  return 'low';
}

// Simulate a new day of activity for a patient
export function simulateDay(patient: Patient, date: string): DailyActivity {
  const timeOfDay = determineTimeOfDay();
  const dailyVariation = generateDailyVariation(patient.medicalProfile.medications, timeOfDay);
  
  return {
    date,
    steps: Math.round(patient.baseline.steps * dailyVariation.activity),
    standingTime: Math.round(patient.baseline.standingTime * dailyVariation.activity),
    movementFrequency: Math.round(patient.baseline.movementFrequency * dailyVariation.activity),
    sleepQuality: Math.min(10, Math.max(1, Math.round(patient.baseline.sleepQuality * dailyVariation.sleep))),
    medications: patient.medications,
    stairUse: Math.round(Math.random() * 10),
    rapidMovements: Math.round(Math.random() * 5),
    inactivityPeriods: Math.round(Math.random() * 3),
    timeOfDay,
    gaitMetrics: {
      speed: patient.gaitMetrics.speed * dailyVariation.gait,
      strideLength: patient.gaitMetrics.strideLength * dailyVariation.gait,
      stepSymmetry: patient.gaitMetrics.stepSymmetry * dailyVariation.gait,
      balanceScore: patient.gaitMetrics.balanceScore * dailyVariation.gait,
      turnSpeed: patient.gaitMetrics.turnSpeed * dailyVariation.gait,
      strideLengthVariability: patient.gaitMetrics.strideLengthVariability * (2 - dailyVariation.gait)
    }
  };
}

// Simulate hypertensive crisis scenario
export function simulateHypertensiveCrisis(patient: Patient, days: number): DailyActivity[] {
  const activities: DailyActivity[] = [];
  const crisisDay = Math.floor(days * 0.3); // Crisis occurs at 30% through the simulation
  
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), days - i), 'yyyy-MM-dd');
    const baseActivity = simulateDay(patient, date);
    
    if (i === crisisDay) {
      // Day of crisis - sharp decline in activity
      activities.push({
        ...baseActivity,
        steps: Math.round(baseActivity.steps * 0.3),
        standingTime: Math.round(baseActivity.standingTime * 0.2),
        movementFrequency: Math.round(baseActivity.movementFrequency * 0.3),
        medications: [...baseActivity.medications, 'Emergency Antihypertensive'],
        rapidMovements: 0,
        inactivityPeriods: 5,
        gaitMetrics: {
          ...baseActivity.gaitMetrics,
          speed: baseActivity.gaitMetrics.speed * 0.5,
          balanceScore: baseActivity.gaitMetrics.balanceScore * 0.6
        }
      });
    } else if (i > crisisDay && i <= crisisDay + 3) {
      // Recovery phase - gradual improvement
      const recoveryFactor = 0.4 + ((i - crisisDay) * 0.2);
      activities.push({
        ...baseActivity,
        steps: Math.round(baseActivity.steps * recoveryFactor),
        standingTime: Math.round(baseActivity.standingTime * recoveryFactor),
        movementFrequency: Math.round(baseActivity.movementFrequency * recoveryFactor),
        medications: [...baseActivity.medications, 'Emergency Antihypertensive'],
        rapidMovements: Math.round(baseActivity.rapidMovements * recoveryFactor),
        inactivityPeriods: Math.max(1, 5 - (i - crisisDay))
      });
    } else {
      activities.push(baseActivity);
    }
  }
  
  return activities;
}

// Simulate dementia-related scenario
export function simulateDementiaEpisode(patient: Patient, days: number): DailyActivity[] {
  const activities: DailyActivity[] = [];
  const forgetfulDays = new Set([
    Math.floor(days * 0.2),
    Math.floor(days * 0.5),
    Math.floor(days * 0.8)
  ]);
  
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), days - i), 'yyyy-MM-dd');
    const baseActivity = simulateDay(patient, date);
    
    if (forgetfulDays.has(i)) {
      // Days with forgotten medications
      const wanderingFactor = 1.5; // Increased movement due to confusion
      activities.push({
        ...baseActivity,
        steps: Math.round(baseActivity.steps * wanderingFactor),
        standingTime: Math.round(baseActivity.standingTime * wanderingFactor),
        movementFrequency: Math.round(baseActivity.movementFrequency * 1.8),
        medications: [], // Forgotten medications
        rapidMovements: Math.round(baseActivity.rapidMovements * 1.5),
        inactivityPeriods: 1,
        sleepQuality: Math.max(1, baseActivity.sleepQuality - 3),
        gaitMetrics: {
          ...baseActivity.gaitMetrics,
          stepSymmetry: baseActivity.gaitMetrics.stepSymmetry * 0.7,
          strideLengthVariability: baseActivity.gaitMetrics.strideLengthVariability * 1.5
        }
      });
    } else if (forgetfulDays.has(i - 1)) {
      // Days following medication lapses - showing effects
      activities.push({
        ...baseActivity,
        steps: Math.round(baseActivity.steps * 0.7),
        standingTime: Math.round(baseActivity.standingTime * 0.6),
        movementFrequency: Math.round(baseActivity.movementFrequency * 0.5),
        sleepQuality: Math.max(1, baseActivity.sleepQuality - 2),
        inactivityPeriods: 4,
        gaitMetrics: {
          ...baseActivity.gaitMetrics,
          speed: baseActivity.gaitMetrics.speed * 0.8,
          balanceScore: baseActivity.gaitMetrics.balanceScore * 0.7
        }
      });
    } else {
      activities.push(baseActivity);
    }
  }
  
  return activities;
}