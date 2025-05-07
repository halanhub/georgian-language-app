import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Pencil, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface Exercise {
  id: string;
  type: 'translation' | 'completion' | 'composition' | 'correction';
  prompt: string;
  example?: string;
  expectedAnswer?: string;
  options?: string[];
  hint?: string;
  explanation?: string;
}

interface ExerciseCategory {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
}

const exerciseCategories: ExerciseCategory[] = [
  {
    id: 'basics',
    title: 'Basic Sentence Writing',
    description: 'Practice writing simple Georgian sentences',
    exercises: [
      {
        id: 'greeting',
        type: 'translation',
        prompt: 'Translate: "Hello, how are you?"',
        expectedAnswer: 'გამარჯობა, როგორ ხარ?',
        hint: 'Remember: გამარჯობა (gamarjoba) + როგორ ხარ (rogor khar)',
        explanation: 'This is a common greeting in Georgian. გამარჯობა (gamarjoba) is "hello" and როგორ ხარ (rogor khar) means "how are you"'
      },
      {
        id: 'introduction',
        type: 'completion',
        prompt: 'Complete the sentence: "მე მქვია _____ " (My name is _____)',
        hint: 'Add your name after მქვია (mkvia)',
        explanation: 'მე მქვია (me mkvia) literally means "I am called" and is used for introducing yourself'
      },
      {
        id: 'simple-sentence',
        type: 'translation',
        prompt: 'Translate: "I am learning Georgian"',
        expectedAnswer: 'მე ვსწავლობ ქართულს',
        hint: 'Structure: მე (me) + ვსწავლობ (vstsavlob) + ქართულს (kartuls)',
        explanation: 'The verb სწავლა (stsavla - to learn) becomes ვსწავლობ (vstsavlob) in first person present tense'
      },
      {
        id: 'daily-routine',
        type: 'composition',
        prompt: 'Write a sentence about your morning routine using the verb "ადგომა" (to wake up)',
        example: 'დილით ადრე ვდგები (dilit adre vdgebi) - I wake up early in the morning',
        hint: 'Use დილით (dilit - in the morning) and the appropriate form of ვდგები (vdgebi - I wake up)',
        explanation: 'Morning routine sentences typically start with a time expression like დილით (dilit)'
      },
      {
        id: 'likes',
        type: 'translation',
        prompt: 'Translate: "I like Georgian food"',
        expectedAnswer: 'მე მომწონს ქართული საჭმელი',
        hint: 'Use მომწონს (momtsons - like) with the appropriate adjective form',
        explanation: 'ქართული (kartuli) is the adjective form of საქართველო (sakartvelo - Georgia)'
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Sentences',
    description: 'Create more complex Georgian sentences',
    exercises: [
      {
        id: 'past-tense',
        type: 'translation',
        prompt: 'Write in the past tense: "I went to Tbilisi yesterday"',
        expectedAnswer: 'გუშინ თბილისში წავედი',
        hint: 'Use გუშინ (gushin - yesterday) and the past tense form წავედი (tsavedi - went)',
        explanation: 'Past tense verbs often change their form significantly from present tense'
      },
      {
        id: 'future-plans',
        type: 'composition',
        prompt: 'Write about your future plans using მინდა (minda - want)',
        example: 'მინდა საქართველოში წასვლა (minda sakartveloshi tsasvla) - I want to go to Georgia',
        hint: 'Structure: მინდა (minda) + action in verbal noun form',
        explanation: 'Future intentions are often expressed using მინდა (minda) with a verbal noun'
      },
      {
        id: 'conditional',
        type: 'translation',
        prompt: 'Translate: "If it rains, I will stay home"',
        expectedAnswer: 'თუ იწვიმებს, სახლში დავრჩები',
        hint: 'Use თუ (tu - if) and future tense forms',
        explanation: 'Conditional sentences use თუ (tu) for "if" and typically use future tense in both clauses'
      },
      {
        id: 'complex-sentence',
        type: 'composition',
        prompt: 'Create a sentence using both რომ (rom - that) and მინდა (minda - want)',
        example: 'მინდა, რომ ქართული ვისწავლო (minda, rom kartuli vistsavlo) - I want to learn Georgian',
        hint: 'რომ (rom) is used to connect clauses in complex sentences',
        explanation: 'Complex sentences with რომ (rom) require specific verb forms in the subordinate clause'
      },
      {
        id: 'reason',
        type: 'translation',
        prompt: 'Translate: "I am learning Georgian because I love the culture"',
        expectedAnswer: 'ვსწავლობ ქართულს, რადგან მიყვარს კულტურა',
        hint: 'Use რადგან (radgan - because) to connect the two ideas',
        explanation: 'Causal relationships are expressed using რადგან (radgan) followed by a complete clause'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Writing',
    description: 'Master complex Georgian sentence structures',
    exercises: [
      {
        id: 'subjunctive',
        type: 'translation',
        prompt: 'Express wish: "I wish I could speak Georgian fluently"',
        expectedAnswer: 'ნეტავ ქართულად თავისუფლად ლაპარაკი შემეძლოს',
        hint: 'Use ნეტავ (netav) for wishes and subjunctive mood',
        explanation: 'Wishes use ნეტავ (netav) and require the verb in subjunctive mood'
      },
      {
        id: 'reported-speech',
        type: 'composition',
        prompt: 'Convert to reported speech: "I am tired" → "He said that..."',
        example: 'მან თქვა, რომ დაღლილი იყო (man tkva, rom daghlili iqo)',
        hint: 'Use თქვა (tkva - said) and რომ (rom - that) with appropriate tense changes',
        explanation: 'Reported speech requires tense adjustments and the conjunction რომ (rom)'
      },
      {
        id: 'passive-voice',
        type: 'translation',
        prompt: 'Convert to passive: "They are building a house"',
        expectedAnswer: 'სახლი შენდება',
        hint: 'Use the passive form of the verb შენება (sheneba - to build)',
        explanation: 'Passive voice in Georgian often uses the -დება (-deba) suffix'
      },
      {
        id: 'relative-clause',
        type: 'composition',
        prompt: 'Create a sentence with a relative clause using რომელიც (romelits - which/who)',
        example: 'კაცი, რომელიც აქ ცხოვრობს, ჩემი მეზობელია (katsi, romelits ak tskhovrobs, chemi mezobelia)',
        hint: 'Place რომელიც (romelits) after the noun it modifies',
        explanation: 'Relative clauses follow the noun they modify and use რომელიც (romelits)'
      },
      {
        id: 'causative',
        type: 'translation',
        prompt: 'Express causation: "The teacher made the students write"',
        expectedAnswer: 'მასწავლებელმა მოსწავლეებს დააწერინა',
        hint: 'Use the causative form of წერა (tsera - to write)',
        explanation: 'Causative verbs in Georgian use specific forms with -ინ- (-in-) infix'
      }
    ]
  }
];

const WritingExercisesPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      updateProgress('writing', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = Object.keys(responses).length;
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('writing', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, responses]);

  const handleResponseChange = (exerciseId: string, value: string) => {
    updateActivity();
    setResponses(prev => ({
      ...prev,
      [exerciseId]: value
    }));
    // Clear feedback when answer changes
    setFeedback(prev => ({
      ...prev,
      [exerciseId]: false
    }));
  };

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

  const toggleHint = (exerciseId: string) => {
    updateActivity();
    setShowHints(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const checkAnswer = (exercise: Exercise) => {
    updateActivity();
    if (!exercise.expectedAnswer) return;
    
    const isCorrect = responses[exercise.id]?.trim().toLowerCase() === exercise.expectedAnswer.toLowerCase();
    setFeedback(prev => ({
      ...prev,
      [exercise.id]: isCorrect
    }));
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Writing Exercises</span> - წერის სავარჯიშოები (tseris savarjishoebi)
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Develop your written Georgian skills through guided practice
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/intermediate"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Intermediate Level
                </Link>
                <Link
                  to="/intermediate/quiz/writing"
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
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Pencil className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Writing Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Practice writing daily</li>
                  <li>• Focus on proper letter formation</li>
                  <li>• Pay attention to word order</li>
                  <li>• Use the hints when needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {exerciseCategories.map(category => (
              <div
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
                className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {category.title}
                      </h2>
                      <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-6">
                      {category.exercises.map(exercise => (
                        <div
                          key={exercise.id}
                          className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                        >
                          <div className="mb-4">
                            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {exercise.prompt}
                            </h3>
                            {exercise.example && (
                              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                Example: {exercise.example}
                              </p>
                            )}
                          </div>

                          <div className="space-y-4">
                            <textarea
                              value={responses[exercise.id] || ''}
                              onChange={(e) => handleResponseChange(exercise.id, e.target.value)}
                              className={`w-full p-3 rounded-md ${
                                theme === 'dark'
                                  ? 'bg-gray-800 text-white border-gray-600'
                                  : 'bg-white text-gray-900 border-gray-300'
                              } border focus:ring-2 focus:ring-purple-500`}
                              rows={3}
                              placeholder="Write your answer here..."
                            />

                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => toggleHint(exercise.id)}
                                className={`text-sm ${
                                  theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                {showHints[exercise.id] ? 'Hide Hint' : 'Show Hint'}
                              </button>

                              {exercise.expectedAnswer && (
                                <button
                                  onClick={() => checkAnswer(exercise)}
                                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                                    theme === 'dark'
                                      ? 'bg-purple-700 text-white hover:bg-purple-800'
                                      : 'bg-purple-600 text-white hover:bg-purple-700'
                                  }`}
                                >
                                  Check Answer
                                </button>
                              )}
                            </div>

                            {showHints[exercise.id] && exercise.hint && (
                              <div className={`p-4 rounded-md ${
                                theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}>
                                <p className="text-sm">{exercise.hint}</p>
                              </div>
                            )}

                            {feedback[exercise.id] !== undefined && (
                              <div className={`p-4 rounded-md ${
                                feedback[exercise.id]
                                  ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                              }`}>
                                <div className="flex items-center">
                                  {feedback[exercise.id] ? (
                                    <Check className="h-5 w-5 mr-2" />
                                  ) : (
                                    <X className="h-5 w-5 mr-2" />
                                  )}
                                  <p>
                                    {feedback[exercise.id]
                                      ? 'Correct! '
                                      : 'Not quite. Try again. '}
                                    {exercise.explanation}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WritingExercisesPage;