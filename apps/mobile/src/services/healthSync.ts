import { Platform } from 'react-native';
import { healthKitService } from './healthKit';
import { googleFitService } from './googleFit';
import { supabase } from 'common';

class HealthSyncService {
  private syncInterval: NodeJS.Timer | null = null;

  async initialize(): Promise<boolean> {
    const service = Platform.OS === 'ios' ? healthKitService : googleFitService;
    return service.initialize();
  }

  async startSync(patientId: string, intervalMinutes: number = 15): Promise<void> {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    await this.syncHealthData(patientId);

    this.syncInterval = setInterval(() => {
      this.syncHealthData(patientId);
    }, intervalMinutes * 60 * 1000);
  }

  stopSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  private async syncHealthData(patientId: string): Promise<void> {
    try {
      const service = Platform.OS === 'ios' ? healthKitService : googleFitService;
      const healthData = await service.getDailyHealthData(new Date());

      if (!healthData) {
        return;
      }

      const { error } = await supabase
        .from('health_data')
        .upsert({
          patient_id: patientId,
          recorded_at: new Date().toISOString(),
          steps: healthData.steps,
          heart_rate: healthData.heartRate,
          sleep_hours: healthData.sleepHours,
          active_minutes: healthData.activeMinutes,
          distance: healthData.distance,
          device_type: Platform.OS === 'ios' ? 'apple_health' : 'google_fit'
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error syncing health data:', error);
    }
  }
}

export const healthSyncService = new HealthSyncService();