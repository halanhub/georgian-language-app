import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced validation for Supabase credentials
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Validate URL format and protocol
try {
  if (supabaseUrl) {
    const url = new URL(supabaseUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Invalid protocol');
    }
  }
} catch (error) {
  throw new Error(
    'Invalid Supabase URL format. Please check your VITE_SUPABASE_URL in your .env file. ' +
    'The URL should start with http:// or https://'
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

// Extract project ID from Supabase URL for session key
const projectId = supabaseUrl.split('//')[1].split('.')[0];
const storageKey = `sb-${projectId}-auth-token`;

// Create the Supabase client with enhanced session handling
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: {
      getItem: (key) => {
        const value = localStorage.getItem(key);
        console.log(`Retrieved auth storage key: ${key}`, value ? 'Found' : 'Not found');
        return value;
      },
      setItem: (key, value) => {
        console.log(`Setting auth storage key: ${key}`);
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        console.log(`Removing auth storage key: ${key}`);
        localStorage.removeItem(key);
      }
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  },
  fetch: (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const fetchPromise = fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    return fetchPromise.finally(() => {
      clearTimeout(timeoutId);
    });
  }
});

// Enhanced auth state logging
supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log(`Auth state changed: ${event}`, session ? 'Session exists' : 'No session');
  
  if (event === 'SIGNED_IN') {
    console.log('User signed in, session established');
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out, clearing session data');
    // Clear all auth-related storage
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}-legacy`);
    // Clear any other auth-related data
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.auth.refreshToken');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Session token refreshed successfully');
  } else if (event === 'USER_UPDATED') {
    console.log('User data updated');
  }
});

export const supabase = supabaseClient;