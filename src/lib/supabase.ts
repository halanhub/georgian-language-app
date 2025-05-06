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
  console.warn(
    'Warning: The Supabase URL does not contain supabase.co or supabase.in. Make sure you are using the correct URL.'
  );
}

// Validate anon key format (should be a long string)
if (supabaseAnonKey.length < 20) {
  throw new Error(
    'Invalid Supabase anon key format. Please check your VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create the Supabase client with proper error handling
let supabaseClient;

try {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: {
        getItem: (key) => {
          try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch (error) {
            console.error('Error writing to localStorage:', error);
          }
        },
        removeItem: (key) => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
          }
        }
      }
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web'
      }
    }
  });
  
  // Test the connection and session management
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in, session established');
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out, session cleared');
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('Session token refreshed');
    }
  });
  
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  throw new Error('Failed to initialize Supabase client. Please check your credentials and try again.');
}

export const supabase = supabaseClient;