import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Book, Brain, Check, ChevronDown, ChevronUp, Headphones, MessageSquare, Pencil, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const VocabularyPage: React.FC = () => {
  const { theme } = useTheme();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const studyTips = {
    reading: [
      'Practice reading Georgian texts daily, even if you don\'t understand everything',
      'Use context clues to guess word meanings',
      'Create flashcards with Georgian words and their translations',
      'Read Georgian news websites or children\'s books',
      'Highlight new words and create a personal dictionary',
      'Use spaced repetition techniques for vocabulary review',
      'Practice word recognition with different fonts and handwriting',
      'Join online Georgian reading groups'
    ],
    listening: [
      'Listen to Georgian podcasts and radio shows',
      'Watch Georgian movies with subtitles',
      'Practice with native speaker recordings',
      'Focus on intonation and pronunciation patterns',
      'Record yourself repeating words and phrases',
      'Use language learning apps with audio features',
      'Listen to Georgian music and try to sing along',
      'Participate in online language exchange sessions'
    ],
    speaking: [
      'Practice speaking with native Georgian speakers',
      'Record yourself speaking and analyze your pronunciation',
      'Use language exchange apps to find conversation partners',
      'Speak Georgian daily, even if just to yourself',
      'Focus on proper stress and intonation',
      'Join Georgian language meetups or online groups',
      'Practice common phrases and expressions',
      'Use role-play scenarios to improve fluency'
    ],
    writing: [
      'Keep a daily journal in Georgian',
      'Practice writing common phrases and sentences',
      'Use Georgian keyboard layouts for authentic writing',
      'Write emails or messages to language exchange partners',
      'Study proper Georgian punctuation rules',
      'Practice writing both printed and cursive forms',
      'Create story summaries in Georgian',
      'Participate in online Georgian writing workshops'
    ]
  };

  const vocabularyTypes = [
    {
      id: 'reading',
      title: 'Reading Vocabulary',
      description: 'Words you recognize when reading',
      icon: <Book size={24} />,
      color: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      examples: [
        'სახლი (sakhli) - house',
        'წიგნი (tsigni) - book',
        'კარი (kari) - door',
        'ფანჯარა (panjara) - window',
        'მაგიდა (magida) - table',
        'სკამი (skami) - chair',
        'საწოლი (satsoli) - bed',
        'ტელევიზორი (televizori) - television',
        'კომპიუტერი (kompyuteri) - computer',
        'ტელეფონი (teleponi) - phone',
        'ჟურნალი (zhurnali) - magazine',
        'გაზეთი (gazeti) - newspaper',
        'წერილი (tserili) - letter'
      ],
      exercises: [
        {
          question: 'Match the word with its meaning: სახლი',
          options: ['Book', 'House', 'Door', 'Window'],
          correct: 'House',
          explanation: 'სახლი (sakhli) means "house" in Georgian'
        },
        {
          question: 'What does "წიგნი" mean?',
          options: ['Magazine', 'Newspaper', 'Book', 'Letter'],
          correct: 'Book',
          explanation: 'წიგნი (tsigni) is the Georgian word for "book"'
        },
        {
          question: 'Identify the correct translation: ფანჯარა',
          options: ['Door', 'Window', 'Chair', 'Table'],
          correct: 'Window',
          explanation: 'ფანჯარა (panjara) means "window" in Georgian'
        },
        {
          question: 'Choose the correct word for "television"',
          options: ['ტელეფონი', 'კომპიუტერი', 'ტელევიზორი', 'რადიო'],
          correct: 'ტელევიზორი',
          explanation: 'ტელევიზორი (televizori) is the Georgian word for "television"'
        },
        {
          question: 'What is the meaning of "გაზეთი"?',
          options: ['Magazine', 'Newspaper', 'Letter', 'Book'],
          correct: 'Newspaper',
          explanation: 'გაზეთი (gazeti) means "newspaper" in Georgian'
        }
      ]
    },
    {
      id: 'listening',
      title: 'Listening Vocabulary',
      description: 'Words you understand when hearing',
      icon: <Headphones size={24} />,
      color: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      examples: [
        'გამარჯობა (gamarjoba) - hello',
        'მადლობა (madloba) - thank you',
        'კარგი (kargi) - good',
        'ნახვამდის (nakhvamdis) - goodbye',
        'გთხოვთ (gtxovt) - please',
        'კი (ki) - yes',
        'არა (ara) - no',
        'როგორ ხარ? (rogor khar?) - how are you?',
        'კარგად (kargad) - well',
        'გაიგე? (gaige?) - did you understand?',
        'გაიმეორე (gaimeoret) - repeat',
        'ნელა (nela) - slowly',
        'კიდევ (kidev) - again'
      ],
      exercises: [
        {
          question: 'Listen and choose the correct greeting',
          options: ['გამარჯობა', 'ნახვამდის', 'მადლობა', 'გთხოვთ'],
          correct: 'გამარჯობა',
          explanation: 'გამარჯობა (gamarjoba) is the standard Georgian greeting'
        },
        {
          question: 'What does "კარგად" mean when you hear it?',
          options: ['Hello', 'Goodbye', 'Well', 'Please'],
          correct: 'Well',
          explanation: 'კარგად (kargad) means "well" and is often used in response to "როგორ ხარ?"'
        },
        {
          question: 'Choose the correct response to "გაიგე?"',
          options: ['კი', 'ნახვამდის', 'გთხოვთ', 'გაიმეორე'],
          correct: 'კი',
          explanation: 'კი (ki) meaning "yes" is an appropriate response to "did you understand?"'
        },
        {
          question: 'What would you say to ask someone to speak more slowly?',
          options: ['კიდევ', 'ნელა', 'კარგი', 'არა'],
          correct: 'ნელა',
          explanation: 'ნელა (nela) means "slowly" and is used to ask someone to speak more slowly'
        },
        {
          question: 'Identify the correct farewell expression',
          options: ['გამარჯობა', 'მადლობა', 'ნახვამდის', 'გთხოვთ'],
          correct: 'ნახვამდის',
          explanation: 'ნახვამდის (nakhvamdis) is the standard way to say "goodbye" in Georgian'
        }
      ]
    },
    {
      id: 'speaking',
      title: 'Speaking Vocabulary',
      description: 'Words you use when talking',
      icon: <MessageSquare size={24} />,
      color: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      examples: [
        'დიახ (diakh) - yes',
        'არა (ara) - no',
        'გთხოვთ (gtkhovt) - please',
        'გმადლობთ (gmadlobt) - thank you',
        'ბოდიში (bodishi) - sorry',
        'გასაგებია (gasagebia) - I understand',
        'არ ვიცი (ar vitsi) - I don\'t know',
        'მინდა (minda) - I want',
        'მიყვარს (miqvars) - I love',
        'მომწონს (momtsons) - I like',
        'დამეხმარე (damekhmare) - help me',
        'გაიმეორეთ (gaimeoret) - repeat please',
        'რა ღირს? (ra ghirs?) - how much is it?'
      ],
      exercises: [
        {
          question: 'Practice saying: How would you say "I don\'t know" in Georgian?',
          options: ['მინდა', 'არ ვიცი', 'გასაგებია', 'ბოდიში'],
          correct: 'არ ვიცი',
          explanation: 'არ ვიცი (ar vitsi) is how you say "I don\'t know" in Georgian'
        },
        {
          question: 'What would you say to express "I like it"?',
          options: ['მიყვარს', 'მომწონს', 'მინდა', 'გთხოვთ'],
          correct: 'მომწონს',
          explanation: 'მომწონს (momtsons) means "I like" in Georgian'
        },
        {
          question: 'How do you ask for help in Georgian?',
          options: ['გაიმეორეთ', 'დამეხმარე', 'რა ღირს?', 'ბოდიში'],
          correct: 'დამეხმარე',
          explanation: 'დამეხმარე (damekhmare) means "help me" in Georgian'
        },
        {
          question: 'Choose the correct way to ask "How much is it?"',
          options: ['გმადლობთ', 'რა ღირს?', 'გასაგებია', 'მინდა'],
          correct: 'რა ღირს?',
          explanation: 'რა ღირს? (ra ghirs?) is how you ask "How much is it?" in Georgian'
        },
        {
          question: 'What would you say to apologize?',
          options: ['გთხოვთ', 'ბოდიში', 'დიახ', 'არა'],
          correct: 'ბოდიში',
          explanation: 'ბოდიში (bodishi) means "sorry" in Georgian'
        }
      ]
    },
    {
      id: 'writing',
      title: 'Writing Vocabulary',
      description: 'Words you use when writing',
      icon: <Pencil size={24} />,
      color: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      examples: [
        'და (da) - and',
        'მაგრამ (magram) - but',
        'რომ (rom) - that',
        'თუ (tu) - if',
        'ან (an) - or',
        'რადგან (radgan) - because',
        'ასევე (aseve) - also',
        'შემდეგ (shemdeg) - after',
        'პირველი (pirveli) - first',
        'ბოლოს (bolos) - finally',
        'მაგალითად (magalitad) - for example',
        'სხვათაშორის (skhvatashоris) - by the way',
        'მიუხედავად (miukhedavad) - despite'
      ],
      exercises: [
        {
          question: 'Complete the sentence: მე მინდა წასვლა, _____ არ შემიძლია',
          options: ['და', 'მაგრამ', 'რომ', 'თუ'],
          correct: 'მაგრამ',
          explanation: 'მაგრამ (magram) means "but" and is used to show contrast'
        },
        {
          question: 'Choose the correct word for "because"',
          options: ['რადგან', 'ასევე', 'შემდეგ', 'ბოლოს'],
          correct: 'რადგან',
          explanation: 'რადგან (radgan) means "because" and is used to give reasons'
        },
        {
          question: 'What conjunction means "and"?',
          options: ['ან', 'და', 'თუ', 'რომ'],
          correct: 'და',
          explanation: 'და (da) is the Georgian word for "and"'
        },
        {
          question: 'Select the word meaning "for example"',
          options: ['მაგალითად', 'სხვათაშორის', 'მიუხედავად', 'ასევე'],
          correct: 'მაგალითად',
          explanation: 'მაგალითად (magalitad) means "for example" in Georgian'
        },
        {
          question: 'Which word means "despite"?',
          options: ['შემდეგ', 'პირველი', 'მიუხედავად', 'ბოლოს'],
          correct: 'მიუხედავად',
          explanation: 'მიუხედავად (miukhedavad) means "despite" in Georgian'
        }
      ]
    }
  ];

  const toggleType = (typeId: string) => {
    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
      setTimeout(() => {
        if (contentRefs.current[typeId]) {
          contentRefs.current[typeId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (word: string) => {
    if (audioRef.current) {
      if (isPlaying === word) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(null);
      } else {
        audioRef.current.src = `https://api.example.com/audio/${word}.mp3`;
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(word);
      }
    }
  };

  const playAllAudio = (words: string[]) => {
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex < words.length) {
        playAudio(words[currentIndex]);
        currentIndex++;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', playNext);
      playNext();
    }
  };

  return (
    <div className="pt-16 pb-16">
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(null)}
        onError={() => {
          console.log('Audio file not found or error playing audio');
          setIsPlaying(null);
        }}
      />
      
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Vocabulary Types</span>
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master different types of Georgian vocabulary to improve your language skills.
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
                  to="/beginner/quiz/vocabulary"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Brain className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Path
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Start with reading vocabulary</li>
                  <li>• Practice listening comprehension</li>
                  <li>• Build speaking confidence</li>
                  <li>• Develop writing skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {vocabularyTypes.map((type) => (
              <div
                key={type.id}
                className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`}
                ref={el => contentRefs.current[type.id] = el}
              >
                <button
                  onClick={() => toggleType(type.id)}
                  className={`w-full p-6 flex items-center justify-between ${
                    theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-4 ${type.color}`}>
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {type.title}
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                  {expandedType === type.id ? (
                    <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                  ) : (
                    <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                  )}
                </button>

                {expandedType === type.id && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Study Tips for {type.title}:
                        </h4>
                        <button
                          onClick={() => playAllAudio(type.examples.map(ex => ex.split(' ')[0]))}
                          className={`flex items-center px-3 py-1 rounded-md ${
                            theme === 'dark' 
                              ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Volume2 size={16} className="mr-2" />
                          Play All
                        </button>
                      </div>
                      <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {studyTips[type.id as keyof typeof studyTips].map((tip, i) => (
                          <li key={i} className="flex items-start">
                            <Check size={16} className={`mt-1 mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
                      <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Example Words:
                      </h4>
                      <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {type.examples.map((example, i) => (
                          <li key={i} className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{example}</span>
                              <span className="text-sm opacity-75 ml-2">(pronunciation)</span>
                            </div>
                            <button
                              onClick={() => playAudio(example.split(' ')[0])}
                              className={`p-2 rounded-full transition-colors ${
                                isPlaying === example.split(' ')[0]
                                  ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                                  : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300')
                              }`}
                            >
                              <Play size={16} className={
                                isPlaying === example.split(' ')[0]
                                  ? 'text-white'
                                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
                              } />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className={`font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Practice Exercises:
                      </h4>
                      <div className="space-y-6">
                        {type.exercises.map((exercise, i) => (
                          <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center justify-between mb-4">
                              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {exercise.question}
                              </p>
                              {exercise.audio && (
                                <button
                                  onClick={() => playAudio(exercise.audio!)}
                                  className={`p-2 rounded-full ${
                                    theme === 'dark' 
                                      ? 'bg-gray-600 hover:bg-gray-500' 
                                      : 'bg-gray-200 hover:bg-gray-300'
                                  }`}
                                >
                                  <Play size={16} />
                                </button>
                              )}
                            </div>

                            <div className="space-y-2">
                              {exercise.options.map((option, j) => (
                                <button
                                  key={j}
                                  onClick={() => {
                                    setSelectedAnswer(option);
                                    setShowExplanation(true);
                                  }}
                                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                                    selectedAnswer === option
                                      ? option === exercise.correct
                                        ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                                        : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                                      : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100')
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {selectedAnswer === option && (
                                      option === exercise.correct
                                        ? <Check size={18} className="text-green-500" />
                                        : <X size={18} className="text-red-500" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>

                            {showExplanation && selectedAnswer && (
                              <div className={`mt-4 p-4 rounded-lg ${
                                selectedAnswer === exercise.correct
                                  ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                                  : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                              }`}>
                                <p>{exercise.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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

export default VocabularyPage;