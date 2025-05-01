import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlignJustify, ArrowRight, Book, Calendar, Coffee, Dices, Brain, Utensils } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const BeginnerLevelPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  // Mock progress calculation - in a real app, this would come from a database
  useEffect(() => {
    if (user) {
      // Simulate loading progress data
      setProgress(30); // Example: 30% progress
    }
  }, [user]);

  const topics = [
    { 
      id: 'alphabet', 
      name: 'Georgian Alphabet', 
      description: 'Learn the unique 33 letters of the Georgian alphabet',
      icon: <AlignJustify size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/beginner/alphabet',
      progress: 30
    },
    { 
      id: 'vocabulary', 
      name: 'Vocabulary', 
      description: 'Learn essential Georgian words and phrases',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/beginner/vocabulary',
      progress: 20
    },
    { 
      id: 'numbers', 
      name: 'Numbers', 
      description: 'Learn to count in Georgian from 1 to 100',
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/beginner/vocabulary/numbers',
      progress: 15
    },
    { 
      id: 'months', 
      name: 'Months & Seasons', 
      description: 'Learn the months, seasons, and time expressions',
      icon: <Calendar size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/beginner/vocabulary/months',
      progress: 0
    },
    { 
      id: 'food', 
      name: 'Food & Drinks', 
      description: 'Essential vocabulary for Georgian cuisine',
      icon: <Utensils size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/beginner/vocabulary/food',
      progress: 10
    },
    { 
      id: 'greetings', 
      name: 'Greetings & Phrases', 
      description: 'Common expressions for everyday conversations',
      icon: <Coffee size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/beginner/vocabulary/greetings',
      progress: 5
    },
  ];

  const quizzes = [
    { id: 'alphabet', name: 'Alphabet Quiz', path: '/beginner/quiz/alphabet' },
    { id: 'vocabulary', name: 'Vocabulary Quiz', path: '/beginner/quiz/vocabulary' },
    { id: 'numbers', name: 'Numbers Quiz', path: '/beginner/quiz/numbers' },
    { id: 'food', name: 'Food & Drinks Quiz', path: '/beginner/quiz/food' },
  ];

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Beginner Level</span> - დამწყები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Start your Georgian language journey by learning the alphabet, basic vocabulary, and essential phrases for everyday situations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/beginner/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Start with Alphabet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/beginner/quiz/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Take a Quiz
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
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Your Progress: {progress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Complete these beginner lessons to build a strong foundation in Georgian.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Lessons Completed
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      {Math.floor(progress / 20)}/5
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
            Learning Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={topic.path}
                className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
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
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  {topic.progress > 0 ? 'Continue Learning' : 'Start Learning'}
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
              Test Your Knowledge
            </h2>
            <p className={`mt-2 md:mt-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Take these quizzes to reinforce what you've learned
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={quiz.path}
                className={`p-5 rounded-lg shadow-md transition-all hover:shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-650 border border-gray-600' 
                    : 'bg-white hover:bg-red-50 border border-gray-100'
                }`}
              >
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