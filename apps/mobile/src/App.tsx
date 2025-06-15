import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

// Import screens - comment out any that don't exist yet
import { DashboardScreen } from './screens/DashboardScreen';
import { DataConsentScreen } from './screens/DataConsentScreen';
import { DeviceSetupScreen } from './screens/DeviceSetupScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { PrivacyPolicyScreen } from './screens/PrivacyPolicyScreen';
import { SignUpScreen } from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

// Fallback component for development
const PlaceholderScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Screen not implemented yet</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen || PlaceholderScreen}
          options={{
            title: 'Welcome',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen || PlaceholderScreen}
          options={{ title: 'ProactiveCare' }}
        />
        <Stack.Screen
          name="DataConsent"
          component={DataConsentScreen}
          options={{ title: 'Data Consent' }}
        />
        <Stack.Screen
          name="DeviceSetup"
          component={DeviceSetupScreen}
          options={{ title: 'Device Setup' }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ title: 'Privacy Policy' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}