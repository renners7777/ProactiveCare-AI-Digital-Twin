import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/email';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error: signInError, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Handle specific error cases
      if (signInError.message.includes('Email not confirmed')) {
        throw new Error('Please verify your email address before logging in');
      } else if (signInError.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password');
      } else {
        throw signInError;
      }
    }

    if (!data.user?.id) {
      throw new Error('No user ID available after sign in');
    }

    // Verify user has a profile in the profiles table
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .limit(1);

    console.log('Profile query result:', { profiles, profileError });

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new Error('Failed to fetch user profile');
    }

    // If no profile exists, create one
    if (!profiles || profiles.length === 0) {
      try {
        const { error: insertError } = await supabase.auth.updateUser({
          data: { role: 'carer' } // Default role
        });

        if (insertError) {
          console.error('User metadata update error:', insertError);
          throw new Error('Failed to update user metadata');
        }

        const { error: createProfileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: data.user.id,
              email: data.user.email,
              role: 'carer', // Default role
            }
          ], {
            onConflict: 'id'
          });

        if (createProfileError) {
          console.error('Profile creation error:', createProfileError);
          throw new Error('Failed to create user profile');
        }
      } catch (err) {
        console.error('Profile creation attempt failed:', err);
        throw new Error('Failed to create user profile');
      }
    }
  };

  const signUp = async (email: string, password: string, role: string) => {
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
        emailRedirectTo: `${window.location.origin}/login`
      }
    });

    if (signUpError) throw signUpError;

    if (data.user) {
      // Create profile using upsert
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: data.user.id,
            email: data.user.email,
            role: role,
          }
        ], {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Clean up auth if profile creation fails
        await supabase.auth.signOut();
        throw new Error('Failed to create user profile');
      }

      try {
        await sendWelcomeEmail(email, role);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Don't throw here - welcome email is non-critical
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};