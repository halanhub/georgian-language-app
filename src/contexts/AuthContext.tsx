import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Define user type
export type UserProfile = {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  level?: string;
  lessonsCompleted?: number;
  totalStudyTime?: number;
  wordsLearned?: number;
  studyStreak?: number;
  isAdmin?: boolean;
};

// Define auth context type
type AuthContextType = {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  isAdmin: boolean;
};

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// List of admin emails
const ADMIN_EMAILS = ['admin@georgianlanguage.online'];

// Retry configuration
const RETRY_ATTEMPTS = 2;
const INITIAL_TIMEOUT = 10000; // 10 seconds
const MAX_TIMEOUT = 30000; // 30 seconds

// Helper function for exponential backoff
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        // Get session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setLoading(false);
          return;
        }
        
        console.log('Session fetched:', session ? 'Session exists' : 'No session');
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in session check:', error);
        setLoading(false);
      }
    };

    fetchSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession ? 'Session exists' : 'No session');
        setSession(newSession);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          await fetchUserProfile(newSession.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        } else if (event === 'USER_UPDATED') {
          if (newSession?.user) {
            await fetchUserProfile(newSession.user);
          }
        } else {
          setLoading(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = async (authUser: User) => {
    try {
      console.log('Fetching user profile for:', authUser.id);
      // First, check if user profile exists
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for "no rows returned"
        console.error('Error fetching user profile:', error);
        throw error;
      }

      // Check if user is an admin
      const userIsAdmin = ADMIN_EMAILS.includes(authUser.email || '');
      setIsAdmin(userIsAdmin);
      console.log('User admin status:', userIsAdmin);

      if (profile) {
        // Profile exists, use it
        console.log('User profile found:', profile);
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          displayName: profile.display_name,
          avatarUrl: profile.avatar_url,
          level: profile.level,
          lessonsCompleted: profile.lessons_completed,
          totalStudyTime: profile.total_study_time,
          wordsLearned: profile.words_learned,
          studyStreak: profile.study_streak,
          isAdmin: userIsAdmin
        });
        setLoading(false);
      } else {
        // Profile doesn't exist, create it
        console.log('Creating new user profile for:', authUser.id);
        const newProfile = {
          id: authUser.id,
          display_name: authUser.email?.split('@')[0] || 'User',
          level: 'Beginner',
          lessons_completed: 0,
          total_study_time: 0,
          words_learned: 0,
          study_streak: 0
        };

        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([newProfile]);

        if (insertError) {
          console.error('Error creating user profile:', insertError);
          throw insertError;
        }

        // Reset all progress for new users
        await resetUserProgress(authUser.id);

        setUser({
          id: authUser.id,
          email: authUser.email || '',
          displayName: newProfile.display_name,
          level: newProfile.level,
          lessonsCompleted: newProfile.lessons_completed,
          totalStudyTime: newProfile.total_study_time,
          wordsLearned: newProfile.words_learned,
          studyStreak: newProfile.study_streak,
          isAdmin: userIsAdmin
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      // Set basic user info even if profile fetch fails
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        displayName: authUser.email?.split('@')[0] || 'User',
        isAdmin: ADMIN_EMAILS.includes(authUser.email || '')
      });
      setLoading(false);
    }
  };

  // Reset user progress for new users
  const resetUserProgress = async (userId: string) => {
    try {
      // Check if user has any progress records
      const { data: existingProgress, error: checkError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      
      if (checkError) {
        console.error('Error checking user progress:', checkError);
        return;
      }
      
      // If user already has progress records, don't reset
      if (existingProgress && existingProgress.length > 0) {
        console.log('User already has progress records, not resetting');
        return;
      }
      
      // Create initial progress records with 0% completion
      const initialProgress = [
        { user_id: userId, lesson_id: 'alphabet', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'basic-vocabulary', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'colors-shapes', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'numbers', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'months', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'food', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'body', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'animals', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'activities', completed: false, time_spent: 0 },
        // Intermediate lessons
        { user_id: userId, lesson_id: 'grammar', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'sentences', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'common-words', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'conversations', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'reading', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'writing', completed: false, time_spent: 0 },
        // Advanced lessons
        { user_id: userId, lesson_id: 'advanced-grammar', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced-culture', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced-literature', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced-idioms', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced-writing', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced-listening', completed: false, time_spent: 0 },
        // Level tracking
        { user_id: userId, lesson_id: 'beginner', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'intermediate', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'advanced', completed: false, time_spent: 0 }
      ];
      
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert(initialProgress);
      
      if (insertError) {
        console.error('Error initializing user progress:', insertError);
      } else {
        console.log('Successfully initialized progress for new user');
      }
    } catch (error) {
      console.error('Error in resetUserProgress:', error);
    }
  };

  // Login function with retry mechanism
  const login = async (email: string, password: string) => {
    let lastError: Error | null = null;
    let currentTimeout = INITIAL_TIMEOUT;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        setLoading(true);
        console.log(`Login attempt ${attempt} of ${RETRY_ATTEMPTS}`);

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }

        console.log('Login successful');
        return;
      } catch (error: any) {
        lastError = error;
        console.warn(`Login attempt ${attempt} failed:`, error.message);

        // Don't retry for certain errors
        if (error.message?.includes('Invalid login credentials') ||
            error.message?.includes('Email not confirmed')) {
          throw error;
        }

        // If this wasn't the last attempt, wait before retrying
        if (attempt < RETRY_ATTEMPTS) {
          const backoffTime = Math.min(currentTimeout * 2, MAX_TIMEOUT);
          console.log(`Waiting ${backoffTime / 1000} seconds before next attempt...`);
          await wait(backoffTime);
          currentTimeout = backoffTime;
        }
      } finally {
        if (attempt === RETRY_ATTEMPTS || lastError?.message?.includes('Invalid login credentials') || lastError?.message?.includes('Email not confirmed')) {
          setLoading(false);
        }
      }
    }

    // If we've exhausted all retries, throw the last error
    setLoading(false);
    throw new Error(
      `Network connection error. Please check your internet connection and try again.`
    );
  };

  // Signup function
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName
          },
          emailRedirectTo: `${window.location.origin}/confirmation`,
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        throw error;
      }
      
      console.log('Signup successful, confirmation email sent');
      // Store email in localStorage for the confirmation page
      localStorage.setItem('signupEmail', email);
      
      // Redirect to confirmation page after signup
      navigate('/confirmation');
    } catch (err: any) {
      console.error('Signup error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      
      // Convert camelCase to snake_case for database
      const dbData: Record<string, any> = {};
      
      if (data.displayName !== undefined) dbData.display_name = data.displayName;
      if (data.avatarUrl !== undefined) dbData.avatar_url = data.avatarUrl;
      if (data.level !== undefined) dbData.level = data.level;
      if (data.lessonsCompleted !== undefined) dbData.lessons_completed = data.lessonsCompleted;
      if (data.totalStudyTime !== undefined) dbData.total_study_time = data.totalStudyTime;
      if (data.wordsLearned !== undefined) dbData.words_learned = data.wordsLearned;
      if (data.studyStreak !== undefined) dbData.study_streak = data.studyStreak;
      
      // Update the database
      const { error } = await supabase
        .from('user_profiles')
        .update(dbData)
        .eq('id', user.id);
      
      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }
      
      // Update local state
      setUser({ ...user, ...data });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Upload avatar image
  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `avatars/${user.id}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error('Avatar upload error:', uploadError);
        throw uploadError;
      }
      
      // Get public URL for the uploaded file
      const { data } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);
      
      const avatarUrl = data.publicUrl;
      
      // Update user profile with new avatar URL
      await updateProfile({ avatarUrl });
      
      console.log('Avatar uploaded successfully:', avatarUrl);
      return avatarUrl;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    uploadAvatar,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};