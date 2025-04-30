import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const GrammarPage: React.FC = () => {
  const { theme } = useTheme();

  const grammarTopics = [
    {
      title: 'Verb Conjugation',
      description: 'Learn how to conjugate Georgian verbs in different tenses',
      topics: [
        'Present tense conjugation',
        'Past tense formation',
        'Future tense usage',
        'Conditional forms',
        'Subjunctive mood'
      ]
    },
    {
      title: 'Case System',
      description: 'Master the Georgian case system and its usage',
      topics: [
        'Nominative case (სახელობითი)',
        'Ergative case (მოთხრობითი)',
        'Dative case (მიცემითი)',
        'Genitive case (ნათესაობითი)',
        'Instrumental case (მოქმედებითი)',
        'Adverbial case (ვითარებითი)'
      ]
    },
    {
      title: 'Postpositions',
      description: 'Understanding Georgian postpositions and their usage',
      topics: [
        'Common postpositions',
        'Usage with cases',
        'Spatial relationships',
        'Temporal expressions',
        'Abstract relationships'
      ]
    },
    {
      title: 'Aspect and Tense',
      description: 'Learn about verbal aspect and tense system',
      topics: [
        'Perfective vs Imperfective',
        'Present screeves',
        'Past screeves',
        'Future screeves',
        'Aspect markers'
      ]
    }
  ];

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Grammar Fundamentals</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master essential Georgian grammar patterns and structures to build a strong foundation for advanced language skills.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/intermediate"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Intermediate Level
                </Link>
                <Link
                  to="/intermediate/quiz/grammar"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Grammar Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Path
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Learn verb conjugations
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Master the case system
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Understand postpositions
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Practice with examples
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grammar Topics */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {grammarTopics.map((topic, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {topic.title}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {topic.description}
                </p>
                <ul className="space-y-2">
                  {topic.topics.map((subtopic, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <Check size={16} className={`mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      {subtopic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Examples
          </h2>
          
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg mb-8`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Present Tense Conjugation
            </h3>
            <div className="space-y-4">
              <div>
                <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  Verb: კეთება (to do)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      მე ვაკეთებ - I do
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      შენ აკეთებ - You do
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      ის აკეთებს - He/She does
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      ჩვენ ვაკეთებთ - We do
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Case System Example
            </h3>
            <div className="space-y-4">
              <div>
                <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  Word: წიგნი (book)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Nominative: წიგნი
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Ergative: წიგნმა
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Dative: წიგნს
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      Genitive: წიგნის
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Test Your Grammar Knowledge?
            </h2>
            <p className={`max-w-2xl mx-auto mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Take a quiz to reinforce what you've learned about Georgian grammar fundamentals.
            </p>
            <Link
              to="/intermediate/quiz/grammar"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Start Grammar Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrammarPage;