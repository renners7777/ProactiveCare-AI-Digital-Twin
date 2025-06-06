export interface HealthMetrics {
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
}

export interface HealthDataResponse {
  data: HealthMetrics[];
  error: Error | null;
}