/*
  # Add patient role to profiles table

  1. Changes
    - Update profiles_role_check constraint to include 'patient' role
    - Add new columns for patient-specific information:
      - date_of_birth
      - emergency_contact
      - medical_conditions
      - primary_carer_id

  2. Security
    - Maintain existing RLS policies
    - Add new policy for carers to view their patients
*/

-- Drop existing check constraint
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add new check constraint with patient role
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check 
CHECK (role = ANY (ARRAY['carer'::text, 'family'::text, 'patient'::text]));

-- Add patient-specific columns
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS emergency_contact jsonb,
ADD COLUMN IF NOT EXISTS medical_conditions text[],
ADD COLUMN IF NOT EXISTS primary_carer_id uuid REFERENCES auth.users(id);

-- Create index for primary carer lookups
CREATE INDEX IF NOT EXISTS idx_profiles_primary_carer 
ON public.profiles(primary_carer_id)
WHERE primary_carer_id IS NOT NULL;

-- Add policy for carers to view their patients
CREATE POLICY "Carers can view their patients profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  (role = 'patient' AND primary_carer_id = auth.uid()) OR
  (auth.uid() = id) OR
  EXISTS (
    SELECT 1 
    FROM public.patient_access 
    WHERE patient_access.patient_id = profiles.id::text
    AND patient_access.user_id = auth.uid()
  )
);