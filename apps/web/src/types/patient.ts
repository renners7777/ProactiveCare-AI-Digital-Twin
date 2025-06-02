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
  standingTime: number; // in minutes
  movementFrequency: number; // number of position changes
  sleepQuality: number; // scale 1-10
  medications: string[];
  stairUse: number; // number of times stairs were used
  rapidMovements: number; // number of sudden movements or quick turns
  inactivityPeriods: number; // periods of prolonged sitting/lying
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  gaitMetrics: GaitMetrics;
}

export interface EnvironmentalFactors {
  looseRugs: number; // 0-3 scale
  poorLighting: number; // 0-3 scale
  clutteredWalkways: number; // 0-3 scale
  missingHandrails: boolean;
  bathroomSafety: number; // 0-3 scale
  bedroomSafety: number; // 0-3 scale
  stairsPresent: boolean;
  outdoorHazards: number; // 0-3 scale
}

export interface MedicalProfile {
  previousFalls: number; // number of falls in past year
  chronicConditions: {
    name: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: number; // years
  }[];
  medications: {
    name: string;
    category: string;
    affectsBalance: boolean;
    startDate: string;
  }[];
  visionImpairment: boolean;
  hearingImpairment: boolean;
  cognitiveStatus: number; // 0-10 scale
  lastAssessmentDate: string;
}

export interface GaitMetrics {
  speed: number; // meters per second
  strideLength: number; // meters
  stepSymmetry: number; // 0-1 scale
  balanceScore: number; // 0-10 scale
  turnSpeed: number; // degrees per second
  strideLengthVariability: number; // coefficient of variation
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