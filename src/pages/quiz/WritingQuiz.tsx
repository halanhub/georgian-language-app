import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  id: number;
  prompt: string;
  expectedAnswer?: string;
  options?: string[];
  hint?: string;
  explanation?: string;
  type: 'translation' | 'completion' | 'composition';
}

const WritingQuiz: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120);
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      prompt: "Translate this sentence to Georgian: 'I am learning Georgian language'",
      expectedAnswer: "მე ვსწავლობ ქართულ ენას",
      hint: "Use 'მე ვსწავლობ' (me vstsavlob) for 'I am learning' and 'ქართულ ენას' (kartul enas) for 'Georgian language'",
      explanation: "The correct translation is 'მე ვსწავლობ ქართულ ენას' (me vstsavlob kartul enas). The verb 'ვსწავლობ' (vstsavlob) means 'I am learning' and 'ქართულ ენას' (kartul enas) means 'Georgian language' in the dative case.",
      type: 'translation'
    },
    {
      id: 2,
      prompt: "Complete this sentence: 'მე _____ თბილისში' (I live in Tbilisi)",
      options: [
        'ვცხოვრობ (vtskhovrob)',
        'ვმუშაობ (vmushaob)',
        'ვსწავლობ (vstsavlob)',
        'ვმოგზაურობ (vmogzaurob)'
      ],
      expectedAnswer: 'ვცხოვრობ (vtskhovrob)',
      explanation: "The correct answer is 'ვცხოვრობ' (vtskhovrob), which means 'I live'. The full sentence 'მე ვცხოვრობ თბილისში' means 'I live in Tbilisi'.",
      type: 'completion'
    },
    {
      id: 3,
      prompt: "Write a sentence in Georgian using the verb 'მიყვარს' (miqvars - I love)",
      hint: "You can write something like 'მე მიყვარს [something]' (me miqvars [something])",
      explanation: "A correct sentence could be 'მე მიყვარს საქართველო' (me miqvars sakartvelo - I love Georgia) or 'მე მიყვარს ქართული ენა' (me miqvars kartuli ena - I love Georgian language).",
      type: 'composition'
    },
    {
      id: 4,
      prompt: "Translate this sentence to Georgian: 'The book is on the table'",
      expectedAnswer: "წიგნი მაგიდაზე დევს",
      hint: "Use 'წიგნი' (tsigni) for 'book', 'მაგიდაზე' (magidaze) for 'on the table', and 'დევს' (devs) for 'is/lies'",
      explanation: "The correct translation is 'წიგნი მაგიდაზე დევს' (tsigni magidaze devs). In Georgian, the verb often comes at the end of the sentence.",
      type: 'translation'
    },
    {
      id: 5,
      prompt: "Complete this sentence: 'გუშინ მე _____ წერილი' (Yesterday I wrote a letter)",
      options: [
        'ვწერ (vtser)',
        'დავწერე (davtsere)',
        'დავწერ (davtser)',
        'ვწერდი (vtserdi)'
      ],
      expectedAnswer: 'დავწერე (davtsere)',
      explanation: "The correct answer is 'დავწერე' (davtsere), which is the past tense form of the verb 'to write'. The full sentence 'გუშინ მე დავწერე წერილი' means 'Yesterday I wrote a letter'.",
      type: 'completion'
    },
    {
      id: 6,
      prompt: "Write a sentence in Georgian using the word 'ხვალ' (khval - tomorrow)",
      hint: "You can write something like 'ხვალ მე [verb]' (khval me [verb])",
      explanation: "A correct sentence could be 'ხვალ მე წავალ სკოლაში' (khval me tsaval skolashi - Tomorrow I will go to school) or 'ხვალ კარგი ამინდი იქნება' (khval kargi amindi ikneba - Tomorrow will be good weather).",
      type: 'composition'
    },
    {
      id: 7,
      prompt: "Translate this sentence to Georgian: 'I have two brothers and one sister'",
      expectedAnswer: "მე მყავს ორი ძმა და ერთი და",
      hint: "Use 'მე მყავს' (me mqavs) for 'I have', 'ორი ძმა' (ori dzma) for 'two brothers', and 'ერთი და' (erti da) for 'one sister'",
      explanation: "The correct translation is 'მე მყავს ორი ძმა და ერთი და' (me mqavs ori dzma da erti da). Note that for people and animals, Georgian uses the verb 'მყავს' (mqavs) instead of 'მაქვს' (makvs).",
      type: 'translation'
    },
    {
      id: 8,
      prompt: "Complete this sentence: 'მე _____ ქართულად ლაპარაკი' (I can speak Georgian)",
      options: [
        'მინდა (minda)',
        'შემიძლია (shemidzlia)',
        'ვიცი (vitsi)',
        'მიყვარს (miqvars)'
      ],
      expectedAnswer: 'შემიძლია (shemidzlia)',
      explanation: "The correct answer is 'შემიძლია' (shemidzlia), which means 'I can'. The full sentence 'მე შემიძლია ქართულად ლაპარაკი' means 'I can speak Georgian'.",
      type: 'completion'
    },
    {
      id: 9,
      prompt: "Write a sentence in Georgian using the word 'სახლი' (sakhli - house/home)",
      hint: "You can write something like 'ჩემი სახლი [adjective/location]' (chemi sakhli [adjective/location])",
      explanation: "A correct sentence could be 'ჩემი სახლი დიდია' (chemi sakhli didia - My house is big) or 'სახლი თბილისში მდებარეობს' (sakhli tbilisshi mdebareobs - The house is located in Tbilisi).",
      type: 'composition'
    },
    {
      id: 10,
      prompt: "Translate this sentence to Georgian: 'What is your name?'",
      expectedAnswer: "რა გქვია?",
      hint: "The most common way to ask someone's name in Georgian is 'რა გქვია?' (ra gkvia?)",
      explanation: "The correct translation is 'რა გქვია?' (ra gkvia?). Literally, it means 'What are you called?' and is the standard way to ask someone's name in Georgian.",
      type: 'translation'
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
      updateProgress('quiz-writing', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and quiz completion
        const completed = showScore;
        
        updateProgress('quiz-writing', { 
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
          handleCheckAnswer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showScore, isChecking]);

  const handleCheckAnswer = () => {
    updateActivity();
    if (isChecking) return;
    
    setIsChecking(true);
    
    const currentQ = questions[currentQuestion];
    let isCorrect = false;
    
    if (currentQ.type === 'completion' && selectedOption) {
      isCorrect = selectedOption === currentQ.expectedAnswer;
    } else if (currentQ.type === 'translation' && userAnswer) {
      // For translation, we'll do a simple check
      // In a real app, you might want a more sophisticated comparison
      isCorrect = userAnswer.trim().toLowerCase() === currentQ.expectedAnswer?.toLowerCase();
    } else if (currentQ.type === 'composition' && userAnswer) {
      // For composition, we'll just check if they wrote something
      // In a real app, you might want to analyze the sentence
      isCorrect = userAnswer.trim().length > 5 && userAnswer.includes(' ');
    }
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setSelectedOption(null);
        setFeedback(null);
        setRemainingTime(120);
      } else {
        setShowScore(true);
      }
      setIsChecking(false);
    }, 2000);
  };

  const handleOptionSelect = (option: string) => {
    updateActivity();
    setSelectedOption(option);
  };

  const handleRetakeQuiz = () => {
    updateActivity();
    setCurrentQuestion(0);
    setUserAnswer('');
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
    setFeedback(null);
    setRemainingTime(120);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Writing Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your Georgian writing skills
              </p>
            </div>
            <Link
              to="/intermediate/writing"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Writing
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
                    remainingTime > 30 
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                      : (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                  }`}>
                    <Clock size={16} className="mr-1" />
                    {remainingTime}s
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {questions[currentQuestion].prompt}
                </h2>
                
                {questions[currentQuestion].type === 'completion' && questions[currentQuestion].options ? (
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOption === option
                            ? (theme === 'dark' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-900')
                        } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => {
                        updateActivity();
                        setUserAnswer(e.target.value);
                      }}
                      placeholder="Write your answer in Georgian..."
                      className={`w-full p-4 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-white text-gray-900 border-gray-300'
                      } border focus:ring-2 focus:ring-purple-500`}
                      rows={5}
                    />
                    
                    {questions[currentQuestion].hint && (
                      <div className={`mt-3 p-3 rounded-md ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <p className="text-sm">
                          <strong>Hint:</strong> {questions[currentQuestion].hint}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {feedback && (
                  <div className={`mt-4 p-4 rounded-md ${
                    feedback === 'correct'
                      ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                      : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                  }`}>
                    <p>
                      {feedback === 'correct' 
                        ? 'Correct! Well done.' 
                        : 'Not quite right. Keep practicing!'}
                    </p>
                    {questions[currentQuestion].explanation && (
                      <p className="mt-2 text-sm">
                        {questions[currentQuestion].explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    isChecking || 
                    (questions[currentQuestion].type === 'completion' && !selectedOption) ||
                    (questions[currentQuestion].type !== 'completion' && !userAnswer.trim())
                  }
                  className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                    isChecking || 
                    (questions[currentQuestion].type === 'completion' && !selectedOption) ||
                    (questions[currentQuestion].type !== 'completion' && !userAnswer.trim())
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                      : (theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700')
                  }`}
                >
                  {isChecking ? 'Checking...' : 'Check Answer'}
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Trophy size={64} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
              
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
                    ? 'Excellent! You have great Georgian writing skills.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your writing skills.'
                      : 'Keep learning! Practice more writing and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-purple-700 text-white hover:bg-purple-800' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to="/intermediate/writing"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Writing
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WritingQuiz;