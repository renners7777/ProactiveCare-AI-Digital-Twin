import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { HealthDataScreen } from './screens/HealthDataScreen';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ProactiveCare' }}
        />
        <Stack.Screen
          name="HealthData"
          component={HealthDataScreen}
          options={{ title: 'Health Data' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);