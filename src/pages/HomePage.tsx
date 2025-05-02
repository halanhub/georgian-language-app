import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, CreditCard, Dices, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../hooks/useSubscription';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { hasActiveSubscription } = useSubscription();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className={`relative py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-red-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  ისწავლე
                </span> ქართული ენა
              </h1>
              <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Start your journey to learn the beautiful Georgian language with our interactive lessons, quizzes, and practice exercises.
              </p>
              <div className="space-x-4">
                {!user ? (
                  <>
                    <Link 
                      to="/signup" 
                      className={`inline-block px-6 py-3 rounded-md text-white font-medium shadow-lg transition-transform hover:scale-105 ${
                        theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      Start Learning Now
                    </Link>
                    <Link 
                      to="/login" 
                      className={`inline-block px-6 py-3 rounded-md font-medium transition-colors ${
                        theme === 'dark' ? 
                        'text-gray-300 bg-gray-800 hover:bg-gray-700' : 
                        'text-gray-700 bg-white hover:bg-gray-100'
                      }`}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="/beginner" 
                    className={`inline-block px-6 py-3 rounded-md text-white font-medium shadow-lg transition-transform hover:scale-105 ${
                      theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    Continue Learning
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img 
                src="/src/assets/images/learn-georgian.png" 
                alt="Georgian alphabet and language learning" 
                className="mx-auto rounded-lg shadow-xl max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Learn Georgian the <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Smart Way</span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Our platform offers everything you need to master the Georgian language, from alphabet to advanced conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <BookOpen size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">Structured Learning Paths</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                From beginner to advanced, our curriculum provides a clear path to fluency in Georgian.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <Dices size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Exercises</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Practice with engaging quizzes, drag-and-drop games, and pronunciation exercises.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <BookOpen size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Access a wide range of learning materials, vocabulary lists, and grammar guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Levels Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Learning Levels
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Progress through carefully designed levels to build your Georgian language skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Beginner
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                    <span className="ml-2">Georgian Alphabet</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                    <span className="ml-2">Basic Greetings</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                    <span className="ml-2">Colors and Numbers</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                    <span className="ml-2">Food and Drinks</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                    <span className="ml-2">Simple Phrases</span>
                  </li>
                </ul>
                <Link 
                  to={user ? "/beginner" : "/signup"} 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-green-700 text-white hover:bg-green-800' : 
                    'bg-green-500 text-white hover:bg-green-600'
                  } transition-colors`}
                >
                  Start Learning
                </Link>
              </div>
            </div>

            {/* Intermediate */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Intermediate
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                    <span className="ml-2">Grammar Fundamentals</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                    <span className="ml-2">Sentence Construction</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                    <span className="ml-2">Top 100 Common Words</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                    <span className="ml-2">Daily Conversations</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                    <span className="ml-2">Reading Practice</span>
                  </li>
                </ul>
                {hasActiveSubscription ? (
                  <Link 
                    to="/intermediate" 
                    className={`block w-full text-center py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-blue-700 text-white hover:bg-blue-800' : 
                      'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors`}
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <Link 
                    to="/pricing" 
                    className={`flex items-center justify-center w-full py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-blue-700 text-white hover:bg-blue-800' : 
                      'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors`}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Upgrade to Access
                  </Link>
                )}
              </div>
            </div>

            {/* Advanced */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Advanced
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                    <span className="ml-2">Complex Grammar</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                    <span className="ml-2">Cultural Nuances</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                    <span className="ml-2">Literature & Poetry</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                    <span className="ml-2">Idiomatic Expressions</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                    <span className="ml-2">Fluent Conversations</span>
                  </li>
                </ul>
                {hasActiveSubscription ? (
                  <Link 
                    to="/advanced" 
                    className={`block w-full text-center py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-purple-700 text-white hover:bg-purple-800' : 
                      'bg-purple-500 text-white hover:bg-purple-600'
                    } transition-colors`}
                  >
                    Master Georgian
                  </Link>
                ) : (
                  <Link 
                    to="/pricing" 
                    className={`flex items-center justify-center w-full py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-purple-700 text-white hover:bg-purple-800' : 
                      'bg-purple-500 text-white hover:bg-purple-600'
                    } transition-colors`}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Upgrade to Access
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Choose Your <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Learning Plan</span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Select the plan that best fits your learning needs and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Free
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $0
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /forever
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className={`space-y-4 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Access to beginner lessons</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Basic vocabulary practice</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Limited quizzes</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Basic progress tracking</span>
                  </li>
                </ul>
                <Link 
                  to={user ? "/beginner" : "/signup"} 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-gray-700 text-white hover:bg-gray-600' : 
                    'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition-colors`}
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className={`rounded-lg overflow-hidden shadow-lg transform scale-105 ${
              theme === 'dark' ? 'bg-gray-800 ring-2 ring-blue-500' : 'bg-white ring-2 ring-blue-500'
            }`}>
              <div className={`p-1 text-center text-sm font-semibold ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                Most Popular
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Premium
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $4.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /month
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className={`space-y-4 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Access to all lessons (Beginner to Advanced)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Unlimited vocabulary practice</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">All quizzes and exercises</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Advanced progress tracking</span>
                  </li>
                </ul>
                <Link 
                  to="/pricing" 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-blue-700 text-white hover:bg-blue-800' : 
                    'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}
                >
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* Annual Plan */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Annual
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $49.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /year
                  </span>
                </div>
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  Save 16% compared to monthly
                </p>
              </div>
              <div className="p-6">
                <ul className={`space-y-4 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">All Premium features</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">Early access to new features</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className="ml-2">16% savings compared to monthly plan</span>
                  </li>
                </ul>
                <Link 
                  to="/pricing" 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-green-700 text-white hover:bg-green-800' : 
                    'bg-green-600 text-white hover:bg-green-700'
                  } transition-colors`}
                >
                  Subscribe Annually
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Globe size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Start Your Georgian Language Journey?
            </h2>
            <p className={`max-w-2xl mx-auto text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Join thousands of learners discovering the beauty of the Georgian language and culture.
            </p>
            {!user ? (
              <Link 
                to="/signup" 
                className={`inline-block px-8 py-4 rounded-md text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Create Your Free Account
              </Link>
            ) : (
              <Link 
                to="/beginner" 
                className={`inline-block px-8 py-4 rounded-md text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Continue Your Learning Journey
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;