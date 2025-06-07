import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Data Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect health data including heart rate, blood oxygen levels, steps, 
            and sleep patterns. This data is processed with your explicit consent and 
            stored securely in compliance with GDPR Article 9(2)(a).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Your Rights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
            <li>Lodge complaints with the ICO</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Storage</h2>
          <p className="text-gray-700 leading-relaxed">
            Your data is stored within the UK/EEA using encrypted storage. We retain 
            data only for the duration necessary for health monitoring purposes.
          </p>
        </section>

        <Button 
          onClick={() => navigate('/consent')}
          className="w-full mt-8"
        >
          Accept & Continue
        </Button>
      </div>
    </div>
  );
}