import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock, Trophy, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  id: number;
  passage: string;
  passageTranslation: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

const ReadingQuiz: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(90);
  const [isChecking, setIsChecking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      passage: "საქართველო მდებარეობს კავკასიაში. ეს არის ლამაზი ქვეყანა მთებით, ზღვით და ძველი ისტორიით. საქართველოს დედაქალაქია თბილისი. ქვეყანაში ცხოვრობს დაახლოებით 3.7 მილიონი ადამიანი. ქართული ენა უნიკალურია და აქვს საკუთარი ანბანი 33 ასოთი.",
      passageTranslation: "Georgia is located in the Caucasus. It is a beautiful country with mountains, sea, and ancient history. The capital of Georgia is Tbilisi. About 3.7 million people live in the country. The Georgian language is unique and has its own alphabet with 33 letters.",
      question: "According to the passage, how many letters are in the Georgian alphabet?",
      options: ["28", "33", "36", "40"],
      correctAnswer: "33",
      explanation: "The passage states that the Georgian language has its own alphabet with 33 letters (ქართული ენა უნიკალურია და აქვს საკუთარი ანბანი 33 ასოთი)."
    },
    {
      id: 2,
      passage: "ქართული სამზარეულო ცნობილია მსოფლიოში. ყველაზე პოპულარული კერძებია ხაჭაპური, ხინკალი და მწვადი. ხაჭაპური არის პური ყველით. ხინკალი არის ცომის პარკუჭები ხორცით. მწვადი არის შემწვარი ხორცი შამფურზე.",
      passageTranslation: "Georgian cuisine is famous worldwide. The most popular dishes are khachapuri, khinkali, and mtsvadi. Khachapuri is bread with cheese. Khinkali are dough dumplings with meat. Mtsvadi is grilled meat on a skewer.",
      question: "What is khinkali according to the passage?",
      options: [
        "Bread with cheese (პური ყველით)",
        "Dough dumplings with meat (ცომის პარკუჭები ხორცით)",
        "Grilled meat on a skewer (შემწვარი ხორცი შამფურზე)",
        "A type of wine (ღვინის სახეობა)"
      ],
      correctAnswer: "Dough dumplings with meat (ცომის პარკუჭები ხორცით)",
      explanation: "According to the passage, khinkali (ხინკალი) is described as dough dumplings with meat (ცომის პარკუჭები ხორცით)."
    },
    {
      id: 3,
      passage: "საქართველოში ოთხი სეზონია: გაზაფხული, ზაფხული, შემოდგომა და ზამთარი. გაზაფხულზე ამინდი თბილია და ყვავილები ყვავის. ზაფხულში ცხელა, განსაკუთრებით აღმოსავლეთ საქართველოში. შემოდგომაზე ფოთლები ფერს იცვლის და ხეებიდან ცვივა. ზამთარში ცივა და ხშირად თოვს, განსაკუთრებით მთებში.",
      passageTranslation: "There are four seasons in Georgia: spring, summer, autumn, and winter. In spring, the weather is warm and flowers bloom. In summer, it's hot, especially in eastern Georgia. In autumn, the leaves change color and fall from the trees. In winter, it's cold and often snows, especially in the mountains.",
      question: "According to the passage, when do leaves change color and fall from trees?",
      options: [
        "In spring (გაზაფხულზე)",
        "In summer (ზაფხულში)",
        "In autumn (შემოდგომაზე)",
        "In winter (ზამთარში)"
      ],
      correctAnswer: "In autumn (შემოდგომაზე)",
      explanation: "The passage states that in autumn (შემოდგომაზე), the leaves change color and fall from the trees (ფოთლები ფერს იცვლის და ხეებიდან ცვივა)."
    },
    {
      id: 4,
      passage: "ქართული ანბანი შეიქმნა მე-5 საუკუნეში. ის შედგება 33 ასოსგან და თითოეულ ასოს აქვს თავისი ბგერა. ქართული დამწერლობა შეტანილია UNESCO-ს მსოფლიო მემკვიდრეობის სიაში. ქართული ენა ეკუთვნის ქართველურ ენათა ოჯახს.",
      passageTranslation: "The Georgian alphabet was created in the 5th century. It consists of 33 letters and each letter has its own sound. Georgian script is included in UNESCO's World Heritage List. The Georgian language belongs to the Kartvelian language family.",
      question: "When was the Georgian alphabet created according to the passage?",
      options: [
        "3rd century",
        "4th century",
        "5th century",
        "6th century"
      ],
      correctAnswer: "5th century",
      explanation: "According to the passage, the Georgian alphabet was created in the 5th century (ქართული ანბანი შეიქმნა მე-5 საუკუნეში)."
    },
    {
      id: 5,
      passage: "საქართველოში ბევრი ლამაზი ქალაქია. თბილისი არის დედაქალაქი და ყველაზე დიდი ქალაქი. ბათუმი მდებარეობს შავი ზღვის სანაპიროზე და ცნობილია თავისი პლაჟებით. ქუთაისი არის მეორე უდიდესი ქალაქი და მდებარეობს დასავლეთ საქართველოში. მცხეთა არის ძველი დედაქალაქი და მდებარეობს თბილისთან ახლოს.",
      passageTranslation: "There are many beautiful cities in Georgia. Tbilisi is the capital and the largest city. Batumi is located on the Black Sea coast and is famous for its beaches. Kutaisi is the second largest city and is located in western Georgia. Mtskheta is the ancient capital and is located near Tbilisi.",
      question: "Which city is described as the ancient capital of Georgia?",
      options: [
        "Tbilisi (თბილისი)",
        "Batumi (ბათუმი)",
        "Kutaisi (ქუთაისი)",
        "Mtskheta (მცხეთა)"
      ],
      correctAnswer: "Mtskheta (მცხეთა)",
      explanation: "According to the passage, Mtskheta (მცხეთა) is described as the ancient capital (ძველი დედაქალაქი)."
    },
    {
      id: 6,
      passage: "ქართული სუფრა არის მნიშვნელოვანი ტრადიცია. სუფრას ხელმძღვანელობს თამადა, რომელიც წარმოთქვამს სადღეგრძელოებს. სუფრაზე ბევრი კერძი და ღვინოა. სტუმრებს პატივს სცემენ და მასპინძლები ყველაფერს აკეთებენ, რომ მათ კარგად იგრძნონ თავი.",
      passageTranslation: "The Georgian supra (feast) is an important tradition. The supra is led by a tamada (toastmaster) who makes toasts. There are many dishes and wine at the supra. Guests are respected, and hosts do everything to make them feel comfortable.",
      question: "Who leads the Georgian supra according to the passage?",
      options: [
        "The oldest person (უხუცესი ადამიანი)",
        "The tamada (თამადა)",
        "The host (მასპინძელი)",
        "The guest of honor (საპატიო სტუმარი)"
      ],
      correctAnswer: "The tamada (თამადა)",
      explanation: "According to the passage, the supra is led by a tamada (სუფრას ხელმძღვანელობს თამადა), who makes toasts."
    },
    {
      id: 7,
      passage: "ქართული ენა ერთ-ერთი უძველესი ენაა მსოფლიოში. ის არ ჰგავს სხვა ენებს და აქვს უნიკალური გრამატიკული სტრუქტურა. ქართულ ენაში არის შვიდი ბრუნვა და რთული ზმნური სისტემა. ქართული ენის სწავლა შეიძლება რთული იყოს უცხოელებისთვის, მაგრამ ძალიან საინტერესოა.",
      passageTranslation: "The Georgian language is one of the oldest languages in the world. It is unlike other languages and has a unique grammatical structure. The Georgian language has seven cases and a complex verb system. Learning Georgian can be difficult for foreigners, but it is very interesting.",
      question: "How many cases does the Georgian language have according to the passage?",
      options: ["Five", "Six", "Seven", "Eight"],
      correctAnswer: "Seven",
      explanation: "According to the passage, the Georgian language has seven cases (ქართულ ენაში არის შვიდი ბრუნვა)."
    },
    {
      id: 8,
      passage: "საქართველოში ბევრი ტრადიციული დღესასწაულია. ახალი წელი აღინიშნება 1 იანვარს. შობა აღინიშნება 7 იანვარს. აღდგომა არის მოძრავი დღესასწაული და აღინიშნება გაზაფხულზე. გიორგობა აღინიშნება 23 ნოემბერს და ეძღვნება წმინდა გიორგის.",
      passageTranslation: "There are many traditional holidays in Georgia. New Year is celebrated on January 1. Christmas is celebrated on January 7. Easter is a movable holiday and is celebrated in spring. Giorgoba is celebrated on November 23 and is dedicated to Saint George.",
      question: "When is Christmas celebrated in Georgia according to the passage?",
      options: [
        "December 25",
        "January 1",
        "January 7",
        "November 23"
      ],
      correctAnswer: "January 7",
      explanation: "According to the passage, Christmas is celebrated on January 7 in Georgia (შობა აღინიშნება 7 იანვარს)."
    },
    {
      id: 9,
      passage: "ქართული ცეკვები ძალიან ცნობილია. ქართული ცეკვები გამოირჩევა დინამიურობით და ტექნიკურობით. მამაკაცები ცეკვავენ ენერგიულად, ხოლო ქალები ცეკვავენ ნაზად. ყველაზე ცნობილი ცეკვებია 'ქართული', 'ხორუმი', 'აჭარული' და 'მთიულური'.",
      passageTranslation: "Georgian dances are very famous. Georgian dances are distinguished by their dynamism and technicality. Men dance energetically, while women dance gracefully. The most famous dances are 'Kartuli', 'Khorumi', 'Acharuli', and 'Mtiuluri'.",
      question: "How do women dance in Georgian dances according to the passage?",
      options: [
        "Energetically (ენერგიულად)",
        "Gracefully (ნაზად)",
        "Technically (ტექნიკურად)",
        "Dynamically (დინამიურად)"
      ],
      correctAnswer: "Gracefully (ნაზად)",
      explanation: "According to the passage, women dance gracefully (ქალები ცეკვავენ ნაზად) in Georgian dances."
    },
    {
      id: 10,
      passage: "ქართული ღვინო ერთ-ერთი უძველესია მსოფლიოში. ღვინის დაყენების ტრადიცია საქართველოში 8000 წლისაა. ქართული ღვინო მზადდება ქვევრში, რომელიც არის დიდი თიხის ჭურჭელი. ქვევრი ჩაფლულია მიწაში. ყველაზე ცნობილი ღვინოებია საფერავი, რქაწითელი და ქინძმარაული.",
      passageTranslation: "Georgian wine is one of the oldest in the world. The tradition of winemaking in Georgia is 8000 years old. Georgian wine is made in qvevri, which is a large clay vessel. The qvevri is buried in the ground. The most famous wines are Saperavi, Rkatsiteli, and Kindzmarauli.",
      question: "How old is the winemaking tradition in Georgia according to the passage?",
      options: [
        "5000 years",
        "6000 years",
        "7000 years",
        "8000 years"
      ],
      correctAnswer: "8000 years",
      explanation: "According to the passage, the tradition of winemaking in Georgia is 8000 years old (ღვინის დაყენების ტრადიცია საქართველოში 8000 წლისაა)."
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
      updateProgress('quiz-reading', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and quiz completion
        const completed = showScore;
        
        updateProgress('quiz-reading', { 
          timeSpent, 
          completed: completed,
          score: Math.round((score / questions.length) * 100)
        });
      }
    };
  }, [user, timeSpent, showScore, score, questions.length]);

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
        setRemainingTime(90);
        setShowTranslation(false);
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
    setRemainingTime(90);
    setShowTranslation(false);
  };

  const toggleTranslation = () => {
    updateActivity();
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Reading Comprehension Quiz</span>
              </h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Test your Georgian reading comprehension skills
              </p>
            </div>
            <Link
              to="/intermediate/reading"
              className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Reading
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
                    remainingTime > 20 
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
                <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Read the passage:
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    {questions[currentQuestion].passage}
                  </p>
                  <button
                    onClick={toggleTranslation}
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    {showTranslation ? 'Hide Translation' : 'Show Translation'}
                  </button>
                  
                  {showTranslation && (
                    <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {questions[currentQuestion].passageTranslation}
                      </p>
                    </div>
                  )}
                </div>
                
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
                    ? 'Excellent! You have great Georgian reading comprehension skills.'
                    : score / questions.length >= 0.6
                      ? 'Good job! Keep practicing to improve your reading comprehension.'
                      : 'Keep learning! Practice more reading and try again.'}
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
                  to="/intermediate/reading"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Back to Reading
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReadingQuiz;