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

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Get session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          return;
        }
        
        console.log('Session fetched:', session ? 'Session exists' : 'No session');
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error in session check:', error);
      } finally {
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
        } else if (event === 'USER_UPDATED') {
          if (newSession?.user) {
            await fetchUserProfile(newSession.user);
          }
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
          studyStreak: profile.study_streak
        });
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
          studyStreak: newProfile.study_streak
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      // Set basic user info even if profile fetch fails
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        displayName: authUser.email?.split('@')[0] || 'User'
      });
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
        { user_id: userId, lesson_id: 'activities', completed: false, time_spent: 0 }
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

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      console.log('Login successful');
      // User profile will be fetched by the auth state change listener
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
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
      // Redirect to confirmation page after signup
      navigate('/confirmation');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
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
    uploadAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};