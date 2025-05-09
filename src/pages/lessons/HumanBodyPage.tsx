import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface BodyPart {
  georgian: string;
  latin: string;
  english: string;
  example?: string;
}

interface BodyCategory {
  id: string;
  title: string;
  description: string;
  parts: BodyPart[];
}

const HumanBodyPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'translation' | 'identification' | 'labeling' | 'completion' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completionInput, setCompletionInput] = useState('');
  const [completionFeedback, setCompletionFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: BodyCategory[] = [
    {
      id: 'head',
      title: 'Head & Face',
      description: 'Parts of the head and face',
      parts: [
        { georgian: 'თავი', latin: 'tavi', english: 'head', example: 'თავი მტკივა (tavi mtkiva) - I have a headache' },
        { georgian: 'თვალი', latin: 'tvali', english: 'eye', example: 'ლურჯი თვალები (lurji tvalebi) - Blue eyes' },
        { georgian: 'ცხვირი', latin: 'tskhviri', english: 'nose', example: 'პატარა ცხვირი (patara tskhviri) - Small nose' },
        { georgian: 'პირი', latin: 'piri', english: 'mouth', example: 'პირი გააღე (piri gaaghe) - Open your mouth' },
        { georgian: 'კბილი', latin: 'kbili', english: 'tooth', example: 'თეთრი კბილები (tetri kbilebi) - White teeth' },
        { georgian: 'ყური', latin: 'quri', english: 'ear', example: 'ყური მტკივა (quri mtkiva) - My ear hurts' },
        { georgian: 'თმა', latin: 'tma', english: 'hair', example: 'შავი თმა (shavi tma) - Black hair' },
        { georgian: 'შუბლი', latin: 'shubli', english: 'forehead', example: 'მაღალი შუბლი (maghali shubli) - High forehead' },
        { georgian: 'ლოყა', latin: 'loqa', english: 'cheek', example: 'წითელი ლოყები (tsiteli loqebi) - Red cheeks' },
        { georgian: 'ნიკაპი', latin: 'nikapi', english: 'chin', example: 'მრგვალი ნიკაპი (mrgvali nikapi) - Round chin' }
      ]
    },
    {
      id: 'body',
      title: 'Body & Torso',
      description: 'Main body parts',
      parts: [
        { georgian: 'სხეული', latin: 'sxeuli', english: 'body', example: 'ჯანმრთელი სხეული (janmrteli sxeuli) - Healthy body' },
        { georgian: 'მკერდი', latin: 'mkerdi', english: 'chest', example: 'მკერდის ტკივილი (mkerdis tkivili) - Chest pain' },
        { georgian: 'მუცელი', latin: 'mutseli', english: 'stomach', example: 'მუცელი მტკივა (mutseli mtkiva) - My stomach hurts' },
        { georgian: 'ზურგი', latin: 'zurgi', english: 'back', example: 'სწორი ზურგი (stsori zurgi) - Straight back' },
        { georgian: 'მხარი', latin: 'mkhari', english: 'shoulder', example: 'მარჯვენა მხარი (marjvena mkhari) - Right shoulder' },
        { georgian: 'გული', latin: 'guli', english: 'heart', example: 'გული მიცემს (guli mitsems) - Heart beats' },
        { georgian: 'ფილტვი', latin: 'piltvi', english: 'lung', example: 'ჯანმრთელი ფილტვები (janmrteli piltvebi) - Healthy lungs' },
        { georgian: 'კისერი', latin: 'kiseri', english: 'neck', example: 'გრძელი კისერი (grdzeli kiseri) - Long neck' }
      ]
    },
    {
      id: 'limbs',
      title: 'Arms & Legs',
      description: 'Limbs and extremities',
      parts: [
        { georgian: 'ხელი', latin: 'kheli', english: 'hand/arm', example: 'მარჯვენა ხელი (marjvena kheli) - Right hand' },
        { georgian: 'თითი', latin: 'titi', english: 'finger', example: 'გრძელი თითები (grdzeli titebi) - Long fingers' },
        { georgian: 'ფეხი', latin: 'pekhi', english: 'leg/foot', example: 'მარცხენა ფეხი (martskhena pekhi) - Left leg' },
        { georgian: 'მუხლი', latin: 'mukhli', english: 'knee', example: 'მუხლის ტკივილი (mukhlis tkivili) - Knee pain' },
        { georgian: 'იდაყვი', latin: 'idaqvi', english: 'elbow', example: 'იდაყვის სახსარი (idaqvis sakhsari) - Elbow joint' },
        { georgian: 'მაჯა', latin: 'maja', english: 'wrist', example: 'წვრილი მაჯა (tsvrili maja) - Thin wrist' },
        { georgian: 'ტერფი', latin: 'terpi', english: 'foot', example: 'პატარა ტერფი (patara terpi) - Small foot' },
        { georgian: 'ფრჩხილი', latin: 'prchkhili', english: 'nail', example: 'გრძელი ფრჩხილები (grdzeli prchkhilebi) - Long nails' }
      ]
    },
    {
      id: 'health',
      title: 'Health & Medical',
      description: 'Health-related vocabulary',
      parts: [
        { georgian: 'ტკივილი', latin: 'tkivili', english: 'pain', example: 'ძლიერი ტკივილი (dzlieri tkivili) - Strong pain' },
        { georgian: 'სიცხე', latin: 'sitskhe', english: 'fever', example: 'მაღალი სიცხე (maghali sitskhe) - High fever' },
        { georgian: 'ჭრილობა', latin: 'chriloba', english: 'wound', example: 'პატარა ჭრილობა (patara chriloba) - Small wound' },
        { georgian: 'სისხლი', latin: 'siskhli', english: 'blood', example: 'წითელი სისხლი (tsiteli siskhli) - Red blood' },
        { georgian: 'კუნთი', latin: 'kunti', english: 'muscle', example: 'ძლიერი კუნთები (dzlieri kuntebi) - Strong muscles' },
        { georgian: 'ძვალი', latin: 'dzvali', english: 'bone', example: 'მყარი ძვალი (mqari dzvali) - Solid bone' },
        { georgian: 'სახსარი', latin: 'sakhsari', english: 'joint', example: 'მტკივანი სახსარი (mtkivani sakhsari) - Painful joint' },
        { georgian: 'ნერვი', latin: 'nervi', english: 'nerve', example: 'ნერვების დაძაბვა (nervebis dadzabva) - Nerve tension' }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    { georgian: 'თავი (tavi)', options: ['eye', 'nose', 'head', 'mouth'], correct: 'head' },
    { georgian: 'გული (guli)', options: ['heart', 'lung', 'liver', 'kidney'], correct: 'heart' },
    { georgian: 'ხელი (kheli)', options: ['leg', 'arm', 'foot', 'shoulder'], correct: 'arm' },
    { georgian: 'კბილი (kbili)', options: ['tooth', 'tongue', 'lip', 'gum'], correct: 'tooth' },
    { georgian: 'ყური (quri)', options: ['eye', 'ear', 'nose', 'hair'], correct: 'ear' }
  ];

  const translationExercises = [
    { english: 'eye', options: ['თვალი (tvali)', 'ყური (quri)', 'ცხვირი (tskhviri)', 'პირი (piri)'], correct: 'თვალი (tvali)' },
    { english: 'back', options: ['მუცელი (mutseli)', 'ზურგი (zurgi)', 'მკერდი (mkerdi)', 'კისერი (kiseri)'], correct: 'ზურგი (zurgi)' },
    { english: 'finger', options: ['ფეხი (pekhi)', 'ხელი (kheli)', 'თითი (titi)', 'ფრჩხილი (prchkhili)'], correct: 'თითი (titi)' },
    { english: 'knee', options: ['იდაყვი (idaqvi)', 'მუხლი (mukhli)', 'ტერფი (terpi)', 'მაჯა (maja)'], correct: 'მუხლი (mukhli)' },
    { english: 'blood', options: ['ტკივილი (tkivili)', 'სიცხე (sitskhe)', 'სისხლი (siskhli)', 'ჭრილობა (chriloba)'], correct: 'სისხლი (siskhli)' }
  ];

  const identificationExercises = [
    { 
      question: "Which body part is used for seeing?",
      options: ['თვალი (tvali)', 'ყური (quri)', 'ცხვირი (tskhviri)', 'პირი (piri)'],
      correct: 'თვალი (tvali)',
      explanation: 'თვალი (tvali) means "eye" which is used for seeing'
    },
    { 
      question: "Which body part is used for hearing?",
      options: ['თვალი (tvali)', 'ყური (quri)', 'ცხვირი (tskhviri)', 'პირი (piri)'],
      correct: 'ყური (quri)',
      explanation: 'ყური (quri) means "ear" which is used for hearing'
    },
    { 
      question: "Which body part is used for smelling?",
      options: ['თვალი (tvali)', 'ყური (quri)', 'ცხვირი (tskhviri)', 'პირი (piri)'],
      correct: 'ცხვირი (tskhviri)',
      explanation: 'ცხვირი (tskhviri) means "nose" which is used for smelling'
    },
    { 
      question: "Which body part pumps blood?",
      options: ['გული (guli)', 'ფილტვი (piltvi)', 'ღვიძლი (ghvidzli)', 'თირკმელი (tirkmeli)'],
      correct: 'გული (guli)',
      explanation: 'გული (guli) means "heart" which pumps blood'
    },
    { 
      question: "Which body part is used for walking?",
      options: ['ხელი (kheli)', 'ფეხი (pekhi)', 'თავი (tavi)', 'მუცელი (mutseli)'],
      correct: 'ფეხი (pekhi)',
      explanation: 'ფეხი (pekhi) means "leg/foot" which is used for walking'
    }
  ];

  const labelingExercises = [
    {
      instruction: "Match the body part with its location",
      items: [
        { label: "თავი (tavi) - head", position: "top" },
        { label: "მხარი (mkhari) - shoulder", position: "upper body" },
        { label: "მუხლი (mukhli) - knee", position: "leg" },
        { label: "ფეხი (pekhi) - foot", position: "bottom" },
        { label: "ხელი (kheli) - hand", position: "arm" }
      ]
    }
  ];

  const completionExercises = [
    { 
      sentence: "თავი _____ სხეულის ნაწილია.",
      options: ["მთავარი (mtavari)", "პატარა (patara)", "დიდი (didi)", "გრძელი (grdzeli)"],
      correct: "მთავარი (mtavari)",
      translation: "The head is the main part of the body."
    },
    { 
      sentence: "ადამიანს ორი _____ აქვს.",
      options: ["თვალი (tvali)", "ცხვირი (tskhviri)", "პირი (piri)", "თავი (tavi)"],
      correct: "თვალი (tvali)",
      translation: "A human has two eyes."
    },
    { 
      sentence: "_____ სისხლს ატარებს.",
      options: ["გული (guli)", "ფილტვი (piltvi)", "ტვინი (tvini)", "კუჭი (kuchi)"],
      correct: "გული (guli)",
      translation: "The heart pumps blood."
    },
    { 
      sentence: "ჩვენ ვსუნთქავთ _____.",
      options: ["ფილტვებით (piltvebit)", "გულით (gulit)", "ღვიძლით (ghvidzlit)", "თირკმელებით (tirkmelit)"],
      correct: "ფილტვებით (piltvebit)",
      translation: "We breathe with our lungs."
    },
    { 
      sentence: "ხელს აქვს ხუთი _____.",
      options: ["თითი (titi)", "ფრჩხილი (prchkhili)", "სახსარი (sakhsari)", "ძვალი (dzvali)"],
      correct: "თითი (titi)",
      translation: "A hand has five fingers."
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
      updateProgress('body', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(matchingExercises).length + 
                                  Object.keys(translationExercises).length + 
                                  (completionFeedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 10 || exerciseCompletion >= 5;
        
        updateProgress('body', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, completionFeedback]);

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

  const handleCompletionSubmit = (correct: string) => {
    updateActivity();
    setCompletionFeedback(completionInput === correct ? 'correct' : 'incorrect');
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'translation' && currentExerciseIndex < translationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'identification' && currentExerciseIndex < identificationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'completion' && currentExerciseIndex < completionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCompletionInput('');
      setCompletionFeedback(null);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCompletionInput('');
    setCompletionFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (!selectedAnswer) return false;
    
    if (exerciseMode === 'matching') {
      return selectedAnswer === matchingExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'translation') {
      return selectedAnswer === translationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'identification') {
      return selectedAnswer === identificationExercises[currentExerciseIndex].correct;
    }
    
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-50 to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}>Human Body</span> - ადამიანის სხეული (adamianis sxeuli)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn body parts and health-related vocabulary in Georgian.
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
                  to="/beginner/quiz/body"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-pink-700 text-white hover:bg-pink-800' : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`}>
                <Heart className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Learn parts in related groups</li>
                  <li>• Practice with visual aids</li>
                  <li>• Use words in health contexts</li>
                  <li>• Focus on pronunciation</li>
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
                    {category.parts.map((part, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {part.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(part.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === part.georgian
                                ? (theme === 'dark' ? 'bg-pink-600' : 'bg-pink-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === part.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{part.latin}/
                          </p>
                          <p className="font-medium">{part.english}</p>
                          {part.example && (
                            <p className="text-sm italic">{part.example}</p>
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-pink-50'}`}>
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
                  Match Georgian body parts with their English translations
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
                  Translate English body parts to Georgian
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('identification')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Body Part Identification
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Identify body parts based on their function
                </p>
              </button>

              <button
                onClick={() => setExerciseMode('completion')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sentence Completion
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Complete sentences about the human body
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Word Matching' : 
                   exerciseMode === 'translation' ? 'Translation Practice' : 
                   exerciseMode === 'identification' ? 'Body Part Identification' :
                   'Sentence Completion'}
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
                            : (theme === 'dark' ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white')
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
                            : (theme === 'dark' ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white')
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
                    {identificationExercises[currentExerciseIndex].question}
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
                          ? `Correct! ${identificationExercises[currentExerciseIndex].explanation}`
                          : `Incorrect. The correct answer is "${identificationExercises[currentExerciseIndex].correct}". ${identificationExercises[currentExerciseIndex].explanation}`}
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
                            : (theme === 'dark' ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {exerciseMode === 'completion' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Complete the sentence by selecting the correct word:
                  </p>
                  
                  <div className="mb-6">
                    <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {completionExercises[currentExerciseIndex].sentence}
                    </p>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Translation: {completionExercises[currentExerciseIndex].translation}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {completionExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setCompletionInput(option)}
                          className={`px-4 py-2 rounded-md ${
                            completionInput === option
                              ? (theme === 'dark' ? 'bg-pink-700 text-white' : 'bg-pink-100 text-pink-800')
                              : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleCompletionSubmit(completionExercises[currentExerciseIndex].correct)}
                      disabled={!completionInput}
                      className={`px-6 py-2 rounded-md ${
                        !completionInput
                          ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white')
                      }`}
                    >
                      Check
                    </button>
                    
                    {completionFeedback && (
                      <div className={`mt-4 p-4 rounded-md ${
                        completionFeedback === 'correct'
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        {completionFeedback === 'correct'
                          ? 'Correct! Well done.'
                          : `Incorrect. The correct answer is "${completionExercises[currentExerciseIndex].correct}".`}
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
                    
                    {currentExerciseIndex < completionExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!completionFeedback}
                        className={`px-4 py-2 rounded ${
                          !completionFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-600 hover:bg-pink-700 text-white')
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

export default HumanBodyPage;