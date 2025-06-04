/*
  # Update health_data table schema

  1. Changes
    - Drop existing RLS policies
    - Modify patient_id column to text type
    - Add recorded_at column
    - Recreate RLS policies with updated conditions
    - Update indexes for performance

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Read health data for their patients
      - Insert/update health data for their patients
      - Delete health data for their patients
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can delete health data for their patients" ON public.health_data;
DROP POLICY IF EXISTS "Users can insert health data for their patients" ON public.health_data;
DROP POLICY IF EXISTS "Users can read health data for their patients" ON public.health_data;
DROP POLICY IF EXISTS "Users can update health data for their patients" ON public.health_data;

-- Drop existing foreign key constraint
ALTER TABLE public.health_data
DROP CONSTRAINT IF EXISTS health_data_patient_id_fkey;

-- Add recorded_at column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'health_data' 
    AND column_name = 'recorded_at'
  ) THEN
    ALTER TABLE public.health_data ADD COLUMN recorded_at timestamptz NOT NULL DEFAULT now();
  END IF;
END $$;

-- Alter patient_id column type
ALTER TABLE public.health_data
ALTER COLUMN patient_id TYPE text;

-- Enable RLS
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Users can read health data for their patients"
  ON public.health_data
  FOR SELECT
  TO authenticated
  USING (
    auth.uid()::text = patient_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.patient_id
      AND patient_access.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert health data for their patients"
  ON public.health_data
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid()::text = patient_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.patient_id
      AND patient_access.user_id = auth.uid()
      AND patient_access.access_level = 'write'
    )
  );

CREATE POLICY "Users can update health data for their patients"
  ON public.health_data
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid()::text = patient_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.patient_id
      AND patient_access.user_id = auth.uid()
      AND patient_access.access_level = 'write'
    )
  )
  WITH CHECK (
    auth.uid()::text = patient_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.patient_id
      AND patient_access.user_id = auth.uid()
      AND patient_access.access_level = 'write'
    )
  );

CREATE POLICY "Users can delete health data for their patients"
  ON public.health_data
  FOR DELETE
  TO authenticated
  USING (
    auth.uid()::text = patient_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.patient_id
      AND patient_access.user_id = auth.uid()
      AND patient_access.access_level = 'write'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS health_data_patient_recorded_at_idx ON public.health_data(patient_id, recorded_at DESC);