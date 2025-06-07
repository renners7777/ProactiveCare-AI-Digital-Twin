import { useState, useCallback } from 'react';
import { setupHealthTracking, syncHealthData } from '../services/health/healthTracking';

export function useHealthTracking(userId: string) {
  const [isSetup, setIsSetup] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const initializeTracking = useCallback(async () => {
    try {
      await setupHealthTracking(userId);
      setIsSetup(true);
    } catch (error) {
      console.error('Health tracking setup failed:', error);
      setIsSetup(false);
    }
  }, [userId]);

  const syncHealth = useCallback(async () => {
    if (!isSetup) return false;
    
    setIsSyncing(true);
    try {
      const success = await syncHealthData(userId);
      return success;
    } finally {
      setIsSyncing(false);
    }
  }, [userId, isSetup]);

  return {
    isSetup,
    isSyncing,
    initializeTracking,
    syncHealth
  };
}