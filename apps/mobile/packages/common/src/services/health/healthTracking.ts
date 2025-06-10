import * as Health from 'expo-health';
import * as BackgroundFetch from 'expo-background-fetch';
import { HealthService } from 'common/src/services/healthService';
import { Alert } from 'react-native';

const healthService = new HealthService();

export async function setupHealthTracking(userId: string) {
  try {
    const isAvailable = await Health.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(
        'Health Tracking Unavailable',
        'Your device does not support health tracking features.'
      );
      return;
    }

    const permissions = [
      Health.PermissionKind.Steps,
      Health.PermissionKind.HeartRate,
      Health.PermissionKind.BloodOxygen,
      Health.PermissionKind.BodyTemperature,
      Health.PermissionKind.RespiratoryRate,
      Health.PermissionKind.SleepAnalysis,
    ];

    await Health.requestPermissionsAsync(permissions);
    await setupBackgroundSync(userId);
    await performInitialSync(userId);
  } catch (error) {
    console.error('Failed to setup health tracking:', error);
    Alert.alert(
      'Setup Failed',
      'Unable to setup health tracking. Please try again.'
    );
  }
}

async function setupBackgroundSync(userId: string) {
  await BackgroundFetch.registerTaskAsync('SYNC_HEALTH_DATA', {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false,
    startOnBoot: true,
  });

  BackgroundFetch.defineTask('SYNC_HEALTH_DATA', async () => {
    try {
      await syncHealthData(userId);
      return BackgroundFetch.Result.NewData;
    } catch (error) {
      console.error('Background sync failed:', error);
      return BackgroundFetch.Result.Failed;
    }
  });
}

async function performInitialSync(userId: string) {
  try {
    await syncHealthData(userId);
    console.log('Initial health data sync completed');
  } catch (error) {
    console.error('Initial sync failed:', error);
  }
}

export async function syncHealthData(userId: string) {
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    const [steps, heartRate, bloodOxygen, sleep] = await Promise.all([
      Health.getStepCountAsync(dayAgo, now),
      Health.getHeartRateDataAsync(dayAgo, now),
      Health.getBloodOxygenDataAsync(dayAgo, now),
      Health.getSleepDataAsync(dayAgo, now)
    ]);

    await healthService.syncHealthMetrics({
      userId,
      timestamp: now,
      steps: steps.total,
      heartRate: heartRate[0]?.value,
      bloodOxygen: bloodOxygen[0]?.value
    });

    for (const sleepRecord of sleep) {
      await healthService.syncSleepData({
        userId,
        startTime: new Date(sleepRecord.startDate),
        endTime: new Date(sleepRecord.endDate),
        stage: sleepRecord.sleepStageType.toUpperCase() as any
      });
    }

    return true;
  } catch (error) {
    console.error('Health data sync failed:', error);
    return false;
  }
}