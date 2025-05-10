import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Edit, GraduationCap, MessageCircle, Pencil, Lock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import { useUserProgress } from '../../hooks/useUserProgress';
import SubscriptionBanner from '../../components/SubscriptionBanner';
import { useTranslation } from 'react-i18next';

const AdvancedLevelPage: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const { progress, loading: progressLoading, updateProgress, initializeProgress } = useUserProgress();
  const [overallProgress, setOverallProgress] = useState(0);
  const { t } = useTranslation();

  // Calculate progress based on completed lessons
  useEffect(() => {
    if (user && progress && !progressLoading) {
      // Get advanced lessons
      const advancedLessons = progress.filter(p => 
        p.lessonId.startsWith('advanced-')
      );
      
      // Calculate the percentage of completed lessons
      const completedLessons = advancedLessons.filter(p => p.completed).length;
      const totalLessons = advancedLessons.length || 6; // Default to 6 if no lessons found
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
      setOverallProgress(progressPercentage);
      
      console.log('Advanced progress calculated:', {
        completedLessons,
        totalLessons,
        progressPercentage,
        advancedLessons
      });
    }
  }, [user, progress, progressLoading]);

  // Track page visit and update study time
  useEffect(() => {
    if (user && !progressLoading) {
      // Record that the user visited this page
      updateProgress('advanced', { timeSpent: 5 })
        .then(() => console.log('Recorded visit to advanced level page'))
        .catch(error => console.error('Error tracking page visit:', error));
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
      id: 'advanced-grammar', 
      name: t('advanced.topics.grammar.name'), 
      description: t('advanced.topics.grammar.description'),
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/grammar' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-grammar')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-grammar')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-grammar')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'advanced-culture', 
      name: t('advanced.topics.culture.name'), 
      description: t('advanced.topics.culture.description'),
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/culture' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-culture')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-culture')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-culture')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'advanced-literature', 
      name: t('advanced.topics.literature.name'), 
      description: t('advanced.topics.literature.description'),
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/literature' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-literature')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-literature')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-literature')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'advanced-idioms', 
      name: t('advanced.topics.idioms.name'), 
      description: t('advanced.topics.idioms.description'),
      icon: <MessageCircle size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/idioms' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-idioms')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-idioms')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-idioms')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'advanced-writing', 
      name: t('advanced.topics.writing.name'), 
      description: t('advanced.topics.writing.description'),
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/writing' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-writing')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-writing')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-writing')?.timeSpent || 0) * 2), 95) : 0
    },
    { 
      id: 'advanced-listening', 
      name: t('advanced.topics.listening.name'), 
      description: t('advanced.topics.listening.description'),
      icon: <Edit size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: hasActiveSubscription || isAdmin ? '/advanced/listening' : '/pricing',
      premium: true,
      progress: progress?.find(p => p.lessonId === 'advanced-listening')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'advanced-listening')?.timeSpent ? 
               Math.min(Math.round((progress?.find(p => p.lessonId === 'advanced-listening')?.timeSpent || 0) * 2), 95) : 0
    },
  ];

  // If still loading, show a loading indicator
  if (progressLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16">
      {!hasActiveSubscription && !isAdmin && <SubscriptionBanner type="full" />}
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>{t('advanced.title')}</span> - მოწინავე
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('advanced.subtitle')}
              </p>
              <div className="flex flex-wrap gap-2">
                {hasActiveSubscription || isAdmin ? (
                  <Link
                    to="/advanced/grammar"
                    className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                      theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    Start with Complex Grammar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                      theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {t('advanced.upgrade_to_access')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`h-2 w-full rounded-full mb-4 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div 
                    className={`h-2 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {t('advanced.progress')}: {overallProgress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Explore advanced Georgian language concepts and master complex grammar patterns.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {t('advanced.lessons_completed')}
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                      {progress?.filter(p => p.completed && p.lessonId.startsWith('advanced-')).length || 0}/{topics.length}
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
            {t('advanced.topics.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-md ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } ${topic.premium && !hasActiveSubscription && !isAdmin ? 'relative' : ''} flex flex-col h-full`}
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
                <div className="mt-auto">
                  <div className="mb-3">
                    <div className={`w-full h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-1.5 rounded-full ${
                          theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'
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
                      theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                    }`}
                  >
                    {topic.premium && !hasActiveSubscription && !isAdmin ? t('advanced.upgrade_to_access') : (topic.progress > 0 ? 'Continue Learning' : 'Start Learning')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link
              to="/beginner"
              className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              Return to Beginner Level
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Complex Grammar Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Advanced Verb System
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Georgian verbs are known for their complexity, with multiple preverbs, version markers, and person markers. 
                At the advanced level, you'll master:
              </p>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Screeve system and tense-aspect-mood combinations</li>
                <li>Polypersonal agreement with both subject and object</li>
                <li>Preverb usage for directional and aspectual meanings</li>
                <li>Version vowels and their semantic implications</li>
                <li>Irregular verb patterns and exceptions</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Case System Mastery
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Georgian has a complex case system with seven cases, each serving multiple functions:
              </p>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Ergative-absolutive alignment in certain tenses</li>
                <li>Dative case for indirect objects and certain subjects</li>
                <li>Genitive case for possession and attribution</li>
                <li>Instrumental case for means and accompaniment</li>
                <li>Adverbial case for transformation and function</li>
                <li>Vocative case for direct address</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Complex Sentence Structures
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Advanced Georgian requires mastery of complex sentence structures:
              </p>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Subordinate clauses with various conjunctions</li>
                <li>Conditional constructions (real, unreal, counterfactual)</li>
                <li>Reported speech and indirect discourse</li>
                <li>Relative clauses with რომელიც and other relativizers</li>
                <li>Participial and gerundive constructions</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Exercises
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Master advanced grammar through these exercise types:
              </p>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Verb conjugation in all screeves and persons</li>
                <li>Case transformation exercises</li>
                <li>Sentence transformation (active to passive, direct to indirect)</li>
                <li>Complex text analysis and reconstruction</li>
                <li>Translation of literary and technical passages</li>
              </ul>
              <div className="mt-4">
                <Link
                  to={hasActiveSubscription || isAdmin ? "/advanced/grammar" : "/pricing"}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    theme === 'dark' ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Start Grammar Exercises
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedLevelPage;