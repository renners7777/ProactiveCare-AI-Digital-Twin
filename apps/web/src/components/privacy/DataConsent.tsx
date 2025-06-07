import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from 'common/src/supabase';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';

export function DataConsent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [healthDataConsent, setHealthDataConsent] = useState(false);
  const [processingConsent, setProcessingConsent] = useState(false);

  const handleContinue = async () => {
    if (!healthDataConsent || !processingConsent || !user) return;

    try {
      await supabase.from('user_consents').insert({
        user_id: user.id,
        health_data_consent: true,
        processing_consent: true,
        consent_date: new Date().toISOString(),
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Data Processing Consent</h1>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-start space-x-3">
            <Checkbox
              checked={healthDataConsent}
              onCheckedChange={(checked) => setHealthDataConsent(checked)}
              className="mt-1"
            />
            <span className="text-gray-700">
              I consent to the collection and processing of my health data for 
              monitoring and analysis purposes.
            </span>
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-start space-x-3">
            <Checkbox
              checked={processingConsent}
              onCheckedChange={(checked) => setProcessingConsent(checked)}
              className="mt-1"
            />
            <span className="text-gray-700">
              I understand my data will be processed in accordance with GDPR and 
              the UK Data Protection Act 2018.
            </span>
          </label>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!healthDataConsent || !processingConsent}
          className="w-full mt-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}