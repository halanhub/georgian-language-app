import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Idiom {
  georgian: string;
  latin: string;
  literal: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  explanation: string;
  category: string;
}

interface IdiomCategory {
  id: string;
  title: string;
  description: string;
  idioms: Idiom[];
}

const IdiomaticExpressionsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'meaning' | 'usage' | 'context' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      
      if (timeDiff < 5 * 60 * 1000) {
        setTimeSpent(prev => prev + 1);
      }
      
      setLastActivityTime(now);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [lastActivityTime]);

  const updateActivity = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    if (user) {
      updateProgress('idiomatic-expressions', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (feedback === 'correct' ? 1 : 0);
        
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('idiomatic-expressions', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, feedback, updateProgress]);

  const idiomCategories: IdiomCategory[] = [
    {
      id: 'emotions',
      title: 'Emotional Expressions',
      description: 'Idioms expressing feelings and emotional states',
      idioms: [
        {
          georgian: 'გული გადამიტრიალდა',
          latin: 'guli gadamitrialda',
          literal: 'My heart turned over',
          meaning: 'To feel disgusted or nauseated',
          example: 'ამ სურათის დანახვაზე გული გადამიტრიალდა',
          exampleTranslation: 'When I saw this picture, I felt sick',
          explanation: 'Used when something causes strong disgust or nausea',
          category: 'emotions'
        },
        {
          georgian: 'გული მიკანკალებს',
          latin: 'guli mikanalebs',
          literal: 'My heart is trembling',
          meaning: 'To be very nervous or anxious',
          example: 'გამოცდის წინ გული მიკანკალებს',
          exampleTranslation: 'I\'m nervous before the exam',
          explanation: 'Expresses anxiety or nervousness before important events',
          category: 'emotions'
        }
      ]
    },
    {
      id: 'relationships',
      title: 'Relationships and Social Interactions',
      description: 'Idioms about human relationships and social dynamics',
      idioms: [
        {
          georgian: 'ენას კბილი დააჭირე',
          latin: 'enas kbili daachire',
          literal: 'Bite your tongue',
          meaning: 'Keep quiet, don\'t say anything',
          example: 'ჯობია ენას კბილი დააჭირო ამ სიტუაციაში',
          exampleTranslation: 'It\'s better to keep quiet in this situation',
          explanation: 'Used when advising someone to refrain from speaking',
          category: 'relationships'
        },
        {
          georgian: 'თვალი დაადგა',
          latin: 'tvali daadga',
          literal: 'Put an eye on',
          meaning: 'To keep watch over someone/something',
          example: 'ბავშვებს თვალი დაადგი, სანამ დავბრუნდები',
          exampleTranslation: 'Keep an eye on the children until I return',
          explanation: 'Used for watching over or monitoring something/someone',
          category: 'relationships'
        }
      ]
    },
    {
      id: 'life-wisdom',
      title: 'Life and Wisdom',
      description: 'Traditional sayings expressing life wisdom and philosophy',
      idioms: [
        {
          georgian: 'რაც მოგივა დავითაო, ყველა შენი თავითაო',
          latin: 'rats mogiva davitao, qvela sheni tavitao',
          literal: 'Whatever happens to you Davit, it\'s all from your own doing',
          meaning: 'You are responsible for your own actions',
          example: 'შეცდომები დაუშვი და ახლა შედეგებს იმკი - რაც მოგივა დავითაო, ყველა შენი თავითაო',
          exampleTranslation: 'You made mistakes and now face the consequences - you are responsible for your actions',
          explanation: 'Traditional saying about personal responsibility',
          category: 'life-wisdom'
        },
        {
          georgian: 'ცოდნა განძია',
          latin: 'tsodna gandzia',
          literal: 'Knowledge is treasure',
          meaning: 'Education and knowledge are valuable',
          example: 'ბევრი იმეცადინე, ცოდნა განძია',
          exampleTranslation: 'Study hard, knowledge is treasure',
          explanation: 'Emphasizes the importance of education and learning',
          category: 'life-wisdom'
        }
      ]
    },
    {
      id: 'daily-life',
      title: 'Daily Life and Activities',
      description: 'Idioms used in everyday situations',
      idioms: [
        {
          georgian: 'თავი გამოიდო',
          latin: 'tavi gamoido',
          literal: 'Put one\'s head out',
          meaning: 'To make a great effort, to try hard',
          example: 'პროექტის დასრულებაზე თავი გამოიდო',
          exampleTranslation: 'He/she made a great effort to complete the project',
          explanation: 'Used when someone puts in exceptional effort',
          category: 'daily-life'
        },
        {
          georgian: 'ხელი მოჰკიდა',
          latin: 'kheli mohkida',
          literal: 'Put hand to it',
          meaning: 'To start doing something, to undertake',
          example: 'ახალ საქმეს ხელი მოჰკიდა',
          exampleTranslation: 'He/she started a new business',
          explanation: 'Used when someone begins a new endeavor',
          category: 'daily-life'
        }
      ]
    }
  ];

  const meaningExercises = [
    {
      prompt: "What is the meaning of 'გული გადამიტრიალდა' (guli gadamitrialda)?",
      options: [
        "To feel disgusted or nauseated",
        "To feel happy",
        "To feel tired",
        "To feel hungry"
      ],
      correct: "To feel disgusted or nauseated",
      explanation: "This idiom literally means 'my heart turned over' and is used to express feeling disgusted or nauseated."
    },
    {
      prompt: "What does 'ენას კბილი დააჭირე' (enas kbili daachire) mean?",
      options: [
        "Keep quiet, don't say anything",
        "Speak loudly",
        "Eat something",
        "Tell a secret"
      ],
      correct: "Keep quiet, don't say anything",
      explanation: "This idiom literally means 'bite your tongue' and is used to tell someone to keep quiet or not speak."
    }
  ];

  const usageExercises = [
    {
      prompt: "In which situation would you use 'თავი გამოიდო' (tavi gamoido)?",
      options: [
        "When someone makes an exceptional effort",
        "When someone is sleeping",
        "When someone is eating",
        "When someone is walking"
      ],
      correct: "When someone makes an exceptional effort",
      explanation: "This idiom is used when someone puts in exceptional effort or goes above and beyond."
    },
    {
      prompt: "When would you use 'გული მიკანკალებს' (guli mikanalebs)?",
      options: [
        "When feeling very nervous or anxious",
        "When feeling happy",
        "When feeling tired",
        "When feeling hungry"
      ],
      correct: "When feeling very nervous or anxious",
      explanation: "This idiom is used to express feeling nervous or anxious, especially before important events."
    }
  ];

  const contextExercises = [
    {
      prompt: "Which idiom would best describe someone watching over children?",
      options: [
        "თვალი დაადგა (tvali daadga)",
        "ენას კბილი დააჭირე (enas kbili daachire)",
        "გული გადამიტრიალდა (guli gadamitrialda)",
        "ხელი მოჰკიდა (kheli mohkida)"
      ],
      correct: "თვალი დაადგა (tvali daadga)",
      explanation: "თვალი დაადგა (tvali daadga) means 'to keep watch over' and is appropriate for describing supervision of children."
    },
    {
      prompt: "Which idiom would you use to describe starting a new project?",
      options: [
        "ხელი მოჰკიდა (kheli mohkida)",
        "გული მიკანკალებს (guli mikanalebs)",
        "თვალი დაადგა (tvali daadga)",
        "ენას კბილი დააჭირე (enas kbili daachire)"
      ],
      correct: "ხელი მოჰკიდა (kheli mohkida)",
      explanation: "ხელი მოჰკიდა (kheli mohkida) means 'to start doing something' and is perfect for describing beginning a new project."
    }
  ];

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

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedOption(answer);
    setShowFeedback(true);
    setFeedback(
      (exerciseMode === 'meaning' && answer === meaningExercises[currentExerciseIndex].correct) ||
      (exerciseMode === 'usage' && answer === usageExercises[currentExerciseIndex].correct) ||
      (exerciseMode === 'context' && answer === contextExercises[currentExerciseIndex].correct)
        ? 'correct'
        : 'incorrect'
    );
  };

  const nextExercise = () => {
    updateActivity();
    const maxExercises = 
      exerciseMode === 'meaning' ? meaningExercises.length :
      exerciseMode === 'usage' ? usageExercises.length :
      contextExercises.length;

    if (currentExerciseIndex < maxExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback(null);
  };

  const getCurrentExercise = () => {
    switch (exerciseMode) {
      case 'meaning':
        return meaningExercises[currentExerciseIndex];
      case 'usage':
        return usageExercises[currentExerciseIndex];
      case 'context':
        return contextExercises[currentExerciseIndex];
      default:
        return null;
    }
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Idiomatic Expressions</span> - იდიომატური გამოთქმები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master Georgian idioms and their cultural significance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/advanced"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Advanced Level
                </Link>
                <Link
                  to="/advanced/quiz/idioms"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Focus on understanding the cultural context</li>
                  <li>• Practice using idioms in conversations</li>
                  <li>• Learn the literal and figurative meanings</li>
                  <li>• Pay attention to usage situations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {idiomCategories.map((category) => (
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
                  <div className="mt-4 space-y-4">
                    {category.idioms.map((idiom, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {idiom.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(idiom.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === idiom.georgian
                                ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === idiom.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{idiom.latin}/
                          </p>
                          <p><span className="font-medium">Literal:</span> {idiom.literal}</p>
                          <p><span className="font-medium">Meaning:</span> {idiom.meaning}</p>
                          <div className={`mt-2 p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className="font-medium mb-1">Example:</p>
                            <p>{idiom.georgian}</p>
                            <p className="text-sm">{idiom.exampleTranslation}</p>
                          </div>
                          <div className={`mt-2 p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className="text-sm">
                              <span className="font-medium">Usage note:</span> {idiom.explanation}
                            </p>
                          </div>
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

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('meaning')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Meaning Recognition
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Test your understanding of idiom meanings
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('usage')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Usage Practice
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Learn when and how to use idioms correctly
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('context')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contextual Understanding
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice using idioms in the right context
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'meaning' ? 'Meaning Recognition' : 
                   exerciseMode === 'usage' ? 'Usage Practice' : 'Contextual Understanding'}
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
              
              {getCurrentExercise() && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getCurrentExercise()?.prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {getCurrentExercise()?.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === getCurrentExercise()?.correct
                                ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        feedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        <p>
                          {feedback === 'correct'
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${getCurrentExercise()?.correct}". `}
                          {getCurrentExercise()?.explanation}
                        </p>
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
                    
                    {currentExerciseIndex < (
                      exerciseMode === 'meaning' ? meaningExercises.length - 1 :
                      exerciseMode === 'usage' ? usageExercises.length - 1 :
                      contextExercises.length - 1
                    ) && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')
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

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Study Tips
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Learn idioms in context through authentic materials</li>
                <li>Practice using idioms in conversations with native speakers</li>
                <li>Create your own example sentences using new idioms</li>
                <li>Group idioms by themes or situations for easier memorization</li>
                <li>Pay attention to the cultural background of each expression</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cultural Context
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Many Georgian idioms reflect traditional values and customs</li>
                <li>Understanding the cultural context helps master usage</li>
                <li>Idioms often reveal insights into Georgian worldview</li>
                <li>Some expressions have historical or literary origins</li>
                <li>Regional variations may exist for certain idioms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdiomaticExpressionsPage;