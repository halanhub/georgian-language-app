import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Brain, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '@/components/ui/card';

interface VocabularyItem {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface VocabularyCategory {
  id: string;
  title: string;
  description: string;
  words: VocabularyItem[];
}

const VocabularyPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const vocabularyCategories: VocabularyCategory[] = [
    {
      id: 'weather',
      title: 'Weather & Climate',
      description: 'Weather conditions and climate vocabulary',
      words: [
        { georgian: 'ამინდი', latin: 'amindi', english: 'weather', example: 'დღეს კარგი ამინდია - Today is good weather' },
        { georgian: 'წვიმა', latin: 'tsvima', english: 'rain', example: 'წვიმს - It\'s raining' },
        { georgian: 'თოვლი', latin: 'tovli', english: 'snow', example: 'თოვს - It\'s snowing' },
        { georgian: 'მზე', latin: 'mze', english: 'sun', example: 'მზე ანათებს - The sun is shining' },
        { georgian: 'ღრუბელი', latin: 'ghrubeli', english: 'cloud', example: 'ცაზე ღრუბელია - There are clouds in the sky' },
        { georgian: 'ქარი', latin: 'qari', english: 'wind', example: 'ძლიერი ქარი ქრის - Strong wind is blowing' },
        { georgian: 'ელვა', latin: 'elva', english: 'lightning', example: 'ელვა გაკრთა - Lightning flashed' },
        { georgian: 'ჭექა-ქუხილი', latin: 'cheqa-qukhili', english: 'thunder', example: 'ჭექა-ქუხილი ისმის - Thunder can be heard' }
      ]
    },
    {
      id: 'travel',
      title: 'Travel & Transportation',
      description: 'Vocabulary for travel and getting around',
      words: [
        { georgian: 'მანქანა', latin: 'manqana', english: 'car', example: 'მანქანით მივდივარ - I go by car' },
        { georgian: 'ავტობუსი', latin: 'avtobusi', english: 'bus', example: 'ავტობუსით მგზავრობა - Traveling by bus' },
        { georgian: 'მატარებელი', latin: 'matarebeli', english: 'train', example: 'მატარებელი მოდის - The train is coming' },
        { georgian: 'თვითმფრინავი', latin: 'tvitmfrinavi', english: 'airplane', example: 'თვითმფრინავით მივფრინავ - I fly by airplane' },
        { georgian: 'აეროპორტი', latin: 'aeroporti', english: 'airport', example: 'აეროპორტში მივდივარ - I am going to the airport' },
        { georgian: 'სადგური', latin: 'sadguri', english: 'station', example: 'მეტროს სადგური - Metro station' },
        { georgian: 'ბილეთი', latin: 'bileti', english: 'ticket', example: 'ბილეთის ყიდვა - Buying a ticket' },
        { georgian: 'მგზავრობა', latin: 'mgzavroba', english: 'journey', example: 'გრძელი მგზავრობა - Long journey' }
      ]
    },
    {
      id: 'nature',
      title: 'Nature & Environment',
      description: 'Natural world and environmental terms',
      words: [
        { georgian: 'ტყე', latin: 'tqe', english: 'forest', example: 'დიდი ტყე - Big forest' },
        { georgian: 'მთა', latin: 'mta', english: 'mountain', example: 'მაღალი მთა - High mountain' },
        { georgian: 'მდინარე', latin: 'mdinare', english: 'river', example: 'გრძელი მდინარე - Long river' },
        { georgian: 'ზღვა', latin: 'zghva', english: 'sea', example: 'შავი ზღვა - Black Sea' },
        { georgian: 'ტბა', latin: 'tba', english: 'lake', example: 'ლამაზი ტბა - Beautiful lake' },
        { georgian: 'ყვავილი', latin: 'qvavili', english: 'flower', example: 'წითელი ყვავილი - Red flower' },
        { georgian: 'ხე', latin: 'khe', english: 'tree', example: 'მაღალი ხე - Tall tree' },
        { georgian: 'ბალახი', latin: 'balakhi', english: 'grass', example: 'მწვანე ბალახი - Green grass' }
      ]
    },
    {
      id: 'emotions',
      title: 'Emotions & Feelings',
      description: 'Words to express emotions and feelings',
      words: [
        { georgian: 'ბედნიერება', latin: 'bedniereba', english: 'happiness', example: 'დიდი ბედნიერება - Great happiness' },
        { georgian: 'სიყვარული', latin: 'siqvaruli', english: 'love', example: 'შენი სიყვარული - Your love' },
        { georgian: 'სიხარული', latin: 'sikharuli', english: 'joy', example: 'სიხარულით სავსე - Full of joy' },
        { georgian: 'მოწყენილობა', latin: 'motsqeniloba', english: 'sadness', example: 'მოწყენილობა მეუფლება - Sadness overtakes me' },
        { georgian: 'ბრაზი', latin: 'brazi', english: 'anger', example: 'ბრაზი მოდის - Anger comes' },
        { georgian: 'შიში', latin: 'shishi', english: 'fear', example: 'შიშის გრძნობა - Feeling of fear' },
        { georgian: 'გაკვირვება', latin: 'gakvirveba', english: 'surprise', example: 'დიდი გაკვირვება - Big surprise' },
        { georgian: 'იმედი', latin: 'imedi', english: 'hope', example: 'იმედი მაქვს - I have hope' }
      ]
    },
    {
      id: 'professions',
      title: 'Professions & Occupations',
      description: 'Common jobs and career vocabulary',
      words: [
        { georgian: 'მასწავლებელი', latin: 'mastsavlebeli', english: 'teacher', example: 'კარგი მასწავლებელი - Good teacher' },
        { georgian: 'ექიმი', latin: 'eqimi', english: 'doctor', example: 'გამოცდილი ექიმი - Experienced doctor' },
        { georgian: 'ინჟინერი', latin: 'inzhineri', english: 'engineer', example: 'ნიჭიერი ინჟინერი - Talented engineer' },
        { georgian: 'მძღოლი', latin: 'mdzgholi', english: 'driver', example: 'ავტობუსის მძღოლი - Bus driver' },
        { georgian: 'მზარეული', latin: 'mzareuli', english: 'cook', example: 'პროფესიონალი მზარეული - Professional cook' },
        { georgian: 'მუსიკოსი', latin: 'musikosi', english: 'musician', example: 'ცნობილი მუსიკოსი - Famous musician' },
        { georgian: 'მხატვარი', latin: 'mkhtvari', english: 'artist', example: 'ნიჭიერი მხატვარი - Talented artist' },
        { georgian: 'პროგრამისტი', latin: 'programisti', english: 'programmer', example: 'გამოცდილი პროგრამისტი - Experienced programmer' }
      ]
    },
    {
      id: 'technology',
      title: 'Technology & Devices',
      description: 'Modern technology vocabulary',
      words: [
        { georgian: 'კომპიუტერი', latin: 'kompiuteri', english: 'computer', example: 'ახალი კომპიუტერი - New computer' },
        { georgian: 'ტელეფონი', latin: 'telefoni', english: 'phone', example: 'ჭკვიანი ტელეფონი - Smartphone' },
        { georgian: 'ინტერნეტი', latin: 'interneti', english: 'internet', example: 'სწრაფი ინტერნეტი - Fast internet' },
        { georgian: 'აპლიკაცია', latin: 'aplikatsia', english: 'application', example: 'სასარგებლო აპლიკაცია - Useful application' },
        { georgian: 'ვებგვერდი', latin: 'vebgverdi', english: 'website', example: 'საინტერესო ვებგვერდი - Interesting website' },
        { georgian: 'პროგრამა', latin: 'programa', english: 'program', example: 'ახალი პროგრამა - New program' },
        { georgian: 'ელფოსტა', latin: 'elposta', english: 'email', example: 'ელფოსტის გაგზავნა - Sending an email' },
        { georgian: 'პაროლი', latin: 'paroli', english: 'password', example: 'უსაფრთხო პაროლი - Secure password' }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping & Commerce',
      description: 'Vocabulary for shopping and business',
      words: [
        { georgian: 'მაღაზია', latin: 'maghazia', english: 'store', example: 'დიდი მაღაზია - Big store' },
        { georgian: 'ფასი', latin: 'pasi', english: 'price', example: 'კარგი ფასი - Good price' },
        { georgian: 'ფული', latin: 'puli', english: 'money', example: 'ბევრი ფული - Lots of money' },
        { georgian: 'ყიდვა', latin: 'qidva', english: 'buying', example: 'საჭმლის ყიდვა - Buying food' },
        { georgian: 'გაყიდვა', latin: 'gaqidva', english: 'selling', example: 'სახლის გაყიდვა - Selling a house' },
        { georgian: 'ფასდაკლება', latin: 'pasdakleba', english: 'discount', example: 'დიდი ფასდაკლება - Big discount' },
        { georgian: 'ბარათი', latin: 'barati', english: 'card', example: 'საკრედიტო ბარათი - Credit card' },
        { georgian: 'ქვითარი', latin: 'qvitari', english: 'receipt', example: 'ქვითრის შენახვა - Keeping the receipt' }
      ]
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Health-related vocabulary',
      words: [
        { georgian: 'ჯანმრთელობა', latin: 'janmrteloba', english: 'health', example: 'კარგი ჯანმრთელობა - Good health' },
        { georgian: 'ავადმყოფობა', latin: 'avadmqopoba', english: 'illness', example: 'მძიმე ავადმყოფობა - Serious illness' },
        { georgian: 'ექიმი', latin: 'eqimi', english: 'doctor', example: 'კარგი ექიმი - Good doctor' },
        { georgian: 'წამალი', latin: 'tsamali', english: 'medicine', example: 'წამლის მიღება - Taking medicine' },
        { georgian: 'ტკივილი', latin: 'tkivili', english: 'pain', example: 'თავის ტკივილი - Headache' },
        { georgian: 'ვარჯიში', latin: 'varjishi', english: 'exercise', example: 'რეგულარული ვარჯიში - Regular exercise' },
        { georgian: 'დასვენება', latin: 'dasveneba', english: 'rest', example: 'კარგი დასვენება - Good rest' },
        { georgian: 'ძილი', latin: 'dzili', english: 'sleep', example: 'ღრმა ძილი - Deep sleep' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setTimeout(() => {
        if (categoryRefs.current[categoryId]) {
          categoryRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (word: string) => {
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Vocabulary</span> - ლექსიკა
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore Georgian vocabulary by categories to expand your language skills.
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
                <Brain className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Focus on one category at a time</li>
                  <li>• Practice pronunciation with audio</li>
                  <li>• Create flashcards for review</li>
                  <li>• Use words in simple sentences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {vocabularyCategories.map((category) => (
              <div
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {category.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {category.description}
                      </p>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.words.map((word, index) => (
                      <Card key={index} className={`p-6 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {word.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(word.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === word.georgian
                                ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === word.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{word.latin}/
                          </p>
                          <p className="font-medium">{word.english}</p>
                          {word.example && (
                            <p className="text-sm italic">{word.example}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VocabularyPage;