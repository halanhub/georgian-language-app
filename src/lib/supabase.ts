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

// Create the Supabase client
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage, // ✅ Use native localStorage
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

// Auth state logging
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in, session established');
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out, session cleared');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Session token refreshed');
  }
});

export const supabase = supabaseClient;
