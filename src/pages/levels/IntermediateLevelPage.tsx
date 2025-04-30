import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Edit, GraduationCap, MessageCircle, Pencil } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const IntermediateLevelPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
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
      id: 'grammar', 
      name: 'Grammar Fundamentals', 
      description: 'Master essential Georgian grammar rules',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/intermediate/grammar',
      unlocked: true
    },
    { 
      id: 'sentences', 
      name: 'Sentence Construction', 
      description: 'Learn to build proper Georgian sentences',
      icon: <Edit size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/intermediate/sentences',
      unlocked: progress >= 20
    },
    { 
      id: 'common-words', 
      name: 'Top 100 Common Words', 
      description: 'Master the most frequently used Georgian words',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/intermediate/common-words',
      unlocked: progress >= 40
    },
    { 
      id: 'conversations', 
      name: 'Daily Conversations', 
      description: 'Practical dialogues for everyday situations',
      icon: <MessageCircle size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/intermediate/conversations',
      unlocked: progress >= 60
    },
    { 
      id: 'reading', 
      name: 'Reading Practice', 
      description: 'Improve your comprehension with Georgian texts',
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/intermediate/reading',
      unlocked: progress >= 80
    },
    { 
      id: 'writing', 
      name: 'Writing Exercises', 
      description: 'Practice writing in Georgian with guided exercises',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/intermediate/writing',
      unlocked: progress >= 90
    },
  ];

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Intermediate Level</span> - საშუალო
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Take your Georgian language skills to the next level with grammar fundamentals, sentence construction, and daily conversations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/intermediate/grammar"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Start with Grammar
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Intermediate Progress: {progress}%
                </h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Complete lessons to unlock more advanced content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Lessons Completed
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
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
            Intermediate Learning Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-md transition-all ${
                  topic.unlocked
                    ? (theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50')
                    : (theme === 'dark' ? 'bg-gray-800 opacity-50' : 'bg-white opacity-50')
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
                  <Link
                    to={topic.path}
                    className={`flex items-center text-sm font-medium ${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <div className={`flex items-center text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                  }`}>
                    Complete previous lessons to unlock
                    <ArrowRight className="ml-2 h-4 w-4" />
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
    </div>
  );
};

export default IntermediateLevelPage;