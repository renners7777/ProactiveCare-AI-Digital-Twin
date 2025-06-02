export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  conditions: string[];
  medications: string[];
  riskLevel: 'low' | 'medium' | 'high';
  activityHistory: DailyActivity[];
  baseline: {
    steps: number;
    standingTime: number;
    movementFrequency: number;
    sleepQuality: number;
    gaitSpeed: number;
    balanceScore: number;
  };
  environmentalFactors: EnvironmentalFactors;
  medicalProfile: MedicalProfile;
  gaitMetrics: GaitMetrics;
}

export interface DailyActivity {
  date: string;
  steps: number;
  standingTime: number;
  movementFrequency: number;
  sleepQuality: number;
  medications: string[];
  stairUse: number;
  rapidMovements: number;
  inactivityPeriods: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  gaitMetrics: GaitMetrics;
}

export interface EnvironmentalFactors {
  looseRugs: number;
  poorLighting: number;
  clutteredWalkways: number;
  missingHandrails: boolean;
  bathroomSafety: number;
  bedroomSafety: number;
  stairsPresent: boolean;
  outdoorHazards: number;
}

export interface MedicalProfile {
  previousFalls: number;
  chronicConditions: {
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: number;
  }[];
  medications: {
    name: string;
    category: string;
    affectsBalance: boolean;
    startDate: string;
  }[];
  visionImpairment: boolean;
  hearingImpairment: boolean;
  cognitiveStatus: number;
  lastAssessmentDate: string;
}

export interface GaitMetrics {
  speed: number;
  strideLength: number;
  stepSymmetry: number;
  balanceScore: number;
  turnSpeed: number;
  strideLengthVariability: number;
}

export interface ActivityAnalysis {
  alert: boolean;
  alertType?: 'mobility-decline' | 'medication-effect' | 'deconditioning' | 'environmental' | 'gait-change' | 'general';
  alertMessage?: string;
  recommendations?: string[];
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: {
    category: string;
    level: 'low' | 'medium' | 'high';
    description: string;
  }[];
  trends: {
    steps: 'stable' | 'declining' | 'improving';
    standingTime: 'stable' | 'declining' | 'improving';
    movementFrequency: 'stable' | 'declining' | 'improving';
    sleepQuality: 'stable' | 'declining' | 'improving';
    gaitMetrics: 'stable' | 'declining' | 'improving';
  };
  environmentalRisks: {
    location: string;
    riskLevel: 'low' | 'medium' | 'high';
    recommendations: string[];
  }[];
  timeBasedRisk: {
    highRiskPeriods: string[];
    recommendations: string[];
  };
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  type: string;
  message: string;
  recommendations: string[];
  dismissed: boolean;
  severity: 'low' | 'medium' | 'high';
  category: 'activity' | 'environmental' | 'medical' | 'gait';
  timeOfDay?: string;
  location?: string;
}