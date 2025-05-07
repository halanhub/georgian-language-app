import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface TimeWord {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface TimeCategory {
  id: string;
  title: string;
  description: string;
  words: TimeWord[];
}

const MonthsAndSeasonsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'ordering' | 'translation' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [orderingItems, setOrderingItems] = useState<string[]>([]);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: TimeCategory[] = [
    {
      id: 'months',
      title: 'Months of the Year',
      description: 'Learn the Georgian names for months',
      words: [
        { georgian: 'იანვარი', latin: 'ianuari', english: 'January', example: 'იანვარში თოვს (ianvarshi tovs) - It snows in January' },
        { georgian: 'თებერვალი', latin: 'tebervali', english: 'February', example: 'თებერვალი მოკლე თვეა (tebervali mokle tvea) - February is a short month' },
        { georgian: 'მარტი', latin: 'marti', english: 'March', example: 'მარტში გაზაფხული იწყება (martshi gazapkhuli itsqeba) - Spring begins in March' },
        { georgian: 'აპრილი', latin: 'aprili', english: 'April', example: 'აპრილში წვიმს (aprilshi tsvims) - It rains in April' },
        { georgian: 'მაისი', latin: 'maisi', english: 'May', example: 'მაისში ყვავილები ყვავის (maisshi qvavilebi qvavis) - Flowers bloom in May' },
        { georgian: 'ივნისი', latin: 'ivnisi', english: 'June', example: 'ივნისში ზაფხული იწყება (ivnisshi zapkhuli itsqeba) - Summer begins in June' },
        { georgian: 'ივლისი', latin: 'ivlisi', english: 'July', example: 'ივლისში ცხელა (ivlisshi tskhela) - It\'s hot in July' },
        { georgian: 'აგვისტო', latin: 'agvisto', english: 'August', example: 'აგვისტოში ზღვაზე მივდივართ (agvistoshi zghvaze mivdivart) - We go to the sea in August' },
        { georgian: 'სექტემბერი', latin: 'sektemberi', english: 'September', example: 'სექტემბერში სკოლა იწყება (sektembershi skola itsqeba) - School starts in September' },
        { georgian: 'ოქტომბერი', latin: 'oktomberi', english: 'October', example: 'ოქტომბერში ფოთლები ცვივა (oktombershi potlebi tsviva) - Leaves fall in October' },
        { georgian: 'ნოემბერი', latin: 'noemberi', english: 'November', example: 'ნოემბერში შემოდგომაა (noembershi shemodgomaa) - It\'s autumn in November' },
        { georgian: 'დეკემბერი', latin: 'dekemberi', english: 'December', example: 'დეკემბერში ახალი წელია (dekembershi akhali tselia) - New Year is in December' }
      ]
    },
    {
      id: 'seasons',
      title: 'Seasons',
      description: 'Learn the four seasons in Georgian',
      words: [
        { georgian: 'გაზაფხული', latin: 'gazapkhuli', english: 'Spring', example: 'გაზაფხული ლამაზი სეზონია (gazapkhuli lamazi sezonia) - Spring is a beautiful season' },
        { georgian: 'ზაფხული', latin: 'zapkhuli', english: 'Summer', example: 'ზაფხულში ცხელა (zapkhulshi tskhela) - It\'s hot in summer' },
        { georgian: 'შემოდგომა', latin: 'shemodgoma', english: 'Autumn', example: 'შემოდგომაზე წვიმს (shemodgomaze tsvims) - It rains in autumn' },
        { georgian: 'ზამთარი', latin: 'zamtari', english: 'Winter', example: 'ზამთარში თოვს (zamtarshi tovs) - It snows in winter' }
      ]
    },
    {
      id: 'days',
      title: 'Days of the Week',
      description: 'Learn the Georgian names for days',
      words: [
        { georgian: 'ორშაბათი', latin: 'orshabati', english: 'Monday', example: 'ორშაბათს სამსახურში მივდივარ (orshabats samsakhurshi mivdivar) - I go to work on Monday' },
        { georgian: 'სამშაბათი', latin: 'samshabati', english: 'Tuesday', example: 'სამშაბათს სპორტზე დავდივარ (samshabats sportze davdivar) - I go to sports on Tuesday' },
        { georgian: 'ოთხშაბათი', latin: 'otkhshabati', english: 'Wednesday', example: 'ოთხშაბათს მეგობრებს ვხვდები (otkhshabats megobrebs vkhvdebi) - I meet friends on Wednesday' },
        { georgian: 'ხუთშაბათი', latin: 'khutshabati', english: 'Thursday', example: 'ხუთშაბათს ვსწავლობ (khutshabats vstsavlob) - I study on Thursday' },
        { georgian: 'პარასკევი', latin: 'paraskevi', english: 'Friday', example: 'პარასკევს კინოში მივდივარ (paraskevs kinoshi mivdivar) - I go to the cinema on Friday' },
        { georgian: 'შაბათი', latin: 'shabati', english: 'Saturday', example: 'შაბათს ვისვენებ (shabats visveneb) - I rest on Saturday' },
        { georgian: 'კვირა', latin: 'kvira', english: 'Sunday', example: 'კვირას ოჯახთან ერთად ვარ (kviras ojakhtan ertad var) - I am with family on Sunday' }
      ]
    },
    {
      id: 'time-expressions',
      title: 'Time Expressions',
      description: 'Common words and phrases about time',
      words: [
        { georgian: 'დღეს', latin: 'dghes', english: 'today', example: 'დღეს მზიანი ამინდია (dghes mziani amindia) - Today is sunny' },
        { georgian: 'გუშინ', latin: 'gushin', english: 'yesterday', example: 'გუშინ წვიმდა (gushin tsvimda) - It was raining yesterday' },
        { georgian: 'ხვალ', latin: 'khval', english: 'tomorrow', example: 'ხვალ მეგობარს ვხვდები (khval megobars vkhvdebi) - I\'m meeting a friend tomorrow' },
        { georgian: 'დილა', latin: 'dila', english: 'morning', example: 'დილა მშვიდობისა (dila mshvidobisa) - Good morning' },
        { georgian: 'შუადღე', latin: 'shuadghe', english: 'noon', example: 'შუადღეზე ვსადილობ (shuadgheze vsadilob) - I have lunch at noon' },
        { georgian: 'საღამო', latin: 'saghamo', english: 'evening', example: 'საღამო მშვიდობისა (saghamo mshvidobisa) - Good evening' },
        { georgian: 'ღამე', latin: 'ghame', english: 'night', example: 'ღამე მშვიდობისა (ghame mshvidobisa) - Good night' },
        { georgian: 'კვირა', latin: 'kvira', english: 'week', example: 'ერთი კვირა (erti kvira) - One week' },
        { georgian: 'თვე', latin: 'tve', english: 'month', example: 'ერთი თვე (erti tve) - One month' },
        { georgian: 'წელი', latin: 'tseli', english: 'year', example: 'ახალი წელი (akhali tseli) - New Year' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'იანვარი (ianuari)', options: ['January', 'February', 'March', 'April'], correct: 'January' },
    { georgian: 'ზაფხული (zapkhuli)', options: ['Winter', 'Spring', 'Summer', 'Autumn'], correct: 'Summer' },
    { georgian: 'ორშაბათი (orshabati)', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], correct: 'Monday' },
    { georgian: 'დღეს (dghes)', options: ['Yesterday', 'Today', 'Tomorrow', 'Week'], correct: 'Today' },
    { georgian: 'ზამთარი (zamtari)', options: ['Winter', 'Spring', 'Summer', 'Autumn'], correct: 'Winter' }
  ];

  const translationExercises = [
    { english: 'March', options: ['მარტი (marti)', 'აპრილი (aprili)', 'მაისი (maisi)', 'ივნისი (ivnisi)'], correct: 'მარტი (marti)' },
    { english: 'Autumn', options: ['ზამთარი (zamtari)', 'გაზაფხული (gazapkhuli)', 'ზაფხული (zapkhuli)', 'შემოდგომა (shemodgoma)'], correct: 'შემოდგომა (shemodgoma)' },
    { english: 'Friday', options: ['ხუთშაბათი (khutshabati)', 'პარასკევი (paraskevi)', 'შაბათი (shabati)', 'კვირა (kvira)'], correct: 'პარასკევი (paraskevi)' },
    { english: 'Morning', options: ['დილა (dila)', 'შუადღე (shuadghe)', 'საღამო (saghamo)', 'ღამე (ghame)'], correct: 'დილა (dila)' },
    { english: 'Year', options: ['დღე (dghe)', 'კვირა (kvira)', 'თვე (tve)', 'წელი (tseli)'], correct: 'წელი (tseli)' }
  ];

  const orderingExercises = [
    {
      title: "Order the months from January to March",
      items: ['თებერვალი (tebervali)', 'მარტი (marti)', 'იანვარი (ianuari)'],
      correctOrder: ['იანვარი (ianuari)', 'თებერვალი (tebervali)', 'მარტი (marti)']
    },
    {
      title: "Order the seasons starting from Spring",
      items: ['ზამთარი (zamtari)', 'შემოდგომა (shemodgoma)', 'ზაფხული (zapkhuli)', 'გაზაფხული (gazapkhuli)'],
      correctOrder: ['გაზაფხული (gazapkhuli)', 'ზაფხული (zapkhuli)', 'შემოდგომა (shemodgoma)', 'ზამთარი (zamtari)']
    },
    {
      title: "Order the days from Monday to Wednesday",
      items: ['სამშაბათი (samshabati)', 'ოთხშაბათი (otkhshabati)', 'ორშაბათი (orshabati)'],
      correctOrder: ['ორშაბათი (orshabati)', 'სამშაბათი (samshabati)', 'ოთხშაბათი (otkhshabati)']
    },
    {
      title: "Order from morning to night",
      items: ['საღამო (saghamo)', 'შუადღე (shuadghe)', 'ღამე (ghame)', 'დილა (dila)'],
      correctOrder: ['დილა (dila)', 'შუადღე (shuadghe)', 'საღამო (saghamo)', 'ღამე (ghame)']
    },
    {
      title: "Order from yesterday to tomorrow",
      items: ['დღეს (dghes)', 'ხვალ (khval)', 'გუშინ (gushin)'],
      correctOrder: ['გუშინ (gushin)', 'დღეს (dghes)', 'ხვალ (khval)']
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
      updateProgress('months', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  (showFeedback ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('months', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback]);

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

  const playAudio = (word: string) => {
    updateActivity();
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const startOrderingExercise = () => {
    updateActivity();
    setOrderingItems([...orderingExercises[currentExerciseIndex].items]);
    setOrderedItems([]);
  };

  const handleItemClick = (item: string) => {
    updateActivity();
    if (orderingItems.includes(item)) {
      // Move from available to ordered
      setOrderingItems(orderingItems.filter(i => i !== item));
      setOrderedItems([...orderedItems, item]);
    } else if (orderedItems.includes(item)) {
      // Move from ordered back to available
      setOrderedItems(orderedItems.filter(i => i !== item));
      setOrderingItems([...orderingItems, item]);
    }
  };

  const checkOrderingAnswer = () => {
    updateActivity();
    const isCorrect = orderedItems.every((item, index) => 
      item === orderingExercises[currentExerciseIndex].correctOrder[index]
    );
    setShowFeedback(true);
    return isCorrect;
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'ordering' && currentExerciseIndex < orderingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      startOrderingExercise();
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (exerciseMode === 'ordering') {
      startOrderingExercise();
    }
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'matching' && selectedAnswer) {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation' && selectedAnswer) {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'ordering') {
      return orderedItems.every((item, index) => 
        item === orderingExercises[currentExerciseIndex].correctOrder[index]
      );
    }
    return false;
  };

  // Initialize ordering exercise when mode changes
  useEffect(() => {
    if (exerciseMode === 'ordering') {
      startOrderingExercise();
    }
  }, [exerciseMode, currentExerciseIndex]);

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-red-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>Months & Seasons</span> - თვეები და სეზონები (tveebi da sezonebi)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn Georgian months, seasons, days of the week, and time expressions.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/beginner"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Beginner Level
                </Link>
                <Link
                  to="/beginner/quiz/months"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Calendar className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn months in order</li>
                  <li>• Associate seasons with months</li>
                  <li>• Practice with calendar</li>
                  <li>• Use time expressions daily</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {categories.map((category) => (
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
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.words.map((word, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {word.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(word.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === word.georgian
                                ? (theme === 'dark' ? 'bg-red-600' : 'bg-red-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === word.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{word.latin}/
                          </p>
                          <p className="font-medium">{word.english}</p>
                          {word.example && (
                            <p className="text-sm italic">{word.example}</p>
                          )}
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

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('matching')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Word Matching
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match Georgian words with their English meanings
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('translation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Translation Practice
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Translate English words to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('ordering')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Ordering Exercise
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Put months, seasons, and days in the correct order
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 'Ordering Exercise'}
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
              
              {exerciseMode === 'matching' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Match the Georgian word with its English meaning:
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className={`text-xl font-bold mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {matchingExercises[currentExerciseIndex].georgian}
                      </span>
                      <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        =
                      </span>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {matchingExercises[currentExerciseIndex].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleExerciseAnswer(option)}
                            className={`px-4 py-2 rounded-md ${
                              selectedAnswer === option
                                ? option === matchingExercises[currentExerciseIndex].correct
                                  ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                                : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {showFeedback && (
                      <div className={`p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${matchingExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < matchingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'translation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Select the Georgian translation for: <span className="font-bold">{translationExercises[currentExerciseIndex].english}</span>
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {translationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === translationExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${translationExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < translationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'ordering' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {orderingExercises[currentExerciseIndex].title}
                  </p>
                  
                  <div className="mb-6">
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Available items:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {orderingItems.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleItemClick(item)}
                            className={`px-4 py-2 rounded-md ${
                              theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Your order:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {orderedItems.length > 0 ? (
                          orderedItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleItemClick(item)}
                              className={`px-4 py-2 rounded-md ${
                                theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'
                              }`}
                            >
                              {item}
                            </button>
                          ))
                        ) : (
                          <p className={`text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Click items above to place them in order
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => checkOrderingAnswer()}
                        disabled={orderedItems.length !== orderingExercises[currentExerciseIndex].correctOrder.length}
                        className={`px-6 py-2 rounded-md ${
                          orderedItems.length !== orderingExercises[currentExerciseIndex].correctOrder.length
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white')
                        }`}
                      >
                        Check Order
                      </button>
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct order is: ${orderingExercises[currentExerciseIndex].correctOrder.join(', ')}`}
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
                    
                    {currentExerciseIndex < orderingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white')
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
    </div>
  );
};

export default MonthsAndSeasonsPage;