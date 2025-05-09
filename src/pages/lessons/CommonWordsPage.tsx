import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

const CommonWordsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'fill-in-blank' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [blankInput, setBlankInput] = useState('');
  const [blankFeedback, setBlankFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      updateProgress('common-words', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (blankFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 2;
        
        updateProgress('common-words', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, blankFeedback]);

  const studyTips = {
    reading: [
      'Practice reading Georgian texts daily, even if you don\'t understand everything',
      'Use context clues to guess word meanings',
      'Create flashcards with Georgian words and their translations',
      'Read Georgian news websites or children\'s books',
      'Highlight new words and create a personal dictionary',
      'Use spaced repetition techniques for vocabulary review',
      'Practice word recognition with different fonts and handwriting',
      'Join online Georgian reading groups'
    ],
    listening: [
      'Listen to Georgian podcasts and radio shows',
      'Watch Georgian movies with subtitles',
      'Practice with native speaker recordings',
      'Focus on intonation and pronunciation patterns',
      'Record yourself repeating words and phrases',
      'Use language learning apps with audio features',
      'Listen to Georgian music and try to sing along',
      'Participate in online language exchange sessions'
    ],
    speaking: [
      'Practice speaking with native Georgian speakers',
      'Record yourself speaking and analyze your pronunciation',
      'Use language exchange apps to find conversation partners',
      'Speak Georgian daily, even if just to yourself',
      'Focus on proper stress and intonation',
      'Join Georgian language meetups or online groups',
      'Practice common phrases and expressions',
      'Use role-play scenarios to improve fluency'
    ],
    writing: [
      'Keep a daily journal in Georgian',
      'Practice writing common phrases and sentences',
      'Use Georgian keyboard layouts for authentic writing',
      'Write emails or messages to language exchange partners',
      'Study proper Georgian punctuation rules',
      'Practice writing both printed and cursive forms',
      'Create story summaries in Georgian',
      'Participate in online Georgian writing workshops'
    ]
  };

  const commonWords = {
    pronouns: [
      { georgian: "მე", english: "I", pronunciation: "me" },
      { georgian: "შენ", english: "you", pronunciation: "shen" },
      { georgian: "ის", english: "he/she/it", pronunciation: "is" },
      { georgian: "ჩვენ", english: "we", pronunciation: "chven" },
      { georgian: "თქვენ", english: "you (plural)", pronunciation: "tkven" },
      { georgian: "ისინი", english: "they", pronunciation: "isini" },
      { georgian: "ჩემი", english: "my", pronunciation: "chemi" },
      { georgian: "შენი", english: "your", pronunciation: "sheni" },
      { georgian: "მისი", english: "his/her", pronunciation: "misi" },
      { georgian: "ჩვენი", english: "our", pronunciation: "chveni" },
      { georgian: "თქვენი", english: "your (plural)", pronunciation: "tkveni" },
      { georgian: "მათი", english: "their", pronunciation: "mati" },
      { georgian: "ეს", english: "this", pronunciation: "es" },
      { georgian: "ის", english: "that", pronunciation: "is" },
      { georgian: "ესენი", english: "these", pronunciation: "eseni" }
    ],
    verbs: [
      { georgian: "არის", english: "is", pronunciation: "aris" },
      { georgian: "ვარ", english: "am", pronunciation: "var" },
      { georgian: "ხარ", english: "are", pronunciation: "khar" },
      { georgian: "მინდა", english: "I want", pronunciation: "minda" },
      { georgian: "მიყვარს", english: "I love", pronunciation: "miqvars" },
      { georgian: "მომწონს", english: "I like", pronunciation: "momtsons" },
      { georgian: "მაქვს", english: "I have", pronunciation: "makvs" },
      { georgian: "ვჭამ", english: "I eat", pronunciation: "vcham" },
      { georgian: "ვსვამ", english: "I drink", pronunciation: "vsvam" },
      { georgian: "ვხედავ", english: "I see", pronunciation: "vkhedav" },
      { georgian: "ვწერ", english: "I write", pronunciation: "vtser" },
      { georgian: "ვკითხულობ", english: "I read", pronunciation: "vkitkhulob" },
      { georgian: "ვსწავლობ", english: "I learn", pronunciation: "vstsavlob" },
      { georgian: "ვმუშაობ", english: "I work", pronunciation: "vmushaob" },
      { georgian: "ვცხოვრობ", english: "I live", pronunciation: "vtskhovrob" }
    ],
    basics: [
      { georgian: "კი", english: "yes", pronunciation: "ki" },
      { georgian: "არა", english: "no", pronunciation: "ara" },
      { georgian: "არ", english: "not", pronunciation: "ar" },
      { georgian: "და", english: "and", pronunciation: "da" },
      { georgian: "ან", english: "or", pronunciation: "an" },
      { georgian: "თუ", english: "if", pronunciation: "tu" },
      { georgian: "რომ", english: "that", pronunciation: "rom" },
      { georgian: "მაგრამ", english: "but", pronunciation: "magram" },
      { georgian: "რადგან", english: "because", pronunciation: "radgan" },
      { georgian: "როცა", english: "when", pronunciation: "rotsa" },
      { georgian: "სად", english: "where", pronunciation: "sad" },
      { georgian: "როგორ", english: "how", pronunciation: "rogor" },
      { georgian: "რატომ", english: "why", pronunciation: "ratom" },
      { georgian: "რა", english: "what", pronunciation: "ra" },
      { georgian: "ვინ", english: "who", pronunciation: "vin" }
    ],
    nouns: [
      { georgian: "სახლი", english: "house", pronunciation: "sakhli" },
      { georgian: "კაცი", english: "man", pronunciation: "katsi" },
      { georgian: "ქალი", english: "woman", pronunciation: "kali" },
      { georgian: "ბავშვი", english: "child", pronunciation: "bavshvi" },
      { georgian: "დედა", english: "mother", pronunciation: "deda" },
      { georgian: "მამა", english: "father", pronunciation: "mama" },
      { georgian: "ძმა", english: "brother", pronunciation: "dzma" },
      { georgian: "და", english: "sister", pronunciation: "da" },
      { georgian: "მეგობარი", english: "friend", pronunciation: "megobari" },
      { georgian: "წიგნი", english: "book", pronunciation: "tsigni" },
      { georgian: "მასწავლებელი", english: "teacher", pronunciation: "mastsavlebeli" },
      { georgian: "მოსწავლე", english: "student", pronunciation: "mostsavle" },
      { georgian: "ექიმი", english: "doctor", pronunciation: "ekimi" },
      { georgian: "მანქანა", english: "car", pronunciation: "manqana" },
      { georgian: "ფანჯარა", english: "window", pronunciation: "panjara" }
    ],
    food: [
      { georgian: "პური", english: "bread", pronunciation: "puri" },
      { georgian: "წყალი", english: "water", pronunciation: "tsqali" },
      { georgian: "ღვინო", english: "wine", pronunciation: "ghvino" },
      { georgian: "ყავა", english: "coffee", pronunciation: "qava" },
      { georgian: "ჩაი", english: "tea", pronunciation: "chai" },
      { georgian: "ხორცი", english: "meat", pronunciation: "khortsi" },
      { georgian: "თევზი", english: "fish", pronunciation: "tevzi" },
      { georgian: "ხილი", english: "fruit", pronunciation: "khili" },
      { georgian: "ბოსტნეული", english: "vegetables", pronunciation: "bostneuli" },
      { georgian: "ყველი", english: "cheese", pronunciation: "qveli" },
      { georgian: "კარტოფილი", english: "potato", pronunciation: "kartopili" },
      { georgian: "პომიდორი", english: "tomato", pronunciation: "pomidori" },
      { georgian: "კიტრი", english: "cucumber", pronunciation: "kitri" },
      { georgian: "სტაფილო", english: "carrot", pronunciation: "stapilo" },
      { georgian: "ხახვი", english: "onion", pronunciation: "khakhvi" }
    ]
  };

  // Exercise data
  const matchingExercises = [
    { georgian: "მე (me)", options: ['you', 'I', 'he', 'we'], correct: 'I' },
    { georgian: "არის (aris)", options: ['am', 'are', 'is', 'be'], correct: 'is' },
    { georgian: "სახლი (sakhli)", options: ['house', 'car', 'book', 'window'], correct: 'house' },
    { georgian: "მინდა (minda)", options: ['I need', 'I want', 'I have', 'I like'], correct: 'I want' },
    { georgian: "კი (ki)", options: ['no', 'yes', 'maybe', 'please'], correct: 'yes' }
  ];

  const translationExercises = [
    { english: "water", options: ['წყალი (tsqali)', 'ღვინო (ghvino)', 'ჩაი (chai)', 'ყავა (qava)'], correct: 'წყალი (tsqali)' },
    { english: "book", options: ['წიგნი (tsigni)', 'კაცი (katsi)', 'ქალი (kali)', 'ბავშვი (bavshvi)'], correct: 'წიგნი (tsigni)' },
    { english: "I love", options: ['მინდა (minda)', 'მიყვარს (miqvars)', 'მაქვს (makvs)', 'ვარ (var)'], correct: 'მიყვარს (miqvars)' },
    { english: "where", options: ['როგორ (rogor)', 'რატომ (ratom)', 'სად (sad)', 'როცა (rotsa)'], correct: 'სად (sad)' },
    { english: "friend", options: ['მეგობარი (megobari)', 'ოჯახი (ojakhi)', 'მასწავლებელი (mastsavlebeli)', 'ექიმი (ekimi)'], correct: 'მეგობარი (megobari)' }
  ];

  const fillInBlankExercises = [
    { 
      sentence: "მე _____ ვარ", 
      options: ["კარგად (kargad)", "კარგი (kargi)", "კარგ (karg)"],
      correct: "კარგად (kargad)",
      translation: "I am well"
    },
    { 
      sentence: "ეს _____ წიგნია", 
      options: ["ჩემი (chemi)", "შენი (sheni)", "მისი (misi)"],
      correct: "ჩემი (chemi)",
      translation: "This is my book"
    },
    { 
      sentence: "მე _____ მიყვარს", 
      options: ["ის (is)", "შენ (shen)", "ჩვენ (chven)"],
      correct: "შენ (shen)",
      translation: "I love you"
    },
    { 
      sentence: "_____ მინდა წყალი", 
      options: ["მე (me)", "შენ (shen)", "მას (mas)"],
      correct: "მე (me)",
      translation: "I want water"
    },
    { 
      sentence: "ის _____ ცხოვრობს", 
      options: ["თბილისში (tbilisshi)", "თბილისი (tbilisi)", "თბილისს (tbiliss)"],
      correct: "თბილისში (tbilisshi)",
      translation: "He/she lives in Tbilisi"
    }
  ];

  const playAudio = (word: string) => {
    updateActivity();
    if (isPlaying === word) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = `https://api.example.com/audio/${word}.mp3`;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(word);
      }
    }
  };

  const playAllAudio = (words: string[]) => {
    updateActivity();
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex < words.length) {
        playAudio(words[currentIndex]);
        currentIndex++;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', playNext);
      playNext();
    }
  };

  const toggleType = (typeId: string) => {
    updateActivity();
    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
      setTimeout(() => {
        if (contentRefs.current[typeId]) {
          const headerOffset = 100;
          const elementPosition = contentRefs.current[typeId]?.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleBlankSubmit = (correct: string) => {
    updateActivity();
    setBlankFeedback(blankInput === correct ? 'correct' : 'incorrect');
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
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setBlankInput('');
    setBlankFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'matching') {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation') {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(null)}
        onError={() => {
          console.log('Audio file not found or error playing audio');
          setIsPlaying(null);
        }}
      />
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Common Words</span> - გავრცელებული სიტყვები (gavrtselebuli sitqvebi)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master these essential Georgian words to build your vocabulary
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
                  to="/intermediate/quiz/common-words"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Study Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice pronunciation daily</li>
                  <li>• Create flashcards with these words</li>
                  <li>• Use words in simple sentences</li>
                  <li>• Review regularly to retain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(commonWords).map(([category, words]) => (
            <div key={category} className="mb-8">
              <button
                onClick={() => toggleType(category)}
                className={`w-full text-left p-6 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play all words in category
                    }}
                    className={`p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Volume2 size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                  </button>
                </div>
              </button>

              {expandedType === category && (
                <div className={`mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {words.map((word, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                      } hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {word.georgian}
                        </span>
                        <button
                          onClick={() => playAudio(word.georgian)}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying === word.georgian
                              ? (theme === 'dark' ? 'bg-green-600' : 'bg-green-500')
                              : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                          }`}
                        >
                          <Play size={16} className={
                            isPlaying === word.georgian
                              ? 'text-white'
                              : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                          } />
                        </button>
                      </div>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                        {word.english}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        /{word.pronunciation}/
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
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
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
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
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
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
                    Choose the correct word to complete the sentence:
                  </p>
                  
                  <div className="mb-6">
                    <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {fillInBlankExercises[currentExerciseIndex].sentence}
                    </p>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Translation: {fillInBlankExercises[currentExerciseIndex].translation}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {fillInBlankExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setBlankInput(option)}
                          className={`px-4 py-2 rounded-md ${
                            blankInput === option
                              ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleBlankSubmit(fillInBlankExercises[currentExerciseIndex].correct)}
                      disabled={!blankInput}
                      className={`px-6 py-2 rounded-md ${
                        !blankInput
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                      }`}
                    >
                      Check
                    </button>
                    
                    {blankFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        blankFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {blankFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${fillInBlankExercises[currentExerciseIndex].correct}".`}
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
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
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

export default CommonWordsPage;