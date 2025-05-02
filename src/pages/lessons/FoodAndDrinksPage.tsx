import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Utensils, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'categorization' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [categorizationAnswers, setCategorizationAnswers] = useState<Record<string, string>>({});

  const categories: FoodCategory[] = [
    {
      id: 'traditional-dishes',
      title: 'Traditional Georgian Dishes',
      description: 'Famous Georgian cuisine classics',
      items: [
        { georgian: 'ხაჭაპური', latin: 'khachapuri', english: 'cheese bread', example: 'აჭარული ხაჭაპური - Adjarian khachapuri' },
        { georgian: 'ხინკალი', latin: 'khinkali', english: 'dumplings', example: 'ხორცის ხინკალი - Meat dumplings' },
        { georgian: 'მწვადი', latin: 'mtsvadi', english: 'grilled meat skewers', example: 'ღორის მწვადი - Pork mtsvadi' },
        { georgian: 'ლობიანი', latin: 'lobiani', english: 'bean-filled bread', example: 'ცხელი ლობიანი - Hot lobiani' },
        { georgian: 'საცივი', latin: 'satsivi', english: 'walnut sauce with chicken', example: 'ქათმის საცივი - Chicken satsivi' },
        { georgian: 'ჩახოხბილი', latin: 'chakhokhbili', english: 'stewed chicken', example: 'ქათმის ჩახოხბილი - Chicken chakhokhbili' },
        { georgian: 'აჯაფსანდალი', latin: 'ajapsandali', english: 'vegetable stew', example: 'ცხელი აჯაფსანდალი - Hot ajapsandali' },
        { georgian: 'ფხალი', latin: 'pkhali', english: 'vegetable pâté', example: 'ისპანახის ფხალი - Spinach pkhali' }
      ]
    },
    {
      id: 'breads',
      title: 'Breads & Pastries',
      description: 'Traditional Georgian breads and baked goods',
      items: [
        { georgian: 'პური', latin: 'puri', english: 'bread', example: 'თონის პური - Clay oven bread' },
        { georgian: 'მჭადი', latin: 'mchadi', english: 'cornbread', example: 'ცხელი მჭადი - Hot cornbread' },
        { georgian: 'ქადა', latin: 'kada', english: 'sweet bread', example: 'ნიგვზიანი ქადა - Walnut kada' },
        { georgian: 'ნაზუქი', latin: 'nazuki', english: 'sweet spiced bread', example: 'ახალი ნაზუქი - Fresh nazuki' },
        { georgian: 'გოზინაყი', latin: 'gozinaki', english: 'honey-walnut candy', example: 'თაფლის გოზინაყი - Honey gozinaki' },
        { georgian: 'ჩურჩხელა', latin: 'churchkhela', english: 'grape juice candy', example: 'კაკლის ჩურჩხელა - Walnut churchkhela' }
      ]
    },
    {
      id: 'drinks',
      title: 'Beverages',
      description: 'Traditional Georgian drinks',
      items: [
        { georgian: 'ღვინო', latin: 'ghvino', english: 'wine', example: 'წითელი ღვინო - Red wine' },
        { georgian: 'ჭაჭა', latin: 'chacha', english: 'grape vodka', example: 'ყურძნის ჭაჭა - Grape chacha' },
        { georgian: 'წყალი', latin: 'tsqali', english: 'water', example: 'ცივი წყალი - Cold water' },
        { georgian: 'ლიმონათი', latin: 'limonati', english: 'lemonade', example: 'ქართული ლიმონათი - Georgian lemonade' },
        { georgian: 'ჩაი', latin: 'chai', english: 'tea', example: 'შავი ჩაი - Black tea' },
        { georgian: 'ყავა', latin: 'qava', english: 'coffee', example: 'თურქული ყავა - Turkish coffee' }
      ]
    },
    {
      id: 'ingredients',
      title: 'Common Ingredients',
      description: 'Basic cooking ingredients',
      items: [
        { georgian: 'ყველი', latin: 'qveli', english: 'cheese', example: 'სულგუნი - Sulguni cheese' },
        { georgian: 'ხორცი', latin: 'khortsi', english: 'meat', example: 'საქონლის ხორცი - Beef' },
        { georgian: 'ბოსტნეული', latin: 'bostneuli', english: 'vegetables', example: 'ახალი ბოსტნეული - Fresh vegetables' },
        { georgian: 'ნიგოზი', latin: 'nigozi', english: 'walnuts', example: 'დაჭრილი ნიგოზი - Chopped walnuts' },
        { georgian: 'სუნელები', latin: 'sunelebi', english: 'spices', example: 'ქართული სუნელები - Georgian spices' },
        { georgian: 'ხილი', latin: 'khili', english: 'fruit', example: 'ახალი ხილი - Fresh fruit' },
        { georgian: 'პომიდორი', latin: 'pomidori', english: 'tomato', example: 'წითელი პომიდორი - Red tomato' },
        { georgian: 'კიტრი', latin: 'kitri', english: 'cucumber', example: 'მწვანე კიტრი - Green cucumber' }
      ]
    },
    {
      id: 'meal-times',
      title: 'Meals & Dining',
      description: 'Words related to meals and dining',
      items: [
        { georgian: 'საუზმე', latin: 'sauzme', english: 'breakfast', example: 'დილის საუზმე - Morning breakfast' },
        { georgian: 'სადილი', latin: 'sadili', english: 'lunch', example: 'შუადღის სადილი - Midday lunch' },
        { georgian: 'ვახშამი', latin: 'vakhshami', english: 'dinner', example: 'საღამოს ვახშამი - Evening dinner' },
        { georgian: 'რესტორანი', latin: 'restorani', english: 'restaurant', example: 'ქართული რესტორანი - Georgian restaurant' },
        { georgian: 'სამზარეულო', latin: 'samzareulo', english: 'kitchen', example: 'დიდი სამზარეულო - Big kitchen' },
        { georgian: 'სუფრა', latin: 'supra', english: 'feast table', example: 'ქართული სუფრა - Georgian feast' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'ხაჭაპური', options: ['dumplings', 'cheese bread', 'grilled meat', 'bean-filled bread'], correct: 'cheese bread' },
    { georgian: 'ღვინო', options: ['water', 'wine', 'tea', 'coffee'], correct: 'wine' },
    { georgian: 'პური', options: ['bread', 'cheese', 'meat', 'vegetables'], correct: 'bread' },
    { georgian: 'ხორცი', options: ['fruit', 'vegetables', 'meat', 'spices'], correct: 'meat' },
    { georgian: 'სადილი', options: ['breakfast', 'lunch', 'dinner', 'feast'], correct: 'lunch' }
  ];

  const translationExercises = [
    { english: 'tea', options: ['ჩაი', 'ყავა', 'წყალი', 'ღვინო'], correct: 'ჩაი' },
    { english: 'restaurant', options: ['სამზარეულო', 'სუფრა', 'რესტორანი', 'ვახშამი'], correct: 'რესტორანი' },
    { english: 'cheese', options: ['ხორცი', 'ყველი', 'პური', 'ხილი'], correct: 'ყველი' },
    { english: 'breakfast', options: ['საუზმე', 'სადილი', 'ვახშამი', 'სუფრა'], correct: 'საუზმე' },
    { english: 'dumplings', options: ['ხაჭაპური', 'მწვადი', 'ხინკალი', 'ლობიანი'], correct: 'ხინკალი' }
  ];

  const categorizationExercises = [
    {
      title: "Categorize these food items",
      items: ['ხაჭაპური', 'ღვინო', 'პური', 'ჩაი'],
      categories: ['Food', 'Drink'],
      correctCategories: {
        'ხაჭაპური': 'Food',
        'ღვინო': 'Drink',
        'პური': 'Food',
        'ჩაი': 'Drink'
      }
    },
    {
      title: "Categorize these items",
      items: ['ხორცი', 'ყველი', 'წყალი', 'ყავა'],
      categories: ['Ingredient', 'Beverage'],
      correctCategories: {
        'ხორცი': 'Ingredient',
        'ყველი': 'Ingredient',
        'წყალი': 'Beverage',
        'ყავა': 'Beverage'
      }
    },
    {
      title: "Categorize these meal times",
      items: ['საუზმე', 'სადილი', 'ვახშამი', 'სუფრა'],
      categories: ['Meal', 'Other'],
      correctCategories: {
        'საუზმე': 'Meal',
        'სადილი': 'Meal',
        'ვახშამი': 'Meal',
        'სუფრა': 'Other'
      }
    }
  ];

  const toggleCategory = (categoryId: string) => {
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
    if (isPlaying === word) {
      setIsPlaying(null);
    } else {
      setIsPlaying(word);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleCategorization = (item: string, category: string) => {
    setCategorizationAnswers(prev => ({
      ...prev,
      [item]: category
    }));
  };

  const checkCategorizationAnswers = () => {
    const exercise = categorizationExercises[currentExerciseIndex];
    const isCorrect = Object.entries(categorizationAnswers).every(
      ([item, category]) => exercise.correctCategories[item as keyof typeof exercise.correctCategories] === category
    );
    setShowFeedback(true);
    return isCorrect;
  };

  const nextExercise = () => {
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
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}>Food & Drinks</span> - საჭმელი და სასმელი
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