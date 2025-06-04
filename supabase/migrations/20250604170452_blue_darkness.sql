/*
  # Add user_id column to health_data table

  1. Changes
    - Add user_id column to health_data table
    - Add foreign key constraint to link with auth.users
    - Enable RLS and add policies for data access

  2. Security
    - Enable RLS on health_data table
    - Add policy for users to read their own health data
    - Add policy for users to write their own health data
*/

-- First check if the table exists, if not create it
CREATE TABLE IF NOT EXISTS health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date text NOT NULL,
  steps integer NOT NULL,
  heart_rate integer[] NOT NULL,
  sleep_hours numeric NOT NULL,
  active_minutes integer NOT NULL,
  distance numeric NOT NULL,
  device_type text NOT NULL,
  synced_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'health_data' 
    AND column_name = 'user_id'
  ) THEN
    ALTER TABLE health_data ADD COLUMN user_id uuid NOT NULL;
    ALTER TABLE health_data ADD CONSTRAINT health_data_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'health_data' AND policyname = 'Users can read own health data'
  ) THEN
    CREATE POLICY "Users can read own health data" 
      ON health_data 
      FOR SELECT 
      TO authenticated 
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'health_data' AND policyname = 'Users can insert own health data'
  ) THEN
    CREATE POLICY "Users can insert own health data" 
      ON health_data 
      FOR INSERT 
      TO authenticated 
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'health_data' AND policyname = 'Users can update own health data'
  ) THEN
    CREATE POLICY "Users can update own health data" 
      ON health_data 
      FOR UPDATE 
      TO authenticated 
      USING (auth.uid() = user_id);
  END IF;
END $$;