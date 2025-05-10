import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X, Pen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface WritingExample {
  georgian: string;
  latin: string;
  english: string;
  explanation: string;
}

interface WritingTopic {
  id: string;
  title: string;
  description: string;
  examples: WritingExample[];
}

const AdvancedWritingPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'creative' | 'analytical' | 'technical' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const topicRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      updateProgress('advanced-writing', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                 (feedback === 'correct' ? 1 : 0);
        
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('advanced-writing', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, feedback, updateProgress]);

  const writingTopics: WritingTopic[] = [
    {
      id: 'academic',
      title: 'Academic Writing in Georgian',
      description: 'Master formal academic writing styles and structures in Georgian.',
      examples: [
        {
          georgian: 'კვლევის მიზანია...',
          latin: 'kvlevis mizania...',
          english: 'The aim of the research is...',
          explanation: 'Standard academic phrase for introducing research objectives.'
        },
        {
          georgian: 'შედეგების თანახმად...',
          latin: 'shedegebis tanakhmad...',
          english: 'According to the results...',
          explanation: 'Used when presenting research findings.'
        }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Writing Techniques',
      description: 'Explore creative writing styles and literary devices in Georgian.',
      examples: [
        {
          georgian: 'მზე ნელა ეშვებოდა ჰორიზონტზე',
          latin: 'mze nela eshveboda horizontze',
          english: 'The sun was slowly setting on the horizon',
          explanation: 'Descriptive writing example using metaphorical language.'
        },
        {
          georgian: 'ქარი ჩურჩულებდა ფოთლებში',
          latin: 'qari churchulebda potlebshi',
          english: 'The wind whispered through the leaves',
          explanation: 'Personification in creative writing.'
        }
      ]
    },
    {
      id: 'business',
      title: 'Professional Writing',
      description: 'Learn business and professional writing conventions in Georgian.',
      examples: [
        {
          georgian: 'გთხოვთ, გაითვალისწინოთ...',
          latin: 'gtkhovt, gaitvalitswinot...',
          english: 'Please consider...',
          explanation: 'Formal request in business correspondence.'
        },
        {
          georgian: 'დანართის სახით გიგზავნით...',
          latin: 'danartis sakhit gigzavnit...',
          english: 'I am sending you as an attachment...',
          explanation: 'Standard phrase for business emails.'
        }
      ]
    }
  ];

  const creativeExercises = [
    {
      prompt: "Write a descriptive paragraph about a Georgian landscape",
      options: [
        "მთები თოვლით დაფარული...",
        "ზღვა მშვიდად ირწეოდა...",
        "ტყე შემოდგომის ფერებში...",
        "ველი ყვავილებით სავსე..."
      ],
      correct: "მთები თოვლით დაფარული...",
      explanation: "This option uses rich descriptive language and natural imagery."
    }
  ];

  const analyticalExercises = [
    {
      prompt: "Analyze the following Georgian text passage",
      options: [
        "ტექსტში გამოყენებულია...",
        "ავტორი გვიჩვენებს...",
        "ნაწარმოების მთავარი თემაა...",
        "სტილისტური თვალსაზრისით..."
      ],
      correct: "ავტორი გვიჩვენებს...",
      explanation: "This analysis focuses on the author's technique and intention."
    }
  ];

  const technicalExercises = [
    {
      prompt: "Write a formal business email in Georgian",
      options: [
        "პატივცემულო ბატონო...",
        "ძვირფასო მეგობარო...",
        "გამარჯობა...",
        "მოგესალმებით..."
      ],
      correct: "პატივცემულო ბატონო...",
      explanation: "This is the most appropriate formal business greeting."
    }
  ];

  const toggleTopic = (topicId: string) => {
    updateActivity();
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
      setTimeout(() => {
        if (topicRefs.current[topicId]) {
          topicRefs.current[topicId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    
    if (exerciseMode === 'creative') {
      setFeedback(answer === creativeExercises[currentExerciseIndex].correct ? 'correct' : 'incorrect');
    } else if (exerciseMode === 'analytical') {
      setFeedback(answer === analyticalExercises[currentExerciseIndex].correct ? 'correct' : 'incorrect');
    } else if (exerciseMode === 'technical') {
      setFeedback(answer === technicalExercises[currentExerciseIndex].correct ? 'correct' : 'incorrect');
    }
  };

  const nextExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(prev => prev + 1);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback(null);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900" onClick={updateActivity}>
      {/* Header Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Advanced Writing</span> - 
                მოწინავე წერა
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Develop sophisticated writing skills in Georgian through structured practice and expert guidance.
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
                  to="/advanced/quiz/writing"
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
                <Pen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Writing Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice different writing styles</li>
                  <li>• Focus on clarity and structure</li>
                  <li>• Use appropriate formal/informal language</li>
                  <li>• Review and revise your work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Topics Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {writingTopics.map((topic) => (
              <div
                key={topic.id}
                ref={el => topicRefs.current[topic.id] = el}
                className={`rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {topic.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {topic.description}
                      </p>
                    </div>
                    {expandedTopic === topic.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedTopic === topic.id && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      {topic.examples.map((example, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {example.georgian}
                            </span>
                            <button
                              onClick={() => playAudio(example.georgian)}
                              className={`p-2 rounded-full transition-colors ${
                                isPlaying === example.georgian
                                  ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                                  : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300')
                              }`}
                            >
                              {isPlaying === example.georgian ? (
                                <X className="h-4 w-4 text-white" />
                              ) : (
                                <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                              )}
                            </button>
                          </div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{example.latin}/
                          </p>
                          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {example.english}
                          </p>
                          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {example.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Practice Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Writing Practice
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('creative')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Creative Writing
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice descriptive and narrative writing in Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('analytical')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Analytical Writing
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Develop critical analysis and academic writing skills
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('technical')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Technical Writing
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Learn professional and business writing formats
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'creative' ? 'Creative Writing Exercise' :
                   exerciseMode === 'analytical' ? 'Analytical Writing Exercise' :
                   'Technical Writing Exercise'}
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

              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    {exerciseMode === 'creative' && creativeExercises[currentExerciseIndex].prompt}
                    {exerciseMode === 'analytical' && analyticalExercises[currentExerciseIndex].prompt}
                    {exerciseMode === 'technical' && technicalExercises[currentExerciseIndex].prompt}
                  </p>

                  <div className="space-y-3">
                    {exerciseMode === 'creative' && creativeExercises[currentExerciseIndex].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleExerciseAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOption === option
                            ? option === creativeExercises[currentExerciseIndex].correct
                              ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                              : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650 text-white' : 'bg-white hover:bg-gray-100 text-gray-800')
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                    {exerciseMode === 'analytical' && analyticalExercises[currentExerciseIndex].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleExerciseAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOption === option
                            ? option === analyticalExercises[currentExerciseIndex].correct
                              ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                              : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650 text-white' : 'bg-white hover:bg-gray-100 text-gray-800')
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                    {exerciseMode === 'technical' && technicalExercises[currentExerciseIndex].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleExerciseAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOption === option
                            ? option === technicalExercises[currentExerciseIndex].correct
                              ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                              : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650 text-white' : 'bg-white hover:bg-gray-100 text-gray-800')
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {showFeedback && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      feedback === 'correct'
                        ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                        : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                    }`}>
                      <p>
                        {feedback === 'correct' ? 'Correct! ' : 'Incorrect. '}
                        {exerciseMode === 'creative' && creativeExercises[currentExerciseIndex].explanation}
                        {exerciseMode === 'analytical' && analyticalExercises[currentExerciseIndex].explanation}
                        {exerciseMode === 'technical' && technicalExercises[currentExerciseIndex].explanation}
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
                  
                  {((exerciseMode === 'creative' && currentExerciseIndex < creativeExercises.length - 1) ||
                    (exerciseMode === 'analytical' && currentExerciseIndex < analyticalExercises.length - 1) ||
                    (exerciseMode === 'technical' && currentExerciseIndex < technicalExercises.length - 1)) && (
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
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recommended Reading
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Contemporary Georgian Literature Collections</li>
                <li>Georgian Academic Writing Guides</li>
                <li>Business Georgian Style Guides</li>
                <li>Georgian Poetry and Prose Anthologies</li>
                <li>Modern Georgian Media Publications</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Writing Practice Tips
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Keep a daily writing journal in Georgian</li>
                <li>Practice different writing styles regularly</li>
                <li>Read extensively in your target genre</li>
                <li>Get feedback from native speakers</li>
                <li>Study authentic Georgian texts</li>
                <li>Join Georgian writing workshops or groups</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedWritingPage;