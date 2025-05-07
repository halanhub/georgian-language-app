import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronRight, Pencil, Play, Volume2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Example {
  georgian: string;
  pronunciation: string;
  english: string;
  explanation: string;
}

const SentenceConstructionPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'arrange' | 'complete' | 'transform' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [transformInput, setTransformInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

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
      updateProgress('sentences', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = arrangedWords.length + 
                                  (selectedOption ? 1 : 0) + 
                                  (transformInput ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 5;
        
        updateProgress('sentences', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, arrangedWords, selectedOption, transformInput]);

  const basicRules = [
    {
      title: "Subject-Object-Verb (SOV) Order",
      description: "Georgian primarily follows SOV word order",
      examples: [
        {
          georgian: "გიორგი წიგნს კითხულობს",
          pronunciation: "giorgi tsigns kitkholobs",
          english: "Giorgi (S) is reading (V) a book (O)",
          explanation: "The subject (Giorgi) comes first, followed by the object (book), and the verb (is reading) at the end"
        },
        {
          georgian: "ნინო ჩაის სვამს",
          pronunciation: "nino chais svams",
          english: "Nino (S) is drinking (V) tea (O)",
          explanation: "Subject (Nino) + Object (tea) + Verb (is drinking)"
        }
      ]
    },
    {
      title: "Postpositions Instead of Prepositions",
      description: "Georgian uses postpositions that come after nouns",
      examples: [
        {
          georgian: "სახლში მივდივარ",
          pronunciation: "sakhlshi mivdivar",
          english: "I am going to (the) house",
          explanation: "-ში (-shi) is a postposition meaning 'in/into/to'"
        },
        {
          georgian: "მაგიდაზე დევს",
          pronunciation: "magidaze devs",
          english: "It lies on the table",
          explanation: "-ზე (-ze) is a postposition meaning 'on'"
        }
      ]
    },
    {
      title: "Verb Agreement",
      description: "Verbs agree with both subject and object",
      examples: [
        {
          georgian: "მე შენ გხედავ",
          pronunciation: "me shen gkhedav",
          english: "I see you",
          explanation: "The verb გხედავ shows agreement with both 'I' (subject) and 'you' (object)"
        },
        {
          georgian: "ის მას ხედავს",
          pronunciation: "is mas khedavs",
          english: "He/she sees him/her",
          explanation: "The verb changes to show third-person subject and object"
        }
      ]
    },
    {
      title: "Case System",
      description: "Georgian nouns change form based on their role",
      examples: [
        {
          georgian: "კაცი წერილს წერს",
          pronunciation: "katsi tserils tsers",
          english: "The man writes a letter",
          explanation: "კაცი (nominative case) + წერილს (dative case) + verb"
        },
        {
          georgian: "დედამ საჭმელი მოამზადა",
          pronunciation: "dedam sachmeli moamzada",
          english: "Mother prepared food",
          explanation: "დედამ (ergative case) + საჭმელი (nominative case) + verb"
        }
      ]
    },
    {
      title: "Question Formation",
      description: "Questions often use specific particles or word order",
      examples: [
        {
          georgian: "სად მიდიხარ?",
          pronunciation: "sad midikhar?",
          english: "Where are you going?",
          explanation: "Question word სად (where) comes at the beginning"
        },
        {
          georgian: "გინდა ჩაი?",
          pronunciation: "ginda chai?",
          english: "Do you want tea?",
          explanation: "Yes/no questions often maintain SOV order with rising intonation"
        }
      ]
    },
    {
      title: "Adjective Placement",
      description: "Adjectives come before the nouns they modify",
      examples: [
        {
          georgian: "ლამაზი სახლი",
          pronunciation: "lamazi sakhli",
          english: "Beautiful house",
          explanation: "Adjective (ლამაზი) precedes the noun (სახლი)"
        },
        {
          georgian: "დიდი წითელი წიგნი",
          pronunciation: "didi tsiteli tsigni",
          english: "Big red book",
          explanation: "Multiple adjectives come before the noun in order: size, color, noun"
        }
      ]
    },
    {
      title: "Possession",
      description: "Possession is shown through case endings",
      examples: [
        {
          georgian: "ჩემი წიგნი",
          pronunciation: "chemi tsigni",
          english: "My book",
          explanation: "Possessive pronoun (ჩემი) + noun"
        },
        {
          georgian: "კაცის სახლი",
          pronunciation: "katsis sakhli",
          english: "Man's house",
          explanation: "Possessor (კაცის) in genitive case + possessed noun"
        }
      ]
    },
    {
      title: "Time Expressions",
      description: "Time expressions often come at the beginning",
      examples: [
        {
          georgian: "დილას სკოლაში მივდივარ",
          pronunciation: "dilas skolashi mivdivar",
          english: "In the morning I go to school",
          explanation: "Time (დილას) + location + verb"
        },
        {
          georgian: "გუშინ წერილი დავწერე",
          pronunciation: "gushin tserili davtsere",
          english: "Yesterday I wrote a letter",
          explanation: "Time (გუშინ) + object + verb"
        }
      ]
    },
    {
      title: "Negation",
      description: "Negation uses the particle არ or ვერ",
      examples: [
        {
          georgian: "არ მინდა",
          pronunciation: "ar minda",
          english: "I don't want",
          explanation: "არ (not) comes before the verb"
        },
        {
          georgian: "ვერ ვხედავ",
          pronunciation: "ver vkhedav",
          english: "I cannot see",
          explanation: "ვერ (cannot) indicates inability rather than unwillingness"
        }
      ]
    },
    {
      title: "Indirect Objects",
      description: "Indirect objects typically come before direct objects",
      examples: [
        {
          georgian: "დედა შვილს წიგნს აძლევს",
          pronunciation: "deda shvils tsigns adzlevs",
          english: "Mother gives the child a book",
          explanation: "Subject + indirect object (შვილს) + direct object (წიგნს) + verb"
        },
        {
          georgian: "მე მას წერილს ვუგზავნი",
          pronunciation: "me mas tserils vugzavni",
          english: "I am sending him/her a letter",
          explanation: "Subject + indirect object (მას) + direct object (წერილს) + verb"
        }
      ]
    }
  ];

  const exercises = [
    {
      type: "Arrange words",
      instruction: "Arrange these words to form a correct Georgian sentence:",
      words: ["წიგნს (tsigns)", "ბავშვი (bavshvi)", "კითხულობს (kitkholobs)"],
      correctOrder: "ბავშვი (bavshvi) წიგნს (tsigns) კითხულობს (kitkholobs)",
      translation: "The child is reading a book"
    },
    {
      type: "Complete sentence",
      instruction: "Complete the sentence with the correct form:",
      sentence: "მე ___ ვწერ",
      options: ["წერილს (tserils)", "წერილი (tserili)", "წერილმა (tserilma)"],
      correct: "წერილს (tserils)",
      explanation: "Direct objects take the dative case (-ს)"
    },
    {
      type: "Transform",
      instruction: "Transform this positive sentence into negative:",
      sentence: "ვხედავ მას (vkhedav mas)",
      answer: "არ ვხედავ მას (ar vkhedav mas)",
      explanation: "Add არ before the verb to make it negative"
    }
  ];

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const startArrangeExercise = () => {
    updateActivity();
    setExerciseMode('arrange');
    setArrangedWords([]);
    setAvailableWords([...exercises[0].words]);
    setShowFeedback(false);
  };

  const handleWordClick = (word: string, isArranged: boolean) => {
    updateActivity();
    if (isArranged) {
      // Move from arranged back to available
      setArrangedWords(arrangedWords.filter(w => w !== word));
      setAvailableWords([...availableWords, word]);
    } else {
      // Move from available to arranged
      setAvailableWords(availableWords.filter(w => w !== word));
      setArrangedWords([...arrangedWords, word]);
    }
  };

  const checkArrangeAnswer = () => {
    updateActivity();
    setShowFeedback(true);
  };

  const handleOptionSelect = (option: string) => {
    updateActivity();
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleTransformSubmit = () => {
    updateActivity();
    setShowFeedback(true);
  };

  const isArrangeCorrect = () => {
    return arrangedWords.join(' ') === exercises[0].correctOrder;
  };

  const isCompleteCorrect = () => {
    return selectedOption === exercises[1].correct;
  };

  const isTransformCorrect = () => {
    return transformInput.trim().toLowerCase() === exercises[2].answer.toLowerCase();
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Sentence Construction</span> - წინადადების აგება (tsinadadebis ageba)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn how to build proper Georgian sentences with these essential rules and patterns.
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
                  to="/intermediate/quiz/sentences"
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
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Book className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Start with basic SOV patterns</li>
                  <li>• Practice with simple sentences first</li>
                  <li>• Pay attention to case endings</li>
                  <li>• Learn verb conjugation patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Basic Sentence Patterns
          </h2>
          
          <div className="space-y-8">
            {basicRules.map((rule, ruleIndex) => (
              <div 
                key={ruleIndex}
                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {rule.title}
                </h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {rule.description}
                </p>
                
                <div className="space-y-4">
                  {rule.examples.map((example, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {example.georgian}
                        </p>
                        <button
                          onClick={() => playAudio(example.georgian)}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying === example.georgian
                              ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300')
                          }`}
                        >
                          <Play size={16} className={
                            isPlaying === example.georgian
                              ? 'text-white'
                              : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                          } />
                        </button>
                      </div>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{example.pronunciation}/
                      </p>
                      <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {example.english}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Check size={16} className="inline mr-2 text-green-500" />
                        {example.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-8 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Pencil className="mr-2" size={24} />
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={startArrangeExercise}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Word Arrangement
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Arrange words to form correct Georgian sentences
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('complete')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sentence Completion
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Complete sentences with the correct form
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('transform')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sentence Transformation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Transform sentences from positive to negative
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'arrange' ? 'Word Arrangement' : 
                   exerciseMode === 'complete' ? 'Sentence Completion' : 'Sentence Transformation'}
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
              
              {exerciseMode === 'arrange' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exercises[0].instruction}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2 border-dashed min-h-20 flex flex-wrap gap-2 items-center
                      ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}">
                      {arrangedWords.length > 0 ? (
                        arrangedWords.map((word, index) => (
                          <button
                            key={index}
                            onClick={() => handleWordClick(word, true)}
                            className={`px-3 py-2 rounded ${
                              theme === 'dark' 
                                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}
                          >
                            {word}
                          </button>
                        ))
                      ) : (
                        <span className={`text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Drag words here to form a sentence
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Available words:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableWords.map((word, index) => (
                          <button
                            key={index}
                            onClick={() => handleWordClick(word, false)}
                            className={`px-3 py-2 rounded ${
                              theme === 'dark' 
                                ? 'bg-gray-600 text-white hover:bg-gray-500' 
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={checkArrangeAnswer}
                      disabled={arrangedWords.length !== exercises[0].words.length}
                      className={`mt-4 px-4 py-2 rounded ${
                        arrangedWords.length !== exercises[0].words.length
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700')
                      }`}
                    >
                      Check Answer
                    </button>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isArrangeCorrect()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isArrangeCorrect()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct order is: "${exercises[0].correctOrder}"`}
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Translation: {exercises[0].translation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'complete' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exercises[1].instruction}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      {exercises[1].sentence.split('___').map((part, partIndex, array) => (
                        <React.Fragment key={partIndex}>
                          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{part}</span>
                          {partIndex < array.length - 1 && (
                            <div className="inline-block">
                              {selectedOption ? (
                                <span className={`px-3 py-2 rounded ${
                                  selectedOption === exercises[1].correct
                                    ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                    : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                                }`}>
                                  {selectedOption}
                                </span>
                              ) : (
                                <span className={`px-3 py-2 rounded border-2 border-dashed ${
                                  theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'
                                }`}>
                                  ___
                                </span>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Choose the correct option:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exercises[1].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            disabled={showFeedback}
                            className={`px-3 py-2 rounded ${
                              selectedOption === option
                                ? option === exercises[1].correct
                                  ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                                : (theme === 'dark' 
                                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300')
                            } ${showFeedback && option !== selectedOption ? 'opacity-50' : ''}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCompleteCorrect()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCompleteCorrect()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${exercises[1].correct}"`}
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {exercises[1].explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'transform' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exercises[2].instruction}
                  </p>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      <p className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
                        {exercises[2].sentence}
                      </p>
                    </div>
                    
                    <input
                      type="text"
                      value={transformInput}
                      onChange={(e) => {
                        updateActivity();
                        setTransformInput(e.target.value);
                      }}
                      placeholder="Type your answer..."
                      className={`w-full px-4 py-2 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-600 text-white border-gray-500'
                          : 'bg-white text-gray-800 border-gray-300'
                      } border`}
                    />
                    
                    <button
                      onClick={handleTransformSubmit}
                      disabled={!transformInput.trim()}
                      className={`mt-4 px-4 py-2 rounded ${
                        !transformInput.trim()
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700')
                      }`}
                    >
                      Check Answer
                    </button>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isTransformCorrect()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isTransformCorrect()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${exercises[2].answer}"`}
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {exercises[2].explanation}
                        </p>
                      </div>
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

export default SentenceConstructionPage;