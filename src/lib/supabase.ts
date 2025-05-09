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

// Validate URL format
try {
  if (supabaseUrl) {
    new URL(supabaseUrl);
  }
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

// Extract project ID from Supabase URL for session key
const projectId = supabaseUrl.split('//')[1].split('.')[0];
const storageKey = `sb-${projectId}-auth-token`;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

// Exponential backoff retry function
async function fetchWithRetry(url: string, options: RequestInit = {}, retryCount = 0): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retryCount < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`Retrying fetch (${retryCount + 1}/${MAX_RETRIES}) after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retryCount + 1);
    }
    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      console.log(`Retrying fetch after network error (${retryCount + 1}/${MAX_RETRIES}) after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
}

// Create the Supabase client with enhanced session handling and retry logic
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
  fetch: async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      // Always use HTTPS for production, HTTP for localhost
      const finalUrl = typeof window !== 'undefined' && window.location.protocol === 'https:'
        ? url.toString().replace(/^http:/, 'https:')
        : url.toString();
      
      const response = await fetchWithRetry(finalUrl, {
        ...options,
        signal: controller.signal,
        headers: {
          ...options.headers,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
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