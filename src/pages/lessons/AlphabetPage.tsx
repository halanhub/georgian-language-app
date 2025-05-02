import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const AlphabetPage: React.FC = () => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'recognition' | 'writing' | null>(null);
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [recognitionAnswers, setRecognitionAnswers] = useState<Record<string, string>>({});
  const [writingInput, setWritingInput] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const georgianAlphabet = [
    { letter: 'ა', name: 'ანი', latin: 'a', pronunciation: 'ani', english: 'a as in father', example: 'ახალი (akhali) - new' },
    { letter: 'ბ', name: 'ბანი', latin: 'b', pronunciation: 'bani', english: 'b as in boy', example: 'ბავშვი (bavshvi) - child' },
    { letter: 'გ', name: 'განი', latin: 'g', pronunciation: 'gani', english: 'g as in go', example: 'გული (guli) - heart' },
    { letter: 'დ', name: 'დონი', latin: 'd', pronunciation: 'doni', english: 'd as in dog', example: 'დედა (deda) - mother' },
    { letter: 'ე', name: 'ენი', latin: 'e', pronunciation: 'eni', english: 'e as in bed', example: 'ერთი (erti) - one' },
    { letter: 'ვ', name: 'ვინი', latin: 'v', pronunciation: 'vini', english: 'v as in voice', example: 'ვაშლი (vashli) - apple' },
    { letter: 'ზ', name: 'ზენი', latin: 'z', pronunciation: 'zeni', english: 'z as in zoo', example: 'ზამთარი (zamtari) - winter' },
    { letter: 'თ', name: 'თანი', latin: 't', pronunciation: 'tani', english: 'th as in thin', example: 'თოვლი (tovli) - snow' },
    { letter: 'ი', name: 'ინი', latin: 'i', pronunciation: 'ini', english: 'i as in meet', example: 'იხვი (ikhvi) - duck' },
    { letter: 'კ', name: 'კანი', latin: 'k', pronunciation: 'kani', english: 'k as in king', example: 'კაცი (katsi) - man' },
    { letter: 'ლ', name: 'ლასი', latin: 'l', pronunciation: 'lasi', english: 'l as in love', example: 'ლომი (lomi) - lion' },
    { letter: 'მ', name: 'მანი', latin: 'm', pronunciation: 'mani', english: 'm as in mother', example: 'მზე (mze) - sun' },
    { letter: 'ნ', name: 'ნარი', latin: 'n', pronunciation: 'nari', english: 'n as in no', example: 'ნინო (nino) - name' },
    { letter: 'ო', name: 'ონი', latin: 'o', pronunciation: 'oni', english: 'o as in more', example: 'ოთახი (otakhi) - room' },
    { letter: 'პ', name: 'პარი', latin: 'p', pronunciation: 'pari', english: 'p as in pen', example: 'პური (puri) - bread' },
    { letter: 'ჟ', name: 'ჟანი', latin: 'zh', pronunciation: 'zhani', english: 'zh as in measure', example: 'ჟურნალი (zhurnali) - magazine' },
    { letter: 'რ', name: 'რაე', latin: 'r', pronunciation: 'rae', english: 'r as in red', example: 'რძე (rdze) - milk' },
    { letter: 'ს', name: 'სანი', latin: 's', pronunciation: 'sani', english: 's as in sun', example: 'სახლი (sakhli) - house' },
    { letter: 'ტ', name: 'ტარი', latin: 't', pronunciation: 'tari', english: 't as in top', example: 'ტყე (tke) - forest' },
    { letter: 'უ', name: 'უნი', latin: 'u', pronunciation: 'uni', english: 'u as in rule', example: 'უბანი (ubani) - district' },
    { letter: 'ფ', name: 'ფარი', latin: 'p', pronunciation: 'pari', english: 'ph as in phone', example: 'ფანჯარა (panjara) - window' },
    { letter: 'ქ', name: 'ქანი', latin: 'k', pronunciation: 'kani', english: 'k as in kite', example: 'ქალაქი (kalaki) - city' },
    { letter: 'ღ', name: 'ღანი', latin: 'gh', pronunciation: 'ghani', english: 'voiced velar fricative', example: 'ღვინო (ghvino) - wine' },
    { letter: 'ყ', name: 'ყარი', latin: 'q', pronunciation: 'qari', english: 'glottal stop', example: 'ყვავილი (qvavili) - flower' },
    { letter: 'შ', name: 'შინი', latin: 'sh', pronunciation: 'shini', english: 'sh as in ship', example: 'შვილი (shvili) - child' },
    { letter: 'ჩ', name: 'ჩინი', latin: 'ch', pronunciation: 'chini', english: 'ch as in church', example: 'ჩაი (chai) - tea' },
    { letter: 'ც', name: 'ცანი', latin: 'ts', pronunciation: 'tsani', english: 'ts as in cats', example: 'ცა (tsa) - sky' },
    { letter: 'ძ', name: 'ძილი', latin: 'dz', pronunciation: 'dzili', english: 'dz as in adze', example: 'ძაღლი (dzaghli) - dog' },
    { letter: 'წ', name: 'წილი', latin: 'ts', pronunciation: 'tsili', english: 'ts as in bits', example: 'წყალი (tsqali) - water' },
    { letter: 'ჭ', name: 'ჭარი', latin: 'ch', pronunciation: 'chari', english: 'ch as in chunk', example: 'ჭიქა (chika) - glass' },
    { letter: 'ხ', name: 'ხანი', latin: 'kh', pronunciation: 'khani', english: 'kh as in Bach', example: 'ხელი (kheli) - hand' },
    { letter: 'ჯ', name: 'ჯანი', latin: 'j', pronunciation: 'jani', english: 'j as in jam', example: 'ჯინსი (jinsi) - jeans' },
    { letter: 'ჰ', name: 'ჰაე', latin: 'h', pronunciation: 'hae', english: 'h as in hot', example: 'ჰავა (hava) - climate' }
  ];

  const filteredAlphabet = searchTerm 
    ? georgianAlphabet.filter(letter => 
        letter.letter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.english.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : georgianAlphabet;

  // Exercise data
  const matchingExercises = [
    { letter: 'ა', options: ['a', 'b', 'g', 'd'], correct: 'a' },
    { letter: 'ბ', options: ['v', 'b', 't', 'p'], correct: 'b' },
    { letter: 'გ', options: ['d', 'g', 'k', 'q'], correct: 'g' },
    { letter: 'დ', options: ['t', 'd', 'p', 'b'], correct: 'd' },
    { letter: 'ე', options: ['a', 'o', 'e', 'i'], correct: 'e' }
  ];

  const recognitionExercises = [
    { question: "Which letter is 'თანი'?", options: ['თ', 'ტ', 'ფ', 'ქ'], correct: 'თ' },
    { question: "Which letter makes the 'sh' sound?", options: ['ს', 'შ', 'ჩ', 'ც'], correct: 'შ' },
    { question: "Which letter is 'ჯანი'?", options: ['ჟ', 'ძ', 'ჯ', 'ჭ'], correct: 'ჯ' },
    { question: "Which letter makes the 'ts' sound?", options: ['ც', 'წ', 'ჩ', 'ძ'], correct: 'ც' },
    { question: "Which letter is 'ხანი'?", options: ['ქ', 'ღ', 'ყ', 'ხ'], correct: 'ხ' }
  ];

  const writingExercises = [
    { prompt: "Write the Georgian letter for 'a'", correct: 'ა' },
    { prompt: "Write the Georgian letter for 'm'", correct: 'მ' },
    { prompt: "Write the Georgian letter for 'k'", correct: 'კ' },
    { prompt: "Write the Georgian letter for 'n'", correct: 'ნ' },
    { prompt: "Write the Georgian letter for 'sh'", correct: 'შ' }
  ];

  const playAudio = (letter: string) => {
    if (isPlaying === letter) {
      setIsPlaying(null);
    } else {
      setIsPlaying(letter);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleMatchingAnswer = (letter: string, answer: string) => {
    setMatchingAnswers(prev => ({
      ...prev,
      [letter]: answer
    }));
  };

  const handleRecognitionAnswer = (question: string, answer: string) => {
    setRecognitionAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleWritingSubmit = (correct: string) => {
    if (writingInput.trim().toLowerCase() === correct.toLowerCase()) {
      setWritingFeedback('correct');
    } else {
      setWritingFeedback('incorrect');
    }
  };

  const resetExercise = () => {
    setMatchingAnswers({});
    setRecognitionAnswers({});
    setWritingInput('');
    setWritingFeedback(null);
    setCurrentExerciseIndex(0);
  };

  const nextExercise = () => {
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'recognition' && currentExerciseIndex < recognitionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'writing' && currentExerciseIndex < writingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setWritingInput('');
      setWritingFeedback(null);
    }
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Georgian Alphabet</span> - ქართული ანბანი
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master the 33 unique letters of the Georgian alphabet with pronunciation guides and examples.
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
                  to="/beginner/quiz/alphabet"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Brain className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice writing each letter</li>
                  <li>• Listen to pronunciation</li>
                  <li>• Learn letters in groups</li>
                  <li>• Use example words</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                33 Georgian Letters
              </h2>
              
              <div className="mt-4 md:mt-0">
                <input
                  type="text"
                  placeholder="Search letters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`px-4 py-2 rounded-md w-full md:w-auto ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlphabet.map((letter, index) => (
              <div
                key={index}
                onClick={() => setSelectedLetter(selectedLetter === index ? null : index)}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-750'
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {letter.letter}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(letter.letter);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      isPlaying === letter.letter
                        ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                        : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100')
                    }`}
                  >
                    {isPlaying === letter.letter ? (
                      <X size={16} className="text-white" />
                    ) : (
                      <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                    )}
                  </button>
                </div>

                <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="font-medium">{letter.name} ({letter.pronunciation})</p>
                  <p className="text-sm">Latin: {letter.latin}</p>
                  <p className="text-sm">Sound: {letter.english}</p>
                  
                  {selectedLetter === index && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <p className="font-medium mb-2">Example:</p>
                      <p>{letter.example}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
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
                  Letter Matching
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match Georgian letters with their Latin equivalents
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('recognition')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Letter Recognition
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Identify Georgian letters by their names
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('writing')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Letter Writing
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice writing Georgian letters
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Letter Matching' : 
                   exerciseMode === 'recognition' ? 'Letter Recognition' : 'Letter Writing'}
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
                    Match the Georgian letter with its Latin equivalent:
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className={`text-4xl font-bold mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {matchingExercises[currentExerciseIndex].letter}
                      </span>
                      <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        =
                      </span>
                      <div className="ml-4 flex flex-wrap gap-2">
                        {matchingExercises[currentExerciseIndex].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleMatchingAnswer(matchingExercises[currentExerciseIndex].letter, option)}
                            className={`px-4 py-2 rounded-md ${
                              matchingAnswers[matchingExercises[currentExerciseIndex].letter] === option
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
                    
                    {matchingAnswers[matchingExercises[currentExerciseIndex].letter] && (
                      <div className={`p-4 rounded-md ${
                        matchingAnswers[matchingExercises[currentExerciseIndex].letter] === matchingExercises[currentExerciseIndex].correct
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {matchingAnswers[matchingExercises[currentExerciseIndex].letter] === matchingExercises[currentExerciseIndex].correct
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
                        disabled={!matchingAnswers[matchingExercises[currentExerciseIndex].letter]}
                        className={`px-4 py-2 rounded ${
                          !matchingAnswers[matchingExercises[currentExerciseIndex].letter]
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'recognition' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {recognitionExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      {recognitionExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleRecognitionAnswer(recognitionExercises[currentExerciseIndex].question, option)}
                          className={`px-4 py-4 rounded-md text-center text-2xl ${
                            recognitionAnswers[recognitionExercises[currentExerciseIndex].question] === option
                              ? option === recognitionExercises[currentExerciseIndex].correct
                                ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800')
                                : (theme === 'dark' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    {recognitionAnswers[recognitionExercises[currentExerciseIndex].question] && (
                      <div className={`mt-4 p-4 rounded-md ${
                        recognitionAnswers[recognitionExercises[currentExerciseIndex].question] === recognitionExercises[currentExerciseIndex].correct
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {recognitionAnswers[recognitionExercises[currentExerciseIndex].question] === recognitionExercises[currentExerciseIndex].correct
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${recognitionExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < recognitionExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!recognitionAnswers[recognitionExercises[currentExerciseIndex].question]}
                        className={`px-4 py-2 rounded ${
                          !recognitionAnswers[recognitionExercises[currentExerciseIndex].question]
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'writing' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {writingExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <input
                      type="text"
                      value={writingInput}
                      onChange={(e) => setWritingInput(e.target.value)}
                      className={`w-full px-4 py-2 text-2xl text-center rounded-md ${
                        theme === 'dark'
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Type Georgian letter here"
                    />
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => handleWritingSubmit(writingExercises[currentExerciseIndex].correct)}
                        className={`px-6 py-2 rounded-md ${
                          theme === 'dark'
                            ? 'bg-blue-700 hover:bg-blue-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Check
                      </button>
                    </div>
                    
                    {writingFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        writingFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {writingFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${writingExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < writingExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!writingFeedback}
                        className={`px-4 py-2 rounded ${
                          !writingFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
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

      {/* Learning Tips */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Tips for Learning the Georgian Alphabet
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Writing
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Write each letter repeatedly to build muscle memory and improve recognition. Pay attention to the unique curves and shapes.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Learn in Groups
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Study 5-7 letters at a time rather than trying to memorize all 33 at once. Master each group before moving to the next.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Use Mnemonics
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Create visual associations or stories to help remember the shapes of unfamiliar letters. Connect the letter shape to something familiar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlphabetPage;