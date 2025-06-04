/*
  # Add health data table and related security policies

  1. New Tables
    - `health_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `date` (date)
      - `steps` (integer)
      - `heart_rate` (integer array)
      - `sleep_hours` (numeric)
      - `active_minutes` (integer)
      - `distance` (numeric)
      - `device_type` (text)
      - `synced_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on health_data table
    - Add policies for authenticated users to:
      - Read their own health data
      - Insert/update their own health data
*/

CREATE TABLE IF NOT EXISTS health_data (
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
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;

-- Policy for reading own health data
CREATE POLICY "Users can read own health data"
  ON health_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for inserting own health data
CREATE POLICY "Users can insert own health data"
  ON health_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own health data
CREATE POLICY "Users can update own health data"
  ON health_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX health_data_user_date_idx ON health_data(user_id, date);