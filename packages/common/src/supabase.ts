import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://curqkogkcxzsiwesknef.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cnFrb2drY3h6c2l3ZXNrbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDAxOTcsImV4cCI6MjA2NDIxNjE5N30.1ANqTSI44Crix1L0-kibwWZVi-VqhuprNB9m5Nx1Fuk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);