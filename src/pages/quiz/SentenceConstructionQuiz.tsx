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
  type: 'order' | 'completion' | 'transformation';
}

const SentenceConstructionQuiz: React.FC = () => {
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
      question: "What is the correct word order for 'The child reads a book' in Georgian?",
      options: [
        'ბავშვი წიგნს კითხულობს (bavshvi tsigns kitkholobs)',
        'კითხულობს ბავშვი წიგნს (kitkholobs bavshvi tsigns)',
        'წიგნს ბავშვი კითხულობს (tsigns bavshvi kitkholobs)',
        'ბავშვი კითხულობს წიგნს (bavshvi kitkholobs tsigns)'
      ],
      correctAnswer: 'ბავშვი წიგნს კითხულობს (bavshvi tsigns kitkholobs)',
      explanation: "Georgian typically follows Subject-Object-Verb (SOV) word order, so 'ბავშვი წიგნს კითხულობს' is correct.",
      type: 'order'
    },
    {
      id: 2,
      question: "Which is the correct form to complete: 'მე _____ ვსვამ' (I am drinking water)?",
      options: [
        'წყალი (tsqali)',
        'წყალს (tsqals)',
        'წყალით (tsqalit)',
        'წყალმა (tsqalma)'
      ],
      correctAnswer: 'წყალს (tsqals)',
      explanation: "Direct objects in Georgian take the dative case, so 'წყალს (tsqals)' is the correct form.",
      type: 'completion'
    },
    {
      id: 3,
      question: "Which is the correct negative form of 'მე ვჭამ' (me vcham - I eat)?",
      options: [
        'მე არ ვჭამ (me ar vcham)',
        'არ მე ვჭამ (ar me vcham)',
        'მე ვჭამ არ (me vcham ar)',
        'მე ვჭამ არა (me vcham ara)'
      ],
      correctAnswer: 'მე არ ვჭამ (me ar vcham)',
      explanation: "To form a negative sentence in Georgian, place 'არ (ar)' before the verb.",
      type: 'transformation'
    },
    {
      id: 4,
      question: "What is the correct word order for 'I gave the book to my friend' in Georgian?",
      options: [
        'მე წიგნი ჩემს მეგობარს მივეცი (me tsigni chems megobars mivetsi)',
        'მე მივეცი წიგნი ჩემს მეგობარს (me mivetsi tsigni chems megobars)',
        'ჩემს მეგობარს მე წიგნი მივეცი (chems megobars me tsigni mivetsi)',
        'წიგნი მე ჩემს მეგობარს მივეცი (tsigni me chems megobars mivetsi)'
      ],
      correctAnswer: 'მე წიგნი ჩემს მეგობარს მივეცი (me tsigni chems megobars mivetsi)',
      explanation: "In Georgian, the typical order for ditransitive verbs is Subject-Direct Object-Indirect Object-Verb.",
      type: 'order'
    },
    {
      id: 5,
      question: "Which is the correct form to complete: 'ის _____ ცხოვრობს' (He/she lives in Tbilisi)?",
      options: [
        'თბილისი (tbilisi)',
        'თბილისის (tbilisis)',
        'თბილისში (tbilisshi)',
        'თბილისიდან (tbilisidan)'
      ],
      correctAnswer: 'თბილისში (tbilisshi)',
      explanation: "The postposition '-ში (-shi)' is used to indicate 'in' a location, so 'თბილისში (tbilisshi)' means 'in Tbilisi'.",
      type: 'completion'
    },
    {
      id: 6,
      question: "Which is the correct question form of 'ის წერს წერილს' (is tsers tserils - He/she writes a letter)?",
      options: [
        'ის წერს წერილს? (is tsers tserils?)',
        'წერს ის წერილს? (tsers is tserils?)',
        'წერილს ის წერს? (tserils is tsers?)',
        'ის წერილს წერს? (is tserils tsers?)'
      ],
      correctAnswer: 'ის წერს წერილს? (is tsers tserils?)',
      explanation: "In Georgian, yes/no questions often maintain the same word order as statements but with rising intonation.",
      type: 'transformation'
    },
    {
      id: 7,
      question: "What is the correct form to express 'I want to go home' in Georgian?",
      options: [
        'მე მინდა სახლში წასვლა (me minda sakhlshi tsasvla)',
        'მე სახლში წასვლა მინდა (me sakhlshi tsasvla minda)',
        'მინდა მე სახლში წასვლა (minda me sakhlshi tsasvla)',
        'წასვლა სახლში მე მინდა (tsasvla sakhlshi me minda)'
      ],
      correctAnswer: 'მე მინდა სახლში წასვლა (me minda sakhlshi tsasvla)',
      explanation: "The structure 'მინდა (minda) + infinitive' is used to express 'I want to do something' in Georgian.",
      type: 'order'
    },
    {
      id: 8,
      question: "Which is the correct past tense form of 'ვაკეთებ' (vaketeb - I do/make)?",
      options: [
        'ვაკეთე (vakete)',
        'გავაკეთე (gavakete)',
        'ვაკეთებდი (vaketebdi)',
        'გავაკეთებდი (gavaketebdi)'
      ],
      correctAnswer: 'გავაკეთე (gavakete)',
      explanation: "The correct past tense form of 'ვაკეთებ (vaketeb)' is 'გავაკეთე (gavakete)', which adds the preverb 'გა-' and changes the ending.",
      type: 'transformation'
    },
    {
      id: 9,
      question: "Which is the correct form to complete: 'მე მაქვს _____' (I have a car)?",
      options: [
        'მანქანა (manqana)',
        'მანქანას (manqanas)',
        'მანქანით (manqanit)',
        'მანქანაში (manqanashi)'
      ],
      correctAnswer: 'მანქანა (manqana)',
      explanation: "With the verb 'მაქვს (makvs)' meaning 'I have', the object takes the nominative case, so 'მანქანა (manqana)' is correct.",
      type: 'completion'
    },
    {
      id: 10,
      question: "What is the correct way to form 'I can speak Georgian' in Georgian?",
      options: [
        'მე შემიძლია ქართულად ლაპარაკი (me shemidzlia kartulad laparaki)',
        'მე ქართულად ლაპარაკი შემიძლია (me kartulad laparaki shemidzlia)',
        'შემიძლია მე ქართულად ლაპარაკი (shemidzlia me kartulad laparaki)',
        'ქართულად ლაპარაკი მე შემიძლია (kartulad laparaki me shemidzlia)'
      ],
      correctAnswer: 'მე შემიძლია ქართულად ლაპარაკი (me shemidzlia kartulad laparaki)',
      explanation: "The structure with 'შემიძლია (shemidzlia)' typically follows the pattern: subject + შემიძლია + verbal noun.",
      type: 'order'
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
      updateProgress('quiz-sentences', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and quiz completion
        const completed = showScore;
        
        updateProgress('quiz-sentences', { 
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
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Sentence Construction Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of Georgian sentence construction
              </p>
            </div>
            <Link
              to="/intermediate/sentences"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Sentences
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
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
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
                      : (theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700')
                  }`}
                >
                  {isChecking ? 'Checking...' : 'Check Answer'}
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Trophy size={64} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
              
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
                    ? 'Excellent! You have a great understanding of Georgian sentence construction.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your sentence construction skills.'
                      : 'Keep learning! Review the sentence construction rules and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-green-700 text-white hover:bg-green-800' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to="/intermediate/sentences"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Sentences
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SentenceConstructionQuiz;