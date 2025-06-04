import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Text style={{ 
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937'
      }}>
        Welcome to ProactiveCare Mobile
      </Text>
      <Text style={{
        marginTop: 8,
        fontSize: 16,
        color: '#4b5563'
      }}>
        Loading test...
      </Text>
    </View>
  );
}