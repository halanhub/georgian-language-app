import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number | null;
  timeSpent: number;
  createdAt: string;
  updatedAt: string;
}

export function useUserProgress(lessonId?: string) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let query = supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);
        
        if (lessonId) {
          query = query.eq('lesson_id', lessonId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedProgress: LessonProgress[] = data.map(item => ({
            id: item.id,
            userId: item.user_id,
            lessonId: item.lesson_id,
            completed: item.completed,
            score: item.score,
            timeSpent: item.time_spent,
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }));
          
          setProgress(formattedProgress);
          console.log('Fetched user progress:', formattedProgress);
        }
      } catch (err) {
        console.error('Error fetching user progress:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, lessonId]);

  const updateProgress = async (
    lessonId: string, 
    updates: { 
      completed?: boolean; 
      score?: number; 
      timeSpent?: number;
    }
  ) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);
      
      // Check if progress record exists
      const existingProgress = progress.find(p => p.lessonId === lessonId);
      
      if (existingProgress) {
        // Update existing progress
        console.log('Updating existing progress for lesson:', lessonId, updates);
        const { data, error } = await supabase
          .from('user_progress')
          .update({
            completed: updates.completed !== undefined ? updates.completed : existingProgress.completed,
            score: updates.score !== undefined ? updates.score : existingProgress.score,
            time_spent: updates.timeSpent 
              ? existingProgress.timeSpent + updates.timeSpent 
              : existingProgress.timeSpent,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id)
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Update local state
          setProgress(prev => prev.map(p => 
            p.id === data.id 
              ? {
                  id: data.id,
                  userId: data.user_id,
                  lessonId: data.lesson_id,
                  completed: data.completed,
                  score: data.score,
                  timeSpent: data.time_spent,
                  createdAt: data.created_at,
                  updatedAt: data.updated_at
                }
              : p
          ));
          
          // If lesson was completed, update user profile
          if (updates.completed && !existingProgress.completed) {
            await updateUserProfile(user.id);
          }
        }
        
        return data;
      } else {
        // Create new progress record
        console.log('Creating new progress for lesson:', lessonId, updates);
        const now = new Date().toISOString();
        
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            completed: updates.completed || false,
            score: updates.score || null,
            time_spent: updates.timeSpent || 0,
            created_at: now,
            updated_at: now
          })
          .select()
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Update local state
          setProgress(prev => [...prev, {
            id: data.id,
            userId: data.user_id,
            lessonId: data.lesson_id,
            completed: data.completed,
            score: data.score,
            timeSpent: data.time_spent,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          }]);
          
          // If lesson was completed, update user profile
          if (updates.completed) {
            await updateUserProfile(user.id);
          }
        }
        
        return data;
      }
    } catch (err) {
      console.error('Error updating user progress:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile with progress statistics
  const updateUserProfile = async (userId: string) => {
    try {
      // Get all completed lessons
      const { data: completedLessons, error: countError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('completed', true);
      
      if (countError) {
        throw countError;
      }
      
      // Calculate total study time
      const { data: timeData, error: timeError } = await supabase
        .from('user_progress')
        .select('time_spent')
        .eq('user_id', userId);
      
      if (timeError) {
        throw timeError;
      }
      
      const totalStudyTime = timeData.reduce((sum, item) => sum + (item.time_spent || 0), 0);
      
      // Update user profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          lessons_completed: completedLessons?.length || 0,
          total_study_time: Math.floor(totalStudyTime / 60), // Convert minutes to hours
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (updateError) {
        throw updateError;
      }
      
      console.log('Updated user profile with progress statistics');
    } catch (error) {
      console.error('Error updating user profile with progress:', error);
    }
  };

  // Reset all progress for a user
  const resetAllProgress = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);
      
      // Delete all progress records for the user
      const { error: deleteError } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id);
      
      if (deleteError) {
        throw deleteError;
      }
      
      // Reset local state
      setProgress([]);
      
      // Reset user profile stats
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          lessons_completed: 0,
          total_study_time: 0,
          words_learned: 0,
          study_streak: 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Reinitialize progress records
      await initializeProgress(user.id);
      
      return true;
    } catch (err) {
      console.error('Error resetting user progress:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initialize progress records for a user
  const initializeProgress = async (userId: string) => {
    try {
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
        { user_id: userId, lesson_id: 'conversations', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'common-words', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'reading', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'writing', completed: false, time_spent: 0 },
        { user_id: userId, lesson_id: 'sentences', completed: false, time_spent: 0 },
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
      
      const { error } = await supabase
        .from('user_progress')
        .insert(initialProgress);
      
      if (error) {
        throw error;
      }
      
      console.log('Successfully initialized progress records');
      
      // Fetch the newly created records
      const { data: newProgress, error: fetchError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
        
      if (fetchError) {
        throw fetchError;
      }
      
      // Update local state with the new records
      if (newProgress) {
        const formattedProgress: LessonProgress[] = newProgress.map(item => ({
          id: item.id,
          userId: item.user_id,
          lessonId: item.lesson_id,
          completed: item.completed,
          score: item.score,
          timeSpent: item.time_spent,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));
        
        setProgress(formattedProgress);
      }
    } catch (error) {
      console.error('Error initializing progress records:', error);
      throw error;
    }
  };

  return { 
    progress, 
    loading, 
    error, 
    updateProgress, 
    resetAllProgress,
    initializeProgress
  };
}