import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const FAQPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  // FAQ categories and questions
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          id: 'what-is-georgian',
          question: 'What is the Georgian language?',
          answer: 'Georgian (ქართული ენა, romanized: kartuli ena) is the official language of Georgia and the primary language of about 4 million people. It belongs to the Kartvelian language family and has its own unique alphabet with 33 letters. Georgian is one of the oldest living languages in the world with a rich literary tradition dating back to the 5th century.'
        },
        {
          id: 'how-difficult',
          question: 'How difficult is it to learn Georgian?',
          answer: 'Georgian is considered a challenging language for English speakers due to its unique alphabet, complex verb system, and consonant clusters. However, with consistent practice and the right resources, it is definitely learnable. Our structured approach breaks down the complexity into manageable lessons, making the learning process more accessible.'
        },
        {
          id: 'how-long',
          question: 'How long does it take to learn Georgian?',
          answer: 'The time needed to learn Georgian varies depending on your learning pace, prior language learning experience, and dedication. For basic conversational skills, expect 3-6 months of consistent study. To reach intermediate fluency, 1-2 years is typical. Advanced proficiency may take 3-5 years. Our platform provides a structured path from beginner to advanced levels.'
        }
      ]
    },
    {
      id: 'learning',
      title: 'Learning Process',
      questions: [
        {
          id: 'best-way',
          question: 'What is the best way to learn the Georgian alphabet?',
          answer: 'The best way to learn the Georgian alphabet is through consistent practice and association. Our platform offers interactive lessons that teach you to recognize, pronounce, and write each letter. We recommend learning 5-7 letters at a time, practicing writing them daily, using flashcards, and associating each letter with common words that begin with that letter.'
        },
        {
          id: 'practice-speaking',
          question: 'How can I practice speaking Georgian?',
          answer: 'To practice speaking Georgian, you can: use our conversation exercises that simulate real-life situations, record yourself speaking and compare with native pronunciations, find language exchange partners online, join Georgian language groups, speak to yourself in Georgian during daily activities, and if possible, visit Georgia for immersion. Consistent speaking practice, even just 10-15 minutes daily, significantly improves fluency.'
        },
        {
          id: 'maintain-motivation',
          question: 'How do I maintain motivation while learning Georgian?',
          answer: 'To maintain motivation: set specific, achievable goals; track your progress using our platform\'s tools; celebrate small victories; connect with Georgian culture through music, films, and cuisine; join a community of learners; vary your learning activities; and remember your original purpose for learning Georgian. Our gamified elements and achievement system are designed to keep you engaged throughout your learning journey.'
        }
      ]
    },
    {
      id: 'platform',
      title: 'Our Platform',
      questions: [
        {
          id: 'difference',
          question: 'What makes this platform different from other language learning apps?',
          answer: 'Our platform specializes exclusively in Georgian language learning, offering a comprehensive curriculum designed by language experts and native speakers. We provide structured progression from beginner to advanced levels, interactive exercises tailored specifically for Georgian\'s unique features, cultural context alongside language instruction, personalized progress tracking, and a community of Georgian language learners. Our focused approach ensures more effective learning than general language platforms.'
        },
        {
          id: 'subscription',
          question: 'What do I get with a premium subscription?',
          answer: 'A premium subscription unlocks the full Georgian language learning experience, including: access to all lessons from beginner to advanced levels, comprehensive grammar explanations, unlimited vocabulary practice, all quizzes and interactive exercises, advanced progress tracking, downloadable learning materials, and priority support. The premium subscription ensures you have all the tools needed to achieve fluency in Georgian.'
        },
        {
          id: 'offline',
          question: 'Can I use the platform offline?',
          answer: 'Currently, our platform requires an internet connection to access lessons and track progress. However, premium subscribers can download certain materials like vocabulary lists, grammar guides, and practice exercises for offline use. We\'re working on expanding offline capabilities in future updates to better accommodate learners with limited internet access.'
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Georgian Culture & Travel',
      questions: [
        {
          id: 'visit-georgia',
          question: 'Should I visit Georgia to improve my language skills?',
          answer: 'Visiting Georgia can significantly accelerate your language learning through immersion. Being surrounded by the language in its natural context helps with comprehension, pronunciation, cultural nuances, and motivation. Even a short visit can provide valuable exposure to authentic Georgian. Our platform includes travel-oriented lessons to prepare you for common situations you\'ll encounter in Georgia.'
        },
        {
          id: 'cultural-aspects',
          question: 'What cultural aspects should I know when learning Georgian?',
          answer: 'Understanding Georgian culture enhances language learning. Key aspects include: the importance of hospitality (stumartmaspindzloba), the tradition of supra (feast) with toasts, respect for elders, the significance of Orthodox Christianity, regional differences in dialects and customs, the rich tradition of polyphonic singing, and the importance of family ties. Our platform integrates cultural notes throughout lessons to provide context for language use.'
        },
        {
          id: 'dialects',
          question: 'Are there different dialects in Georgian?',
          answer: 'Yes, Georgian has several regional dialects including Kartlian, Kakhetian, Imeretian, Gurian, Adjarian, Mingrelian, Svan, and more. While these dialects share the same writing system, they differ in pronunciation, vocabulary, and sometimes grammar. Our platform teaches standard Georgian (based on the Kartlian dialect), which is understood throughout the country, while occasionally highlighting important dialectal variations.'
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-red-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Frequently Asked Questions</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Find answers to common questions about learning Georgian language and using our platform.
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
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} size={20} />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500'
                } border focus:outline-none focus:ring-2`}
              />
            </div>
          </div>

          {/* FAQ Content */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-10">
              {filteredFAQs.map((category) => (
                category.questions.length > 0 && (
                  <div key={category.id} className="space-y-6">
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {category.title}
                    </h2>
                    <div className="space-y-4">
                      {category.questions.map((faq) => (
                        <div 
                          key={faq.id} 
                          className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                        >
                          <div className="flex items-start">
                            <HelpCircle 
                              className={`mt-1 flex-shrink-0 mr-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} 
                              size={20} 
                            />
                            <div>
                              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {faq.question}
                              </h3>
                              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className={`p-8 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                No questions found matching your search. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO-friendly content section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Learn Georgian Language Online
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Why Learn Georgian?
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Learning Georgian opens doors to a rich culture with over 1,500 years of written history. As one of the world's oldest languages with its own unique alphabet, Georgian offers language enthusiasts a fascinating linguistic journey. Whether you're planning to visit Georgia's stunning landscapes, connect with Georgian heritage, or simply expand your language repertoire with a truly unique addition, our comprehensive online Georgian lessons provide the perfect starting point.
              </p>
              
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Approach to Georgian Language Learning
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our platform offers a structured approach to learning Georgian, starting with the alphabet and basic vocabulary before progressing to grammar, conversation, and advanced topics. We combine interactive exercises, audio pronunciation guides, and cultural context to create an immersive learning experience. Our Georgian language courses are designed by language experts and native speakers to ensure accuracy and relevance.
              </p>
            </div>
            
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Georgian Alphabet and Pronunciation
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                The Georgian alphabet (ქართული ანბანი) consists of 33 unique letters. Unlike many languages, each letter in Georgian has a single pronunciation, making reading relatively straightforward once you've learned the alphabet. Our Georgian alphabet lessons break down each letter with audio pronunciation guides, writing practice, and common words to help you master this fundamental aspect of the language.
              </p>
              
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Georgian Grammar and Vocabulary
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Georgian grammar has some unique features, including an agglutinative structure where prefixes and suffixes are added to word roots to express different grammatical functions. Our grammar lessons simplify these concepts with clear explanations and plenty of examples. Meanwhile, our vocabulary lessons cover essential Georgian words and phrases organized by themes like greetings, food, travel, and daily activities, helping you build a practical Georgian vocabulary quickly.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Start Your Georgian Language Journey Today
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you're a complete beginner or looking to advance your existing Georgian language skills, our platform offers the resources you need to succeed. With interactive lessons, pronunciation guides, grammar explanations, and cultural insights, you'll be speaking Georgian with confidence in no time. Join thousands of learners who have discovered the beauty and richness of the Georgian language through our comprehensive online courses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;