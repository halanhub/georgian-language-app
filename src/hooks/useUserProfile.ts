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
            studyStreak: data.study_streak
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

  return { profile, loading, error, updateProfile };
}