/*
  # Add INSERT policy for profiles table

  1. Security Changes
    - Add INSERT policy to allow users to create their own profile
    - Policy ensures users can only create a profile with their own user ID
*/

CREATE POLICY "Users can create their own profile"
ON profiles
FOR INSERT
TO public
WITH CHECK (auth.uid() = id);