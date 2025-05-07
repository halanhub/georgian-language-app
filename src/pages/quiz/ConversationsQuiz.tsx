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
  type: 'translation' | 'response' | 'context';
}

const ConversationsQuiz: React.FC = () => {
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
      question: "How would you say 'Hello, how are you?' in Georgian?",
      options: [
        'გამარჯობა, როგორ ხარ? (gamarjoba, rogor khar?)',
        'ნახვამდის, როგორ ხარ? (nakhvamdis, rogor khar?)',
        'გამარჯობა, სად ხარ? (gamarjoba, sad khar?)',
        'გამარჯობა, ვინ ხარ? (gamarjoba, vin khar?)'
      ],
      correctAnswer: 'გამარჯობა, როგორ ხარ? (gamarjoba, rogor khar?)',
      explanation: "The phrase 'გამარჯობა, როგორ ხარ? (gamarjoba, rogor khar?)' is the standard greeting asking how someone is doing.",
      type: 'translation'
    },
    {
      id: 2,
      question: "What's the appropriate response to 'როგორ ხარ? (rogor khar? - How are you?)'",
      options: [
        'გმადლობთ (gmadlobt - thank you)',
        'კარგად, შენ? (kargad, shen? - Good, and you?)',
        'დიახ (diakh - yes)',
        'ნახვამდის (nakhvamdis - goodbye)'
      ],
      correctAnswer: 'კარგად, შენ? (kargad, shen? - Good, and you?)',
      explanation: "The appropriate response is 'კარგად, შენ? (kargad, shen?)' which means 'Good, and you?'",
      type: 'response'
    },
    {
      id: 3,
      question: "How would you ask for the bill in a restaurant?",
      options: [
        'ანგარიში, თუ შეიძლება (angarishi, tu sheidzleba - The bill, please)',
        'მენიუ, თუ შეიძლება (meniu, tu sheidzleba - The menu, please)',
        'წყალი, თუ შეიძლება (tsqali, tu sheidzleba - Water, please)',
        'მადლობა (madloba - Thank you)'
      ],
      correctAnswer: 'ანგარიში, თუ შეიძლება (angarishi, tu sheidzleba - The bill, please)',
      explanation: "To ask for the bill, you would say 'ანგარიში, თუ შეიძლება (angarishi, tu sheidzleba)' which means 'The bill, please'.",
      type: 'context'
    },
    {
      id: 4,
      question: "How would you introduce yourself by saying 'My name is [name]' in Georgian?",
      options: [
        'მე ვარ [name] (me var [name])',
        'მე მქვია [name] (me mkvia [name])',
        'ჩემი სახელია [name] (chemi sakhelia [name])',
        'All of the above'
      ],
      correctAnswer: 'All of the above',
      explanation: "All three phrases can be used to introduce yourself in Georgian: 'მე ვარ [name]', 'მე მქვია [name]', and 'ჩემი სახელია [name]'.",
      type: 'translation'
    },
    {
      id: 5,
      question: "What would you say to ask 'Where is the bathroom?' in Georgian?",
      options: [
        'სად არის საპირფარეშო? (sad aris sapirparesho?)',
        'რა ღირს ეს? (ra ghirs es?)',
        'რომელი საათია? (romeli saatia?)',
        'როგორ მივიდე...? (rogor mivide...?)'
      ],
      correctAnswer: 'სად არის საპირფარეშო? (sad aris sapirparesho?)',
      explanation: "To ask where the bathroom is, you would say 'სად არის საპირფარეშო? (sad aris sapirparesho?)'",
      type: 'context'
    },
    {
      id: 6,
      question: "What's the appropriate response to 'გმადლობთ (gmadlobt - thank you)'?",
      options: [
        'გმადლობთ (gmadlobt - thank you)',
        'კარგად (kargad - well)',
        'არაფრის (arapris - you&apos;re welcome)',
        'დიახ (diakh - yes)'
      ],
      correctAnswer: 'არაფრის (arapris - you&apos;re welcome)',
      explanation: "The appropriate response to 'გმადლობთ (thank you)' is 'არაფრის (arapris)' which means 'you&apos;re welcome'.",
      type: 'response'
    },
    {
      id: 7,
      question: "How would you ask 'Do you speak English?' in Georgian?",
      options: [
        'ინგლისურად ლაპარაკობ? (inglisurad laparakob?)',
        'ქართულად ლაპარაკობ? (karturad laparakob?)',
        'საიდან ხარ? (saidan khar?)',
        'რა გქვია? (ra gkvia?)'
      ],
      correctAnswer: 'ინგლისურად ლაპარაკობ? (inglisurad laparakob?)',
      explanation: "To ask if someone speaks English, you would say 'ინგლისურად ლაპარაკობ? (inglisurad laparakob?)'",
      type: 'translation'
    },
    {
      id: 8,
      question: "What would you say to order food in a restaurant?",
      options: [
        'მე მინდა... (me minda... - I want...)',
        'მე მიყვარს... (me miqvars... - I love...)',
        'მე მაქვს... (me makvs... - I have...)',
        'მე ვარ... (me var... - I am...)'
      ],
      correctAnswer: 'მე მინდა... (me minda... - I want...)',
      explanation: "To order food in a restaurant, you would typically start with 'მე მინდა... (me minda...)' which means 'I want...'",
      type: 'context'
    },
    {
      id: 9,
      question: "How would you ask for the time in Georgian?",
      options: [
        'რა დროა? (ra droa?)',
        'რომელი საათია? (romeli saatia?)',
        'რამდენი საათია? (ramdeni saatia?)',
        'Both B and C'
      ],
      correctAnswer: 'Both B and C',
      explanation: "Both 'რომელი საათია? (romeli saatia?)' and 'რამდენი საათია? (ramdeni saatia?)' are common ways to ask for the time in Georgian.",
      type: 'translation'
    },
    {
      id: 10,
      question: "What's the appropriate response when someone asks 'საიდან ხარ? (saidan khar? - Where are you from?)'",
      options: [
        'მე ვარ... (me var... - I am...)',
        'მე მქვია... (me mkvia... - My name is...)',
        'მე [country]-დან ვარ (me [country]-dan var - I am from [country])',
        'გმადლობთ (gmadlobt - thank you)'
      ],
      correctAnswer: 'მე [country]-დან ვარ (me [country]-dan var - I am from [country])',
      explanation: "The appropriate response is 'მე [country]-დან ვარ (me [country]-dan var)' which means 'I am from [country]'. For example, 'მე ამერიკიდან ვარ (me amerikidan var)' means 'I am from America'.",
      type: 'response'
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
      updateProgress('quiz-conversations', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and quiz completion
        const completed = showScore;
        
        updateProgress('quiz-conversations', { 
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
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>Conversations Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of Georgian conversations
              </p>
            </div>
            <Link
              to="/intermediate/conversations"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Conversations
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
                    className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300" 
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
                      : (theme === 'dark' ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-600 text-white hover:bg-yellow-700')
                  }`}
                >
                  {isChecking ? 'Checking...' : 'Check Answer'}
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Trophy size={64} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
              
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
                    ? 'Excellent! You have a great understanding of Georgian conversations.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your conversation skills.'
                      : 'Keep learning! Practice more conversations and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-yellow-700 text-white hover:bg-yellow-800' 
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to="/intermediate/conversations"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Conversations
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ConversationsQuiz;