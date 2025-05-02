import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

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
        }
        
        return data;
      } else {
        // Create new progress record
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

  return { progress, loading, error, updateProgress };
}