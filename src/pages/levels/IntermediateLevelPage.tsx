import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Edit, GraduationCap, MessageCircle, Pencil, Lock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import { useUserProgress } from '../../hooks/useUserProgress';
import SubscriptionBanner from '../../components/SubscriptionBanner';
import { useTranslation } from 'react-i18next';

const IntermediateLevelPage: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const { progress, loading: progressLoading, updateProgress, initializeProgress } = useUserProgress();
  const [overallProgress, setOverallProgress] = useState(0);
  const { t } = useTranslation();

  // Calculate progress based on completed lessons
  useEffect(() => {
    if (user && progress && !progressLoading) {
      // Get intermediate lessons
      const intermediateLessons = progress.filter(p => 
        ['grammar', 'sentences', 'common-words', 'conversations', 'reading', 'writing'].includes(p.lessonId)
      );
      
      // Calculate the percentage of completed lessons
      const completedLessons = intermediateLessons.filter(p => p.completed).length;
      const totalLessons = intermediateLessons.length || 6; // Default to 6 if no lessons found
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
      setOverallProgress(progressPercentage);
      
      console.log('Intermediate progress calculated:', {
        completedLessons,
        totalLessons,
        progressPercentage,
        intermediateLessons
      });
    }
  }, [user, progress, progressLoading]);

  // Track page visit and update study time
  useEffect(() => {
    if (user && !progressLoading) {
      // Record that the user visited this page
      const trackVisit = async () => {
        try {
          // Add 5 minutes of study time to the user's profile
          await updateProgress('intermediate', { timeSpent: 5 });
          console.log('Recorded visit to intermediate level page');
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
      id: 'grammar', 
      name: t('intermediate.topics.grammar.name'), 
      description: t('intermediate.topics.grammar.description'),
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/grammar' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'grammar')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'grammar')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'grammar')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'sentences', 
      name: t('intermediate.topics.sentences.name'), 
      description: t('intermediate.topics.sentences.description'),
      icon: <Edit size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/sentences' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'sentences')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'sentences')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'sentences')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'common-words', 
      name: t('intermediate.topics.common_words.name'), 
      description: t('intermediate.topics.common_words.description'),
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/common-words' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'common-words')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'common-words')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'common-words')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'conversations', 
      name: t('intermediate.topics.conversations.name'), 
      description: t('intermediate.topics.conversations.description'),
      icon: <MessageCircle size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/conversations' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'conversations')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'conversations')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'conversations')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'reading', 
      name: t('intermediate.topics.reading.name'), 
      description: t('intermediate.topics.reading.description'),
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/reading' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'reading')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'reading')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'reading')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'writing', 
      name: t('intermediate.topics.writing.name'), 
      description: t('intermediate.topics.writing.description'),
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: hasActiveSubscription || isAdmin ? '/intermediate/writing' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'writing')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'writing')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'writing')?.timeSpent || 0) * 2), 95) : 0
    },
  ];

  // If still loading, show a loading indicator
  if (progressLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16">
      {!hasActiveSubscription && !isAdmin && <SubscriptionBanner type="full" />}
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>{t('intermediate.title')}</span> - საშუალო
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('intermediate.subtitle')}
              </p>
              <div className="flex flex-wrap gap-2">
                {hasActiveSubscription || isAdmin ? (
                  <Link
                    to="/intermediate/grammar"
                    className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                      theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    onClick={() => updateProgress('grammar', { timeSpent: 1 })}
                  >
                    {t('intermediate.start_grammar')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                      theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {t('beginner.levels.upgrade_to_access')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                <Link
                  to="/contact"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t('intermediate.need_help')}
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`h-2 w-full rounded-full mb-4 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t('intermediate.progress')}: {overallProgress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {hasActiveSubscription || isAdmin
                    ? t('beginner.complete') 
                    : t('intermediate.subscribe')}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {t('intermediate.lessons_completed')}
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {progress?.filter(p => p.completed && ['grammar', 'sentences', 'common-words', 'conversations', 'reading', 'writing'].includes(p.lessonId)).length || 0}/{topics.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('intermediate.topics.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-md transition-all ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } ${topic.premium && !hasActiveSubscription && !isAdmin ? 'relative' : ''}`}
              >
                {topic.premium && !hasActiveSubscription && !isAdmin && (
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
                        theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {topic.progress}% Complete
                  </p>
                </div>
                <Link
                  to={topic.path}
                  className={`flex items-center text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                  onClick={() => hasActiveSubscription && updateProgress(topic.id, { timeSpent: 1 })}
                >
                  {topic.premium && !hasActiveSubscription && !isAdmin ? t('beginner.levels.upgrade_to_access') : (topic.progress > 0 ? 'Continue to Learning' : t('beginner.levels.start_learning'))}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link
              to="/beginner"
              className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Return to Beginner Level
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('intermediate.tips.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('intermediate.tips.regular_practice.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('intermediate.tips.regular_practice.description')}
              </p>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('intermediate.tips.immerse_yourself.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('intermediate.tips.immerse_yourself.description')}
              </p>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('intermediate.tips.practice_speaking.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('intermediate.tips.practice_speaking.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntermediateLevelPage;