export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          display_name: string | null
          avatar_url: string | null
          level: string
          lessons_completed: number
          total_study_time: number
          words_learned: number
          study_streak: number
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          display_name?: string | null
          avatar_url?: string | null
          level?: string
          lessons_completed?: number
          total_study_time?: number
          words_learned?: number
          study_streak?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          display_name?: string | null
          avatar_url?: string | null
          level?: string
          lessons_completed?: number
          total_study_time?: number
          words_learned?: number
          study_streak?: number
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          lesson_id: string
          completed: boolean
          score: number | null
          time_spent: number
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          lesson_id: string
          completed?: boolean
          score?: number | null
          time_spent?: number
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          lesson_id?: string
          completed?: boolean
          score?: number | null
          time_spent?: number
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          created_at: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          achievement_id?: string
          earned_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}