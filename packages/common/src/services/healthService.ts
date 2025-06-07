import { supabase } from '../lib/supabase';
import type { HealthMetrics, SleepData } from '../types/health';

export class HealthService {
  async syncHealthMetrics(data: HealthMetrics): Promise<void> {
    const { error } = await supabase
      .from('health_metrics')
      .insert({
        user_id: data.userId,
        timestamp: data.timestamp.toISOString(),
        heart_rate: data.heartRate,
        blood_pressure: data.bloodPressure,
        blood_oxygen: data.bloodOxygen,
        temperature: data.temperature,
        respiratory_rate: data.respiratoryRate,
        steps: data.steps
      });

    if (error) throw error;
  }

  async syncSleepData(data: SleepData): Promise<void> {
    const { error } = await supabase
      .from('sleep_data')
      .insert({
        user_id: data.userId,
        start_time: data.startTime.toISOString(),
        end_time: data.endTime.toISOString(),
        stage: data.stage
      });

    if (error) throw error;
  }

  async getHealthMetrics(userId: string, start: Date, end: Date): Promise<HealthMetrics[]> {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', start.toISOString())
      .lte('timestamp', end.toISOString())
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data;
  }

  async getSleepData(userId: string, start: Date, end: Date): Promise<SleepData[]> {
    const { data, error } = await supabase
      .from('sleep_data')
      .select('*')
      .eq('user_id', userId)
      .gte('start_time', start.toISOString())
      .lte('end_time', end.toISOString())
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data;
  }
}