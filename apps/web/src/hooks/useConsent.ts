import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'common/src/supabase';
import { useAuth } from './useAuth';

export function useConsent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;

    const checkConsent = async () => {
      const { data } = await supabase
        .from('user_consents')
        .select('*')
        .eq('user_id', user.id)
        .is('withdrawal_date', null)
        .single();

      if (!data) {
        navigate('/');
      } else {
        setHasConsent(true);
      }
    };

    checkConsent();
  }, [user, navigate]);

  return hasConsent;
}