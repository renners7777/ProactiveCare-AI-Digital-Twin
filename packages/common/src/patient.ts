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
    strengthScore: number; // New: Track strength levels
    balanceExerciseAdherence: number; // New: Track exercise adherence
    visionLastChecked: string; // New: Track vision check dates
  };
  environmentalFactors: EnvironmentalFactors;
  medicalProfile: MedicalProfile;
  gaitMetrics: GaitMetrics;
  preventionPlan: PreventionPlan; // New: Structured prevention planning
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
  exerciseCompleted: ExerciseSession[]; // New: Track daily exercises
  footwear: string; // New: Track footwear type used
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
  flooringSurfaces: FlooringSurface[]; // New: Detailed flooring assessment
  lightingAssessment: LightingAssessment; // New: Detailed lighting assessment
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
    lastReviewed: string; // New: Track medication reviews
    sideEffects: string[]; // New: Track known side effects
  }[];
  visionImpairment: boolean;
  hearingImpairment: boolean;
  cognitiveStatus: number;
  lastAssessmentDate: string;
  osteoporosisRisk: boolean; // New: Track osteoporosis risk
  vestibularIssues: boolean; // New: Track inner ear/balance issues
}

export interface GaitMetrics {
  speed: number;
  strideLength: number;
  stepSymmetry: number;
  balanceScore: number;
  turnSpeed: number;
  strideLengthVariability: number;
  dualTaskPerformance: number; // New: Assess walking while performing tasks
  turningStability: number; // New: Specific metric for turning stability
}

// New interfaces for enhanced monitoring

export interface PreventionPlan {
  exercises: ExerciseProgram;
  environmentalModifications: ModificationPlan[];
  medicationReviewSchedule: ReviewSchedule;
  visionCheckSchedule: ReviewSchedule;
  footwearGuidance: FootwearRecommendation[];
  educationalMaterials: EducationalResource[];
}

export interface ExerciseProgram {
  strengthExercises: Exercise[];
  balanceExercises: Exercise[];
  flexibilityExercises: Exercise[];
  frequency: number;
  duration: number;
  intensity: 'low' | 'moderate' | 'high';
  modifications: string[];
}

export interface Exercise {
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  contraindications: string[];
  videoLink?: string;
}

export interface ExerciseSession {
  type: 'strength' | 'balance' | 'flexibility' | 'combined';
  duration: number;
  exercisesCompleted: string[];
  intensity: 'low' | 'moderate' | 'high';
  perceived_effort: number;
  notes: string;
}

export interface ModificationPlan {
  area: string;
  currentRisks: string[];
  recommendedModifications: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  completionDate?: string;
}

export interface ReviewSchedule {
  lastReview: string;
  nextReview: string;
  frequency: number;
  provider: string;
  notes: string[];
}

export interface FootwearRecommendation {
  type: string;
  features: string[];
  suitableActivities: string[];
  warnings: string[];
}

export interface EducationalResource {
  title: string;
  type: 'video' | 'document' | 'website';
  url: string;
  topics: string[];
  lastAccessed?: string;
}

export interface FlooringSurface {
  location: string;
  type: string;
  condition: 'good' | 'fair' | 'poor';
  slipResistance: 'high' | 'medium' | 'low';
  needsRepair: boolean;
}

export interface LightingAssessment {
  location: string;
  type: string;
  brightness: number;
  coverage: 'good' | 'partial' | 'poor';
  motionSensors: boolean;
  nightLighting: boolean;
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
    exerciseAdherence: 'stable' | 'declining' | 'improving'; // New: Track exercise compliance
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
  preventiveActions?: string[]; // New: Specific preventive actions to take
}