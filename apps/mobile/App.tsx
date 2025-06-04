import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { Activity } from 'lucide-react-native';
import { supabase } from 'common';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100">
      <Text className="text-xl font-bold text-neutral-800">
        Welcome to ProactiveCare Mobile
      </Text>
      <Text className="mt-2 mb-6 text-neutral-600">
        Your digital health companion
      </Text>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        className="flex-row items-center bg-primary-600 px-6 py-3 rounded-lg"
      >
        <Activity size={20} color="white" />
        <Text className="ml-2 text-white font-medium">View Health Data</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100">
      <Text className="text-xl font-bold text-neutral-800">Health Data</Text>
      <Text className="mt-2 text-neutral-600">
        Your health metrics will appear here
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'ProactiveCare' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Health Data' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}