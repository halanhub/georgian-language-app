import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Pencil, Play, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
        hint: 'Remember: გამარჯობა (hello) + როგორ ხარ (how are you)',
        explanation: 'This is a common greeting in Georgian. გამარჯობა is "hello" and როგორ ხარ means "how are you"'
      },
      {
        id: 'introduction',
        type: 'completion',
        prompt: 'Complete the sentence: "მე მქვია _____ " (My name is _____)',
        hint: 'Add your name after მქვია',
        explanation: 'მე მქვია literally means "I am called" and is used for introducing yourself'
      },
      {
        id: 'simple-sentence',
        type: 'translation',
        prompt: 'Translate: "I am learning Georgian"',
        expectedAnswer: 'მე ვსწავლობ ქართულს',
        hint: 'Structure: მე (I) + ვსწავლობ (am learning) + ქართულს (Georgian)',
        explanation: 'The verb სწავლა (to learn) becomes ვსწავლობ in first person present tense'
      }
    ]
  },
  {
    id: 'daily',
    title: 'Daily Activities',
    description: 'Write about everyday activities in Georgian',
    exercises: [
      {
        id: 'morning',
        type: 'composition',
        prompt: 'Write three sentences about your morning routine',
        example: 'დილით ადრე ვდგები. ყავას ვსვამ. საუზმეს ვამზადებ.',
        hint: 'Use present tense verbs and time expressions',
        explanation: 'Morning routine verbs: ადგომა (wake up), დალევა (drink), მომზადება (prepare)'
      },
      {
        id: 'activities',
        type: 'translation',
        prompt: 'Translate: "I go to work at 9 AM"',
        expectedAnswer: 'მე სამსახურში მივდივარ ცხრა საათზე',
        hint: 'Structure: მე + სამსახურში (to work) + მივდივარ (I go) + time',
        explanation: 'Time expressions in Georgian use -ზე suffix to indicate "at" (specific time)'
      }
    ]
  },
  {
    id: 'descriptions',
    title: 'Descriptions and Details',
    description: 'Practice descriptive writing in Georgian',
    exercises: [
      {
        id: 'weather',
        type: 'composition',
        prompt: 'Describe today\'s weather in Georgian',
        example: 'დღეს მზიანი ამინდია. ცოტა ქარიანია.',
        hint: 'Use weather-related vocabulary: მზიანი (sunny), წვიმიანი (rainy), ქარიანი (windy)',
        explanation: 'Weather descriptions typically use -ია ending to indicate state'
      },
      {
        id: 'family',
        type: 'translation',
        prompt: 'Translate: "I have two brothers and one sister"',
        expectedAnswer: 'მე მყავს ორი ძმა და ერთი და',
        hint: 'Use მყავს (have for animate objects) instead of მაქვს',
        explanation: 'Georgian uses different verbs for possession based on the type of object'
      }
    ]
  },
  {
    id: 'correction',
    title: 'Error Correction',
    description: 'Find and fix mistakes in Georgian sentences',
    exercises: [
      {
        id: 'word-order',
        type: 'correction',
        prompt: 'Correct this sentence: "წიგნს კითხულობს ის"',
        expectedAnswer: 'ის წიგნს კითხულობს',
        hint: 'Georgian typically follows Subject-Object-Verb order',
        explanation: 'The natural word order in Georgian is Subject-Object-Verb (SOV)'
      },
      {
        id: 'verb-agreement',
        type: 'correction',
        prompt: 'Correct this sentence: "მე წერს წერილს"',
        expectedAnswer: 'მე ვწერ წერილს',
        hint: 'First person singular verbs usually start with ვ-',
        explanation: 'The verb should agree with the subject - მე (I) requires ვწერ not წერს'
      }
    ]
  }
];

const WritingExercisesPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleResponseChange = (exerciseId: string, value: string) => {
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

  const toggleHint = (exerciseId: string) => {
    setShowHints(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const checkAnswer = (exercise: Exercise) => {
    if (!exercise.expectedAnswer) return;
    
    const isCorrect = responses[exercise.id]?.trim().toLowerCase() === exercise.expectedAnswer.toLowerCase();
    setFeedback(prev => ({
      ...prev,
      [exercise.id]: isCorrect
    }));
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Writing Exercises</span>
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
              <div key={category.id} className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
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