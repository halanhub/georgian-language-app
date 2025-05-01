import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  type: 'translation' | 'listening' | 'matching';
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does 'მე' mean?",
    options: ['You', 'I', 'He', 'She'],
    correctAnswer: 'I',
    explanation: 'მე (me) is the first-person singular pronoun "I" in Georgian',
    type: 'translation'
  },
  {
    id: 2,
    question: "Choose the correct translation for 'thank you'",
    options: ['გამარჯობა', 'მადლობა', 'ნახვამდის', 'გთხოვთ'],
    correctAnswer: 'მადლობა',
    explanation: 'მადლობა (madloba) means "thank you" in Georgian',
    type: 'translation'
  },
  {
    id: 3,
    question: "Match the word 'სახლი' with its meaning",
    options: ['Car', 'House', 'Book', 'Tree'],
    correctAnswer: 'House',
    explanation: 'სახლი (sakhli) means "house" in Georgian',
    type: 'matching'
  },
  {
    id: 4,
    question: "What is the Georgian word for 'water'?",
    options: ['წყალი', 'პური', 'ღვინო', 'ჩაი'],
    correctAnswer: 'წყალი',
    explanation: 'წყალი (tsqali) means "water" in Georgian',
    type: 'translation'
  },
  {
    id: 5,
    question: "Choose the correct meaning of 'დიდი'",
    options: ['Small', 'Big', 'New', 'Old'],
    correctAnswer: 'Big',
    explanation: 'დიდი (didi) means "big" in Georgian',
    type: 'translation'
  },
  // Add more questions...
];

const CommonWordsQuiz: React.FC = () => {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isChecking, setIsChecking] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isChecking) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer || isChecking) return;
    
    setIsChecking(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setRemainingTime(30);
      } else {
        setShowScore(true);
      }
      setIsChecking(false);
    }, 1500);
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setRemainingTime(30);
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>Common Words Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of common Georgian words
              </p>
            </div>
            <Link
              to="/intermediate/common-words"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Words
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
                      {option}
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
                  onClick={checkAnswer}
                  disabled={!selectedAnswer || isChecking}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                    !selectedAnswer || isChecking
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                      : (theme === 'dark' ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-500 text-white hover:bg-yellow-600')
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
                    ? 'Excellent! You have a great understanding of common Georgian words.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your vocabulary.'
                      : 'Keep learning! Review the common words and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={retakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-yellow-700 text-white hover:bg-yellow-800' 
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to="/intermediate/common-words"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Common Words
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommonWordsQuiz;