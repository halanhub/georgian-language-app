import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, BookOpen, Brain, Headphones, Lightbulb, Pencil, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TipCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
}

const LearningTipsPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const tipCategories: TipCategory[] = [
    {
      id: 'general',
      title: 'General Tips',
      icon: <Lightbulb size={24} />,
      color: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'reading',
      title: 'Reading Tips',
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
    },
    {
      id: 'listening',
      title: 'Listening Tips',
      icon: <Headphones size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
    },
    {
      id: 'speaking',
      title: 'Speaking Tips',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
    },
    {
      id: 'writing',
      title: 'Writing Tips',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Tips',
      icon: <Brain size={24} />,
      color: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'grammar',
      title: 'Grammar Tips',
      icon: <BookOpen size={24} />,
      color: theme === 'dark' ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'
    }
  ];

  const tips: Tip[] = [
    // General Tips
    {
      id: 'general-1',
      category: 'general',
      title: 'Consistent Practice',
      content: 'Dedicate at least 15-30 minutes every day to learning Georgian. Consistency is more effective than occasional long study sessions.',
      level: 'all'
    },
    {
      id: 'general-2',
      category: 'general',
      title: 'Use Multiple Resources',
      content: 'Combine different learning methods: apps, books, videos, and conversations with native speakers for a well-rounded approach.',
      level: 'all'
    },
    {
      id: 'general-3',
      category: 'general',
      title: 'Set Clear Goals',
      content: 'Define specific, achievable goals for your Georgian learning journey, such as learning 10 new words per week or completing one lesson per day.',
      level: 'beginner'
    },
    {
      id: 'general-4',
      category: 'general',
      title: 'Track Your Progress',
      content: 'Keep a learning journal to track your progress, note difficult concepts, and celebrate achievements.',
      level: 'all'
    },
    {
      id: 'general-5',
      category: 'general',
      title: 'Immerse Yourself',
      content: 'Surround yourself with Georgian language through music, movies, podcasts, and Georgian news websites.',
      level: 'intermediate'
    },
    
    // Reading Tips
    {
      id: 'reading-1',
      category: 'reading',
      title: 'Start with Simple Texts',
      content: 'Begin with children\'s books, simple news articles, or graded readers designed for language learners.',
      level: 'beginner'
    },
    {
      id: 'reading-2',
      category: 'reading',
      title: 'Read Aloud',
      content: 'Practice reading Georgian texts aloud to improve both your reading skills and pronunciation simultaneously.',
      level: 'beginner'
    },
    {
      id: 'reading-3',
      category: 'reading',
      title: 'Use Context Clues',
      content: 'When encountering unfamiliar words, try to guess their meaning from context before looking them up.',
      level: 'intermediate'
    },
    {
      id: 'reading-4',
      category: 'reading',
      title: 'Parallel Texts',
      content: 'Read texts that have Georgian and English translations side by side to improve comprehension.',
      level: 'intermediate'
    },
    {
      id: 'reading-5',
      category: 'reading',
      title: 'Increase Complexity Gradually',
      content: 'Progressively challenge yourself with more complex texts as your skills improve.',
      level: 'advanced'
    },
    
    // Listening Tips
    {
      id: 'listening-1',
      category: 'listening',
      title: 'Active Listening',
      content: 'Focus on understanding the general meaning first, then gradually work on comprehending specific details.',
      level: 'beginner'
    },
    {
      id: 'listening-2',
      category: 'listening',
      title: 'Use Georgian Media',
      content: 'Listen to Georgian songs, podcasts, radio, and watch Georgian TV shows or YouTube channels.',
      level: 'intermediate'
    },
    {
      id: 'listening-3',
      category: 'listening',
      title: 'Shadowing Technique',
      content: 'Listen to a short audio clip, then repeat it immediately afterward, mimicking the speaker\'s intonation and rhythm.',
      level: 'intermediate'
    },
    {
      id: 'listening-4',
      category: 'listening',
      title: 'Dictation Practice',
      content: 'Listen to Georgian audio and try to write down what you hear, then check your accuracy.',
      level: 'advanced'
    },
    {
      id: 'listening-5',
      category: 'listening',
      title: 'Vary Your Sources',
      content: 'Listen to different speakers, accents, and speech rates to improve your overall comprehension abilities.',
      level: 'advanced'
    },
    
    // Speaking Tips
    {
      id: 'speaking-1',
      category: 'speaking',
      title: 'Practice Pronunciation',
      content: 'Focus on mastering the unique Georgian sounds that don\'t exist in English, such as ejective consonants.',
      level: 'beginner'
    },
    {
      id: 'speaking-2',
      category: 'speaking',
      title: 'Talk to Yourself',
      content: 'Practice speaking Georgian alone by describing your daily activities or surroundings.',
      level: 'beginner'
    },
    {
      id: 'speaking-3',
      category: 'speaking',
      title: 'Find Language Partners',
      content: 'Connect with native Georgian speakers through language exchange apps or online communities.',
      level: 'intermediate'
    },
    {
      id: 'speaking-4',
      category: 'speaking',
      title: 'Record Yourself',
      content: 'Record your Georgian speech and compare it with native speakers to identify areas for improvement.',
      level: 'intermediate'
    },
    {
      id: 'speaking-5',
      category: 'speaking',
      title: 'Don\'t Fear Mistakes',
      content: 'Embrace errors as part of the learning process. Native speakers will appreciate your efforts to speak their language.',
      level: 'all'
    },
    
    // Writing Tips
    {
      id: 'writing-1',
      category: 'writing',
      title: 'Master the Alphabet',
      content: 'Practice writing each Georgian letter correctly, paying attention to their unique shapes and proportions.',
      level: 'beginner'
    },
    {
      id: 'writing-2',
      category: 'writing',
      title: 'Keep a Journal',
      content: 'Write a few sentences in Georgian every day about your activities or thoughts.',
      level: 'beginner'
    },
    {
      id: 'writing-3',
      category: 'writing',
      title: 'Use Templates',
      content: 'Start with sentence templates and gradually modify them to create your own sentences.',
      level: 'intermediate'
    },
    {
      id: 'writing-4',
      category: 'writing',
      title: 'Get Feedback',
      content: 'Have native speakers review your writing to identify and correct errors.',
      level: 'intermediate'
    },
    {
      id: 'writing-5',
      category: 'writing',
      title: 'Practice Different Formats',
      content: 'Write various types of content: descriptions, stories, emails, social media posts, etc.',
      level: 'advanced'
    },
    
    // Vocabulary Tips
    {
      id: 'vocabulary-1',
      category: 'vocabulary',
      title: 'Learn Words in Context',
      content: 'Instead of memorizing isolated words, learn them in phrases or sentences to better understand their usage.',
      level: 'beginner'
    },
    {
      id: 'vocabulary-2',
      category: 'vocabulary',
      title: 'Use Spaced Repetition',
      content: 'Review words at increasing intervals to strengthen your memory and retention.',
      level: 'all'
    },
    {
      id: 'vocabulary-3',
      category: 'vocabulary',
      title: 'Create Word Associations',
      content: 'Connect new Georgian words with images, stories, or similar-sounding words in your native language.',
      level: 'beginner'
    },
    {
      id: 'vocabulary-4',
      category: 'vocabulary',
      title: 'Thematic Learning',
      content: 'Learn words in related groups (e.g., food, transportation, family) to create meaningful connections.',
      level: 'intermediate'
    },
    {
      id: 'vocabulary-5',
      category: 'vocabulary',
      title: 'Use New Words Immediately',
      content: 'Try to use newly learned words in sentences or conversations as soon as possible to reinforce them.',
      level: 'all'
    },
    
    // Grammar Tips
    {
      id: 'grammar-1',
      category: 'grammar',
      title: 'Focus on Patterns',
      content: 'Look for patterns in Georgian grammar rather than memorizing endless rules.',
      level: 'beginner'
    },
    {
      id: 'grammar-2',
      category: 'grammar',
      title: 'Learn Case Endings',
      content: 'Pay special attention to Georgian case endings, as they\'re crucial for expressing relationships between words.',
      level: 'intermediate'
    },
    {
      id: 'grammar-3',
      category: 'grammar',
      title: 'Master Verb Prefixes',
      content: 'Focus on understanding how verb prefixes change meaning and direction in Georgian.',
      level: 'intermediate'
    },
    {
      id: 'grammar-4',
      category: 'grammar',
      title: 'Practice with Exercises',
      content: 'Complete targeted grammar exercises to reinforce your understanding of specific concepts.',
      level: 'all'
    },
    {
      id: 'grammar-5',
      category: 'grammar',
      title: 'Analyze Authentic Texts',
      content: 'Study how grammar is used in authentic Georgian texts, noting patterns and exceptions.',
      level: 'advanced'
    }
  ];

  // Filter tips based on active category, level, and search query
  const filteredTips = tips.filter(tip => 
    (activeCategory === null || tip.category === activeCategory) &&
    (activeLevel === 'all' || tip.level === 'all' || tip.level === activeLevel) &&
    (searchQuery === '' || 
     tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tip.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Learning Tips</span> - სწავლის რჩევები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Discover effective strategies and techniques to enhance your Georgian language learning experience.
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
                <Lightbulb className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Why Learning Tips Matter
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Effective learning strategies can significantly accelerate your progress and make your Georgian language journey more enjoyable and productive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-4 overflow-x-auto pb-3 md:pb-0">
              <button
                onClick={() => setActiveLevel('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLevel === 'all'
                    ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setActiveLevel('beginner')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLevel === 'beginner'
                    ? (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setActiveLevel('intermediate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLevel === 'intermediate'
                    ? (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
                    : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setActiveLevel('advanced')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLevel === 'advanced'
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
                placeholder="Search tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full md:w-64 rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500'
                } border focus:outline-none focus:ring-2`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
            {/* Categories Sidebar */}
            <div className="md:col-span-2">
              <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Categories
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeCategory === null
                      ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')
                      : (theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                  }`}
                >
                  <Lightbulb size={20} className={`mr-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>All Tips</span>
                </button>
                
                {tipCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')
                        : (theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                    }`}
                  >
                    <div className={`p-1 rounded-full mr-3 ${category.color}`}>
                      {category.icon}
                    </div>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tips Content */}
            <div className="md:col-span-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {activeCategory 
                    ? tipCategories.find(c => c.id === activeCategory)?.title 
                    : 'All Learning Tips'}
                </h2>
                <div className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {filteredTips.length} tips
                </div>
              </div>
              
              {filteredTips.length > 0 ? (
                <div className="space-y-6">
                  {filteredTips.map((tip) => {
                    const category = tipCategories.find(c => c.id === tip.category);
                    return (
                      <div
                        key={tip.id}
                        className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
                      >
                        <div className="flex items-center mb-4">
                          {category && (
                            <div className={`p-2 rounded-full mr-3 ${category.color}`}>
                              {category.icon}
                            </div>
                          )}
                          <div>
                            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {tip.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-1 rounded ${
                                tip.level === 'beginner'
                                  ? (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                                  : tip.level === 'intermediate'
                                    ? (theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800')
                                    : tip.level === 'advanced'
                                      ? (theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800')
                                      : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                              }`}>
                                {tip.level === 'all' ? 'All Levels' : tip.level.charAt(0).toUpperCase() + tip.level.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                          {tip.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`p-8 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Lightbulb size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    No tips found matching your criteria. Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningTipsPage;