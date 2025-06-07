import { useState, useEffect } from 'react';
import { supabase } from 'common/src/supabase';
import { HealthMetrics } from 'common/src/types/health';
import { AppState, AppStateStatus } from 'react-native';

export function useHealthData(userId?: string) {
  const [heartRate, setHeartRate] = useState<{ timestamp: Date; value: number }[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<{ timestamp: Date; value: number }[]>([]);
  const [steps, setSteps] = useState<{ timestamp: Date; value: number }[]>([]);

  useEffect(() => {
    if (!userId) return;

    let subscription: ReturnType<typeof supabase.channel>;
    let isSubscribed = true;

    const fetchHealthData = async () => {
      const end = new Date();
      const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

      const { data } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', userId)
        .gte('timestamp', start.toISOString())
        .lte('timestamp', end.toISOString())
        .order('timestamp', { ascending: true });

      if (data && isSubscribed) {
        setHeartRate(data.map(d => ({ 
          timestamp: new Date(d.timestamp), 
          value: d.heart_rate 
        })));
        setBloodOxygen(data.map(d => ({ 
          timestamp: new Date(d.timestamp), 
          value: d.blood_oxygen 
        })));
        setSteps(data.map(d => ({ 
          timestamp: new Date(d.timestamp), 
          value: d.steps 
        })));
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        fetchHealthData();
        setupSubscription();
      } else {
        subscription?.unsubscribe();
      }
    };

    const setupSubscription = () => {
      subscription = supabase
        .channel('health_metrics_mobile')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'health_metrics',
            filter: `user_id=eq.${userId}`
          },
          (payload) => {
            const newMetric = payload.new as HealthMetrics;
            
            if (newMetric.heart_rate) {
              setHeartRate(prev => [...prev, {
                timestamp: new Date(newMetric.timestamp),
                value: newMetric.heart_rate!
              }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
            }

            if (newMetric.blood_oxygen) {
              setBloodOxygen(prev => [...prev, {
                timestamp: new Date(newMetric.timestamp),
                value: newMetric.blood_oxygen!
              }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
            }

            if (newMetric.steps) {
              setSteps(prev => [...prev, {
                timestamp: new Date(newMetric.timestamp),
                value: newMetric.steps!
              }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
            }
          }
        )
        .subscribe();
    };

    // Initial setup
    fetchHealthData();
    setupSubscription();

    // Handle app state changes
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      isSubscribed = false;
      subscription?.unsubscribe();
      appStateSubscription.remove();
    };
  }, [userId]);

  return { heartRate, bloodOxygen, steps };
}