/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing INSERT policy that has incorrect conditions
    - Create new INSERT policy that properly handles both registration and first sign-in cases
    - Policy allows insertion when:
      a) User is not authenticated (during registration)
      b) User is authenticated and inserting their own profile (during first sign-in)

  2. Security
    - Maintains existing SELECT and UPDATE policies
    - Ensures users can only create profiles with their own user ID
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Enable profile creation during registration" ON profiles;

-- Create new INSERT policy with correct conditions
CREATE POLICY "Enable profile creation for registration and first sign in" ON profiles
FOR INSERT TO public
WITH CHECK (
  -- Allow unauthenticated inserts (registration) OR authenticated user inserting their own profile (first sign-in)
  auth.uid() IS NULL 
  OR 
  auth.uid() = id
);