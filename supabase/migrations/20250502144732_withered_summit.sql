/*
  # Add subscription fields to user_profiles table

  1. Changes
    - Add subscription_status field to user_profiles table
    - Add subscription_id field to user_profiles table
*/

-- Add subscription fields to user_profiles table
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS subscription_id TEXT;