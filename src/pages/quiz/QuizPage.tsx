import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  image?: string;
  type?: 'reading' | 'listening' | 'speaking' | 'writing';
}

interface QuizParams {
  topic: string;
}

const QuizPage: React.FC = () => {
  const { theme } = useTheme();
  const { topic } = useParams<QuizParams>();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [remainingTime, setRemainingTime] = useState(30);
  const [isChecking, setIsChecking] = useState(false);

  // Get quiz questions based on topic
  const getQuizQuestions = (topic: string): Question[] => {
    switch (topic) {
      case 'vocabulary':
        return [
          {
            id: 1,
            question: "What does 'გამარჯობა' mean?",
            options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
            correctAnswer: 'Hello',
            explanation: 'გამარჯობა (gamarjoba) is the most common way to say "hello" in Georgian'
          },
          {
            id: 2,
            question: "Which word means 'thank you'?",
            options: ['მადლობა', 'კარგი', 'დიახ', 'არა'],
            correctAnswer: 'მადლობა',
            explanation: 'მადლობა (madloba) means "thank you"'
          },
          {
            id: 3,
            question: "What is 'good morning' in Georgian?",
            options: ['დილა მშვიდობისა', 'საღამო მშვიდობისა', 'ღამე მშვიდობისა', 'შუადღე მშვიდობისა'],
            correctAnswer: 'დილა მშვიდობისა',
            explanation: 'დილა მშვიდობისა (dila mshvidobisa) means "good morning"'
          },
          {
            id: 4,
            question: "Which phrase means 'goodbye'?",
            options: ['ნახვამდის', 'გაგიმარჯოს', 'გმადლობთ', 'გთხოვთ'],
            correctAnswer: 'ნახვამდის',
            explanation: 'ნახვამდის (nakhvamdis) means "goodbye"'
          },
          {
            id: 5,
            question: "What does 'კი' mean?",
            options: ['Yes', 'No', 'Maybe', 'Please'],
            correctAnswer: 'Yes',
            explanation: 'კი (ki) means "yes"'
          }
        ];

      case 'alphabet':
        return [
          {
            id: 1,
            question: "What is the Georgian letter 'ა' called?",
            options: ['ანი (ani)', 'ბანი (bani)', 'განი (gani)', 'დონი (doni)'],
            correctAnswer: 'ანი (ani)',
            explanation: 'ანი (ani) is the first letter of the Georgian alphabet'
          },
          {
            id: 2,
            question: "Which Georgian letter makes the 'k' sound?",
            options: ['კ', 'ქ', 'ღ', 'ყ'],
            correctAnswer: 'კ',
            explanation: 'კ makes the "k" sound as in "king"'
          },
          {
            id: 3,
            question: "How many letters are in the Georgian alphabet?",
            options: ['26', '30', '33', '36'],
            correctAnswer: '33',
            explanation: 'The Georgian alphabet consists of 33 unique letters'
          },
          {
            id: 4,
            question: "Which letter represents the 'ch' sound?",
            options: ['ჩ', 'ც', 'წ', 'ჭ'],
            correctAnswer: 'ჩ',
            explanation: 'ჩ makes the "ch" sound as in "church"'
          },
          {
            id: 5,
            question: "What sound does 'შ' make?",
            options: ['s', 'z', 'sh', 'zh'],
            correctAnswer: 'sh',
            explanation: 'შ makes the "sh" sound as in "ship"'
          }
        ];

      case 'colors':
        return [
          {
            id: 1,
            question: "What is 'red' in Georgian?",
            options: ['წითელი', 'ლურჯი', 'მწვანე', 'ყვითელი'],
            correctAnswer: 'წითელი',
            explanation: 'წითელი (tsiteli) means "red"'
          },
          {
            id: 2,
            question: "Which color is 'მწვანე'?",
            options: ['Blue', 'Green', 'Yellow', 'Purple'],
            correctAnswer: 'Green',
            explanation: 'მწვანე (mtsvane) means "green"'
          },
          {
            id: 3,
            question: "What is 'black' in Georgian?",
            options: ['თეთრი', 'შავი', 'რუხი', 'ყავისფერი'],
            correctAnswer: 'შავი',
            explanation: 'შავი (shavi) means "black"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'blue'?",
            options: ['ლურჯი', 'იისფერი', 'ნარინჯისფერი', 'ვარდისფერი'],
            correctAnswer: 'ლურჯი',
            explanation: 'ლურჯი (lurji) means "blue"'
          },
          {
            id: 5,
            question: "What color is 'ყვითელი'?",
            options: ['Red', 'Blue', 'Yellow', 'Green'],
            correctAnswer: 'Yellow',
            explanation: 'ყვითელი (qviteli) means "yellow"'
          }
        ];

      case 'numbers':
        return [
          {
            id: 1,
            question: "What is 'five' in Georgian?",
            options: ['სამი', 'ოთხი', 'ხუთი', 'ექვსი'],
            correctAnswer: 'ხუთი',
            explanation: 'ხუთი (khuti) means "five"'
          },
          {
            id: 2,
            question: "Which number is 'ათი'?",
            options: ['Eight', 'Nine', 'Ten', 'Eleven'],
            correctAnswer: 'Ten',
            explanation: 'ათი (ati) means "ten"'
          },
          {
            id: 3,
            question: "What is the Georgian word for 'twenty'?",
            options: ['ოცი', 'ოცდაათი', 'ორმოცი', 'ორი'],
            correctAnswer: 'ოცი',
            explanation: 'ოცი (otsi) means "twenty"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'seven'?",
            options: ['ექვსი', 'შვიდი', 'რვა', 'ცხრა'],
            correctAnswer: 'შვიდი',
            explanation: 'შვიდი (shvidi) means "seven"'
          },
          {
            id: 5,
            question: "What number is 'ორმოცდაათი'?",
            options: ['Thirty', 'Forty', 'Fifty', 'Sixty'],
            correctAnswer: 'Fifty',
            explanation: 'ორმოცდაათი (ormotsdaati) means "fifty"'
          }
        ];

      case 'months':
        return [
          {
            id: 1,
            question: "What is 'January' in Georgian?",
            options: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი'],
            correctAnswer: 'იანვარი',
            explanation: 'იანვარი (ianuari) means "January"'
          },
          {
            id: 2,
            question: "Which season is 'ზაფხული'?",
            options: ['Spring', 'Summer', 'Autumn', 'Winter'],
            correctAnswer: 'Summer',
            explanation: 'ზაფხული (zapkhuli) means "summer"'
          },
          {
            id: 3,
            question: "What is 'autumn' in Georgian?",
            options: ['ზაფხული', 'შემოდგომა', 'ზამთარი', 'გაზაფხული'],
            correctAnswer: 'შემოდგომა',
            explanation: 'შემოდგომა (shemodgoma) means "autumn"'
          },
          {
            id: 4,
            question: "Which month is 'ივლისი'?",
            options: ['June', 'July', 'August', 'September'],
            correctAnswer: 'July',
            explanation: 'ივლისი (ivlisi) means "July"'
          },
          {
            id: 5,
            question: "What is the Georgian word for 'spring'?",
            options: ['ზამთარი', 'შემოდგომა', 'გაზაფხული', 'ზაფხული'],
            correctAnswer: 'გაზაფხული',
            explanation: 'გაზაფხული (gazapkhuli) means "spring"'
          }
        ];

      case 'food':
        return [
          {
            id: 1,
            question: "What is 'bread' in Georgian?",
            options: ['პური', 'ყველი', 'ხორცი', 'თევზი'],
            correctAnswer: 'პური',
            explanation: 'პური (puri) means "bread"'
          },
          {
            id: 2,
            question: "Which food is 'ხაჭაპური'?",
            options: ['Meat pie', 'Cheese bread', 'Bean soup', 'Dumpling'],
            correctAnswer: 'Cheese bread',
            explanation: 'ხაჭაპური (khachapuri) is Georgian cheese-filled bread'
          },
          {
            id: 3,
            question: "What is 'wine' in Georgian?",
            options: ['წყალი', 'ღვინო', 'ლუდი', 'ჩაი'],
            correctAnswer: 'ღვინო',
            explanation: 'ღვინო (ghvino) means "wine"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'water'?",
            options: ['ჩაი', 'ყავა', 'წყალი', 'რძე'],
            correctAnswer: 'წყალი',
            explanation: 'წყალი (tsqali) means "water"'
          },
          {
            id: 5,
            question: "What food is 'ხინკალი'?",
            options: ['Bread', 'Cheese', 'Dumplings', 'Soup'],
            correctAnswer: 'Dumplings',
            explanation: 'ხინკალი (khinkali) are Georgian dumplings'
          }
        ];

      case 'body':
        return [
          {
            id: 1,
            question: "What is 'head' in Georgian?",
            options: ['თავი', 'ხელი', 'ფეხი', 'გული'],
            correctAnswer: 'თავი',
            explanation: 'თავი (tavi) means "head"'
          },
          {
            id: 2,
            question: "Which body part is 'თვალი'?",
            options: ['Nose', 'Eye', 'Ear', 'Mouth'],
            correctAnswer: 'Eye',
            explanation: 'თვალი (tvali) means "eye"'
          },
          {
            id: 3,
            question: "What is 'heart' in Georgian?",
            options: ['თავი', 'ხელი', 'გული', 'ფეხი'],
            correctAnswer: 'გული',
            explanation: 'გული (guli) means "heart"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'hand'?",
            options: ['ფეხი', 'ხელი', 'თავი', 'ყური'],
            correctAnswer: 'ხელი',
            explanation: 'ხელი (kheli) means "hand"'
          },
          {
            id: 5,
            question: "What body part is 'პირი'?",
            options: ['Eye', 'Nose', 'Mouth', 'Ear'],
            correctAnswer: 'Mouth',
            explanation: 'პირი (piri) means "mouth"'
          }
        ];

      case 'animals':
        return [
          {
            id: 1,
            question: "What is 'dog' in Georgian?",
            options: ['კატა', 'ძაღლი', 'ცხენი', 'თაგვი'],
            correctAnswer: 'ძაღლი',
            explanation: 'ძაღლი (dzaghli) means "dog"'
          },
          {
            id: 2,
            question: "Which animal is 'კატა'?",
            options: ['Dog', 'Cat', 'Horse', 'Mouse'],
            correctAnswer: 'Cat',
            explanation: 'კატა (kata) means "cat"'
          },
          {
            id: 3,
            question: "What is 'bird' in Georgian?",
            options: ['ჩიტი', 'თევზი', 'გველი', 'სპილო'],
            correctAnswer: 'ჩიტი',
            explanation: 'ჩიტი (chiti) means "bird"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'lion'?",
            options: ['დათვი', 'მგელი', 'ლომი', 'ვეფხვი'],
            correctAnswer: 'ლომი',
            explanation: 'ლომი (lomi) means "lion"'
          },
          {
            id: 5,
            question: "What animal is 'თევზი'?",
            options: ['Bird', 'Snake', 'Fish', 'Mouse'],
            correctAnswer: 'Fish',
            explanation: 'თევზი (tevzi) means "fish"'
          }
        ];

      case 'activities':
        return [
          {
            id: 1,
            question: "What does 'გაღვიძება' mean?",
            options: ['Sleeping', 'Waking up', 'Eating', 'Working'],
            correctAnswer: 'Waking up',
            explanation: 'გაღვიძება (gaghvidzeba) means "waking up"'
          },
          {
            id: 2,
            question: "Which activity is 'მუშაობა'?",
            options: ['Studying', 'Working', 'Reading', 'Writing'],
            correctAnswer: 'Working',
            explanation: 'მუშაობა (mushaoba) means "working"'
          },
          {
            id: 3,
            question: "What is 'cooking' in Georgian?",
            options: ['ჭამა', 'სმა', 'საჭმლის მომზადება', 'დალაგება'],
            correctAnswer: 'საჭმლის მომზადება',
            explanation: 'საჭმლის მომზადება (sachmlis momzadeba) means "cooking"'
          },
          {
            id: 4,
            question: "Which is the correct translation for 'reading'?",
            options: ['წერა', 'კითხვა', 'სწავლა', 'თამაში'],
            correctAnswer: 'კითხვა',
            explanation: 'კითხვა (kitkhva) means "reading"'
          },
          {
            id: 5,
            question: "What activity is 'სეირნობა'?",
            options: ['Running', 'Walking', 'Swimming', 'Dancing'],
            correctAnswer: 'Walking',
            explanation: 'სეირნობა (seirnoba) means "taking a walk"'
          }
        ];

      default:
        return [];
    }
  };

  const questions = getQuizQuestions(topic || '');

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
    if (isChecking) return;
    
    setIsChecking(true);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
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
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setRemainingTime(30);
  };

  const getTopicName = () => {
    const topicMap: Record<string, string> = {
      alphabet: 'Georgian Alphabet',
      colors: 'Colors & Shapes',
      numbers: 'Numbers',
      months: 'Months & Seasons',
      food: 'Food & Drinks',
      body: 'Human Body',
      animals: 'Animals',
      activities: 'Daily Activities',
      vocabulary: 'Basic Vocabulary'
    };
    
    return topicMap[topic || ''] || 'Quiz';
  };

  const getBackLink = () => {
    const linkMap: Record<string, string> = {
      alphabet: '/beginner/alphabet',
      colors: '/beginner/colors-and-shapes',
      numbers: '/beginner/numbers',
      months: '/beginner/months-and-seasons',
      food: '/beginner/food-and-drinks',
      body: '/beginner/human-body',
      animals: '/beginner/animals',
      activities: '/beginner/daily-activities',
      vocabulary: '/beginner/vocabulary'
    };
    
    return linkMap[topic || ''] || '/beginner';
  };

  // If no questions are available, show a message and a back button
  if (questions.length === 0) {
    return (
      <div className="pt-16 pb-16">
        <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Quiz Not Available
              </h1>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Sorry, this quiz is not available at the moment.
              </p>
              <Link
                to="/beginner"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                  theme === 'dark' 
                    ? 'bg-yellow-700 text-white hover:bg-yellow-800' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Lessons
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16">
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-yellow-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>{getTopicName()} Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your knowledge of {getTopicName().toLowerCase()}
              </p>
            </div>
            <Link
              to={getBackLink()}
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

                {answerStatus !== null && questions[currentQuestion].explanation && (
                  <div className={`mt-4 p-4 rounded-md ${
                    answerStatus === 'correct'
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
                Quiz Complete!
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
                      ? 'Good job! Keep practicing to improve your score.'
                      : 'Keep learning! Review the material and try again.'}
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
                  to={getBackLink()}
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