-- Create enum for sleep stages
CREATE TYPE sleep_stage AS ENUM ('LIGHT', 'DEEP', 'REM');

-- Health metrics table
CREATE TABLE health_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  heart_rate FLOAT,
  -- Expected JSON structure: {"systolic": integer, "diastolic": integer}
  blood_pressure JSONB,
  blood_oxygen FLOAT,
  temperature FLOAT,
  respiratory_rate FLOAT,
  steps INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sleep data table
CREATE TABLE sleep_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  stage sleep_stage NOT NULL,
  -- Tracks the record creation time for sleep data entries
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_data ENABLE ROW LEVEL SECURITY;
-- Policy allowing users to read their own health metrics
CREATE POLICY "Users can read their own health metrics"
  ON health_metrics FOR SELECT
  USING (auth.uid() = user_id);

-- Policy allowing users to insert their own health metrics
CREATE POLICY "Users can insert their own health metrics"
  ON health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy allowing users to read their own sleep data
CREATE POLICY "Users can read their own sleep data"
  ON sleep_data FOR SELECT
  USING (auth.uid() = user_id);

-- Policy allowing users to insert their own sleep data
-- This policy ensures that users can add their own sleep data records.
CREATE POLICY "Users can insert their own sleep data"
  ON sleep_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

