import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Achievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: string;
  createdAt: string;
}

export function useUserAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    const fetchAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedAchievements: Achievement[] = data.map(item => ({
            id: item.id,
            userId: item.user_id,
            achievementId: item.achievement_id,
            earnedAt: item.earned_at,
            createdAt: item.created_at
          }));
          
          setAchievements(formattedAchievements);
        }
      } catch (err) {
        console.error('Error fetching user achievements:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  const addAchievement = async (achievementId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);
      
      // Check if achievement already exists
      const existingAchievement = achievements.find(a => a.achievementId === achievementId);
      
      if (existingAchievement) {
        return existingAchievement;
      }
      
      // Create new achievement
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
          earned_at: now,
          created_at: now
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const newAchievement: Achievement = {
          id: data.id,
          userId: data.user_id,
          achievementId: data.achievement_id,
          earnedAt: data.earned_at,
          createdAt: data.created_at
        };
        
        // Update local state
        setAchievements(prev => [...prev, newAchievement]);
        
        return newAchievement;
      }
    } catch (err) {
      console.error('Error adding achievement:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasAchievement = (achievementId: string): boolean => {
    return achievements.some(a => a.achievementId === achievementId);
  };

  return { 
    achievements, 
    loading, 
    error, 
    addAchievement,
    hasAchievement
  };
}