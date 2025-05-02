import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid Supabase URL format. Please check your VITE_SUPABASE_URL in your .env file.'
  );
}

// Validate that the URL is a Supabase URL
if (!supabaseUrl.includes('supabase.co') && !supabaseUrl.includes('supabase.in')) {
  throw new Error(
    'Invalid Supabase URL. The URL should be from supabase.co or supabase.in domain.'
  );
}

// Validate anon key format (should be a long string)
if (supabaseAnonKey.length < 20) {
  throw new Error(
    'Invalid Supabase anon key format. Please check your VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

let supabaseClient;

try {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  throw new Error('Failed to initialize Supabase client. Please check your credentials and try again.');
}

export const supabase = supabaseClient;