import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, Pencil } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const GrammarPage: React.FC = () => {
  const { theme } = useTheme();
  const [writingInput, setWritingInput] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

  const exercises = [
    {
      id: 'ex1',
      sentence: 'მე _____ წერილს',
      options: ['ვწერ', 'წერს', 'წერთ'],
      correct: 'ვწერ',
      explanation: 'Use "ვწერ" with the first person singular (მე)'
    },
    {
      id: 'ex2',
      sentence: 'შენ _____ წყალს',
      options: ['სვამ', 'ვსვამ', 'სვამს'],
      correct: 'სვამ',
      explanation: 'Use "სვამ" with the second person singular (შენ)'
    },
    {
      id: 'ex3',
      sentence: 'ის _____ ბურთით',
      options: ['თამაშობს', 'ვთამაშობ', 'თამაშობთ'],
      correct: 'თამაშობს',
      explanation: 'Use "თამაშობს" with the third person singular (ის)'
    },
    {
      id: 'ex4',
      sentence: 'ჩვენ _____ ქართულს',
      options: ['ვსწავლობთ', 'სწავლობენ', 'სწავლობს'],
      correct: 'ვსწავლობთ',
      explanation: 'Use "ვსწავლობთ" with the first person plural (ჩვენ)'
    },
    {
      id: 'ex5',
      sentence: 'ისინი _____ საჭმელს',
      options: ['ჭამენ', 'ვჭამთ', 'ჭამს'],
      correct: 'ჭამენ',
      explanation: 'Use "ჭამენ" with the third person plural (ისინი)'
    }
  ];

  const writingExercises = [
    {
      prompt: 'Translate this sentence to Georgian: "I am going to the store"',
      expectedAnswer: 'მე მივდივარ მაღაზიაში',
      hint: 'Remember: Subject (მე) + Verb (მივდივარ) + Location with -ში'
    },
    {
      prompt: 'Write a sentence using the verb "to want" (მინდა) and a noun',
      expectedAnswer: 'მე მინდა წყალი',
      hint: 'Structure: Subject + მინდა + Object'
    },
    {
      prompt: 'Create a negative sentence using "არ"',
      expectedAnswer: 'მე არ მიყვარს ყავა',
      hint: 'Place "არ" before the verb'
    }
  ];

  const handleAnswerSelect = (exerciseId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const handleWritingSubmit = (expectedAnswer: string) => {
    if (writingInput.trim().toLowerCase() === expectedAnswer.toLowerCase()) {
      setWritingFeedback('Correct! Well done!');
    } else {
      setWritingFeedback('Try again. Check your spelling and word order.');
    }
  };

  return (
    <div className="pt-16 pb-16">
      {/* Hero section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Grammar Fundamentals</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master essential Georgian grammar rules and parts of speech.
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
                  to="/intermediate/quiz/grammar"
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
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Path
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Learn parts of speech
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Master verb conjugations
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="mr-2 text-green-500" />
                    Practice with examples
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pronouns Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Pronouns (ნაცვალსახელები)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Personal Pronouns
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      Singular:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>მე - I</li>
                      <li>შენ - you</li>
                      <li>ის - he/she/it</li>
                    </ul>
                  </div>
                  <div>
                    <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      Plural:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>ჩვენ - we</li>
                      <li>თქვენ - you (plural)</li>
                      <li>ისინი - they</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Demonstrative Pronouns
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      Common Forms:
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>ეს - this</li>
                      <li>ის - that</li>
                      <li>ესენი - these</li>
                      <li>ისინი - those</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verbs Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Verbs (ზმნები)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Present Tense
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      წერა (to write):
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>მე ვწერ - I write</li>
                      <li>შენ წერ - You write</li>
                      <li>ის წერს - He/She writes</li>
                      <li>ჩვენ ვწერთ - We write</li>
                      <li>თქვენ წერთ - You (pl.) write</li>
                      <li>ისინი წერენ - They write</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Past Tense
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      წერა (to write):
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>მე ვწერდი - I wrote</li>
                      <li>შენ წერდი - You wrote</li>
                      <li>ის წერდა - He/She wrote</li>
                      <li>ჩვენ ვწერდით - We wrote</li>
                      <li>თქვენ წერდით - You (pl.) wrote</li>
                      <li>ისინი წერდნენ - They wrote</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Adverbs Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Adverbs (ზმნიზედები)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Time Adverbs
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>ახლა - now</li>
                  <li>გუშინ - yesterday</li>
                  <li>ხვალ - tomorrow</li>
                  <li>მალე - soon</li>
                  <li>ადრე - early</li>
                  <li>გვიან - late</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Place Adverbs
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>აქ - here</li>
                  <li>იქ - there</li>
                  <li>ახლოს - near</li>
                  <li>შორს - far</li>
                  <li>ზემოთ - up</li>
                  <li>ქვემოთ - down</li>
                </ul>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
                <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Manner Adverbs
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>კარგად - well</li>
                  <li>ცუდად - badly</li>
                  <li>სწრაფად - quickly</li>
                  <li>ნელა - slowly</li>
                  <li>ხმამაღლა - loudly</li>
                  <li>ჩუმად - quietly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conjunctions Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Conjunctions (კავშირები)
            </h2>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Coordinating Conjunctions
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>და - and</li>
                    <li>მაგრამ - but</li>
                    <li>ან - or</li>
                    <li>თუ - if</li>
                    <li>რომ - that</li>
                  </ul>
                </div>
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Usage Examples
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>მე და შენ - you and I</li>
                    <li>მინდა, მაგრამ არ შემიძლია - I want to, but I can't</li>
                    <li>დღეს ან ხვალ - today or tomorrow</li>
                    <li>თუ მოხვალ - if you come</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interjections Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Interjections (შორისდებულები)
            </h2>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Common Interjections
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>ვაი! - Oh! (pain/distress)</li>
                    <li>ვაჰ! - Wow!</li>
                    <li>უი! - Oops!</li>
                    <li>ოჰ! - Oh! (surprise)</li>
                    <li>აჰა! - Aha!</li>
                    <li>ჰეი! - Hey!</li>
                  </ul>
                </div>
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Usage Examples
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>ვაი, რა ცხელა! - Oh, how hot it is!</li>
                    <li>ვაჰ, რა ლამაზია! - Wow, how beautiful!</li>
                    <li>უი, ბოდიში! - Oops, sorry!</li>
                    <li>აჰა, გავიგე! - Aha, I understand!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Prepositions Section */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Postpositions (თანდებულები)
            </h2>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Common Postpositions
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>-ში - in</li>
                    <li>-ზე - on</li>
                    <li>-თან - with/at</li>
                    <li>-დან - from</li>
                    <li>-კენ - towards</li>
                    <li>-მდე - until/up to</li>
                  </ul>
                </div>
                <div>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Usage Examples
                  </h3>
                  <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>სახლში - in the house</li>
                    <li>მაგიდაზე - on the table</li>
                    <li>მეგობართან - with a friend</li>
                    <li>თბილისიდან - from Tbilisi</li>
                    <li>სახლისკენ - towards home</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Section */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Practice Exercises
            </h2>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Fill in the Blanks
              </h3>
              <div className="space-y-8">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="space-y-4">
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exercise.sentence}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswerSelect(exercise.id, option)}
                          className={`px-4 py-2 rounded-md transition-colors ${
                            selectedAnswers[exercise.id] === option
                              ? option === exercise.correct
                                ? (theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-500 text-white')
                                : (theme === 'dark' ? 'bg-red-600 text-white' : 'bg-red-500 text-white')
                              : (theme === 'dark' 
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                  : 'bg-white text-gray-700 hover:bg-gray-100')
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {selectedAnswers[exercise.id] && (
                      <div className={`p-4 rounded-md ${
                        selectedAnswers[exercise.id] === exercise.correct
                          ? (theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      }`}>
                        {selectedAnswers[exercise.id] === exercise.correct
                          ? `✓ Correct! ${exercise.explanation}`
                          : `✗ Incorrect. ${exercise.explanation}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Writing Practice Section */}
          <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className={`text-2xl font-bold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Pencil className="mr-2" size={24} />
                  Writing Practice
                </h2>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Practice writing Georgian sentences to improve your grammar skills.
                </p>
              </div>

              <div className="space-y-8">
                {writingExercises.map((exercise, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                  >
                    <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Exercise {index + 1}
                    </h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exercise.prompt}
                    </p>
                    
                    <div className="space-y-4">
                      <textarea
                        value={writingInput}
                        onChange={(e) => setWritingInput(e.target.value)}
                        placeholder="Write your answer here..."
                        className={`w-full p-3 rounded-md ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        rows={3}
                      />

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleWritingSubmit(exercise.expectedAnswer)}
                          className={`px-4 py-2 rounded-md ${
                            theme === 'dark'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          Check Answer
                        </button>
                        
                        <button
                          onClick={() => setWritingInput('')}
                          className={`px-4 py-2 rounded-md ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Clear
                        </button>
                      </div>

                      {writingFeedback && (
                        <div className={`p-4 rounded-md ${
                          writingFeedback.includes('Correct')
                            ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                            : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                        }`}>
                          <p>{writingFeedback}</p>
                          {!writingFeedback.includes('Correct') && (
                            <p className={`mt-2 text-sm ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              Hint: {exercise.hint}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default GrammarPage;