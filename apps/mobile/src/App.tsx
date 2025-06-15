import React from 'react';
import { View, Text, LogBox } from 'react-native';

// Disable yellow box warnings during development
LogBox.ignoreAllLogs();

console.log('App component rendering...'); // Debug log

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ fontSize: 24 }}>Basic Test</Text>
    </View>
  );
}