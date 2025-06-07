import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as ExpoHealth from 'expo-health';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function DeviceSetupScreen({ navigation }) {
  const { user } = useAuth();
  const [hasPermissions, setHasPermissions] = useState(false);

  async function requestHealthPermissions() {
    try {
      const isAvailable = await ExpoHealth.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Not Available',
          'Health tracking is not available on your device.'
        );
        return;
      }

      const permissions = [
        ExpoHealth.PermissionKind.Steps,
        ExpoHealth.PermissionKind.HeartRate,
        ExpoHealth.PermissionKind.BloodOxygen,
        ExpoHealth.PermissionKind.SleepAnalysis,
      ];

      await ExpoHealth.requestPermissionsAsync(permissions);
      setHasPermissions(true);
      
      Alert.alert(
        'Success',
        'Health tracking has been enabled!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Dashboard')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to setup health tracking');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Your Health Data</Text>
      
      <Text style={styles.description}>
        ProactiveCare can connect to Apple Health or Google Fit to track your:
      </Text>

      <View style={styles.featureList}>
        <Text style={styles.feature}>• Heart Rate</Text>
        <Text style={styles.feature}>• Blood Oxygen</Text>
        <Text style={styles.feature}>• Steps</Text>
        <Text style={styles.feature}>• Sleep Data</Text>
      </View>

      <Button
        onPress={requestHealthPermissions}
        style={styles.button}
      >
        Connect Health Data
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  featureList: {
    marginBottom: 32,
    alignSelf: 'center',
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  }
});