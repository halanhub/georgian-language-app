import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlignJustify, ArrowLeft, Award, Book, BookOpen, Brain, 
  Calendar, CheckCircle, Clock, Crown, Dices, Flame, 
  GraduationCap, Heart, Lightbulb, Medal, MessageSquare, 
  Palette, Pencil, Star, Target, Trophy, User, Zap 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const AchievementsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'achievements' | 'badges' | 'progress'>('achievements');

  // Mock user progress data - in a real app, this would come from a database
  const userProgress = {
    lessonsCompleted: 12,
    totalLessons: 45,
    quizzesTaken: 8,
    quizzesScore: 85,
    studyStreak: 7,
    totalStudyTime: 14.5, // hours
    wordsLearned: 120,
    level: 'Beginner',
    alphabetProgress: 100, // percent
    vocabularyProgress: 65, // percent
    grammarProgress: 30, // percent
    conversationProgress: 25, // percent
    readingProgress: 40, // percent
    writingProgress: 20 // percent
  };

  // Mock achievements data
  const achievements = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: <CheckCircle size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      earned: true,
      date: '2023-10-15'
    },
    {
      id: 'alphabet-master',
      title: 'Alphabet Master',
      description: 'Learn all 33 Georgian letters',
      icon: <AlignJustify size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      earned: true,
      date: '2023-10-18'
    },
    {
      id: 'quiz-ace',
      title: 'Quiz Ace',
      description: 'Score 100% on any quiz',
      icon: <Star size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      earned: true,
      date: '2023-10-20'
    },
    {
      id: 'streak-week',
      title: 'Consistent Learner',
      description: 'Maintain a 7-day study streak',
      icon: <Flame size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      earned: true,
      date: '2023-10-22'
    },
    {
      id: 'vocabulary-builder',
      title: 'Vocabulary Builder',
      description: 'Learn 100 Georgian words',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      earned: true,
      date: '2023-10-25'
    },
    {
      id: 'beginner-complete',
      title: 'Beginner Champion',
      description: 'Complete all beginner level lessons',
      icon: <Medal size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      earned: false
    },
    {
      id: 'conversation-starter',
      title: 'Conversation Starter',
      description: 'Complete 5 conversation practice sessions',
      icon: <MessageSquare size={24} />,
      color: theme === 'dark' ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800',
      earned: false
    },
    {
      id: 'study-hours',
      title: 'Dedicated Student',
      description: 'Study for a total of 20 hours',
      icon: <Clock size={24} />,
      color: theme === 'dark' ? 'bg-cyan-900 text-cyan-200' : 'bg-cyan-100 text-cyan-800',
      earned: false
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with an average score of 80% or higher',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
      earned: false
    },
    {
      id: 'grammar-guru',
      title: 'Grammar Guru',
      description: 'Master basic Georgian grammar rules',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800',
      earned: false
    },
    {
      id: 'reading-enthusiast',
      title: 'Reading Enthusiast',
      description: 'Complete all reading practice exercises',
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-sky-900 text-sky-200' : 'bg-sky-100 text-sky-800',
      earned: false
    },
    {
      id: 'writing-pro',
      title: 'Writing Pro',
      description: 'Complete all writing exercises with high accuracy',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-violet-900 text-violet-200' : 'bg-violet-100 text-violet-800',
      earned: false
    },
    {
      id: 'cultural-explorer',
      title: 'Cultural Explorer',
      description: 'Learn about Georgian traditions and culture',
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-rose-900 text-rose-200' : 'bg-rose-100 text-rose-800',
      earned: false
    },
    {
      id: 'perfect-streak',
      title: 'Perfect Streak',
      description: 'Maintain a 30-day study streak',
      icon: <Zap size={24} />,
      color: theme === 'dark' ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
      earned: false
    },
    {
      id: 'intermediate-milestone',
      title: 'Intermediate Milestone',
      description: 'Reach intermediate level proficiency',
      icon: <Target size={24} />,
      color: theme === 'dark' ? 'bg-teal-900 text-teal-200' : 'bg-teal-100 text-teal-800',
      earned: false
    },
    {
      id: 'advanced-explorer',
      title: 'Advanced Explorer',
      description: 'Begin advanced level lessons',
      icon: <Crown size={24} />,
      color: theme === 'dark' ? 'bg-fuchsia-900 text-fuchsia-200' : 'bg-fuchsia-100 text-fuchsia-800',
      earned: false
    }
  ];

  // Mock badges data
  const badges = [
    {
      id: 'beginner-badge',
      title: 'Beginner',
      description: 'Started learning Georgian',
      icon: '🔰',
      earned: true
    },
    {
      id: 'alphabet-badge',
      title: 'Alphabet Expert',
      description: 'Mastered the Georgian alphabet',
      icon: '🔤',
      earned: true
    },
    {
      id: 'vocabulary-badge',
      title: 'Word Collector',
      description: 'Learned 100+ Georgian words',
      icon: '📚',
      earned: true
    },
    {
      id: 'quiz-badge',
      title: 'Quiz Master',
      description: 'Completed 5+ quizzes with high scores',
      icon: '🏆',
      earned: true
    },
    {
      id: 'streak-badge',
      title: 'Streak Keeper',
      description: 'Maintained a 7-day study streak',
      icon: '🔥',
      earned: true
    },
    {
      id: 'intermediate-badge',
      title: 'Intermediate Learner',
      description: 'Reached intermediate level',
      icon: '⭐',
      earned: false
    },
    {
      id: 'grammar-badge',
      title: 'Grammar Guru',
      description: 'Mastered basic Georgian grammar',
      icon: '📝',
      earned: false
    },
    {
      id: 'conversation-badge',
      title: 'Conversationalist',
      description: 'Can hold basic conversations in Georgian',
      icon: '💬',
      earned: false
    },
    {
      id: 'numbers-badge',
      title: 'Number Wizard',
      description: 'Mastered Georgian numbers',
      icon: '🔢',
      earned: true
    },
    {
      id: 'food-badge',
      title: 'Food Connoisseur',
      description: 'Learned Georgian food vocabulary',
      icon: '🍲',
      earned: true
    },
    {
      id: 'colors-badge',
      title: 'Color Expert',
      description: 'Mastered Georgian colors',
      icon: '🎨',
      earned: true
    },
    {
      id: 'months-badge',
      title: 'Calendar Master',
      description: 'Learned months and seasons in Georgian',
      icon: '📅',
      earned: false
    },
    {
      id: 'animals-badge',
      title: 'Animal Lover',
      description: 'Learned animal names in Georgian',
      icon: '🐾',
      earned: false
    },
    {
      id: 'body-badge',
      title: 'Anatomy Expert',
      description: 'Mastered human body vocabulary',
      icon: '👤',
      earned: false
    },
    {
      id: 'reading-badge',
      title: 'Reader',
      description: 'Completed reading practice exercises',
      icon: '📖',
      earned: false
    },
    {
      id: 'writing-badge',
      title: 'Writer',
      description: 'Completed writing exercises',
      icon: '✍️',
      earned: false
    },
    {
      id: 'perfect-score-badge',
      title: 'Perfect Score',
      description: 'Achieved 100% on a quiz',
      icon: '💯',
      earned: true
    },
    {
      id: 'dedication-badge',
      title: 'Dedicated Learner',
      description: 'Studied for 10+ hours',
      icon: '⏱️',
      earned: true
    },
    {
      id: 'advanced-badge',
      title: 'Advanced Scholar',
      description: 'Started advanced level lessons',
      icon: '🎓',
      earned: false
    },
    {
      id: 'cultural-badge',
      title: 'Cultural Explorer',
      description: 'Learned about Georgian culture',
      icon: '🏛️',
      earned: false
    }
  ];

  // Additional milestone badges
  const milestoneBadges = [
    {
      id: 'bronze-milestone',
      title: 'Bronze Milestone',
      description: 'Complete 25% of all lessons',
      icon: '🥉',
      progress: (userProgress.lessonsCompleted / userProgress.totalLessons) * 100 >= 25,
      percentage: 25
    },
    {
      id: 'silver-milestone',
      title: 'Silver Milestone',
      description: 'Complete 50% of all lessons',
      icon: '🥈',
      progress: (userProgress.lessonsCompleted / userProgress.totalLessons) * 100 >= 50,
      percentage: 50
    },
    {
      id: 'gold-milestone',
      title: 'Gold Milestone',
      description: 'Complete 75% of all lessons',
      icon: '🥇',
      progress: (userProgress.lessonsCompleted / userProgress.totalLessons) * 100 >= 75,
      percentage: 75
    },
    {
      id: 'platinum-milestone',
      title: 'Platinum Milestone',
      description: 'Complete 100% of all lessons',
      icon: '💎',
      progress: (userProgress.lessonsCompleted / userProgress.totalLessons) * 100 >= 100,
      percentage: 100
    }
  ];

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-yellow-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}>Achievements</span> - მიღწევები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Track your progress and celebrate your Georgian language learning milestones.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Trophy className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Your Progress
                </h3>
                <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex justify-between">
                    <span>Lessons Completed:</span>
                    <span className="font-medium">{userProgress.lessonsCompleted}/{userProgress.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Quiz Score:</span>
                    <span className="font-medium">{userProgress.quizzesScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Streak:</span>
                    <span className="font-medium">{userProgress.studyStreak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'achievements'
                  ? (theme === 'dark' ? 'bg-amber-700 text-white' : 'bg-amber-600 text-white')
                  : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'badges'
                  ? (theme === 'dark' ? 'bg-amber-700 text-white' : 'bg-amber-600 text-white')
                  : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'progress'
                  ? (theme === 'dark' ? 'bg-amber-700 text-white' : 'bg-amber-600 text-white')
                  : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              Learning Progress
            </button>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'achievements' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Your Achievements
                </h2>
                <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {achievements.filter(a => a.earned).length}/{achievements.length} Earned
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg shadow-md transition-all ${
                      achievement.earned
                        ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white')
                        : (theme === 'dark' ? 'bg-gray-800 opacity-50' : 'bg-white opacity-50')
                    }`}
                  >
                    <div className={`p-3 rounded-full inline-block mb-4 ${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <div className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Not yet earned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'badges' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Your Badges
                </h2>
                <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {badges.filter(b => b.earned).length}/{badges.length} Earned
                  </span>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Milestone Badges
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {milestoneBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-6 rounded-lg shadow-md text-center transition-all ${
                        badge.progress
                          ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white')
                          : (theme === 'dark' ? 'bg-gray-800 opacity-50 grayscale' : 'bg-white opacity-50 grayscale')
                      }`}
                    >
                      <div className="text-5xl mb-4">
                        {badge.icon}
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {badge.title}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {badge.description}
                      </p>
                      <div className="mt-3">
                        <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-2 rounded-full ${theme === 'dark' ? 'bg-amber-500' : 'bg-amber-600'}`}
                            style={{ width: `${Math.min((userProgress.lessonsCompleted / userProgress.totalLessons) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {Math.round((userProgress.lessonsCompleted / userProgress.totalLessons) * 100)}% / {badge.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Skill Badges
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-6 rounded-lg shadow-md text-center transition-all ${
                      badge.earned
                        ? (theme === 'dark' ? 'bg-gray-800' : 'bg-white')
                        : (theme === 'dark' ? 'bg-gray-800 opacity-50 grayscale' : 'bg-white opacity-50 grayscale')
                    }`}
                  >
                    <div className="text-5xl mb-4">
                      {badge.icon}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {badge.title}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {badge.description}
                    </p>
                    {badge.earned ? (
                      <div className={`mt-4 text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        Earned
                      </div>
                    ) : (
                      <div className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Locked
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'progress' && (
            <>
              <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Learning Progress
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Overall Progress
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Lessons Completed</span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {userProgress.lessonsCompleted}/{userProgress.totalLessons}
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full ${theme === 'dark' ? 'bg-amber-500' : 'bg-amber-600'}`}
                          style={{ width: `${(userProgress.lessonsCompleted / userProgress.totalLessons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Words Learned</span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {userProgress.wordsLearned}/500
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full ${theme === 'dark' ? 'bg-green-500' : 'bg-green-600'}`}
                          style={{ width: `${(userProgress.wordsLearned / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Quiz Performance</span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {userProgress.quizzesScore}%
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                          style={{ width: `${userProgress.quizzesScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Learning Stats
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Current Level</p>
                      <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {userProgress.level}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Study Streak</p>
                      <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {userProgress.studyStreak} days
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Quizzes Taken</p>
                      <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {userProgress.quizzesTaken}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Study Time</p>
                      <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {userProgress.totalStudyTime} hrs
                      </p>
                    </div>
                  </div>
                  
                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Next Milestone
                    </h4>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                      }`}>
                        <Trophy size={20} />
                      </div>
                      <div>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          Complete all beginner lessons
                        </p>
                        <div className="w-full mt-2 bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                          <div 
                            className={`h-1.5 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`}
                            style={{ width: `${(userProgress.lessonsCompleted / userProgress.totalLessons) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Skill Progress
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                      }`}>
                        <AlignJustify size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Alphabet
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                        style={{ width: `${userProgress.alphabetProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.alphabetProgress}%
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                      }`}>
                        <Brain size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Vocabulary
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`}
                        style={{ width: `${userProgress.vocabularyProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.vocabularyProgress}%
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                      }`}>
                        <BookOpen size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Grammar
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-green-500' : 'bg-green-600'}`}
                        style={{ width: `${userProgress.grammarProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.grammarProgress}%
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <MessageSquare size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Conversation
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-600'}`}
                        style={{ width: `${userProgress.conversationProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.conversationProgress}%
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                      }`}>
                        <Book size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Reading
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-red-500' : 'bg-red-600'}`}
                        style={{ width: `${userProgress.readingProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.readingProgress}%
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        <Pencil size={20} />
                      </div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Writing
                      </h4>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-2 rounded-full ${theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-600'}`}
                        style={{ width: `${userProgress.writingProgress}%` }}
                      ></div>
                    </div>
                    <p className={`text-right mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.writingProgress}%
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Motivation Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-amber-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Keep Learning, Keep Achieving!
            </h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Every lesson brings you closer to fluency in Georgian.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg text-center`}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Set Daily Goals
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Aim to complete at least one lesson or quiz each day to maintain your streak.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg text-center`}>
              <div className="text-4xl mb-4">🔄</div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Review Regularly
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Revisit completed lessons to reinforce your learning and earn mastery badges.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg text-center`}>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Challenge Yourself
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Take quizzes and complete exercises to unlock more achievements and badges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;