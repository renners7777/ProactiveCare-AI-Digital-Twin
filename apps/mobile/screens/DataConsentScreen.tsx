import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Button } from '../components/ui/Button';
import { supabase } from 'common/src/supabase';

export function DataConsentScreen({ navigation }) {
  const [healthDataConsent, setHealthDataConsent] = useState(false);
  const [processingConsent, setProcessingConsent] = useState(false);

  const handleContinue = async () => {
    if (healthDataConsent && processingConsent) {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.from('user_consents').insert({
          user_id: user.id,
          health_data_consent: true,
          processing_consent: true,
          consent_date: new Date().toISOString(),
        });
      }
      
      navigation.navigate('SignUp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Processing Consent</Text>

      <View style={styles.consentItem}>
        <Text style={styles.consentText}>
          I consent to the collection and processing of my health data for 
          monitoring and analysis purposes.
        </Text>
        <Switch
          value={healthDataConsent}
          onValueChange={setHealthDataConsent}
        />
      </View>

      <View style={styles.consentItem}>
        <Text style={styles.consentText}>
          I understand my data will be processed in accordance with GDPR and 
          the UK Data Protection Act 2018.
        </Text>
        <Switch
          value={processingConsent}
          onValueChange={setProcessingConsent}
        />
      </View>

      <Button
        onPress={handleContinue}
        disabled={!healthDataConsent || !processingConsent}
        style={styles.button}
      >
        Continue
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  consentText: {
    flex: 1,
    marginRight: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 32,
  },
});