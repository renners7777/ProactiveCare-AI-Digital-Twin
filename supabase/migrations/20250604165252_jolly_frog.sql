/*
  # Create health_data table

  1. New Tables
    - health_data
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - date (date)
      - steps (integer)
      - heart_rate (integer array)
      - sleep_hours (numeric)
      - active_minutes (integer)
      - distance (numeric)
      - device_type (text)
      - synced_at (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on health_data table
    - Add policies for authenticated users to:
      - Read their own health data
      - Insert their own health data
      - Update their own health data
    - Create index for performance optimization
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.health_data;

-- Create health_data table
CREATE TABLE public.health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  steps integer NOT NULL DEFAULT 0,
  heart_rate integer[] NOT NULL DEFAULT '{}',
  sleep_hours numeric NOT NULL DEFAULT 0,
  active_minutes integer NOT NULL DEFAULT 0,
  distance numeric NOT NULL DEFAULT 0,
  device_type text NOT NULL,
  synced_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;

-- Policy for reading own health data
CREATE POLICY "Users can read own health data"
  ON public.health_data
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1
      FROM public.patient_access
      WHERE patient_access.patient_id = health_data.user_id::text
      AND patient_access.user_id = auth.uid()
    )
  );

-- Policy for inserting own health data
CREATE POLICY "Users can insert own health data"
  ON public.health_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own health data
CREATE POLICY "Users can update own health data"
  ON public.health_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX health_data_user_date_idx ON public.health_data(user_id, date);