import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
}

interface QuizParams {
  topic: string;
  level: string;
}

const QuizPage: React.FC<{ level: string }> = ({ level }) => {
  const { theme } = useTheme();
  const { topic } = useParams<QuizParams>();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isChecking, setIsChecking] = useState(false);
  
  // Mock questions based on topic and level
  useEffect(() => {
    let quizQuestions: Question[] = [];
    
    if (level === 'beginner' && topic === 'alphabet') {
      quizQuestions = [
        {
          id: 1,
          question: 'What is the Georgian letter "ა" called?',
          options: ['Ani', 'Bani', 'Gani', 'Doni'],
          correctAnswer: 'Ani',
        },
        {
          id: 2,
          question: 'Which Georgian letter corresponds to the sound "m"?',
          options: ['მ', 'ნ', 'პ', 'ბ'],
          correctAnswer: 'მ',
        },
        {
          id: 3,
          question: 'How many letters are in the Georgian alphabet?',
          options: ['26', '28', '33', '36'],
          correctAnswer: '33',
        },
        {
          id: 4,
          question: 'Which of these is NOT a Georgian letter?',
          options: ['ვ', 'ღ', 'ჩ', 'ფ'],
          correctAnswer: 'ვ',
        },
        {
          id: 5,
          question: 'The Georgian letter "თ" corresponds to which sound?',
          options: ['t', 'th', 'f', 'v'],
          correctAnswer: 'th',
        },
      ];
    } else if (level === 'beginner' && topic === 'colors') {
      quizQuestions = [
        {
          id: 1,
          question: 'How do you say "red" in Georgian?',
          options: ['ლურჯი - lurji', 'წითელი - ts’iteli', 'მწვანე - mts’vane', 'ყვითელი - q’viteli'],
          correctAnswer: 'წითელი - ts’iteli',
        },
        {
          id: 2,
          question: 'What color is "შავი - shavi" in English?',
          options: ['White', 'Black', 'Blue', 'Green'],
          correctAnswer: 'Black',
        },
        {
          id: 3,
          question: 'Which is the Georgian word for "blue - lurji"?',
          options: ['ლურჯი', 'მწვანე', 'ყვითელი', 'თეთრი'],
          correctAnswer: 'ლურჯი',
        },
        {
          id: 4,
          question: 'How do you say "yellow - q’viteli" in Georgian?',
          options: ['წითელი', 'მწვანე', 'ყვითელი', 'ნარინჯისფერი'],
          correctAnswer: 'ყვითელი',
        },
        {
          id: 5,
          question: 'What color is "ვარდისფერი - vardisperi" in English?',
          options: ['Purple', 'Orange', 'Red', 'Pink'],
          correctAnswer: 'Pink',
        },
      ];
    } else if (level === 'beginner' && topic === 'numbers') {
      quizQuestions = [
        {
          id: 1,
          question: 'What is "erti" in English?',
          options: ['Two', 'Three', 'One', 'Four'],
          correctAnswer: 'One',
        },
        {
          id: 2,
          question: 'How do you say "five" in Georgian?',
          options: ['ოთხი - otkhi', 'ხუთი - khuti', 'ექვსი - ekvsi', 'შვიდი - shvidi'],
          correctAnswer: 'ხუთი - khuti',
        },
        {
          id: 3,
          question: 'What is the Georgian word for "ten"?',
          options: ['ცხრა - tskhra', 'რვა - rva', 'ათი - ati', 'თერთმეტი - tertmet’i'],
          correctAnswer: 'ათი - ati',
        },
        {
          id: 4,
          question: 'How do you say "three" in Georgian?',
          options: ['ორი - ori', 'სამი - sami', 'ოთხი - otkhi', 'ხუთი - khuti'],
          correctAnswer: 'სამი - sami',
        },
        {
          id: 5,
          question: 'What is "ოთხი - otkhi" in English?',
          options: ['Three', 'Four', 'Five', 'Six'],
          correctAnswer: 'Four',
        },
      ];
    } else if (level === 'beginner' && topic === 'food') {
      quizQuestions = [
        {
          id: 1,
          question: 'What is "პური" in English?',
          options: ['Water', 'Cheese', 'Bread', 'Wine'],
          correctAnswer: 'Bread',
        },
        {
          id: 2,
          question: 'How do you say "cheese" in Georgian?',
          options: ['ყველი', 'პური', 'ხაჭაპური', 'ხინკალი'],
          correctAnswer: 'ყველი',
        },
        {
          id: 3,
          question: 'What is "ღვინო" in English?',
          options: ['Beer', 'Juice', 'Water', 'Wine'],
          correctAnswer: 'Wine',
        },
        {
          id: 4,
          question: 'Which is the Georgian word for "water"?',
          options: ['წყალი', 'ჩაი', 'ყავა', 'ლუდი'],
          correctAnswer: 'წყალი',
        },
        {
          id: 5,
          question: 'What Georgian food is "ხაჭაპური"?',
          options: ['Dumplings', 'Cheese bread', 'Grilled meat', 'Soup'],
          correctAnswer: 'Cheese bread',
        },
      ];
    } else {
      // Default questions if topic doesn't match
      quizQuestions = [
        {
          id: 1,
          question: 'Sample question 1',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
        },
        {
          id: 2,
          question: 'Sample question 2',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option B',
        },
      ];
    }
    
    setQuestions(quizQuestions);
    setRemainingTime(30);
  }, [level, topic]);

  // Timer effect
  useEffect(() => {
    if (showScore || isChecking) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAnswer(null); // Auto-submit when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showScore, isChecking]);

  const handleOptionClick = (option: string) => {
    if (answerStatus || isChecking) return; // Prevent changing answer after submission
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isChecking) return;
    
    setIsChecking(true);
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Wait for 1.5 seconds before moving to the next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswerStatus(null);
        setRemainingTime(30);
      } else {
        setShowScore(true);
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleAnswer = (option: string | null) => {
    setSelectedOption(option);
    setIsChecking(true);
    
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Wait for 1.5 seconds before moving to the next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswerStatus(null);
        setRemainingTime(30);
      } else {
        setShowScore(true);
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswerStatus(null);
    setRemainingTime(30);
  };

  const getTopicName = () => {
    const topicMap: Record<string, string> = {
      alphabet: 'Georgian Alphabet',
      colors: 'Colors',
      numbers: 'Numbers',
      food: 'Food & Drinks',
    };
    
    return topicMap[topic as string] || 'Quiz';
  };

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>{getTopicName()} Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of the {getTopicName().toLowerCase()} in Georgian
              </p>
            </div>
            <Link
              to={topic === 'alphabet' ? '/beginner/alphabet' : `/beginner/vocabulary/${topic}`}
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Lesson
            </Link>
          </div>
        </div>
      </section>

      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showScore ? (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              {/* Quiz progress */}
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
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ 
                      width: `${((currentQuestion) / questions.length) * 100}%`,
                      transition: 'width 0.5s ease'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Question */}
              {questions.length > 0 && (
                <>
                  <div className="mb-6">
                    <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {questions[currentQuestion].question}
                    </h2>
                    
                    {questions[currentQuestion].image && (
                      <img 
                        src={questions[currentQuestion].image} 
                        alt="Question" 
                        className="rounded-lg mb-4 max-h-48 mx-auto"
                      />
                    )}
                  </div>
                  
                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedOption === option
                            ? answerStatus === 'correct'
                              ? (theme === 'dark' ? 'bg-green-900 border-green-700 text-white' : 'bg-green-100 border-green-500 text-green-800')
                              : answerStatus === 'incorrect'
                                ? option === questions[currentQuestion].correctAnswer
                                  ? (theme === 'dark' ? 'bg-green-900 border-green-700 text-white' : 'bg-green-100 border-green-500 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-900 border-red-700 text-white' : 'bg-red-100 border-red-500 text-red-800')
                                : (theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-yellow-50 border-yellow-300 text-gray-800')
                            : (theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50')
                        }`}
                        disabled={answerStatus !== null || isChecking}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedOption === option && answerStatus === 'correct' && (
                            <Check size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                          )}
                          {selectedOption === option && answerStatus === 'incorrect' && (
                            <X size={20} className={theme === 'dark' ? 'text-red-400' : 'text-red-500'} />
                          )}
                          {option === questions[currentQuestion].correctAnswer && selectedOption !== null && selectedOption !== option && answerStatus === 'incorrect' && (
                            <Check size={20} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Next button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedOption || answerStatus !== null || isChecking}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                        !selectedOption || answerStatus !== null || isChecking
                          ? (theme === 'dark' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-500 text-white hover:bg-yellow-600')
                      }`}
                    >
                      Check Answer
                      <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Show final score
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
                    ? 'Excellent! You have a great understanding of this topic.'
                    : score / questions.length >= 0.6
                      ? 'Good job! You\'re doing well, but there\'s still room for improvement.'
                      : 'Keep practicing! Review the lesson material and try again.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-yellow-700 text-white hover:bg-yellow-800' 
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  Retake Quiz
                </button>
                
                <Link
                  to={topic === 'alphabet' ? '/beginner/alphabet' : `/beginner/vocabulary/${topic}`}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Lesson
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuizPage;