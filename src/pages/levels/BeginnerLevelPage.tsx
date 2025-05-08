import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlignJustify, ArrowRight, Book, Calendar, Palette, Brain, Utensils, Dices, Heart, Cat, Clock, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useSubscription } from '../../hooks/useSubscription';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

const BeginnerLevelPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { theme } = useTheme();
  const { progress, loading: progressLoading, updateProgress, initializeProgress } = useUserProgress();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const [overallProgress, setOverallProgress] = useState(0);
  const { t } = useTranslation();

  // Calculate progress based on completed lessons
  useEffect(() => {
    if (user && progress && !progressLoading) {
      // Get beginner lessons
      const beginnerLessons = progress.filter(p => 
        ['alphabet', 'basic-vocabulary', 'colors-shapes', 'numbers', 'months', 'food', 'body', 'animals', 'activities'].includes(p.lessonId)
      );
      
      // Calculate the percentage of completed lessons
      const completedLessons = beginnerLessons.filter(p => p.completed).length;
      const totalLessons = beginnerLessons.length || 9; // Default to 9 if no lessons found
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
      setOverallProgress(progressPercentage);
      
      console.log('Beginner progress calculated:', {
        completedLessons,
        totalLessons,
        progressPercentage,
        beginnerLessons
      });
    }
  }, [user, progress, progressLoading]);

  // Track page visit and update study time
  useEffect(() => {
    if (user && !progressLoading) {
      // Record that the user visited this page
      const trackVisit = async () => {
        try {
          // Add 1 minute of study time to the user's profile
          await updateProgress('beginner', { timeSpent: 1 });
          console.log('Recorded visit to beginner level page');
        } catch (error) {
          console.error('Error tracking page visit:', error);
        }
      };
      
      trackVisit();
    }
  }, [user, progressLoading, updateProgress]);

  // Initialize progress records if they don't exist
  useEffect(() => {
    if (user && !progressLoading && (!progress || progress.length === 0)) {
      console.log('No progress records found, initializing...');
      initializeProgress(user.id);
    }
  }, [user, progress, progressLoading, initializeProgress]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    { 
      id: 'alphabet', 
      name: t('beginner.topics.alphabet.name'), 
      description: t('beginner.topics.alphabet.description'),
      icon: <AlignJustify size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/beginner/alphabet',
      premium: false,
      progress: progress?.find(p => p.lessonId === 'alphabet')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'alphabet')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'alphabet')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'basic-vocabulary', 
      name: t('beginner.topics.vocabulary.name'), 
      description: t('beginner.topics.vocabulary.description'),
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/beginner/basic-vocabulary',
      premium: false,
      progress: progress?.find(p => p.lessonId === 'basic-vocabulary')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'basic-vocabulary')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'basic-vocabulary')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'colors-shapes', 
      name: t('beginner.topics.colors.name'), 
      description: t('beginner.topics.colors.description'),
      icon: <Palette size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/beginner/colors-and-shapes',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'colors-shapes')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'colors-shapes')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'colors-shapes')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'numbers', 
      name: t('beginner.topics.numbers.name'), 
      description: t('beginner.topics.numbers.description'),
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/beginner/numbers',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'numbers')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'numbers')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'numbers')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'months', 
      name: t('beginner.topics.months.name'), 
      description: t('beginner.topics.months.description'),
      icon: <Calendar size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/beginner/months-and-seasons',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'months')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'months')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'months')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'food', 
      name: t('beginner.topics.food.name'), 
      description: t('beginner.topics.food.description'),
      icon: <Utensils size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/beginner/food-and-drinks',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'food')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'food')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'food')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'body', 
      name: t('beginner.topics.body.name'), 
      description: t('beginner.topics.body.description'),
      icon: <Heart size={24} />,
      color: theme === 'dark' ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800',
      path: '/beginner/human-body',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'body')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'body')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'body')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'animals', 
      name: t('beginner.topics.animals.name'), 
      description: t('beginner.topics.animals.description'),
      icon: <Cat size={24} />,
      color: theme === 'dark' ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
      path: '/beginner/animals',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'animals')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'animals')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'animals')?.timeSpent || 0) * 5), 95) : 0
    },
    { 
      id: 'activities', 
      name: t('beginner.topics.activities.name'), 
      description: t('beginner.topics.activities.description'),
      icon: <Clock size={24} />,
      color: theme === 'dark' ? 'bg-cyan-900 text-cyan-200' : 'bg-cyan-100 text-cyan-800',
      path: '/beginner/daily-activities',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'activities')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'activities')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'activities')?.timeSpent || 0) * 5), 95) : 0
    }
  ];

  // Update paths for premium topics if user has subscription or is admin
  const topicsWithCorrectPaths = topics.map(topic => {
    if (topic.premium && (hasActiveSubscription || isAdmin)) {
      return {
        ...topic,
        path: topic.path, // Keep the original path
      };
    } else if (topic.premium) {
      return {
        ...topic,
        path: '/pricing', // Redirect to pricing for premium content
      };
    }
    return topic;
  });

  const quizzes = [
    { id: 'alphabet', name: 'Alphabet Quiz', path: '/beginner/quiz/alphabet', premium: false },
    { id: 'vocabulary', name: 'Basic Vocabulary Quiz', path: '/beginner/quiz/vocabulary', premium: false },
    { id: 'colors', name: 'Colors & Shapes Quiz', path: '/beginner/quiz/colors', premium: true },
    { id: 'numbers', name: 'Numbers Quiz', path: '/beginner/quiz/numbers', premium: true },
  ];

  // Update paths for premium quizzes if user has subscription or is admin
  const quizzesWithCorrectPaths = quizzes.map(quiz => {
    if (quiz.premium && !(hasActiveSubscription || isAdmin)) {
      return {
        ...quiz,
        path: '/pricing',
      };
    }
    return quiz;
  });

  // If still loading, show a loading indicator
  if (progressLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>{t('beginner.title')}</span> - დამწყები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('beginner.subtitle')}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/beginner/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {t('beginner.start_alphabet')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/beginner/quiz/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t('beginner.take_quiz')}
                  <Dices className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`h-2 w-full rounded-full mb-4 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      theme === 'dark' ? 'bg-green-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t('beginner.progress')}: {overallProgress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('beginner.complete')}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {t('beginner.lessons_completed')}
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      {progress?.filter(p => p.completed && ['alphabet', 'basic-vocabulary', 'colors-shapes', 'numbers', 'months', 'food', 'body', 'animals', 'activities'].includes(p.lessonId)).length || 0}/{topics.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('beginner.topics.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsWithCorrectPaths.map((topic) => (
              <Link
                key={topic.id}
                to={topic.path}
                className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } ${topic.premium && !(hasActiveSubscription || isAdmin) ? 'relative' : ''}`}
              >
                {topic.premium && !(hasActiveSubscription || isAdmin) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center p-4">
                      <Lock className="mx-auto h-8 w-8 text-white mb-2" />
                      <p className="text-white font-medium">Premium Content</p>
                      <p className="text-white text-sm mt-1">Upgrade to access</p>
                    </div>
                  </div>
                )}
                <div className={`p-3 rounded-full inline-block mb-4 ${topic.color}`}>
                  {topic.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {topic.name}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {topic.description}
                </p>
                <div className="mb-3">
                  <div className={`w-full h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-1.5 rounded-full ${
                        theme === 'dark' ? 'bg-red-500' : 'bg-red-600'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {topic.progress}% Complete
                  </p>
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                }`}>
                  {topic.premium && !(hasActiveSubscription || isAdmin) ? 'Upgrade to Access' : (topic.progress > 0 ? 'Continue Learning' : 'Start Learning')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('beginner.quizzes.title')}
            </h2>
            <p className={`mt-2 md:mt-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('beginner.quizzes.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizzesWithCorrectPaths.map((quiz) => (
              <Link
                key={quiz.id}
                to={quiz.path}
                className={`p-5 rounded-lg shadow-md transition-all hover:shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-650 border border-gray-600' 
                    : 'bg-white hover:bg-red-50 border border-gray-100'
                } ${quiz.premium && !(hasActiveSubscription || isAdmin) ? 'relative' : ''}`}
              >
                {quiz.premium && !(hasActiveSubscription || isAdmin) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center p-2">
                      <Lock className="mx-auto h-6 w-6 text-white mb-1" />
                      <p className="text-white text-xs">Premium</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {quiz.name}
                  </span>
                  <Dices className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeginnerLevelPage;