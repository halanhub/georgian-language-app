import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, Dices, GraduationCap, Lightbulb, Palette, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSubscription } from '../../hooks/useSubscription';

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  color: string;
  path: string;
  available: boolean;
}

const QuizHubPage: React.FC = () => {
  const { theme } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [searchQuery, setSearchQuery] = useState('');

  const quizCategories: QuizCategory[] = [
    // Beginner Quizzes
    { 
      id: 'alphabet', 
      title: 'Georgian Alphabet', 
      description: 'Test your knowledge of the 33 unique Georgian letters',
      level: 'beginner',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/beginner/quiz/alphabet',
      available: true
    },
    { 
      id: 'vocabulary', 
      title: 'Basic Vocabulary', 
      description: 'Test your knowledge of essential Georgian words and phrases',
      level: 'beginner',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/beginner/quiz/vocabulary',
      available: true
    },
    { 
      id: 'colors', 
      title: 'Colors & Shapes', 
      description: 'Test your knowledge of Georgian colors and shapes',
      level: 'beginner',
      icon: <Palette size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/beginner/quiz/colors',
      available: true
    },
    { 
      id: 'numbers', 
      title: 'Numbers', 
      description: 'Test your knowledge of numbers in Georgian',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/beginner/quiz/numbers',
      available: true
    },
    { 
      id: 'months', 
      title: 'Months & Seasons', 
      description: 'Test your knowledge of months, seasons, and time expressions',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/beginner/quiz/months',
      available: true
    },
    { 
      id: 'food', 
      title: 'Food & Drinks', 
      description: 'Test your knowledge of Georgian cuisine vocabulary',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
      path: '/beginner/quiz/food',
      available: true
    },
    { 
      id: 'body', 
      title: 'Human Body', 
      description: 'Test your knowledge of body parts in Georgian',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800',
      path: '/beginner/quiz/body',
      available: true
    },
    { 
      id: 'animals', 
      title: 'Animals', 
      description: 'Test your knowledge of animal names in Georgian',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
      path: '/beginner/quiz/animals',
      available: true
    },
    { 
      id: 'activities', 
      title: 'Daily Activities', 
      description: 'Test your knowledge of everyday activities in Georgian',
      level: 'beginner',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-cyan-900 text-cyan-200' : 'bg-cyan-100 text-cyan-800',
      path: '/beginner/quiz/activities',
      available: true
    },
    
    // Intermediate Quizzes
    { 
      id: 'grammar', 
      title: 'Grammar Fundamentals', 
      description: 'Test your knowledge of Georgian grammar rules',
      level: 'intermediate',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/intermediate/quiz/grammar',
      available: hasActiveSubscription
    },
    { 
      id: 'sentences', 
      title: 'Sentence Construction', 
      description: 'Test your ability to build proper Georgian sentences',
      level: 'intermediate',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/intermediate/quiz/sentences',
      available: hasActiveSubscription
    },
    { 
      id: 'common-words', 
      title: 'Common Words', 
      description: 'Test your knowledge of the most frequently used Georgian words',
      level: 'intermediate',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/intermediate/quiz/common-words',
      available: hasActiveSubscription
    },
    { 
      id: 'conversations', 
      title: 'Daily Conversations', 
      description: 'Test your understanding of Georgian conversations',
      level: 'intermediate',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/intermediate/quiz/conversations',
      available: hasActiveSubscription
    },
    { 
      id: 'reading', 
      title: 'Reading Comprehension', 
      description: 'Test your ability to understand Georgian texts',
      level: 'intermediate',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/intermediate/quiz/reading',
      available: hasActiveSubscription
    },
    { 
      id: 'writing', 
      title: 'Writing Skills', 
      description: 'Test your Georgian writing abilities',
      level: 'intermediate',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/intermediate/quiz/writing',
      available: hasActiveSubscription
    },
    
    // Advanced Quizzes
    { 
      id: 'advanced-grammar', 
      title: 'Advanced Grammar', 
      description: 'Test your knowledge of complex Georgian grammar patterns',
      level: 'advanced',
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/advanced/quiz/grammar',
      available: hasActiveSubscription
    },
    { 
      id: 'idioms', 
      title: 'Idiomatic Expressions', 
      description: 'Test your knowledge of Georgian idioms and expressions',
      level: 'advanced',
      icon: <Lightbulb size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/advanced/quiz/idioms',
      available: hasActiveSubscription
    },
    { 
      id: 'literature', 
      title: 'Literature & Poetry', 
      description: 'Test your understanding of Georgian literature',
      level: 'advanced',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/advanced/quiz/literature',
      available: hasActiveSubscription
    },
    { 
      id: 'cultural', 
      title: 'Cultural Knowledge', 
      description: 'Test your understanding of Georgian culture and traditions',
      level: 'advanced',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/advanced/quiz/cultural',
      available: hasActiveSubscription
    },
    { 
      id: 'listening', 
      title: 'Advanced Listening', 
      description: 'Test your ability to understand native Georgian speakers',
      level: 'advanced',
      icon: <Dices size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/advanced/quiz/listening',
      available: hasActiveSubscription
    }
  ];

  const filteredQuizzes = quizCategories.filter(quiz => 
    quiz.level === activeTab && 
    (searchQuery === '' || 
     quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     quiz.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Quiz Hub</span> - ტესტები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your Georgian language knowledge with our comprehensive collection of quizzes across all learning levels.
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
                <Dices className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Quiz Benefits
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Reinforce your learning</li>
                  <li>• Identify knowledge gaps</li>
                  <li>• Track your progress</li>
                  <li>• Build confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs and Search */}
      <section className={`py-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-4 overflow-x-auto pb-3 md:pb-0">
              <button
                onClick={() => setActiveTab('beginner')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'beginner'
                    ? (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setActiveTab('intermediate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'intermediate'
                    ? (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'advanced'
                    ? (theme === 'dark' ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                Advanced
              </button>
            </div>
            
            <div className="mt-4 md:mt-0 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              </div>
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full md:w-64 rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500'
                } border focus:outline-none focus:ring-2`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Grid */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {activeTab === 'beginner' && 'Beginner Quizzes'}
            {activeTab === 'intermediate' && 'Intermediate Quizzes'}
            {activeTab === 'advanced' && 'Advanced Quizzes'}
          </h2>
          
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                    quiz.available
                      ? (theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50')
                      : (theme === 'dark' ? 'bg-gray-800 opacity-50' : 'bg-white opacity-50')
                  }`}
                >
                  <div className={`p-3 rounded-full inline-block mb-4 ${quiz.color}`}>
                    {quiz.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {quiz.title}
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {quiz.description}
                  </p>
                  
                  {quiz.available ? (
                    <Link
                      to={quiz.path}
                      className={`flex items-center text-sm font-medium ${
                        activeTab === 'beginner'
                          ? (theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700')
                          : activeTab === 'intermediate'
                            ? (theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700')
                            : (theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700')
                      }`}
                    >
                      Take Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      to="/pricing"
                      className={`flex items-center text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
                      }`}
                    >
                      Upgrade to Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-8 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                No quizzes found matching your search. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quiz Tips */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Quiz Taking Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full mr-3 ${
                  theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                }`}>
                  <Check size={20} />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Review First
                </h3>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Before taking a quiz, review the corresponding lesson material to refresh your memory and improve your score.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full mr-3 ${
                  theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}>
                  <Check size={20} />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Read Carefully
                </h3>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Take your time to read each question carefully. Georgian words can look similar, so pay attention to details.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full mr-3 ${
                  theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}>
                  <Check size={20} />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learn from Mistakes
                </h3>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Don't worry about getting everything right the first time. Read the explanations for incorrect answers to learn and improve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizHubPage;