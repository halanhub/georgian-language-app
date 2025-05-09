import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  type: 'verb' | 'case' | 'structure' | 'tense';
}

const GrammarQuiz: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(45);
  const [isChecking, setIsChecking] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which verb form is correct for 'I write' in Georgian?",
      options: ['ვწერ (vtser)', 'წერს (tsers)', 'წერთ (tsert)', 'წერენ (tseren)'],
      correctAnswer: 'ვწერ (vtser)',
      explanation: "The verb form 'ვწერ (vtser)' is used with the first person singular (მე - me) in Georgian.",
      type: 'verb'
    },
    {
      id: 2,
      question: "Which case is used for direct objects in Georgian?",
      options: ['Nominative', 'Dative', 'Ergative', 'Genitive'],
      correctAnswer: 'Dative',
      explanation: "The dative case (with the ending -ს) is used for direct objects in Georgian.",
      type: 'case'
    },
    {
      id: 3,
      question: "What is the correct word order in a basic Georgian sentence?",
      options: ['Subject-Verb-Object (SVO)', 'Subject-Object-Verb (SOV)', 'Verb-Subject-Object (VSO)', 'Object-Subject-Verb (OSV)'],
      correctAnswer: 'Subject-Object-Verb (SOV)',
      explanation: "Georgian primarily follows Subject-Object-Verb (SOV) word order, though it can be flexible.",
      type: 'structure'
    },
    {
      id: 4,
      question: "Which form is correct for 'they eat' in Georgian?",
      options: ['ვჭამთ (vchamt)', 'ჭამს (chams)', 'ჭამენ (chamen)', 'ჭამთ (chamt)'],
      correctAnswer: 'ჭამენ (chamen)',
      explanation: "The verb form 'ჭამენ (chamen)' is used with the third person plural (ისინი - isini) in Georgian.",
      type: 'verb'
    },
    {
      id: 5,
      question: "Which of these is a postposition in Georgian?",
      options: ['-ში (-shi)', '-დან (-dan)', '-ზე (-ze)', 'All of these'],
      correctAnswer: 'All of these',
      explanation: "All of these (-ში, -დან, -ზე) are postpositions in Georgian, which come after the noun unlike prepositions in English.",
      type: 'structure'
    },
    {
      id: 6,
      question: "What is the correct past tense form of 'I wrote' in Georgian?",
      options: ['ვწერ (vtser)', 'ვწერდი (vtserdi)', 'დავწერე (davtsere)', 'ვწერო (vtsero)'],
      correctAnswer: 'დავწერე (davtsere)',
      explanation: "The past tense form 'დავწერე (davtsere)' is the correct form for 'I wrote' in Georgian.",
      type: 'tense'
    },
    {
      id: 7,
      question: "Which case is used for the subject in past tense transitive verbs?",
      options: ['Nominative', 'Dative', 'Ergative', 'Genitive'],
      correctAnswer: 'Ergative',
      explanation: "The ergative case is used for the subject of transitive verbs in the past tense in Georgian.",
      type: 'case'
    },
    {
      id: 8,
      question: "How do you form a negative sentence in Georgian?",
      options: [
        'Add არ (ar) before the verb', 
        'Add -არ (-ar) after the verb', 
        'Add არა (ara) at the end of the sentence', 
        'Change the verb form'
      ],
      correctAnswer: 'Add არ (ar) before the verb',
      explanation: "To form a negative sentence in Georgian, add the negative particle 'არ (ar)' before the verb.",
      type: 'structure'
    },
    {
      id: 9,
      question: "Which is the correct future tense form of 'I will go' in Georgian?",
      options: ['მივდივარ (mivdivar)', 'წავედი (tsavedi)', 'წავალ (tsaval)', 'მივდიოდი (mivdiodi)'],
      correctAnswer: 'წავალ (tsaval)',
      explanation: "The future tense form 'წავალ (tsaval)' is the correct form for 'I will go' in Georgian.",
      type: 'tense'
    },
    {
      id: 10,
      question: "Which of these is a correct way to ask 'Where are you going?' in Georgian?",
      options: [
        'სად მიდიხარ? (sad midikhar?)', 
        'როდის მიდიხარ? (rodis midikhar?)', 
        'რატომ მიდიხარ? (ratom midikhar?)', 
        'როგორ მიდიხარ? (rogor midikhar?)'
      ],
      correctAnswer: 'სად მიდიხარ? (sad midikhar?)',
      explanation: "The question word 'სად (sad)' means 'where' in Georgian, so 'სად მიდიხარ?' means 'Where are you going?'",
      type: 'structure'
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
      updateProgress('quiz-grammar', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and quiz completion
        const completed = showScore;
        
        updateProgress('quiz-grammar', { 
          timeSpent, 
          completed: completed,
          score: Math.round((score / questions.length) * 100)
        });
      }
    };
  }, [user, timeSpent, showScore, score, questions.length, updateProgress]);

  useEffect(() => {
    if (showScore || isChecking) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAnswer(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showScore, isChecking]);

  const handleAnswer = (answer: string | null) => {
    updateActivity();
    if (isChecking) return;
    
    setIsChecking(true);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setRemainingTime(45);
      } else {
        setShowScore(true);
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleRetakeQuiz = () => {
    updateActivity();
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setRemainingTime(45);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Grammar Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of Georgian grammar
              </p>
            </div>
            <Link
              to="/intermediate/grammar"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Grammar
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showScore ? (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                    remainingTime > 10 
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                      : (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                  }`}>
                    <Clock size={16} className="mr-1" />
                    {remainingTime}s
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedAnswer === option
                          ? option === questions[currentQuestion].correctAnswer
                            ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                            : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                          : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900')
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                      disabled={isChecking}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          option === questions[currentQuestion].correctAnswer
                            ? <Check size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                            : <X size={20} className={theme === 'dark' ? 'text-red-400' : 'text-red-500'} />
                        )}
                        {option === questions[currentQuestion].correctAnswer && selectedAnswer !== null && selectedAnswer !== option && (
                          <Check size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedAnswer && questions[currentQuestion].explanation && (
                  <div className={`mt-4 p-4 rounded-md ${
                    selectedAnswer === questions[currentQuestion].correctAnswer
                      ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                      : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                  }`}>
                    <p>{questions[currentQuestion].explanation}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleAnswer(selectedAnswer)}
                  disabled={!selectedAnswer || isChecking}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                    !selectedAnswer || isChecking
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                      : (theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700')
                  }`}
                >
                  {isChecking ? 'Checking...' : 'Check Answer'}
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Trophy size={64} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
              
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Quiz Completed!
              </h2>
              
              <p className={`text-xl mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Your score: <span className="font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>
                <span className="block mt-2 text-sm">
                  ({Math.round((score / questions.length) * 100)}%)
                </span>
              </p>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2 dark:bg-gray-700">
                  <div 
                    className={`h-4 rounded-full ${
                      score / questions.length >= 0.7 
                        ? (theme === 'dark' ? 'bg-green-600' : 'bg-green-500')
                        : score / questions.length >= 0.4
                          ? (theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500')
                          : (theme === 'dark' ? 'bg-red-600' : 'bg-red-500')
                    }`}
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
                
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {score / questions.length >= 0.8 
                    ? 'Excellent! You have a great understanding of Georgian grammar.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your grammar skills.'
                      : 'Keep learning! Review the grammar rules and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-blue-700 text-white hover:bg-blue-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to="/intermediate/grammar"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Grammar
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GrammarQuiz;