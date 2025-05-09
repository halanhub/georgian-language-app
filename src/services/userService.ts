import { supabase } from '../lib/supabase';
import { UserProfile } from '../contexts/AuthContext';

// Get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  
  return data;
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
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
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Track lesson progress
export const trackLessonProgress = async (
  userId: string, 
  lessonId: string, 
  completed: boolean, 
  score?: number,
  timeSpent?: number
) => {
  // Check if progress record exists
  const { data: existingProgress, error: fetchError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .maybeSingle();
  
  if (fetchError) throw fetchError;
  
  const now = new Date().toISOString();
  
  if (existingProgress) {
    // Update existing progress
    const { data, error } = await supabase
      .from('user_progress')
      .update({
        completed,
        score: score !== undefined ? score : existingProgress.score,
        time_spent: timeSpent ? existingProgress.time_spent + timeSpent : existingProgress.time_spent,
        updated_at: now
      })
      .eq('id', existingProgress.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    // Create new progress record
    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        score,
        time_spent: timeSpent || 0,
        created_at: now,
        updated_at: now
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Get user lesson progress
export const getUserLessonProgress = async (userId: string, lessonId?: string) => {
  let query = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (lessonId) {
    query = query.eq('lesson_id', lessonId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data;
};

// Track achievement
export const trackAchievement = async (userId: string, achievementId: string) => {
  // Check if achievement already exists
  const { data: existingAchievement, error: fetchError } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .eq('achievement_id', achievementId)
    .maybeSingle();
  
  if (fetchError) throw fetchError;
  
  // If achievement already exists, return it
  if (existingAchievement) {
    return existingAchievement;
  }
  
  // Otherwise, create new achievement
  const { data, error } = await supabase
    .from('user_achievements')
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      earned_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Get user achievements
export const getUserAchievements = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  
  return data;
};

// Update user streak
export const updateUserStreak = async (userId: string, streak: number) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      study_streak: streak,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Increment lessons completed
export const incrementLessonsCompleted = async (userId: string) => {
  // Get current count
  const { data: profile, error: fetchError } = await supabase
    .from('user_profiles')
    .select('lessons_completed')
    .eq('id', userId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Increment count
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      lessons_completed: (profile.lessons_completed || 0) + 1,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Add study time
export const addStudyTime = async (userId: string, minutes: number) => {
  // Get current time
  const { data: profile, error: fetchError } = await supabase
    .from('user_profiles')
    .select('total_study_time')
    .eq('id', userId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Add time
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      total_study_time: (profile.total_study_time || 0) + minutes,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};

// Increment words learned
export const incrementWordsLearned = async (userId: string, count: number = 1) => {
  // Get current count
  const { data: profile, error: fetchError } = await supabase
    .from('user_profiles')
    .select('words_learned')
    .eq('id', userId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Increment count
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      words_learned: (profile.words_learned || 0) + count,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  
  return data;
};