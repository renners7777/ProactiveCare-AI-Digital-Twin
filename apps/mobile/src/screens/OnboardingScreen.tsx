import React from 'react';
import { View, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useHealthTracking } from '../hooks/useHealthTracking';

export function OnboardingScreen() {
  const { user } = useAuth();
  const { initializeTracking } = useHealthTracking(user?.id);

  const handleHealthSetup = async () => {
    try {
      await initializeTracking();
      // Navigate to next screen on success
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        'Unable to setup health tracking. Please try again.'
      );
    }
  };

  // ...existing code...
}