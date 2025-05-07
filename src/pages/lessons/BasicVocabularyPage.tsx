import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

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

const BasicVocabularyPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'fill-in-blank' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [blankInput, setBlankInput] = useState('');
  const [blankFeedback, setBlankFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: VocabularyCategory[] = [
    {
      id: 'greetings',
      title: 'Greetings & Politeness',
      description: 'Essential phrases for polite conversation',
      words: [
        { georgian: 'გამარჯობა', latin: 'gamarjoba', english: 'hello', example: 'გამარჯობა! (gamarjoba!) - Hello!' },
        { georgian: 'ნახვამდის', latin: 'nakhvamdis', english: 'goodbye', example: 'ნახვამდის! (nakhvamdis!) - Goodbye!' },
        { georgian: 'გმადლობთ', latin: 'gmadlobt', english: 'thank you', example: 'დიდი მადლობა (didi madloba) - Thank you very much' },
        { georgian: 'გთხოვთ', latin: 'gtxovt', english: 'please', example: 'თუ შეიძლება (tu sheidzleba) - Please (if possible)' },
        { georgian: 'კი', latin: 'ki', english: 'yes', example: 'კი, რა თქმა უნდა (ki, ra tkma unda) - Yes, of course' },
        { georgian: 'არა', latin: 'ara', english: 'no', example: 'არა, გმადლობთ (ara, gmadlobt) - No, thank you' },
        { georgian: 'კარგად', latin: 'kargad', english: 'well/good', example: 'კარგად ბრძანდებოდეთ (kargad brdzandebodet) - Be well' },
        { georgian: 'ბოდიში', latin: 'bodishi', english: 'sorry', example: 'ბოდიში შეწუხებისთვის (bodishi shetsukhebistvs) - Sorry for the trouble' }
      ]
    },
    {
      id: 'people',
      title: 'People & Family',
      description: 'Words for people and family members',
      words: [
        { georgian: 'კაცი', latin: 'katsi', english: 'man', example: 'ეს კაცი (es katsi) - This man' },
        { georgian: 'ქალი', latin: 'kali', english: 'woman', example: 'ეს ქალი (es kali) - This woman' },
        { georgian: 'ბავშვი', latin: 'bavshvi', english: 'child', example: 'პატარა ბავშვი (patara bavshvi) - Small child' },
        { georgian: 'დედა', latin: 'deda', english: 'mother', example: 'ჩემი დედა (chemi deda) - My mother' },
        { georgian: 'მამა', latin: 'mama', english: 'father', example: 'შენი მამა (sheni mama) - Your father' },
        { georgian: 'და', latin: 'da', english: 'sister', example: 'ჩემი და (chemi da) - My sister' },
        { georgian: 'ძმა', latin: 'dzma', english: 'brother', example: 'უფროსი ძმა (uprosi dzma) - Elder brother' },
        { georgian: 'მეგობარი', latin: 'megobari', english: 'friend', example: 'კარგი მეგობარი (kargi megobari) - Good friend' }
      ]
    },
    {
      id: 'common-objects',
      title: 'Common Objects',
      description: 'Everyday items and objects',
      words: [
        { georgian: 'მაგიდა', latin: 'magida', english: 'table', example: 'დიდი მაგიდა (didi magida) - Big table' },
        { georgian: 'სკამი', latin: 'skami', english: 'chair', example: 'ახალი სკამი (akhali skami) - New chair' },
        { georgian: 'წიგნი', latin: 'tsigni', english: 'book', example: 'საინტერესო წიგნი (saintereso tsigni) - Interesting book' },
        { georgian: 'კარი', latin: 'kari', english: 'door', example: 'კარი ღიაა (kari ghiaa) - The door is open' },
        { georgian: 'ფანჯარა', latin: 'panjara', english: 'window', example: 'დიდი ფანჯარა (didi panjara) - Big window' },
        { georgian: 'ტელეფონი', latin: 'teleponi', english: 'phone', example: 'ჩემი ტელეფონი (chemi teleponi) - My phone' },
        { georgian: 'საათი', latin: 'saati', english: 'clock/watch', example: 'კედლის საათი (kedlis saati) - Wall clock' },
        { georgian: 'კალამი', latin: 'kalami', english: 'pen', example: 'ლურჯი კალამი (lurji kalami) - Blue pen' }
      ]
    },
    {
      id: 'actions',
      title: 'Common Actions',
      description: 'Basic verbs and actions',
      words: [
        { georgian: 'კეთება', latin: 'keteba', english: 'to do', example: 'რას აკეთებ? (ras aketeb?) - What are you doing?' },
        { georgian: 'სწავლა', latin: 'stsavla', english: 'to learn', example: 'ქართულს ვსწავლობ (kartuls vstsavlob) - I am learning Georgian' },
        { georgian: 'ჭამა', latin: 'chama', english: 'to eat', example: 'საჭმელს ვჭამ (sachmels vcham) - I am eating food' },
        { georgian: 'სმა', latin: 'sma', english: 'to drink', example: 'წყალს ვსვამ (tsqals vsvam) - I am drinking water' },
        { georgian: 'სიარული', latin: 'siaruli', english: 'to walk', example: 'პარკში დავდივარ (parkshi davdivar) - I walk in the park' },
        { georgian: 'ლაპარაკი', latin: 'laparaki', english: 'to talk', example: 'ქართულად ვლაპარაკობ (kartulad vlaparakob) - I speak Georgian' },
        { georgian: 'ყიდვა', latin: 'qidva', english: 'to buy', example: 'წიგნს ვყიდულობ (tsigns vqidulob) - I am buying a book' },
        { georgian: 'ყურება', latin: 'qureba', english: 'to watch', example: 'ტელევიზორს ვუყურებ (televizors vuqureb) - I am watching TV' }
      ]
    },
    {
      id: 'adjectives',
      title: 'Common Adjectives',
      description: 'Basic descriptive words',
      words: [
        { georgian: 'დიდი', latin: 'didi', english: 'big', example: 'დიდი სახლი (didi sakhli) - Big house' },
        { georgian: 'პატარა', latin: 'patara', english: 'small', example: 'პატარა ბავშვი (patara bavshvi) - Small child' },
        { georgian: 'კარგი', latin: 'kargi', english: 'good', example: 'კარგი იდეა (kargi idea) - Good idea' },
        { georgian: 'ცუდი', latin: 'tsudi', english: 'bad', example: 'ცუდი ამინდი (tsudi amindi) - Bad weather' },
        { georgian: 'ახალი', latin: 'akhali', english: 'new', example: 'ახალი მანქანა (akhali manqana) - New car' },
        { georgian: 'ძველი', latin: 'dzveli', english: 'old', example: 'ძველი წიგნი (dzveli tsigni) - Old book' },
        { georgian: 'ლამაზი', latin: 'lamazi', english: 'beautiful', example: 'ლამაზი ყვავილი (lamazi qvavili) - Beautiful flower' },
        { georgian: 'ცხელი', latin: 'tskheli', english: 'hot', example: 'ცხელი ყავა (tskheli qava) - Hot coffee' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'გამარჯობა (gamarjoba)', options: ['goodbye', 'hello', 'thank you', 'please'], correct: 'hello' },
    { georgian: 'დედა (deda)', options: ['father', 'mother', 'sister', 'brother'], correct: 'mother' },
    { georgian: 'მაგიდა (magida)', options: ['chair', 'table', 'book', 'door'], correct: 'table' },
    { georgian: 'ჭამა (chama)', options: ['to drink', 'to walk', 'to eat', 'to talk'], correct: 'to eat' },
    { georgian: 'დიდი (didi)', options: ['small', 'big', 'good', 'bad'], correct: 'big' }
  ];

  const translationExercises = [
    { english: 'thank you', options: ['გამარჯობა (gamarjoba)', 'ნახვამდის (nakhvamdis)', 'გმადლობთ (gmadlobt)', 'გთხოვთ (gtxovt)'], correct: 'გმადლობთ (gmadlobt)' },
    { english: 'child', options: ['კაცი (katsi)', 'ქალი (kali)', 'ბავშვი (bavshvi)', 'მეგობარი (megobari)'], correct: 'ბავშვი (bavshvi)' },
    { english: 'book', options: ['მაგიდა (magida)', 'სკამი (skami)', 'წიგნი (tsigni)', 'კარი (kari)'], correct: 'წიგნი (tsigni)' },
    { english: 'to walk', options: ['კეთება (keteba)', 'სწავლა (stsavla)', 'ჭამა (chama)', 'სიარული (siaruli)'], correct: 'სიარული (siaruli)' },
    { english: 'beautiful', options: ['დიდი (didi)', 'პატარა (patara)', 'კარგი (kargi)', 'ლამაზი (lamazi)'], correct: 'ლამაზი (lamazi)' }
  ];

  const fillInBlankExercises = [
    { 
      sentence: "_____ ვარ საქართველოში.", 
      blank: "გამარჯობა", 
      hint: "This is a greeting word (gamarjoba)",
      translation: "Hello, I am in Georgia."
    },
    { 
      sentence: "ეს ჩემი _____ არის.", 
      blank: "მეგობარი", 
      hint: "This refers to a person you know well (megobari)",
      translation: "This is my friend."
    },
    { 
      sentence: "მე _____ ვსვამ.", 
      blank: "წყალს", 
      hint: "This is something you drink (tsqals)",
      translation: "I am drinking water."
    },
    { 
      sentence: "ეს _____ წიგნია.", 
      blank: "კარგი", 
      hint: "This is a positive quality (kargi)",
      translation: "This is a good book."
    },
    { 
      sentence: "_____, როგორ ხარ?", 
      blank: "გამარჯობა", 
      hint: "This is how you start a conversation (gamarjoba)",
      translation: "Hello, how are you?"
    }
  ];

  // Track time spent on the page
  useEffect(() => {
    // Set up interval to track time spent
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      
      // Only count time if user has been active in the last 5 minutes
      if (timeDiff < 5 * 60 * 1000) {
        setTimeSpent(prev => prev + 1);
      }
      
      setLastActivityTime(now);
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [lastActivityTime]);

  // Update user activity time on interactions
  const updateActivity = () => {
    setLastActivityTime(Date.now());
  };

  // Save progress when user leaves the page
  useEffect(() => {
    // Track initial visit
    if (user) {
      updateProgress('basic-vocabulary', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  (blankFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('basic-vocabulary', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, blankFeedback]);

  const playAudio = (word: string) => {
    updateActivity();
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const toggleCategory = (categoryId: string) => {
    updateActivity();
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

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleBlankSubmit = () => {
    updateActivity();
    const exercise = fillInBlankExercises[currentExerciseIndex];
    const isCorrect = blankInput.trim().toLowerCase() === exercise.blank.toLowerCase();
    setBlankFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'fill-in-blank' && currentExerciseIndex < fillInBlankExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setBlankInput('');
      setBlankFeedback(null);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setBlankInput('');
    setBlankFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (!selectedAnswer) return false;
    
    if (exerciseMode === 'matching') {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation') {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    }
    
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Basic Vocabulary</span> - ძირითადი ლექსიკა (dziritadi leksika)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn essential Georgian words and phrases organized by categories.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/beginner"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Beginner Level
                </Link>
                <Link
                  to="/beginner/quiz/vocabulary"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Brain className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice pronunciation with audio</li>
                  <li>• Create flashcards for review</li>
                  <li>• Use words in simple sentences</li>
                  <li>• Learn related words together</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {categories.map((category) => (
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
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {word.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(word.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === word.georgian
                                ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('matching')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Word Matching
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match Georgian words with their English meanings
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('translation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Translation Practice
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Translate English words to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('fill-in-blank')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Fill in the Blank
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Complete sentences with the correct Georgian words
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 'Fill in the Blank'}
                </h3>
                <button
                  onClick={() => setExerciseMode(null)}
                  className={`px-4 py-2 rounded ${
                    theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Back to Exercises
                </button>
              </div>
              
              {exerciseMode === 'matching' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Match the Georgian word with its English meaning:
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className={`text-xl font-bold mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {matchingExercises[currentExerciseIndex].georgian}
                      </span>
                      <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        =
                      </span>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {matchingExercises[currentExerciseIndex].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleExerciseAnswer(option)}
                            className={`px-4 py-2 rounded-md ${
                              selectedAnswer === option
                                ? option === matchingExercises[currentExerciseIndex].correct
                                  ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                                : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {showFeedback && (
                      <div className={`p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${matchingExercises[currentExerciseIndex].correct}".`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < matchingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'translation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Select the Georgian translation for: <span className="font-bold">{translationExercises[currentExerciseIndex].english}</span>
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {translationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === translationExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${translationExercises[currentExerciseIndex].correct}".`}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < translationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'fill-in-blank' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Fill in the blank with the correct Georgian word:
                  </p>
                  
                  <div className="mb-6">
                    <div className="mb-4">
                      <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {fillInBlankExercises[currentExerciseIndex].sentence}
                      </p>
                      <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Translation: {fillInBlankExercises[currentExerciseIndex].translation}
                      </p>
                      
                      <input
                        type="text"
                        value={blankInput}
                        onChange={(e) => setBlankInput(e.target.value)}
                        className={`w-full px-4 py-2 rounded-md ${
                          theme === 'dark'
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Type the missing Georgian word"
                      />
                      
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={handleBlankSubmit}
                          className={`px-6 py-2 rounded-md ${
                            theme === 'dark'
                              ? 'bg-blue-700 hover:bg-blue-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Check
                        </button>
                      </div>
                    </div>
                    
                    {blankFeedback && (
                      <div className={`p-4 rounded-md ${
                        blankFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {blankFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : <>
                              <p>Incorrect. The correct answer is "{fillInBlankExercises[currentExerciseIndex].blank}".</p>
                              <p className="mt-2 text-sm">Hint: {fillInBlankExercises[currentExerciseIndex].hint}</p>
                            </>
                        }
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={resetExercise}
                      className={`px-4 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      Reset
                    </button>
                    
                    {currentExerciseIndex < fillInBlankExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!blankFeedback}
                        className={`px-4 py-2 rounded ${
                          !blankFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BasicVocabularyPage;