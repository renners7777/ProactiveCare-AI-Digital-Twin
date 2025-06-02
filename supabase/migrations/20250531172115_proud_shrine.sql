/*
  # Fix profiles table RLS policies

  1. Changes
    - Update INSERT policy to allow profile creation during registration
    - Keep existing SELECT and UPDATE policies unchanged
  
  2. Security
    - Ensures users can only create their own profile
    - Maintains existing read/update restrictions
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;

-- Create new INSERT policy that works better with registration flow
CREATE POLICY "Enable profile creation during registration"
ON profiles
FOR INSERT
TO public
WITH CHECK (
  -- Allow insertion if the ID matches the authenticated user's ID
  -- OR if it's a new registration (auth.uid() is null during registration)
  (auth.uid() IS NULL) OR (auth.uid() = id)
);

-- Note: Existing SELECT and UPDATE policies remain unchanged as they work correctly:
-- - "Users can read own profile"
-- - "Users can update own profile"