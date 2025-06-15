import React from 'react';
import { View, Text } from 'react-native';

console.log('App component rendering...'); // Debug log

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Basic Test</Text>
    </View>
  );
}