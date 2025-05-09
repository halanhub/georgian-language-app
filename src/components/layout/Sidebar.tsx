import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AlignJustify, 
  BookOpen, 
  Brain,
  CreditCard,
  Dices, 
  GraduationCap, 
  Lightbulb, 
  Mail,
  PenTool, 
  Palette, 
  Settings,
  Trophy, 
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useSubscription } from '../../hooks/useSubscription';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useUserProfile } from '../../hooks/useUserProfile';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { theme } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const { progress, loading: progressLoading, updateProgress } = useUserProgress();
  const { profile, loading: profileLoading } = useUserProfile();
  const location = useLocation();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { t } = useTranslation();

  // Calculate progress statistics
  const calculateProgress = () => {
    if (!progress || progressLoading) {
      return {
        lessonsCompleted: 0,
        totalLessons: 45,
        overallProgress: 0,
        beginnerProgress: 0,
        intermediateProgress: 0,
        advancedProgress: 0
      };
    }

    const completedLessons = progress.filter(p => p.completed).length;
    const totalLessons = progress.length;
    
    // Calculate progress for each level
    const beginnerLessons = progress.filter(p => 
      ['alphabet', 'basic-vocabulary', 'colors-shapes', 'numbers', 'months', 'food', 'body', 'animals', 'activities'].includes(p.lessonId)
    );
    const intermediateLessons = progress.filter(p => 
      ['grammar', 'conversations', 'common-words', 'reading', 'writing', 'sentences'].includes(p.lessonId)
    );
    const advancedLessons = progress.filter(p => 
      p.lessonId.startsWith('advanced-')
    );
    
    const beginnerCompleted = beginnerLessons.filter(p => p.completed).length;
    const intermediateCompleted = intermediateLessons.filter(p => p.completed).length;
    const advancedCompleted = advancedLessons.filter(p => p.completed).length;
    
    return {
      lessonsCompleted: completedLessons,
      totalLessons,
      overallProgress: Math.round((completedLessons / totalLessons) * 100),
      beginnerProgress: beginnerLessons.length > 0 ? Math.round((beginnerCompleted / beginnerLessons.length) * 100) : 0,
      intermediateProgress: intermediateLessons.length > 0 ? Math.round((intermediateCompleted / intermediateLessons.length) * 100) : 0,
      advancedProgress: advancedLessons.length > 0 ? Math.round((advancedCompleted / advancedLessons.length) * 100) : 0
    };
  };

  const progressData = calculateProgress();

  // Track page visits
  useEffect(() => {
    if (user && !progressLoading) {
      // Record page visit based on current path
      const trackPageVisit = async () => {
        try {
          const path = location.pathname.split('/')[1]; // Get the first part of the path
          
          if (['beginner', 'intermediate', 'advanced'].includes(path)) {
            await updateProgress(path, { timeSpent: 1 });
            console.log(`Tracked visit to ${path} page`);
          }
          
          // Track specific lesson visits
          const lessonPath = location.pathname.split('/')[2];
          if (lessonPath && lessonPath !== 'quiz') {
            // Map URL paths to lesson IDs
            const lessonIdMap: Record<string, string> = {
              'alphabet': 'alphabet',
              'basic-vocabulary': 'basic-vocabulary',
              'colors-and-shapes': 'colors-shapes',
              'numbers': 'numbers',
              'months-and-seasons': 'months',
              'food-and-drinks': 'food',
              'human-body': 'body',
              'animals': 'animals',
              'daily-activities': 'activities',
              'grammar': 'grammar',
              'conversations': 'conversations',
              'common-words': 'common-words',
              'reading': 'reading',
              'writing': 'writing',
              'sentences': 'sentences'
            };
            
            const lessonId = lessonIdMap[lessonPath];
            if (lessonId) {
              await updateProgress(lessonId, { timeSpent: 1 });
              console.log(`Tracked visit to ${lessonId} lesson`);
            }
          }
        } catch (error) {
          console.error('Error tracking page visit:', error);
        }
      };
      
      trackPageVisit();
    }
  }, [user, location.pathname]);

  if (!user) return null;

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-10 hidden md:block overflow-y-auto
      ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} 
      shadow-lg transition-all duration-300`}
    >
      <div className="p-4">
        <div 
          className={`p-4 mb-4 rounded-lg cursor-pointer transition-all ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-red-50 hover:bg-red-100'
          }`}
          onClick={() => setIsProfileExpanded(!isProfileExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'}`}>
              <User size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.displayName || 'Language Learner'}</p>
              {isAdmin && (
                <span className="text-xs px-2 py-0.5 bg-green-700 text-white rounded">Admin</span>
              )}
            </div>
          </div>

          {isProfileExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('settings.tracking.learning_level')}:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
                  }`}>{profile?.level || 'Beginner'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('achievements.your_progress')}:</span>
                  <span className="text-sm font-medium">{progressData.overallProgress}%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>{t('nav.beginner')}:</span>
                    <span>{progressData.beginnerProgress}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-1 rounded-full ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'}`}
                      style={{ width: `${progressData.beginnerProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span>{t('nav.intermediate')}:</span>
                    <span>{progressData.intermediateProgress}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-1 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                      style={{ width: `${progressData.intermediateProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('settings.tracking.study_streak')}:</span>
                  <span className="text-sm font-medium">{profile?.studyStreak || 0} {t('settings.tracking.days')}</span>
                </div>
                <Link 
                  to="/settings" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                  }`}
                >
                  <Settings size={16} />
                  <span>{t('settings.tabs.profile')}</span>
                </Link>
                <Link 
                  to="/pricing" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                  }`}
                >
                  <CreditCard size={16} />
                  <span>{t('common.subscription')}</span>
                </Link>
                <Link 
                  to="/contact" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                  }`}
                >
                  <Mail size={16} />
                  <span>{t('common.contact')}</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          <div className="mb-2 text-xs uppercase font-semibold opacity-70 px-3">{t('home.levels.title')}</div>
          
          <Link 
            to="/beginner" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/beginner') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <BookOpen size={18} />
            <div className="flex-1">
              <span>{t('nav.beginner')}</span>
              <div className={`w-full h-1 mt-1 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className={`h-1 rounded-full ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'}`}
                  style={{ width: `${progressData.beginnerProgress}%` }}
                ></div>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/intermediate" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/intermediate') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <PenTool size={18} />
            <div className="flex-1">
              <div className="flex items-center">
                <span>{t('nav.intermediate')}</span>
                {!hasActiveSubscription && !isAdmin && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-600 text-gray-200">
                    Premium
                  </span>
                )}
              </div>
              <div className={`w-full h-1 mt-1 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className={`h-1 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                  style={{ width: `${progressData.intermediateProgress}%` }}
                ></div>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/advanced" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/advanced') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <GraduationCap size={18} />
            <div className="flex-1">
              <div className="flex items-center">
                <span>{t('nav.advanced')}</span>
                {!hasActiveSubscription && !isAdmin && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-600 text-gray-200">
                    Premium
                  </span>
                )}
              </div>
              <div className={`w-full h-1 mt-1 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className={`h-1 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`}
                  style={{ width: `${progressData.advancedProgress}%` }}
                ></div>
              </div>
            </div>
          </Link>
          
          <div className="my-2 text-xs uppercase font-semibold opacity-70 px-3 pt-3">{t('nav.quizzes')}</div>
          
          <Link 
            to="/beginner/alphabet" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/alphabet') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <AlignJustify size={18} />
            <span>{t('nav.alphabet')}</span>
          </Link>
          
          <Link 
            to="/vocabulary" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/vocabulary') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Brain size={18} />
            <div className="flex items-center">
              <span>{t('nav.vocabulary')}</span>
              {!hasActiveSubscription && !isAdmin && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-600 text-gray-200">
                  Premium
                </span>
              )}
            </div>
          </Link>
          
          <Link 
            to="/quizzes" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/quizzes') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Dices size={18} />
            <span>{t('nav.quizzes')}</span>
          </Link>
          
          <div className="my-2 text-xs uppercase font-semibold opacity-70 px-3 pt-3">{t('achievements.title')}</div>
          
          <Link 
            to="/achievements" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/achievements') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Trophy size={18} />
            <span>{t('nav.achievements')}</span>
          </Link>
          
          <Link 
            to="/learning-tips" 
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
              isActive('/learning-tips') 
                ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-100 text-red-700') 
                : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50')
            }`}
          >
            <Lightbulb size={18} />
            <span>{t('nav.learning_tips')}</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;