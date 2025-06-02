import { supabase } from './supabase';

export const sendWelcomeEmail = async (email: string, role: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${supabase.supabaseUrl}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        type: 'welcome',
        email,
        role,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to send welcome email: ${error}`);
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error; // Re-throw to handle in the UI
  }
};