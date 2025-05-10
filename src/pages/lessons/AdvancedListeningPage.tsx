import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Pause, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface ListeningExercise {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  transcript: string;
  translation: string;
  questions: {
    question: string;
    options: string[];
    correct: string;
  }[];
  vocabulary: {
    word: string;
    translation: string;
    context: string;
  }[];
}

interface ListeningCategory {
  id: string;
  title: string;
  description: string;
  exercises: ListeningExercise[];
}

const AdvancedListeningPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivityTime;
      
      if (timeDiff < 5 * 60 * 1000) {
        setTimeSpent(prev => prev + 1);
      }
      
      setLastActivityTime(now);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [lastActivityTime]);

  const updateActivity = () => {
    setLastActivityTime(Date.now());
  };

  useEffect(() => {
    if (user) {
      updateProgress('advanced-listening', { timeSpent: 1 });
    }
    
    return () => {
      if (user && timeSpent > 0) {
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (selectedAnswer === selectedExercise?.questions[currentQuestionIndex].correct ? 1 : 0);
        
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('advanced-listening', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, selectedAnswer, selectedExercise, currentQuestionIndex, updateProgress]);

  const listeningCategories: ListeningCategory[] = [
    {
      id: 'news',
      title: 'News and Current Affairs',
      description: 'Practice with authentic Georgian news broadcasts and interviews',
      exercises: [
        {
          id: 'news-1',
          title: 'Morning News Report',
          description: 'Listen to a morning news report covering current events in Georgia',
          audioUrl: 'https://example.com/morning-news.mp3',
          transcript: 'დილის საინფორმაციო გამოშვებაში მოვისმინოთ მთავარი მოვლენები...',
          translation: 'In this morning\'s news broadcast, let\'s hear the main events...',
          questions: [
            {
              question: 'What was the main topic of the news report?',
              options: [
                'Economic developments',
                'Cultural events',
                'Political news',
                'Weather forecast'
              ],
              correct: 'Political news'
            },
            {
              question: 'Which region was mentioned in the report?',
              options: [
                'Kakheti',
                'Adjara',
                'Imereti',
                'Samtskhe-Javakheti'
              ],
              correct: 'Adjara'
            }
          ],
          vocabulary: [
            {
              word: 'საინფორმაციო გამოშვება',
              translation: 'news broadcast',
              context: 'Used when referring to news programs'
            },
            {
              word: 'მთავარი მოვლენები',
              translation: 'main events',
              context: 'Key happenings in the news'
            }
          ]
        },
        {
          id: 'interview-1',
          title: 'Political Interview',
          description: 'Listen to an interview with a Georgian political analyst',
          audioUrl: 'https://example.com/political-interview.mp3',
          transcript: 'დღევანდელ გადაცემაში გვესტუმრება პოლიტიკის მკვლევარი...',
          translation: 'Today\'s program features a political researcher...',
          questions: [
            {
              question: 'What was the main focus of the interview?',
              options: [
                'International relations',
                'Domestic policy',
                'Economic reforms',
                'Social issues'
              ],
              correct: 'International relations'
            },
            {
              question: 'What solution did the analyst propose?',
              options: [
                'Diplomatic negotiations',
                'Economic sanctions',
                'Policy reform',
                'Public referendum'
              ],
              correct: 'Diplomatic negotiations'
            }
          ],
          vocabulary: [
            {
              word: 'პოლიტიკის მკვლევარი',
              translation: 'political researcher',
              context: 'Expert who studies political developments'
            },
            {
              word: 'საერთაშორისო ურთიერთობები',
              translation: 'international relations',
              context: 'Diplomatic relationships between countries'
            }
          ]
        }
      ]
    },
    {
      id: 'conversations',
      title: 'Natural Conversations',
      description: 'Listen to authentic conversations between native Georgian speakers',
      exercises: [
        {
          id: 'conversation-1',
          title: 'Cafe Conversation',
          description: 'Listen to a natural conversation between friends at a cafe',
          audioUrl: 'https://example.com/cafe-conversation.mp3',
          transcript: 'შეხვედრაზე მეგობრები განიხილავენ თავიანთ გეგმებს...',
          translation: 'At the meeting, friends discuss their plans...',
          questions: [
            {
              question: 'What are the friends planning?',
              options: [
                'Weekend trip',
                'Birthday party',
                'Work project',
                'Family dinner'
              ],
              correct: 'Weekend trip'
            },
            {
              question: 'What concern did one friend express?',
              options: [
                'Weather forecast',
                'Transportation',
                'Accommodation',
                'Cost'
              ],
              correct: 'Weather forecast'
            }
          ],
          vocabulary: [
            {
              word: 'შეხვედრა',
              translation: 'meeting',
              context: 'Casual gathering of friends'
            },
            {
              word: 'გეგმები',
              translation: 'plans',
              context: 'Future arrangements or intentions'
            }
          ]
        },
        {
          id: 'conversation-2',
          title: 'Family Gathering',
          description: 'Listen to a conversation during a family celebration',
          audioUrl: 'https://example.com/family-gathering.mp3',
          transcript: 'ოჯახური შეკრების დროს ბებია იხსენებს ძველ ამბებს...',
          translation: 'During the family gathering, grandmother recalls old stories...',
          questions: [
            {
              question: 'What period is the grandmother talking about?',
              options: [
                'Her childhood',
                'Her wedding day',
                'Her first job',
                'Her university years'
              ],
              correct: 'Her childhood'
            },
            {
              question: 'What emotion is most prominent in her story?',
              options: [
                'Nostalgia',
                'Sadness',
                'Joy',
                'Anxiety'
              ],
              correct: 'Nostalgia'
            }
          ],
          vocabulary: [
            {
              word: 'ოჯახური შეკრება',
              translation: 'family gathering',
              context: 'Family celebration or meeting'
            },
            {
              word: 'მოგონებები',
              translation: 'memories',
              context: 'Recollections of past events'
            }
          ]
        }
      ]
    },
    {
      id: 'media',
      title: 'Media and Entertainment',
      description: 'Practice with Georgian movies, TV shows, and radio programs',
      exercises: [
        {
          id: 'movie-1',
          title: 'Movie Scene Analysis',
          description: 'Listen to and analyze a scene from a Georgian film',
          audioUrl: 'https://example.com/movie-scene.mp3',
          transcript: 'ფილმის ამ ეპიზოდში გმირები განიხილავენ მნიშვნელოვან გადაწყვეტილებას...',
          translation: 'In this movie scene, the characters discuss an important decision...',
          questions: [
            {
              question: 'What is the main conflict in the scene?',
              options: [
                'Personal values',
                'Family obligations',
                'Career choices',
                'Romantic relationship'
              ],
              correct: 'Family obligations'
            },
            {
              question: 'What is the protagonist\'s decision?',
              options: [
                'Stay with family',
                'Leave for abroad',
                'Change career',
                'Confront antagonist'
              ],
              correct: 'Leave for abroad'
            }
          ],
          vocabulary: [
            {
              word: 'გადაწყვეტილება',
              translation: 'decision',
              context: 'Important life choice'
            },
            {
              word: 'მოვალეობა',
              translation: 'obligation',
              context: 'Duty or responsibility'
            }
          ]
        },
        {
          id: 'radio-1',
          title: 'Radio Show',
          description: 'Listen to a Georgian radio show discussion',
          audioUrl: 'https://example.com/radio-show.mp3',
          transcript: 'დღევანდელ რადიო გადაცემაში განვიხილავთ კულტურულ მოვლენებს...',
          translation: 'In today\'s radio show, we\'ll discuss cultural events...',
          questions: [
            {
              question: 'What cultural event is being discussed?',
              options: [
                'Art exhibition',
                'Music festival',
                'Theater premiere',
                'Book fair'
              ],
              correct: 'Music festival'
            },
            {
              question: 'When is the event taking place?',
              options: [
                'Next week',
                'Next month',
                'This weekend',
                'This evening'
              ],
              correct: 'Next week'
            }
          ],
          vocabulary: [
            {
              word: 'კულტურული მოვლენა',
              translation: 'cultural event',
              context: 'Artistic or cultural happening'
            },
            {
              word: 'ფესტივალი',
              translation: 'festival',
              context: 'Large cultural celebration'
            }
          ]
        }
      ]
    },
    {
      id: 'academic',
      title: 'Academic Lectures',
      description: 'Practice with university lectures and academic discussions',
      exercises: [
        {
          id: 'lecture-1',
          title: 'History Lecture',
          description: 'Listen to a university lecture about Georgian history',
          audioUrl: 'https://example.com/history-lecture.mp3',
          transcript: 'დღევანდელ ლექციაზე ვისაუბრებთ შუა საუკუნეების საქართველოზე...',
          translation: 'In today\'s lecture, we\'ll discuss medieval Georgia...',
          questions: [
            {
              question: 'What period is the lecture focusing on?',
              options: [
                'Golden Age',
                'Early Medieval',
                'Late Medieval',
                'Renaissance'
              ],
              correct: 'Golden Age'
            },
            {
              question: 'Which ruler was mentioned most?',
              options: [
                'Queen Tamar',
                'David the Builder',
                'Vakhtang Gorgasali',
                'George III'
              ],
              correct: 'Queen Tamar'
            }
          ],
          vocabulary: [
            {
              word: 'შუა საუკუნეები',
              translation: 'Middle Ages',
              context: 'Medieval period in history'
            },
            {
              word: 'ოქროს ხანა',
              translation: 'Golden Age',
              context: 'Period of greatest achievement'
            }
          ]
        },
        {
          id: 'lecture-2',
          title: 'Literature Seminar',
          description: 'Listen to a seminar about Georgian literature',
          audioUrl: 'https://example.com/literature-seminar.mp3',
          transcript: 'სემინარზე განვიხილავთ ქართული ლიტერატურის მთავარ მიმდინარეობებს...',
          translation: 'In the seminar, we\'ll discuss the main trends in Georgian literature...',
          questions: [
            {
              question: 'Which literary period is being discussed?',
              options: [
                'Modern',
                'Classical',
                'Romantic',
                'Contemporary'
              ],
              correct: 'Romantic'
            },
            {
              question: 'What aspect of literature was emphasized?',
              options: [
                'Themes',
                'Style',
                'Structure',
                'Characters'
              ],
              correct: 'Themes'
            }
          ],
          vocabulary: [
            {
              word: 'მიმდინარეობა',
              translation: 'trend/movement',
              context: 'Literary or artistic movement'
            },
            {
              word: 'თემატიკა',
              translation: 'themes',
              context: 'Subject matter in literature'
            }
          ]
        }
      ]
    }
  ];

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

  const handleExerciseSelect = (exercise: ListeningExercise) => {
    updateActivity();
    setSelectedExercise(exercise);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowTranscript(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

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

  const handleAnswerSelect = (answer: string) => {
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

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Advanced Listening</span> - მოსმენის უნარები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Comprehend native speakers at natural speeds across various contexts.
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
                <BookOpen className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Listening Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Focus on context and main ideas</li>
                  <li>• Pay attention to intonation</li>
                  <li>• Practice active listening</li>
                  <li>• Take notes on key points</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {listeningCategories.map((category) => (
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
                  <div className="mt-4 space-y-4">
                    {category.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {exercise.title}
                        </h3>
                        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {exercise.description}
                        </p>
                        
                        <button
                          onClick={() => handleExerciseSelect(exercise)}
                          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                            theme === 'dark'
                              ? 'bg-indigo-600 hover:bg-indigo-700'
                              : 'bg-indigo-500 hover:bg-indigo-600'
                          }`}
                        >
                          Start Exercise
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedExercise && (
        <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedExercise.title}
              </h3>
              
              <div className="mb-6">
                <audio
                  ref={audioRef}
                  src={selectedExercise.audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <button
                  onClick={togglePlay}
                  className={`w-full py-4 rounded-lg flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                  ) : (
                    <Play className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                  )}
                </button>
              </div>
              
              <div className="mb-6">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
                </button>
                
                {showTranscript && (
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <p className={`mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {selectedExercise.transcript}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedExercise.translation}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Comprehension Question {currentQuestionIndex + 1}
                </h4>
                
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedExercise.questions[currentQuestionIndex].question}
                </p>
                
                <div className="space-y-2">
                  {selectedExercise.questions[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedAnswer === option
                          ? option === selectedExercise.questions[currentQuestionIndex].correct
                            ? (theme === 'dark' ? 'bg-green-900 text-white' : 'bg-green-100 text-green-800')
                            : (theme === 'dark' ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                          : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {showFeedback && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    selectedAnswer === selectedExercise.questions[currentQuestionIndex].correct
                      ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                      : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                  }`}>
                    <p>
                      {selectedAnswer === selectedExercise.questions[currentQuestionIndex].correct
                        ? 'Correct!'
                        : `Incorrect. The correct answer is "${selectedExercise.questions[currentQuestionIndex].correct}".`}
                    </p>
                  </div>
                )}
                
                {showFeedback && currentQuestionIndex < selectedExercise.questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className={`mt-4 px-4 py-2 rounded ${
                      theme === 'dark'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    Next Question
                  </button>
                )}
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}>
                <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Key Vocabulary
                </h4>
                <div className="space-y-2">
                  {selectedExercise.vocabulary.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.word} - {item.translation}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Context: {item.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Listening Strategies
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Listen for main ideas before details</li>
                <li>Pay attention to context clues</li>
                <li>Note speaker's tone and emphasis</li>
                <li>Practice with various accents and speeds</li>
                <li>Use visual cues when available</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Tips
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Watch Georgian news daily</li>
                <li>Listen to Georgian podcasts</li>
                <li>Practice with native speakers</li>
                <li>Record and analyze your comprehension</li>
                <li>Create listening journals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedListeningPage;