import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { securityConfig } from '../config/security';
import * as argon2 from 'argon2';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data: attempts } = await supabase
        .from('login_attempts')
        .select('count, locked_until')
        .eq('email', email)
        .single();

      if (attempts?.locked_until && new Date(attempts.locked_until) > new Date()) {
        throw new Error('Account temporarily locked. Please try again later.');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        await handleFailedLogin(email);
        throw error;
      }

      // Reset login attempts on successful login
      await supabase
        .from('login_attempts')
        .upsert({ email, count: 0, locked_until: null });

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleFailedLogin = async (email: string) => {
    const { data: attempts } = await supabase
      .from('login_attempts')
      .select('count')
      .eq('email', email)
      .single();

    const newAttemptCount = attempts?.count + 1 || 1;

    const { data } = await supabase
      .from('login_attempts')
      .upsert({
        email,
        count: newAttemptCount,
        locked_until: newAttemptCount >= securityConfig.MAX_LOGIN_ATTEMPTS
          ? new Date(Date.now() + securityConfig.LOCKOUT_DURATION).toISOString()
          : null
      })
      .select()
      .single();

    if (data?.count >= securityConfig.MAX_LOGIN_ATTEMPTS) {
      throw new Error('Too many failed attempts. Account temporarily locked.');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, signIn, signOut };
}