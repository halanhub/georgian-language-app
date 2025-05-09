import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Pause, Volume2, X, SkipBack, SkipForward, BookMarked } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface ListeningExercise {
  id: string;
  title: string;
  audioUrl: string;
  transcript: string;
  difficulty: 'moderate' | 'challenging' | 'native';
  duration: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

interface ListeningTip {
  id: string;
  title: string;
  description: string;
  examples: {
    tip: string;
    explanation: string;
  }[];
}

const AdvancedListeningPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [notes, setNotes] = useState<string>('');
  const [showTranscript, setShowTranscript] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track time spent on the page
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      
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
    if (user) {
      updateProgress('advanced-listening', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const exerciseCompletion = selectedExercise && showFeedback ? 1 : 0;
        const completed = timeSpent > 10 || exerciseCompletion >= 2;
        
        updateProgress('advanced-listening', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, selectedExercise, updateProgress]);

  // Audio control functions
  const togglePlay = () => {
    updateActivity();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const skipBackward = () => {
    updateActivity();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    updateActivity();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateActivity();
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Exercise functions
  const startExercise = (exercise: ListeningExercise) => {
    updateActivity();
    setSelectedExercise(exercise);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentAudio(exercise.audioUrl);
    setShowTranscript(false);
    setNotes('');
    
    // Reset audio player
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const exitExercise = () => {
    updateActivity();
    setSelectedExercise(null);
    setCurrentAudio(null);
    setShowFeedback(false);
    
    // Reset audio player
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAnswerSelection = (answer: string) => {
    updateActivity();
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    updateActivity();
    if (selectedExercise && currentQuestionIndex < selectedExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const toggleTip = (tipId: string) => {
    updateActivity();
    if (expandedTip === tipId) {
      setExpandedTip(null);
    } else {
      setExpandedTip(tipId);
      setTimeout(() => {
        if (tipRefs.current[tipId]) {
          tipRefs.current[tipId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const toggleTranscript = () => {
    updateActivity();
    setShowTranscript(!showTranscript);
  };

  const updateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateActivity();
    setNotes(e.target.value);
  };

  const listeningTips: ListeningTip[] = [
    {
      id: 'shadowing',
      title: 'Shadowing Technique',
      description: 'Repeat what you hear immediately after the speaker, mimicking their pronunciation and intonation.',
      examples: [
        {
          tip: 'Listen to a short phrase, pause, and repeat exactly what you heard',
          explanation: 'This helps your brain process the sounds and rhythm of Georgian in real-time.'
        },
        {
          tip: 'Gradually increase the length of phrases you shadow',
          explanation: 'Start with 2-3 word phrases, then build up to full sentences.'
        },
        {
          tip: 'Focus on matching the exact intonation pattern',
          explanation: 'Georgian has distinctive stress patterns that affect meaning.'
        },
        {
          tip: 'Record yourself shadowing and compare to the original',
          explanation: 'This identifies pronunciation gaps that need improvement.'
        }
      ]
    },
    {
      id: 'prediction',
      title: 'Prediction and Anticipation',
      description: 'Train yourself to predict what might come next in the conversation based on context.',
      examples: [
        {
          tip: 'Before listening to a conversation about a specific topic, brainstorm likely vocabulary',
          explanation: 'This primes your brain to recognize these words when they appear.'
        },
        {
          tip: 'Practice guessing the next line in conversations',
          explanation: 'Pause audio mid-conversation and try to predict what will be said next.'
        },
        {
          tip: 'Pay attention to common sentence patterns and collocations',
          explanation: 'Georgian uses particular word combinations that become recognizable with practice.'
        },
        {
          tip: 'Study conversational connectors and transitions',
          explanation: 'Words like "ამიტომ" (therefore), "მაგრამ" (but), and "ასევე" (also) signal how ideas connect.'
        }
      ]
    },
    {
      id: 'context',
      title: 'Context-Based Comprehension',
      description: 'Use situational context and non-verbal cues to understand meaning even when you miss words.',
      examples: [
        {
          tip: 'Watch Georgian videos with the sound off first, then with sound',
          explanation: 'This trains you to connect visual context with language.'
        },
        {
          tip: 'Focus on understanding the general meaning first, details second',
          explanation: 'Don\'t get stuck on individual words; focus on the overall message.'
        },
        {
          tip: 'Pay attention to emotional tone and body language',
          explanation: 'These provide crucial context for understanding the speaker\'s intent.'
        },
        {
          tip: 'Listen for key nouns and verbs even if you miss other words',
          explanation: 'The main subjects and actions often carry most of the meaning.'
        }
      ]
    },
    {
      id: 'speed',
      title: 'Adapting to Natural Speed',
      description: 'Train your ear to process Georgian spoken at authentic speeds used by native speakers.',
      examples: [
        {
          tip: 'Start with audio at 80% speed, then gradually increase to natural speed',
          explanation: 'Many audio players allow you to adjust playback speed.'
        },
        {
          tip: 'Listen to the same content multiple times, increasing the speed each time',
          explanation: 'Familiarity with content helps your brain focus on processing speed.'
        },
        {
          tip: 'Focus on recognizing high-frequency word chunks at natural speed',
          explanation: 'Common phrases like "როგორ ხარ" (how are you) should be recognized as single units.'
        },
        {
          tip: 'Practice with different speakers and accents',
          explanation: 'Georgian has regional variations that affect pronunciation and speed.'
        }
      ]
    },
    {
      id: 'reduction',
      title: 'Sound Reductions and Blending',
      description: 'Learn to recognize how native speakers blend sounds together and reduce certain syllables.',
      examples: [
        {
          tip: 'Study common contractions and reductions in Georgian',
          explanation: 'For example, "არ არის" often sounds closer to "არაა" in rapid speech.'
        },
        {
          tip: 'Listen for syllable stress patterns',
          explanation: 'Unstressed syllables are often reduced or shortened in natural speech.'
        },
        {
          tip: 'Train your ear to recognize word boundaries in rapid speech',
          explanation: 'Words often blend together, making it difficult to identify where one word ends and another begins.'
        },
        {
          tip: 'Pay attention to how consonant clusters are pronounced quickly',
          explanation: 'Georgian has many consonant clusters that sound different at natural speed.'
        }
      ]
    }
  ];

  const listeningExercises: ListeningExercise[] = [
    {
      id: 'cafe-conversation',
      title: 'Café Conversation',
      audioUrl: 'https://example.com/georgian-cafe-conversation.mp3', // This would be a real audio URL in production
      transcript: 'გამარჯობა, როგორ ხარ? დიდი ხანია არ მინახიხარ. - კარგად, შენ როგორ ხარ? - მეც კარგად. რას აკეთებ ამ დღეებში? - ვმუშაობ და ვსწავლობ. შენ? - მე უნივერსიტეტში ვსწავლობ და კაფეში ვმუშაობ ნახევარ განაკვეთზე. მოდი, ყავა დავლიოთ ერთად.',
      difficulty: 'moderate',
      duration: '1:45',
      questions: [
        {
          question: 'What does the second speaker do these days?',
          options: [
            'Only works',
            'Only studies',
            'Both works and studies',
            'Neither works nor studies'
          ],
          correctAnswer: 'Both works and studies'
        },
        {
          question: 'Where does the second speaker work?',
          options: [
            'At a restaurant',
            'At a café',
            'At a university',
            'At a school'
          ],
          correctAnswer: 'At a café'
        },
        {
          question: 'What does the conversation end with?',
          options: [
            'A goodbye',
            'An invitation for coffee',
            'An exchange of phone numbers',
            'Making plans for the weekend'
          ],
          correctAnswer: 'An invitation for coffee'
        }
      ]
    },
    {
      id: 'news-report',
      title: 'Weather News Report',
      audioUrl: 'https://example.com/georgian-weather-report.mp3', // This would be a real audio URL in production
      transcript: 'მოგესალმებით, ამინდის პროგნოზი დღეისთვის: თბილისში იქნება მზიანი ამინდი, ტემპერატურა 25 გრადუსი. საღამოს მოსალოდნელია მცირე წვიმა. ხვალ ტემპერატურა დაიკლებს 5 გრადუსით და იქნება ღრუბლიანი ამინდი. დასავლეთ საქართველოში დღეს და ხვალ მოსალოდნელია ძლიერი წვიმა და ჭექა-ქუხილი.',
      difficulty: 'challenging',
      duration: '2:10',
      questions: [
        {
          question: 'What will the weather be like in Tbilisi today?',
          options: [
            'Rainy',
            'Sunny',
            'Cloudy',
            'Snowy'
          ],
          correctAnswer: 'Sunny'
        },
        {
          question: 'What is expected in the evening in Tbilisi?',
          options: [
            'Heavy rain',
            'Light rain',
            'Strong winds',
            'Clear skies'
          ],
          correctAnswer: 'Light rain'
        },
        {
          question: 'How much will the temperature drop tomorrow?',
          options: [
            '3 degrees',
            '5 degrees',
            '10 degrees',
            '2 degrees'
          ],
          correctAnswer: '5 degrees'
        },
        {
          question: 'What weather is expected in Western Georgia?',
          options: [
            'Sunny and warm',
            'Cloudy but dry',
            'Heavy rain and thunder',
            'Light snow'
          ],
          correctAnswer: 'Heavy rain and thunder'
        }
      ]
    },
    {
      id: 'street-interview',
      title: 'Street Interview',
      audioUrl: 'https://example.com/georgian-street-interview.mp3', // This would be a real audio URL in production
      transcript: 'ჟურნალისტი: ბოდიში, შეიძლება რამდენიმე კითხვა დაგისვათ ჩვენი გადაცემისთვის? რესპონდენტი: დიახ, რა თქმა უნდა. ჟურნალისტი: რას ფიქრობთ ქალაქში ტრანსპორტის ახალ სისტემაზე? რესპონდენტი: ჩემი აზრით, უკეთესია ვიდრე ძველი, მაგრამ ჯერ კიდევ არის პრობლემები. ავტობუსები ხშირად იგვიანებენ და ზოგჯერ ძალიან გადატვირთულია. მაგრამ მომწონს, რომ ახლა მეტი მარშრუტია და ახალი ავტობუსები უფრო კომფორტულია. ჟურნალისტი: როგორ ფიქრობთ, რა უნდა გაუმჯობესდეს? რესპონდენტი: პირველ რიგში, თანამედროვე ელექტრონული სისტემა, რომელიც გვაჩვენებს, როდის მოვა ავტობუსი. ასევე, მეტი ავტობუსი უნდა იყოს საღამოს საათებში.',
      difficulty: 'native',
      duration: '3:05',
      questions: [
        {
          question: 'What is the topic of the interview?',
          options: [
            'Weather conditions',
            'Political situation',
            'City transportation system',
            'Cultural events'
          ],
          correctAnswer: 'City transportation system'
        },
        {
          question: 'What does the respondent think about the new system?',
          options: [
            'It\'s worse than before',
            'It\'s better but still has problems',
            'It\'s perfect',
            'It\'s too expensive'
          ],
          correctAnswer: 'It\'s better but still has problems'
        },
        {
          question: 'What problem does the respondent mention about the buses?',
          options: [
            'They are too old',
            'They are too expensive',
            'They are often late and overcrowded',
            'They don\'t have air conditioning'
          ],
          correctAnswer: 'They are often late and overcrowded'
        },
        {
          question: 'What improvement does the respondent suggest first?',
          options: [
            'Lower ticket prices',
            'More comfortable seats',
            'An electronic system showing bus arrival times',
            'More bus routes'
          ],
          correctAnswer: 'An electronic system showing bus arrival times'
        },
        {
          question: 'When does the respondent think more buses are needed?',
          options: [
            'In the morning',
            'During the day',
            'In the evening',
            'On weekends'
          ],
          correctAnswer: 'In the evening'
        }
      ]
    }
  ];

  const isCorrectAnswer = () => {
    if (selectedExercise && selectedAnswer) {
      return selectedAnswer === selectedExercise.questions[currentQuestionIndex].correctAnswer;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Advanced Listening</span> - სმენის უნარები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Comprehend native Georgian speakers at natural speeds and in authentic contexts.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/advanced"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Advanced Level
                </Link>
                <Link
                  to="/advanced/quiz/listening"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className={`p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <Volume2 className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Listening Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Listen actively, not passively</li>
                  <li>• Focus on the overall message first</li>
                  <li>• Don't panic when you miss words</li>
                  <li>• Practice daily with authentic material</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!selectedExercise ? (
        <>
          <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Listening Techniques
              </h2>
              <div className="space-y-6">
                {listeningTips.map((tip) => (
                  <div
                    key={tip.id}
                    ref={el => tipRefs.current[tip.id] = el}
                  >
                    <button
                      onClick={() => toggleTip(tip.id)}
                      className={`w-full p-6 rounded-lg text-left transition-colors ${
                        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                      } shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {tip.title}
                          </h2>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {tip.description}
                          </p>
                        </div>
                        {expandedTip === tip.id ? (
                          <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                        ) : (
                          <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                        )}
                      </div>
                    </button>

                    {expandedTip === tip.id && (
                      <div className="mt-4 space-y-4">
                        {tip.examples.map((example, index) => (
                          <div
                            key={index}
                            className={`p-6 rounded-lg ${
                              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-lg`}
                          >
                            <div className="flex items-start">
                              <div className={`mt-1 mr-4 p-1 rounded-full ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                                <Check size={16} className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} />
                              </div>
                              <div>
                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{example.tip}</p>
                                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{example.explanation}</p>
                              </div>
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

          <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Listening Exercises
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listeningExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {exercise.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded ${
                        exercise.difficulty === 'moderate' 
                          ? (theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                          : exercise.difficulty === 'challenging'
                            ? (theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                            : (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className={`flex items-center mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Volume2 size={16} className="mr-2" />
                      <span>{exercise.duration}</span>
                    </div>
                    <button
                      onClick={() => startExercise(exercise)}
                      className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-indigo-700 hover:bg-indigo-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Play size={16} className="mr-2" />
                      Start Exercise
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedExercise.title}
              </h2>
              <button
                onClick={exitExercise}
                className={`px-4 py-2 rounded ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Exit Exercise
              </button>
            </div>

            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-6`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className={`mr-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full mx-2"
                    />
                    <span className={`ml-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={skipBackward}
                    className={`p-2 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <SkipBack size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className={`p-3 rounded-full ${
                      theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause size={24} className="text-white" />
                    ) : (
                      <Play size={24} className="text-white" />
                    )}
                  </button>
                  <button
                    onClick={skipForward}
                    className={`p-2 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    <SkipForward size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
                  </button>
                </div>
                <audio
                  ref={audioRef}
                  src={currentAudio || ''}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleAudioEnded}
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={toggleTranscript}
                  className={`px-4 py-2 rounded flex items-center ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  <BookMarked size={16} className="mr-2" />
                  {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                </button>
              </div>

              {showTranscript && (
                <div className={`mt-4 p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
                    {selectedExercise.transcript}
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Your Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={updateNotes}
                  placeholder="Take notes while listening..."
                  className={`w-full p-3 rounded-md ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-white text-gray-800 border-gray-300'
                  } border`}
                  rows={4}
                />
              </div>
            </div>

            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Comprehension Questions
              </h3>
              
              <div className="mb-6">
                <p className={`mb-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currentQuestionIndex + 1}. {selectedExercise.questions[currentQuestionIndex].question}
                </p>
                
                <div className="space-y-3">
                  {selectedExercise.questions[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelection(option)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedAnswer === option
                          ? option === selectedExercise.questions[currentQuestionIndex].correctAnswer
                            ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                            : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                          : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                      } ${showFeedback && option !== selectedAnswer ? 'opacity-60' : ''}`}
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
                    <p>
                      {isCorrectAnswer()
                        ? 'Correct! Well done!'
                        : `Incorrect. The correct answer is "${selectedExercise.questions[currentQuestionIndex].correctAnswer}".`}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                {currentQuestionIndex < selectedExercise.questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    disabled={!showFeedback}
                    className={`px-4 py-2 rounded ${
                      !showFeedback
                        ? (theme === 'dark' ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')
                    }`}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recommended Listening Sources
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Georgian Public Broadcasting news podcasts</li>
                <li>Radio Tavisupleba (Radio Free Europe/Radio Liberty in Georgian)</li>
                <li>Rustavi 2 TV clips on YouTube</li>
                <li>Georgian music with lyrics (traditional and contemporary)</li>
                <li>Georgian audiobooks available on Audible and similar platforms</li>
                <li>Georgian language learning podcasts</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Strategies
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Take a "listening journal" to track new expressions you hear</li>
                <li>Listen to the same content multiple times, focusing on different aspects each time</li>
                <li>Practice with different types of content (news, conversations, lectures)</li>
                <li>Transcribe short clips to develop your ear training</li>
                <li>Join language exchange groups to practice with native speakers</li>
                <li>Watch Georgian films first with subtitles, then without</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedListeningPage;