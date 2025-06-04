import * as ExpoHealth from 'expo-health';
import { Platform } from 'react-native';

export interface HealthData {
  steps: number;
  heartRate: number[];
  sleepHours: number;
  activeMinutes: number;
  distance: number;
}

class HealthKitService {
  private isAvailable: boolean = false;

  async initialize(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      return false;
    }

    try {
      const isAvailable = await ExpoHealth.isAvailable();
      if (!isAvailable) {
        return false;
      }

      const status = await ExpoHealth.requestPermissionsAsync([
        ExpoHealth.PermissionKind.Steps,
        ExpoHealth.PermissionKind.HeartRate,
        ExpoHealth.PermissionKind.SleepAnalysis,
        ExpoHealth.PermissionKind.Activity,
        ExpoHealth.PermissionKind.Distance
      ]);

      this.isAvailable = status.status === 'granted';
      return this.isAvailable;
    } catch (error) {
      console.error('Error initializing HealthKit:', error);
      return false;
    }
  }

  async getDailyHealthData(date: Date): Promise<HealthData | null> {
    if (!this.isAvailable) {
      return null;
    }

    try {
      const endDate = new Date(date);
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const [steps, heartRate, sleep, activity, distance] = await Promise.all([
        ExpoHealth.getStepCountAsync(startDate, endDate),
        ExpoHealth.getHeartRateAsync(startDate, endDate),
        ExpoHealth.getSleepAnalysisAsync(startDate, endDate),
        ExpoHealth.getActiveMinutesAsync(startDate, endDate),
        ExpoHealth.getDistanceAsync(startDate, endDate)
      ]);

      return {
        steps: steps.reduce((sum, reading) => sum + reading.value, 0),
        heartRate: heartRate.map(reading => reading.value),
        sleepHours: sleep.reduce((sum, reading) => sum + (reading.endDate.getTime() - reading.startDate.getTime()) / (1000 * 60 * 60), 0),
        activeMinutes: activity.reduce((sum, reading) => sum + reading.value, 0),
        distance: distance.reduce((sum, reading) => sum + reading.value, 0)
      };
    } catch (error) {
      console.error('Error fetching health data:', error);
      return null;
    }
  }
}

export const healthKitService = new HealthKitService();