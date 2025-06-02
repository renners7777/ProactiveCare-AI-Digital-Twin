import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'ProactiveCare' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100">
      <Text className="text-xl font-bold text-neutral-800">
        Welcome to ProactiveCare Mobile
      </Text>
      <Text className="mt-2 text-neutral-600">
        Your digital health companion
      </Text>
    </View>
  );
}