import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { UserProfile } from '../contexts/AuthContext';

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProfile({
            id: data.id,
            email: user.email,
            displayName: data.display_name,
            avatarUrl: data.avatar_url,
            level: data.level,
            lessonsCompleted: data.lessons_completed,
            totalStudyTime: data.total_study_time,
            wordsLearned: data.words_learned,
            studyStreak: data.study_streak,
            isAdmin: user.isAdmin
          });
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);
      
      // Convert camelCase to snake_case for database
      const dbUpdates: Record<string, any> = {};
      
      if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
      if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;
      if (updates.level !== undefined) dbUpdates.level = updates.level;
      if (updates.lessonsCompleted !== undefined) dbUpdates.lessons_completed = updates.lessonsCompleted;
      if (updates.totalStudyTime !== undefined) dbUpdates.total_study_time = updates.totalStudyTime;
      if (updates.wordsLearned !== undefined) dbUpdates.words_learned = updates.wordsLearned;
      if (updates.studyStreak !== undefined) dbUpdates.study_streak = updates.studyStreak;
      
      dbUpdates.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('user_profiles')
        .update(dbUpdates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(prev => prev ? {
          ...prev,
          ...updates
        } : null);
      }
      
      return data;
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update study streak
  const updateStudyStreak = async () => {
    if (!user || !profile) return;
    
    try {
      // Get the last login date from localStorage
      const lastLoginDate = localStorage.getItem(`lastLogin_${user.id}`);
      const today = new Date().toDateString();
      
      if (lastLoginDate !== today) {
        // It's a new day, update the streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        
        if (lastLoginDate === yesterdayString) {
          // Consecutive day, increment streak
          const newStreak = (profile.studyStreak || 0) + 1;
          await updateProfile({ studyStreak: newStreak });
          console.log('Study streak updated:', newStreak);
        } else if (lastLoginDate) {
          // Streak broken, reset to 1
          await updateProfile({ studyStreak: 1 });
          console.log('Study streak reset to 1');
        } else {
          // First login, set streak to 1
          await updateProfile({ studyStreak: 1 });
          console.log('Study streak initialized to 1');
        }
        
        // Update last login date
        localStorage.setItem(`lastLogin_${user.id}`, today);
      }
    } catch (error) {
      console.error('Error updating study streak:', error);
    }
  };

  // Call updateStudyStreak when profile is loaded
  useEffect(() => {
    if (profile && !loading) {
      updateStudyStreak();
    }
  }, [profile, loading]);

  return { profile, loading, error, updateProfile };
}