import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Check, Palette, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ColorOrShape {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

const ColorsAndShapesPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<'colors' | 'shapes' | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'identification' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const colors: ColorOrShape[] = [
    { georgian: 'წითელი', latin: 'tsiteli', english: 'red', example: 'წითელი ვარდი - Red rose' },
    { georgian: 'ლურჯი', latin: 'lurji', english: 'blue', example: 'ლურჯი ცა - Blue sky' },
    { georgian: 'ყვითელი', latin: 'qviteli', english: 'yellow', example: 'ყვითელი მზე - Yellow sun' },
    { georgian: 'მწვანე', latin: 'mtsvane', english: 'green', example: 'მწვანე ბალახი - Green grass' },
    { georgian: 'შავი', latin: 'shavi', english: 'black', example: 'შავი კატა - Black cat' },
    { georgian: 'თეთრი', latin: 'tetri', english: 'white', example: 'თეთრი თოვლი - White snow' },
    { georgian: 'ნარინჯისფერი', latin: 'narinjisperi', english: 'orange', example: 'ნარინჯისფერი ფორთოხალი - Orange fruit' },
    { georgian: 'იისფერი', latin: 'iisperi', english: 'purple', example: 'იისფერი ყვავილი - Purple flower' },
    { georgian: 'ვარდისფერი', latin: 'vardisperi', english: 'pink', example: 'ვარდისფერი კაბა - Pink dress' },
    { georgian: 'ყავისფერი', latin: 'qavisperi', english: 'brown', example: 'ყავისფერი მაგიდა - Brown table' },
    { georgian: 'ნაცრისფერი', latin: 'nacrisperi', english: 'gray', example: 'ნაცრისფერი ღრუბელი - Gray cloud' },
    { georgian: 'ოქროსფერი', latin: 'okrosperi', english: 'gold', example: 'ოქროსფერი ბეჭედი - Gold ring' }
  ];

  const shapes: ColorOrShape[] = [
    { georgian: 'წრე', latin: 'tsre', english: 'circle', example: 'სრული წრე - Full circle' },
    { georgian: 'კვადრატი', latin: 'kvadrati', english: 'square', example: 'წითელი კვადრატი - Red square' },
    { georgian: 'სამკუთხედი', latin: 'samkutkhedi', english: 'triangle', example: 'დიდი სამკუთხედი - Big triangle' },
    { georgian: 'მართკუთხედი', latin: 'martkutkhedi', english: 'rectangle', example: 'გრძელი მართკუთხედი - Long rectangle' },
    { georgian: 'ოვალი', latin: 'ovali', english: 'oval', example: 'ოვალური ფორმა - Oval shape' },
    { georgian: 'რომბი', latin: 'rombi', english: 'rhombus', example: 'პატარა რომბი - Small rhombus' },
    { georgian: 'ხაზი', latin: 'khazi', english: 'line', example: 'სწორი ხაზი - Straight line' },
    { georgian: 'წერტილი', latin: 'tsertili', english: 'point', example: 'შავი წერტილი - Black point' },
    { georgian: 'ვარსკვლავი', latin: 'varskvlavi', english: 'star', example: 'ბრწყინვალე ვარსკვლავი - Shining star' },
    { georgian: 'სპირალი', latin: 'spirali', english: 'spiral', example: 'გრძელი სპირალი - Long spiral' }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'წითელი', options: ['blue', 'red', 'green', 'yellow'], correct: 'red' },
    { georgian: 'ლურჯი', options: ['blue', 'red', 'green', 'yellow'], correct: 'blue' },
    { georgian: 'მწვანე', options: ['blue', 'red', 'green', 'yellow'], correct: 'green' },
    { georgian: 'კვადრატი', options: ['circle', 'square', 'triangle', 'rectangle'], correct: 'square' },
    { georgian: 'სამკუთხედი', options: ['circle', 'square', 'triangle', 'rectangle'], correct: 'triangle' }
  ];

  const translationExercises = [
    { english: 'red', options: ['წითელი', 'ლურჯი', 'მწვანე', 'ყვითელი'], correct: 'წითელი' },
    { english: 'blue', options: ['წითელი', 'ლურჯი', 'მწვანე', 'ყვითელი'], correct: 'ლურჯი' },
    { english: 'circle', options: ['წრე', 'კვადრატი', 'სამკუთხედი', 'მართკუთხედი'], correct: 'წრე' },
    { english: 'square', options: ['წრე', 'კვადრატი', 'სამკუთხედი', 'მართკუთხედი'], correct: 'კვადრატი' },
    { english: 'triangle', options: ['წრე', 'კვადრატი', 'სამკუთხედი', 'მართკუთხედი'], correct: 'სამკუთხედი' }
  ];

  const identificationExercises = [
    { prompt: "What color is 'ყვითელი'?", options: ['Red', 'Blue', 'Yellow', 'Green'], correct: 'Yellow' },
    { prompt: "What shape is 'წრე'?", options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correct: 'Circle' },
    { prompt: "What color is 'შავი'?", options: ['White', 'Black', 'Gray', 'Brown'], correct: 'Black' },
    { prompt: "What shape is 'მართკუთხედი'?", options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correct: 'Rectangle' },
    { prompt: "What color is 'ვარდისფერი'?", options: ['Red', 'Purple', 'Pink', 'Orange'], correct: 'Pink' }
  ];

  const toggleSection = (section: 'colors' | 'shapes') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
      setTimeout(() => {
        if (sectionRefs.current[section]) {
          sectionRefs.current[section]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const nextExercise = () => {
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'identification' && currentExerciseIndex < identificationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getCurrentExercise = () => {
    if (exerciseMode === 'matching') {
      return matchingExercises[currentExerciseIndex];
    } else if (exerciseMode === 'translation') {
      return translationExercises[currentExerciseIndex];
    } else if (exerciseMode === 'identification') {
      return identificationExercises[currentExerciseIndex];
    }
    return null;
  };

  const isCorrectAnswer = () => {
    const exercise = getCurrentExercise();
    if (!exercise || !selectedAnswer) return false;
    
    return selectedAnswer === exercise.correct;
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Colors & Shapes</span> - ფერები და ფორმები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn Georgian colors and geometric shapes with pronunciation and examples.
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
                  to="/beginner/quiz/colors"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Palette className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice pronunciation with audio</li>
                  <li>• Learn colors with common objects</li>
                  <li>• Study shapes in everyday items</li>
                  <li>• Use the example sentences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Colors Section */}
          <div 
            className="mb-8"
            ref={el => sectionRefs.current['colors'] = el}
          >
            <button
              onClick={() => toggleSection('colors')}
              className={`w-full p-6 rounded-lg text-left transition-colors ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Colors - ფერები
                  </h2>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Learn common colors in Georgian
                  </p>
                </div>
                {expandedSection === 'colors' ? (
                  <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                ) : (
                  <Play className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                )}
              </div>
            </button>

            {expandedSection === 'colors' && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {color.georgian}
                      </span>
                      <button
                        onClick={() => playAudio(color.georgian)}
                        className={`p-2 rounded-full transition-colors ${
                          isPlaying === color.georgian
                            ? (theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                        }`}
                      >
                        {isPlaying === color.georgian ? (
                          <X size={16} className="text-white" />
                        ) : (
                          <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        )}
                      </button>
                    </div>
                    <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{color.latin}/
                      </p>
                      <p className="font-medium">{color.english}</p>
                      {color.example && (
                        <p className="text-sm italic">{color.example}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shapes Section */}
          <div
            ref={el => sectionRefs.current['shapes'] = el}
          >
            <button
              onClick={() => toggleSection('shapes')}
              className={`w-full p-6 rounded-lg text-left transition-colors ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Shapes - ფორმები
                  </h2>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    Learn geometric shapes in Georgian
                  </p>
                </div>
                {expandedSection === 'shapes' ? (
                  <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                ) : (
                  <Play className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                )}
              </div>
            </button>

            {expandedSection === 'shapes' && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shapes.map((shape, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {shape.georgian}
                      </span>
                      <button
                        onClick={() => playAudio(shape.georgian)}
                        className={`p-2 rounded-full transition-colors ${
                          isPlaying === shape.georgian
                            ? (theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500')
                            : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                        }`}
                      >
                        {isPlaying === shape.georgian ? (
                          <X size={16} className="text-white" />
                        ) : (
                          <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        )}
                      </button>
                    </div>
                    <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{shape.latin}/
                      </p>
                      <p className="font-medium">{shape.english}</p>
                      {shape.example && (
                        <p className="text-sm italic">{shape.example}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
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
                onClick={() => setExerciseMode('identification')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Word Identification
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Identify the meaning of Georgian words
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 'Word Identification'}
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
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
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
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'identification' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {identificationExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {identificationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`px-4 py-3 rounded-md text-center ${
                            selectedAnswer === option
                              ? option === identificationExercises[currentExerciseIndex].correct
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
                          : `Incorrect. The correct answer is "${identificationExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < identificationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white')
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

export default ColorsAndShapesPage;