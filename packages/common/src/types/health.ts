export type SleepStage = 'LIGHT' | 'DEEP' | 'REM';

export interface HealthMetrics {
  id?: string;
  userId: string;
  timestamp: Date;
  heartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodOxygen?: number;
  temperature?: number;
  respiratoryRate?: number;
  steps?: number;
  createdAt?: Date;
}

export interface SleepData {
  id?: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  stage: SleepStage;
  createdAt?: Date;
}

export interface HealthDataResponse {
  data: HealthMetrics[];
  error: Error | null;
}