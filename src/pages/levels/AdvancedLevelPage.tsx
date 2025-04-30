import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, FileText, GraduationCap, Headphones, MessageSquare, Pencil } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const AdvancedLevelPage: React.FC = () => {
  const { theme } = useTheme();

  const topics = [
    { 
      id: 'complex-grammar', 
      name: 'Complex Grammar', 
      description: 'Master advanced Georgian grammar patterns',
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
      path: '/advanced/grammar' 
    },
    { 
      id: 'cultural-nuances', 
      name: 'Cultural Nuances', 
      description: 'Understand Georgian cultural context in language',
      icon: <GraduationCap size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      path: '/advanced/culture' 
    },
    { 
      id: 'literature', 
      name: 'Literature & Poetry', 
      description: 'Explore classic and modern Georgian literature',
      icon: <FileText size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      path: '/advanced/literature' 
    },
    { 
      id: 'idioms', 
      name: 'Idiomatic Expressions', 
      description: 'Learn Georgian idioms and colloquial phrases',
      icon: <MessageSquare size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
      path: '/advanced/idioms' 
    },
    { 
      id: 'writing', 
      name: 'Advanced Writing', 
      description: 'Develop sophisticated writing skills in Georgian',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      path: '/advanced/writing' 
    },
    { 
      id: 'listening', 
      name: 'Advanced Listening', 
      description: 'Comprehend native speakers at natural speeds',
      icon: <Headphones size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      path: '/advanced/listening' 
    },
  ];

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Advanced Level</span> - მოწინავე
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Achieve fluency in Georgian with advanced grammar, cultural nuances, literature, and sophisticated conversation skills.
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-white cursor-not-allowed' : 'bg-white text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Complete Intermediate Level to Unlock
                </span>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`h-2 w-1/4 rounded-full mb-4 ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-500'}`}></div>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Advanced Progress</h2>
                <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Complete intermediate level to unlock all advanced lessons.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${theme === 'dark' ? 'bg-gray-600' : ''}`}>
                      <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Locked</span>
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
            Advanced Learning Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-md ${
                  theme === 'dark' ? 'bg-gray-800 opacity-50' : 'bg-white opacity-50'
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
                <div className={`flex items-center text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}>
                  Complete Intermediate Level to Unlock
                  <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Coming Soon Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Advanced Content Coming Soon
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Master the beginner and intermediate levels to prepare for our advanced Georgian language content. We're developing comprehensive materials to help you achieve fluency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedLevelPage;