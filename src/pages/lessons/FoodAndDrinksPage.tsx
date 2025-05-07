import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Utensils, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface FoodItem {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface FoodCategory {
  id: string;
  title: string;
  description: string;
  items: FoodItem[];
}

const FoodAndDrinksPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'categorization' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [categorizationAnswers, setCategorizationAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: FoodCategory[] = [
    {
      id: 'traditional-dishes',
      title: 'Traditional Georgian Dishes',
      description: 'Famous Georgian cuisine classics',
      items: [
        { georgian: 'ხაჭაპური', latin: 'khachapuri', english: 'cheese bread', example: 'აჭარული ხაჭაპური (acharuli khachapuri) - Adjarian khachapuri' },
        { georgian: 'ხინკალი', latin: 'khinkali', english: 'dumplings', example: 'ხორცის ხინკალი (khortsis khinkali) - Meat dumplings' },
        { georgian: 'მწვადი', latin: 'mtsvadi', english: 'grilled meat skewers', example: 'ღორის მწვადი (ghoris mtsvadi) - Pork mtsvadi' },
        { georgian: 'ლობიანი', latin: 'lobiani', english: 'bean-filled bread', example: 'ცხელი ლობიანი (tskheli lobiani) - Hot lobiani' },
        { georgian: 'საცივი', latin: 'satsivi', english: 'walnut sauce with chicken', example: 'ქათმის საცივი (katmis satsivi) - Chicken satsivi' },
        { georgian: 'ჩახოხბილი', latin: 'chakhokhbili', english: 'stewed chicken', example: 'ქათმის ჩახოხბილი (katmis chakhokhbili) - Chicken chakhokhbili' },
        { georgian: 'აჯაფსანდალი', latin: 'ajapsandali', english: 'vegetable stew', example: 'ცხელი აჯაფსანდალი (tskheli ajapsandali) - Hot ajapsandali' },
        { georgian: 'ფხალი', latin: 'pkhali', english: 'vegetable pâté', example: 'ისპანახის ფხალი (ispanakhis pkhali) - Spinach pkhali' }
      ]
    },
    {
      id: 'breads',
      title: 'Breads & Pastries',
      description: 'Traditional Georgian breads and baked goods',
      items: [
        { georgian: 'პური', latin: 'puri', english: 'bread', example: 'თონის პური (tonis puri) - Clay oven bread' },
        { georgian: 'მჭადი', latin: 'mchadi', english: 'cornbread', example: 'ცხელი მჭადი (tskheli mchadi) - Hot cornbread' },
        { georgian: 'ქადა', latin: 'kada', english: 'sweet bread', example: 'ნიგვზიანი ქადა (nigvziani kada) - Walnut kada' },
        { georgian: 'ნაზუქი', latin: 'nazuki', english: 'sweet spiced bread', example: 'ახალი ნაზუქი (akhali nazuki) - Fresh nazuki' },
        { georgian: 'გოზინაყი', latin: 'gozinaki', english: 'honey-walnut candy', example: 'თაფლის გოზინაყი (taplis gozinaki) - Honey gozinaki' },
        { georgian: 'ჩურჩხელა', latin: 'churchkhela', english: 'grape juice candy', example: 'კაკლის ჩურჩხელა (kaklis churchkhela) - Walnut churchkhela' }
      ]
    },
    {
      id: 'drinks',
      title: 'Beverages',
      description: 'Traditional Georgian drinks',
      items: [
        { georgian: 'ღვინო', latin: 'ghvino', english: 'wine', example: 'წითელი ღვინო (tsiteli ghvino) - Red wine' },
        { georgian: 'ჭაჭა', latin: 'chacha', english: 'grape vodka', example: 'ყურძნის ჭაჭა (qurdznis chacha) - Grape chacha' },
        { georgian: 'წყალი', latin: 'tsqali', english: 'water', example: 'ცივი წყალი (tsivi tsqali) - Cold water' },
        { georgian: 'ლიმონათი', latin: 'limonati', english: 'lemonade', example: 'ქართული ლიმონათი (kartuli limonati) - Georgian lemonade' },
        { georgian: 'ჩაი', latin: 'chai', english: 'tea', example: 'შავი ჩაი (shavi chai) - Black tea' },
        { georgian: 'ყავა', latin: 'qava', english: 'coffee', example: 'თურქული ყავა (turkuli qava) - Turkish coffee' }
      ]
    },
    {
      id: 'ingredients',
      title: 'Common Ingredients',
      description: 'Basic cooking ingredients',
      items: [
        { georgian: 'ყველი', latin: 'qveli', english: 'cheese', example: 'სულგუნი (sulguni) - Sulguni cheese' },
        { georgian: 'ხორცი', latin: 'khortsi', english: 'meat', example: 'საქონლის ხორცი (sakonlis khortsi) - Beef' },
        { georgian: 'ბოსტნეული', latin: 'bostneuli', english: 'vegetables', example: 'ახალი ბოსტნეული (akhali bostneuli) - Fresh vegetables' },
        { georgian: 'ნიგოზი', latin: 'nigozi', english: 'walnuts', example: 'დაჭრილი ნიგოზი (dachrili nigozi) - Chopped walnuts' },
        { georgian: 'სუნელები', latin: 'sunelebi', english: 'spices', example: 'ქართული სუნელები (kartuli sunelebi) - Georgian spices' },
        { georgian: 'ხილი', latin: 'khili', english: 'fruit', example: 'ახალი ხილი (akhali khili) - Fresh fruit' },
        { georgian: 'პომიდორი', latin: 'pomidori', english: 'tomato', example: 'წითელი პომიდორი (tsiteli pomidori) - Red tomato' },
        { georgian: 'კიტრი', latin: 'kitri', english: 'cucumber', example: 'მწვანე კიტრი (mtsvane kitri) - Green cucumber' }
      ]
    },
    {
      id: 'meal-times',
      title: 'Meals & Dining',
      description: 'Words related to meals and dining',
      items: [
        { georgian: 'საუზმე', latin: 'sauzme', english: 'breakfast', example: 'დილის საუზმე (dilis sauzme) - Morning breakfast' },
        { georgian: 'სადილი', latin: 'sadili', english: 'lunch', example: 'შუადღის სადილი (shuadghis sadili) - Midday lunch' },
        { georgian: 'ვახშამი', latin: 'vakhshami', english: 'dinner', example: 'საღამოს ვახშამი (saghamos vakhshami) - Evening dinner' },
        { georgian: 'რესტორანი', latin: 'restorani', english: 'restaurant', example: 'ქართული რესტორანი (kartuli restorani) - Georgian restaurant' },
        { georgian: 'სამზარეულო', latin: 'samzareulo', english: 'kitchen', example: 'დიდი სამზარეულო (didi samzareulo) - Big kitchen' },
        { georgian: 'სუფრა', latin: 'supra', english: 'feast table', example: 'ქართული სუფრა (kartuli supra) - Georgian feast' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'ხაჭაპური (khachapuri)', options: ['dumplings', 'cheese bread', 'grilled meat', 'bean-filled bread'], correct: 'cheese bread' },
    { georgian: 'ღვინო (ghvino)', options: ['water', 'wine', 'tea', 'coffee'], correct: 'wine' },
    { georgian: 'პური (puri)', options: ['bread', 'cheese', 'meat', 'vegetables'], correct: 'bread' },
    { georgian: 'ხორცი (khortsi)', options: ['fruit', 'vegetables', 'meat', 'spices'], correct: 'meat' },
    { georgian: 'სადილი (sadili)', options: ['breakfast', 'lunch', 'dinner', 'feast'], correct: 'lunch' }
  ];

  const translationExercises = [
    { english: 'tea', options: ['ჩაი (chai)', 'ყავა (qava)', 'წყალი (tsqali)', 'ღვინო (ghvino)'], correct: 'ჩაი (chai)' },
    { english: 'restaurant', options: ['სამზარეულო (samzareulo)', 'სუფრა (supra)', 'რესტორანი (restorani)', 'ვახშამი (vakhshami)'], correct: 'რესტორანი (restorani)' },
    { english: 'cheese', options: ['ხორცი (khortsi)', 'ყველი (qveli)', 'პური (puri)', 'ხილი (khili)'], correct: 'ყველი (qveli)' },
    { english: 'breakfast', options: ['საუზმე (sauzme)', 'სადილი (sadili)', 'ვახშამი (vakhshami)', 'სუფრა (supra)'], correct: 'საუზმე (sauzme)' },
    { english: 'dumplings', options: ['ხაჭაპური (khachapuri)', 'მწვადი (mtsvadi)', 'ხინკალი (khinkali)', 'ლობიანი (lobiani)'], correct: 'ხინკალი (khinkali)' }
  ];

  const categorizationExercises = [
    {
      title: "Categorize these food items",
      items: ['ხაჭაპური (khachapuri)', 'ღვინო (ghvino)', 'პური (puri)', 'ჩაი (chai)'],
      categories: ['Food', 'Drink'],
      correctCategories: {
        'ხაჭაპური (khachapuri)': 'Food',
        'ღვინო (ghvino)': 'Drink',
        'პური (puri)': 'Food',
        'ჩაი (chai)': 'Drink'
      }
    },
    {
      title: "Categorize these items",
      items: ['ხორცი (khortsi)', 'ყველი (qveli)', 'წყალი (tsqali)', 'ყავა (qava)'],
      categories: ['Ingredient', 'Beverage'],
      correctCategories: {
        'ხორცი (khortsi)': 'Ingredient',
        'ყველი (qveli)': 'Ingredient',
        'წყალი (tsqali)': 'Beverage',
        'ყავა (qava)': 'Beverage'
      }
    },
    {
      title: "Categorize these meal times",
      items: ['საუზმე (sauzme)', 'სადილი (sadili)', 'ვახშამი (vakhshami)', 'სუფრა (supra)'],
      categories: ['Meal', 'Other'],
      correctCategories: {
        'საუზმე (sauzme)': 'Meal',
        'სადილი (sadili)': 'Meal',
        'ვახშამი (vakhshami)': 'Meal',
        'სუფრა (supra)': 'Other'
      }
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
      updateProgress('food', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  Object.keys(categorizationAnswers).length;
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('food', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, categorizationAnswers]);

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

  const handleCategorization = (item: string, category: string) => {
    updateActivity();
    setCategorizationAnswers(prev => ({
      ...prev,
      [item]: category
    }));
  };

  const checkCategorizationAnswers = () => {
    updateActivity();
    const exercise = categorizationExercises[currentExerciseIndex];
    const isCorrect = Object.entries(categorizationAnswers).every(
      ([item, category]) => exercise.correctCategories[item as keyof typeof exercise.correctCategories] === category
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
    } else if (exerciseMode === 'categorization' && currentExerciseIndex < categorizationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCategorizationAnswers({});
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCategorizationAnswers({});
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'matching' && selectedAnswer) {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation' && selectedAnswer) {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'categorization') {
      const exercise = categorizationExercises[currentExerciseIndex];
      return Object.entries(categorizationAnswers).every(
        ([item, category]) => exercise.correctCategories[item as keyof typeof exercise.correctCategories] === category
      ) && Object.keys(categorizationAnswers).length === exercise.items.length;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}>Food & Drinks</span> - საჭმელი და სასმელი (sachmeli da sasmeli)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn Georgian cuisine vocabulary and traditional dishes.
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
                  to="/beginner/quiz/food"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-orange-700 text-white hover:bg-orange-800' : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Utensils className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn dish names with ingredients</li>
                  <li>• Practice pronunciation with audio</li>
                  <li>• Group related food items</li>
                  <li>• Use words in restaurant settings</li>
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
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(item.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === item.georgian
                                ? (theme === 'dark' ? 'bg-orange-600' : 'bg-orange-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === item.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{item.latin}/
                          </p>
                          <p className="font-medium">{item.english}</p>
                          {item.example && (
                            <p className="text-sm italic">{item.example}</p>
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-orange-50'}`}>
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
                  Match Georgian food words with their English meanings
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
                  Translate English food terms to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('categorization')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Food Categorization
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Sort food items into correct categories
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 'Food Categorization'}
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
                            : (theme === 'dark' ? 'bg-orange-700 hover:bg-orange-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white')
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
                            : (theme === 'dark' ? 'bg-orange-700 hover:bg-orange-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'categorization' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {categorizationExercises[currentExerciseIndex].title}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {categorizationExercises[currentExerciseIndex].categories.map(category => (
                        <div key={category} className={`p-4 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                        }`}>
                          <h4 className={`text-center font-medium mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {category}
                          </h4>
                          <div className="min-h-24 flex flex-wrap gap-2">
                            {Object.entries(categorizationAnswers)
                              .filter(([_, cat]) => cat === category)
                              .map(([item]) => (
                                <button
                                  key={item}
                                  onClick={() => handleCategorization(item, '')}
                                  className={`px-3 py-1 rounded ${
                                    theme === 'dark' 
                                      ? 'bg-orange-700 text-white hover:bg-orange-600' 
                                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Items to categorize:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {categorizationExercises[currentExerciseIndex].items
                          .filter(item => !categorizationAnswers[item])
                          .map(item => (
                            <div key={item} className="relative">
                              {categorizationExercises[currentExerciseIndex].categories.map(category => (
                                <button
                                  key={`${item}-${category}`}
                                  onClick={() => handleCategorization(item, category)}
                                  className={`px-3 py-1 rounded ${
                                    theme === 'dark' 
                                      ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                  }`}
                                >
                                  {item} → {category}
                                </button>
                              ))}
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => checkCategorizationAnswers()}
                        disabled={Object.keys(categorizationAnswers).length !== categorizationExercises[currentExerciseIndex].items.length}
                        className={`px-6 py-2 rounded-md ${
                          Object.keys(categorizationAnswers).length !== categorizationExercises[currentExerciseIndex].items.length
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-orange-700 hover:bg-orange-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white')
                        }`}
                      >
                        Check Categories
                      </button>
                    </div>
                    
                    {showFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {isCorrectAnswer()
                          ? 'Correct! All items are properly categorized.'
                          : 'Some items are incorrectly categorized. Try again!'}
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
                    
                    {currentExerciseIndex < categorizationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback || !isCorrectAnswer()}
                        className={`px-4 py-2 rounded ${
                          !showFeedback || !isCorrectAnswer()
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-orange-700 hover:bg-orange-600 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white')
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

export default FoodAndDrinksPage;