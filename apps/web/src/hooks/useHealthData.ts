import { useState, useEffect } from 'react';
import { supabase } from 'common/src/supabase';
import { HealthMetrics } from 'common/src/types/health';

export function useHealthData(userId?: string) {
  const [heartRate, setHeartRate] = useState<{ timestamp: Date; value: number }[]>([]);
  const [bloodOxygen, setBloodOxygen] = useState<{ timestamp: Date; value: number }[]>([]);
  const [steps, setSteps] = useState<{ timestamp: Date; value: number }[]>([]);

  useEffect(() => {
    if (!userId) return;

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

      if (data) {
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

    // Initial fetch
    fetchHealthData();

    // Set up real-time subscription
    const subscription = supabase
      .channel('health_metrics_changes')
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
          
          // Update heart rate
          if (newMetric.heart_rate) {
            setHeartRate(prev => [...prev, {
              timestamp: new Date(newMetric.timestamp),
              value: newMetric.heart_rate!
            }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
          }

          // Update blood oxygen
          if (newMetric.blood_oxygen) {
            setBloodOxygen(prev => [...prev, {
              timestamp: new Date(newMetric.timestamp),
              value: newMetric.blood_oxygen!
            }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
          }

          // Update steps
          if (newMetric.steps) {
            setSteps(prev => [...prev, {
              timestamp: new Date(newMetric.timestamp),
              value: newMetric.steps!
            }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return { heartRate, bloodOxygen, steps };
}