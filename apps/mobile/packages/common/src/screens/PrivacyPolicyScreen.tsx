import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from '../components/ui/Button';

export function PrivacyPolicyScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      
      <Text style={styles.section}>1. Data Collection</Text>
      <Text style={styles.content}>
        We collect health data including heart rate, blood oxygen levels, steps, 
        and sleep patterns. This data is processed with your explicit consent and 
        stored securely in compliance with GDPR Article 9(2)(a).
      </Text>

      <Text style={styles.section}>2. Your Rights</Text>
      <Text style={styles.content}>
        You have the right to:
        • Access your personal data
        • Request data deletion
        • Data portability
        • Withdraw consent
        • Lodge complaints with the ICO
      </Text>

      <Text style={styles.section}>3. Data Storage</Text>
      <Text style={styles.content}>
        Your data is stored within the UK/EEA using encrypted storage. We retain 
        data only for the duration necessary for health monitoring purposes.
      </Text>

      <Button 
        onPress={() => navigation.navigate('SignUp')}
        style={styles.button}
      >
        Accept & Continue
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  button: {
    marginTop: 32,
    marginBottom: 16,
  },
});