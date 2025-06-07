import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useHealthTracking } from '../hooks/useHealthTracking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';

export function OnboardingScreen() {
  const { user } = useAuth();
  const { initializeTracking } = useHealthTracking(user?.id);
  const navigation = useNavigation();

  const handleHealthSetup = async () => {
    try {
      await initializeTracking();
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        'Unable to setup health tracking. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to ProactiveCare</Text>

        <Text style={styles.description}>
          Connect your health data to get personalized insights and monitoring.
        </Text>

        <Button onPress={handleHealthSetup} style={styles.button}>
          Connect Health Data
        </Button>

        <Button
          onPress={() => navigation.navigate('Dashboard')}
          variant="secondary"
          style={styles.skipButton}
        >
          Skip for Now
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 32,
    color: '#666',
  },
  button: {
    marginBottom: 16,
    width: '100%',
  },
  skipButton: {
    width: '100%',
  },
});
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useHealthTracking } from '../hooks/useHealthTracking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';

export function OnboardingScreen() {
  const { user } = useAuth();
  const { initializeTracking } = useHealthTracking(user?.id);
  const navigation = useNavigation();

  const handleHealthSetup = async () => {
    try {
      await initializeTracking();
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        'Unable to setup health tracking. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to ProactiveCare</Text>
        
        <Text style={styles.description}>
          Connect your health data to get personalized insights and monitoring.
        </Text>

        <Button
          onPress={handleHealthSetup}
          style={styles.button}
        >
          Connect Health Data
        </Button>

        <Button
          onPress={() => navigation.navigate('Dashboard')}
          variant="secondary"
          style={styles.skipButton}
        >
          Skip for Now
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 32,
    color: '#666',
  },
  button: {
    marginBottom: 16,
    width: '100%',
  },
  skipButton: {
    width: '100%',
  },
});