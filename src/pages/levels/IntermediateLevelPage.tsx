import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Edit, GraduationCap, MessageCircle, Pencil } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import { useUserProgress } from '../../hooks/useUserProgress';
import SubscriptionBanner from '../../components/SubscriptionBanner';

const IntermediateLevelPage: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const { progress, loading: progressLoading, updateProgress } = useUserProgress();
  const [overallProgress, setOverallProgress] = useState(0);

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

  const topics = [
    { 
      id: 'grammar', 
      name: 'Grammar Fundamentals', 
      description: 'Master essential Georgian grammar rules',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/intermediate/grammar',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'grammar')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'grammar')?.timeSpent ? 40 : 0
    },
    { 
      id: 'sentences', 
      name: 'Sentence Construction', 
      description: 'Learn to build proper Georgian sentences',
      icon: <Edit size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/intermediate/sentences',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'sentences')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'sentences')?.timeSpent ? 25 : 0
    },
    { 
      id: 'common-words', 
      name: 'Top 100 Common Words', 
      description: 'Master the most frequently used Georgian words',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/intermediate/common-words',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'common-words')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'common-words')?.timeSpent ? 15 : 0
    },
    { 
      id: 'conversations', 
      name: 'Daily Conversations', 
      description: 'Practice real-world dialogues and improve speaking skills',
      icon: <MessageCircle size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/intermediate/conversations',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'conversations')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'conversations')?.timeSpent ? 10 : 0
    },
    { 
      id: 'reading', 
      name: 'Reading Practice', 
      description: 'Read and comprehend Georgian texts with confidence',
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/intermediate/reading',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'reading')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'reading')?.timeSpent ? 5 : 0
    },
    { 
      id: 'writing', 
      name: 'Writing Exercises', 
      description: 'Develop your written Georgian skills through guided practice',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/intermediate/writing',
      unlocked: hasActiveSubscription || isAdmin,
      progress: progress?.find(p => p.lessonId === 'writing')?.completed ? 100 : 
               progress?.find(p => p.lessonId === 'writing')?.timeSpent ? 0 : 0
    },
  ];

  return (
    <div className="pt-16 pb-16">
      {!hasActiveSubscription && !isAdmin && <SubscriptionBanner type="full" />}
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Intermediate Level</span> - საშუალო
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Take your Georgian language skills to the next level with comprehensive grammar, advanced vocabulary, and practical conversation practice.
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
                    Start with Grammar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                      theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Upgrade to Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                <Link
                  to="/contact"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Need Help?
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
                  Intermediate Progress: {overallProgress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {hasActiveSubscription || isAdmin
                    ? 'Complete lessons to advance your Georgian skills.' 
                    : 'Subscribe to access intermediate content.'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Lessons Completed
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
            Intermediate Learning Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-md transition-all ${
                  topic.unlocked
                    ? (theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50')
                    : (theme === 'dark' ? 'bg-gray-800 opacity-70' : 'bg-white opacity-70')
                }`}
              >
                <div className={`p-3 rounded-full inline-block mb-4 ${topic.color}`}>
                  {topic.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {topic.name}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {topic.description}
                </p>
                {topic.unlocked ? (
                  <>
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
                      onClick={() => updateProgress(topic.id, { timeSpent: 1 })}
                    >
                      {topic.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center">
                    <Link
                      to="/pricing"
                      className={`flex items-center text-sm font-medium ${
                        theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Upgrade to Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                )}
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
            Tips for Intermediate Learners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Regular Practice
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Dedicate at least 30 minutes daily to studying Georgian. Consistency is key to mastering intermediate concepts.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Immerse Yourself
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Watch Georgian movies, listen to music, and try to read simple texts to improve comprehension.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Speaking
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Find language exchange partners to practice conversations and improve your speaking confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntermediateLevelPage;