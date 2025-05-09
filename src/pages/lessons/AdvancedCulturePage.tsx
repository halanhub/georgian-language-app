import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GraduationCap, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface CultureExample {
  georgian: string;
  latin: string;
  english: string;
  explanation: string;
}

interface CultureTopic {
  id: string;
  title: string;
  description: string;
  examples: CultureExample[];
}

const AdvancedCulturePage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'traditions' | 'expressions' | 'etiquette' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const topicRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      updateProgress('advanced-culture', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (feedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('advanced-culture', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, feedback, updateProgress]);

  const cultureTopics: CultureTopic[] = [
    {
      id: 'supra',
      title: 'Supra - The Georgian Feast',
      description: 'The supra is a traditional Georgian feast and an important cultural ritual that combines food, wine, toasts, and social bonding.',
      examples: [
        {
          georgian: 'თამადა',
          latin: 'tamada',
          english: 'Toastmaster',
          explanation: 'The tamada leads the supra, giving eloquent toasts and ensuring everyone follows proper etiquette.'
        },
        {
          georgian: 'სადღეგრძელო',
          latin: 'sadghegrdzelo',
          english: 'Toast',
          explanation: 'Georgian toasts are elaborate and poetic, often lasting several minutes and covering themes like peace, family, and friendship.'
        },
        {
          georgian: 'ალავერდი',
          latin: 'alaverdi',
          english: 'Passing the toast',
          explanation: 'When the tamada says "alaverdi" to someone, that person must continue or elaborate on the toast.'
        },
        {
          georgian: 'გაუმარჯოს!',
          latin: 'gaumarjos!',
          english: 'Cheers! (lit. Victory to...)',
          explanation: 'The traditional Georgian toast, often followed by the subject being toasted, e.g., "გაუმარჯოს საქართველოს!" (Victory to Georgia!)'
        },
        {
          georgian: 'მერიქიფე',
          latin: 'merikipe',
          english: 'Wine pourer',
          explanation: 'A person designated to ensure everyone\'s glasses are filled during the supra.'
        }
      ]
    },
    {
      id: 'hospitality',
      title: 'Georgian Hospitality',
      description: 'Hospitality (სტუმარ-მასპინძლობა - stumar-maspindzloba) is a cornerstone of Georgian culture and identity.',
      examples: [
        {
          georgian: 'სტუმარი ღვთისაა',
          latin: 'stumari ghvtisaa',
          english: 'A guest is sent from God',
          explanation: 'This saying reflects the sacred nature of hospitality in Georgian culture.'
        },
        {
          georgian: 'პურ-მარილი',
          latin: 'pur-marili',
          english: 'Bread and salt',
          explanation: 'Traditional offering to guests, symbolizing hospitality and friendship.'
        },
        {
          georgian: 'მობრძანდით',
          latin: 'mobrdzandit',
          english: 'Please come in (formal/polite)',
          explanation: 'A respectful invitation used when welcoming guests into one\'s home.'
        },
        {
          georgian: 'გაგიმარჯოთ, სტუმრებო!',
          latin: 'gagimarjot, stumrebo!',
          english: 'Greetings, guests!',
          explanation: 'A traditional greeting for welcoming multiple guests.'
        },
        {
          georgian: 'შინაური',
          latin: 'shinauri',
          english: 'Like family (lit. domestic)',
          explanation: 'When a guest is treated as family, not as an outsider.'
        }
      ]
    },
    {
      id: 'traditions',
      title: 'Traditions and Customs',
      description: 'Georgian traditions blend ancient practices with Christian influences, creating a unique cultural tapestry.',
      examples: [
        {
          georgian: 'ბედობა',
          latin: 'bedoba',
          english: 'Day of Fate',
          explanation: 'The second day of the new year, believed to set the tone for the entire year.'
        },
        {
          georgian: 'ჭიაკოკონობა',
          latin: 'chiakokonoba',
          english: 'Bonfire festival',
          explanation: 'A pre-Christian winter solstice celebration with ritual bonfires, still celebrated in mountain regions.'
        },
        {
          georgian: 'მკვდრის სული',
          latin: 'mkvdris suli',
          english: 'Soul of the deceased',
          explanation: 'Georgians maintain strong connections with deceased relatives through memorial feasts called "ხსენება" (khseneba).'
        },
        {
          georgian: 'ნათლია',
          latin: 'natlia',
          english: 'Godparent',
          explanation: 'Godparenthood creates a sacred bond between families that is considered as strong as blood relations.'
        },
        {
          georgian: 'მეკვლე',
          latin: 'mekvle',
          english: 'First-foot',
          explanation: 'The first person to enter a home on New Year\'s Day, believed to bring good or bad luck for the coming year.'
        }
      ]
    },
    {
      id: 'polyphony',
      title: 'Georgian Polyphonic Singing',
      description: 'UNESCO-recognized intangible cultural heritage, Georgian polyphonic singing features complex harmonies and is central to cultural identity.',
      examples: [
        {
          georgian: 'მრავალჟამიერი',
          latin: 'mravalzhamieri',
          english: 'Long life (traditional song)',
          explanation: 'A traditional Georgian polyphonic toast song wishing long life and prosperity.'
        },
        {
          georgian: 'ჩაკრულო',
          latin: 'chakrulo',
          english: 'Chakrulo (song name)',
          explanation: 'One of the most famous Georgian polyphonic songs, included on the Voyager Golden Record sent to space.'
        },
        {
          georgian: 'კრიმანჭული',
          latin: 'krimanchuli',
          english: 'Yodeling technique',
          explanation: 'A falsetto yodeling technique used in Georgian folk songs from the western regions.'
        },
        {
          georgian: 'ბანი',
          latin: 'bani',
          english: 'Bass voice',
          explanation: 'The bass part in Georgian polyphonic singing that provides the foundation.'
        },
        {
          georgian: 'გუნდი',
          latin: 'gundi',
          english: 'Choir',
          explanation: 'Traditional Georgian polyphonic choirs typically consist of male singers, though mixed and female ensembles also exist.'
        }
      ]
    },
    {
      id: 'superstitions',
      title: 'Superstitions and Beliefs',
      description: 'Georgian culture includes many superstitions and folk beliefs that influence daily life and social interactions.',
      examples: [
        {
          georgian: 'თვალი',
          latin: 'tvali',
          english: 'Evil eye',
          explanation: 'The belief that someone\'s envious glance can cause harm, often countered with amulets or specific phrases.'
        },
        {
          georgian: 'ცისარტყელაზე გავლა',
          latin: 'tsisartqelaze gavla',
          english: 'Walking under a rainbow',
          explanation: 'Believed to cause a person to change gender, a superstition that reflects traditional gender roles.'
        },
        {
          georgian: 'შავი კატა',
          latin: 'shavi kata',
          english: 'Black cat',
          explanation: 'If a black cat crosses your path, you should take three steps back to avoid bad luck.'
        },
        {
          georgian: 'მარილის დაღვრა',
          latin: 'marilis daghvra',
          english: 'Spilling salt',
          explanation: 'Considered bad luck, often countered by throwing a pinch over the left shoulder.'
        },
        {
          georgian: 'ალავერდი',
          latin: 'alaverdi',
          english: 'Alaverdi (passing the toast)',
          explanation: 'Not responding to an alaverdi (invitation to toast) is considered disrespectful and may bring bad luck.'
        }
      ]
    },
    {
      id: 'etiquette',
      title: 'Social Etiquette and Norms',
      description: 'Georgian social interactions follow specific cultural norms that differ from Western practices.',
      examples: [
        {
          georgian: 'უფროსის პატივისცემა',
          latin: 'uprosis pativiscema',
          english: 'Respect for elders',
          explanation: 'Elders are highly respected in Georgian society; younger people stand when they enter a room and serve them first at meals.'
        },
        {
          georgian: 'სტუმრის გაცილება',
          latin: 'stumris gatsileba',
          english: 'Seeing off guests',
          explanation: 'Hosts traditionally walk guests to the door, building entrance, or even to their transportation.'
        },
        {
          georgian: 'საჩუქრის მიღება',
          latin: 'sachukris migheba',
          english: 'Accepting gifts',
          explanation: 'When receiving a gift, it\'s customary to initially decline before accepting, showing you\'re not greedy.'
        },
        {
          georgian: 'ფეხზე დგომა სადღეგრძელოს დროს',
          latin: 'pekhze dgoma sadghegrdzelos dros',
          english: 'Standing during toasts',
          explanation: 'For important toasts (to parents, deceased, or Georgia), everyone stands as a sign of respect.'
        },
        {
          georgian: 'ქალების მიმართ გალანტურობა',
          latin: 'kalebis mimart galanturoba',
          english: 'Chivalry toward women',
          explanation: 'Traditional Georgian culture emphasizes chivalrous behavior toward women, including opening doors and helping with heavy items.'
        }
      ]
    }
  ];

  // Exercise data
  const traditionsExercises = [
    {
      prompt: "What is the role of the 'თამადა' (tamada) in Georgian culture?",
      options: [
        "A religious leader who performs wedding ceremonies",
        "A toastmaster who leads the supra (feast)",
        "A traditional Georgian dancer",
        "A village elder who resolves disputes"
      ],
      correct: "A toastmaster who leads the supra (feast)",
      explanation: "The თამადა (tamada) is the toastmaster who leads the Georgian supra (feast), giving eloquent toasts and ensuring everyone follows proper etiquette."
    },
    {
      prompt: "What does 'სტუმარი ღვთისაა' (stumari ghvtisaa) mean and signify in Georgian culture?",
      options: [
        "'A guest is a burden' - signifying the obligation of hospitality",
        "'A guest is temporary' - signifying the transient nature of visits",
        "'A guest is sent from God' - signifying the sacred nature of hospitality",
        "'A guest is family' - signifying the inclusion of visitors"
      ],
      correct: "'A guest is sent from God' - signifying the sacred nature of hospitality",
      explanation: "The phrase 'სტუმარი ღვთისაა' (stumari ghvtisaa) means 'A guest is sent from God' and reflects the sacred, almost religious importance of hospitality in Georgian culture."
    },
    {
      prompt: "What is 'ბედობა' (bedoba) in Georgian tradition?",
      options: [
        "A wedding ceremony",
        "The second day of the new year, believed to set the tone for the entire year",
        "A harvest festival",
        "A baptism ritual"
      ],
      correct: "The second day of the new year, believed to set the tone for the entire year",
      explanation: "ბედობა (bedoba), or 'Day of Fate,' is celebrated on January 2nd and is believed to set the tone for the entire year. How one spends this day is thought to influence their fortune throughout the year."
    },
    {
      prompt: "What is the significance of 'პურ-მარილი' (pur-marili) in Georgian hospitality?",
      options: [
        "A type of Georgian dance performed for guests",
        "A traditional offering of bread and salt symbolizing hospitality",
        "A formal greeting between strangers",
        "A farewell ceremony"
      ],
      correct: "A traditional offering of bread and salt symbolizing hospitality",
      explanation: "პურ-მარილი (pur-marili), literally 'bread and salt,' is a traditional offering to guests that symbolizes hospitality and friendship. It represents the host's willingness to share their sustenance."
    },
    {
      prompt: "What is the role of a 'მეკვლე' (mekvle) in Georgian New Year traditions?",
      options: [
        "A cook who prepares the New Year feast",
        "A musician who performs traditional songs",
        "The first person to enter a home on New Year's Day, believed to bring luck",
        "A gift-giver similar to Santa Claus"
      ],
      correct: "The first person to enter a home on New Year's Day, believed to bring luck",
      explanation: "The მეკვლე (mekvle) is the first person to enter a home on New Year's Day, known as the 'first-foot.' This person is believed to bring either good or bad luck for the coming year, so they are carefully selected."
    }
  ];

  const expressionsExercises = [
    {
      prompt: "What does the expression 'გაგიმარჯოს!' (gaumarjos!) literally mean?",
      options: [
        "Hello!",
        "Victory to you!",
        "Good health!",
        "Long life!"
      ],
      correct: "Victory to you!",
      explanation: "The expression 'გაგიმარჯოს!' (gaumarjos!) literally means 'Victory to you!' and is used as a toast or greeting. It comes from the word 'გამარჯვება' (gamarjveba) meaning 'victory.'"
    },
    {
      prompt: "In the context of a supra, what does 'ალავერდი' (alaverdi) mean?",
      options: [
        "A type of Georgian wine",
        "The end of the feast",
        "Passing the toast to someone else",
        "A traditional Georgian dish"
      ],
      correct: "Passing the toast to someone else",
      explanation: "During a supra, when the tamada says 'ალავერდი' (alaverdi) to someone, it means they are passing the toast to that person, who must continue or elaborate on the toast."
    },
    {
      prompt: "What does the expression 'შენი ჭირიმე' (sheni chirime) convey in Georgian?",
      options: [
        "An insult or curse",
        "A formal greeting",
        "Affection and endearment (lit. 'Let me take your troubles')",
        "A business agreement"
      ],
      correct: "Affection and endearment (lit. 'Let me take your troubles')",
      explanation: "შენი ჭირიმე (sheni chirime) literally means 'Let me take your troubles/pain' and is an expression of deep affection and endearment in Georgian, similar to 'my dear' or 'my darling.'"
    },
    {
      prompt: "What is the meaning of 'მადლობა ღმერთს' (madloba ghmerts)?",
      options: [
        "You're welcome",
        "Thank God",
        "God bless you",
        "I swear to God"
      ],
      correct: "Thank God",
      explanation: "მადლობა ღმერთს (madloba ghmerts) means 'Thank God' and is commonly used to express gratitude for positive outcomes or situations."
    },
    {
      prompt: "What does 'გზა მშვიდობისა' (gza mshvidobisa) mean?",
      options: [
        "Welcome",
        "Have a peaceful journey (goodbye)",
        "Good morning",
        "Congratulations"
      ],
      correct: "Have a peaceful journey (goodbye)",
      explanation: "გზა მშვიდობისა (gza mshvidobisa) literally means 'peaceful road/journey' and is used as a farewell expression, wishing someone a safe journey."
    }
  ];

  const etiquetteExercises = [
    {
      prompt: "What is the proper etiquette when receiving a toast at a Georgian supra?",
      options: [
        "Immediately drink the entire glass",
        "Politely decline the first time, then accept",
        "Listen attentively, say 'გაგიმარჯოს' (gaumarjos), then drink",
        "Stand up, bow, and then drink"
      ],
      correct: "Listen attentively, say 'გაგიმარჯოს' (gaumarjos), then drink",
      explanation: "When receiving a toast at a Georgian supra, proper etiquette is to listen attentively to the toast, respond with 'გაგიმარჯოს' (gaumarjos) or a similar expression, and then drink. For important toasts, one should stand."
    },
    {
      prompt: "What is the appropriate way to greet an elder in Georgian culture?",
      options: [
        "With a casual wave and 'გამარჯობა' (gamarjoba)",
        "With a formal bow and silence",
        "With respect, using the polite form 'გამარჯობათ' (gamarjobat) and possibly standing",
        "With a handshake and direct eye contact"
      ],
      correct: "With respect, using the polite form 'გამარჯობათ' (gamarjobat) and possibly standing",
      explanation: "In Georgian culture, elders are greeted with great respect. This includes using the polite form 'გამარჯობათ' (gamarjobat) instead of the informal 'გამარჯობა' (gamarjoba), and often standing when they enter a room."
    },
    {
      prompt: "What is the proper etiquette when visiting a Georgian home?",
      options: [
        "Bring a small gift (wine, sweets, or flowers) for the host",
        "Arrive exactly on time",
        "Remove your shoes only if asked",
        "Eat lightly before arriving as it's impolite to eat too much"
      ],
      correct: "Bring a small gift (wine, sweets, or flowers) for the host",
      explanation: "When visiting a Georgian home, it's customary to bring a small gift for the host, such as wine, sweets, or flowers. This shows respect and appreciation for the hospitality."
    },
    {
      prompt: "What should you do if a Georgian host offers you more food after you've finished eating?",
      options: [
        "Accept immediately to show appreciation",
        "Politely decline once, then accept if they insist",
        "Firmly refuse to show you're disciplined",
        "Ask for a smaller portion"
      ],
      correct: "Politely decline once, then accept if they insist",
      explanation: "In Georgian culture, it's customary to politely decline the first offer of more food ('გმადლობთ, კმარა' - 'gmadlobt, kmara' - 'Thank you, it's enough'), but then accept if the host insists, which they almost certainly will."
    },
    {
      prompt: "What is considered disrespectful during a Georgian supra (feast)?",
      options: [
        "Proposing your own toast without being invited by the tamada",
        "Drinking water between wine toasts",
        "Complimenting the food",
        "Asking for the recipe of a dish you enjoyed"
      ],
      correct: "Proposing your own toast without being invited by the tamada",
      explanation: "During a Georgian supra, it's considered disrespectful to propose your own toast without being invited to do so by the tamada (toastmaster). The tamada controls the order and themes of toasts throughout the meal."
    }
  ];

  const toggleTopic = (topicId: string) => {
    updateActivity();
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
      setTimeout(() => {
        if (topicRefs.current[topicId]) {
          topicRefs.current[topicId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const playAudio = (text: string) => {
    updateActivity();
    if (isPlaying === text) {
      setIsPlaying(null);
    } else {
      setIsPlaying(text);
      // Here you would normally play the audio file
      setTimeout(() => setIsPlaying(null), 1000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedOption(answer);
    setShowFeedback(true);
  };

  const handleEtiquetteSubmit = () => {
    updateActivity();
    setShowFeedback(true);
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'traditions' && currentExerciseIndex < traditionsExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'expressions' && currentExerciseIndex < expressionsExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'etiquette' && currentExerciseIndex < etiquetteExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setSelectedOption(null);
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback(null);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback(null);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'traditions' && selectedOption) {
      return selectedOption === traditionsExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'expressions' && selectedOption) {
      return selectedOption === expressionsExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'etiquette' && selectedOption) {
      return selectedOption === etiquetteExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>Cultural Nuances</span> - კულტურული ნიუანსები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Understand the deep cultural context that shapes Georgian language and social interactions.
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
                  to="/advanced/quiz/culture"
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
                <GraduationCap className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Observe cultural practices in context</li>
                  <li>• Learn the historical background</li>
                  <li>• Practice with native speakers</li>
                  <li>• Respect cultural differences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {cultureTopics.map((topic) => (
              <div
                key={topic.id}
                ref={el => topicRefs.current[topic.id] = el}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {topic.title}
                      </h2>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {topic.description}
                      </p>
                    </div>
                    {expandedTopic === topic.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedTopic === topic.id && (
                  <div className="mt-4 space-y-4">
                    {topic.examples.map((example, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {example.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(example.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === example.georgian
                                ? (theme === 'dark' ? 'bg-green-600' : 'bg-green-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === example.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{example.latin}/
                          </p>
                          <p className="font-medium">{example.english}</p>
                          <div className={`mt-2 p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className="text-sm">
                              <span className="font-medium">Cultural Context:</span> {example.explanation}
                            </p>
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

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Cultural Understanding Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('traditions')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Traditions & Customs
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Test your knowledge of Georgian traditions and cultural practices
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('expressions')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Cultural Expressions
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Learn the meaning behind common Georgian cultural expressions
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('etiquette')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Social Etiquette
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice proper behavior in various Georgian social situations
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'traditions' ? 'Traditions & Customs' : 
                   exerciseMode === 'expressions' ? 'Cultural Expressions' : 'Social Etiquette'}
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
              
              {exerciseMode === 'traditions' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {traditionsExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {traditionsExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === traditionsExercises[currentExerciseIndex].correct
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
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${traditionsExercises[currentExerciseIndex].correct}". `}
                          {traditionsExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < traditionsExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'expressions' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {expressionsExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {expressionsExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === expressionsExercises[currentExerciseIndex].correct
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
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${expressionsExercises[currentExerciseIndex].correct}". `}
                          {expressionsExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < expressionsExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'etiquette' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {etiquetteExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {etiquetteExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === etiquetteExercises[currentExerciseIndex].correct
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
                      <div className={`mt-4 p-4 rounded-md ${
                        isCorrectAnswer()
                          ? (theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800')
                      }`}>
                        <p>
                          {isCorrectAnswer()
                            ? 'Correct! '
                            : `Incorrect. The correct answer is "${etiquetteExercises[currentExerciseIndex].correct}". `}
                          {etiquetteExercises[currentExerciseIndex].explanation}
                        </p>
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
                    
                    {currentExerciseIndex < etiquetteExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
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

      {/* Cultural Insights */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Cultural Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Language and Identity
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                The Georgian language (ქართული ენა - kartuli ena) is a fundamental part of national identity. Unlike many neighboring languages, it belongs to the Kartvelian language family and has its own unique alphabet. Georgians take immense pride in their language, which has survived numerous invasions and attempts at cultural assimilation.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                The language reflects cultural values through its extensive honorific system, rich vocabulary for hospitality, and complex toast-making traditions. Understanding these linguistic nuances is essential for truly connecting with Georgian culture.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Regional Variations
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Georgia's diverse regions each have distinct cultural traditions, dialects, and customs. For example, the mountain regions (Svaneti, Khevsureti) maintain ancient traditions and unique linguistic features, while coastal Adjara shows Turkish influences in both culture and vocabulary.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                These regional differences extend to cuisine, music, dance styles, and even toast-making traditions. A culturally aware Georgian speaker recognizes these variations and adapts their language and behavior accordingly when interacting with people from different regions.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Religion and Language
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Orthodox Christianity has profoundly influenced Georgian language and culture. Religious expressions are woven into everyday speech, and many common phrases have religious origins. For example, the standard greeting "გაგიმარჯოს" (gaumarjos - victory to you) has roots in Georgia's Christian warrior tradition.
              </p>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Religious holidays structure the Georgian calendar, and many cultural practices blend Christian and pre-Christian elements. Understanding these religious references enhances comprehension of both the language and cultural context.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cultural Communication Styles
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Georgian communication tends to be high-context, meaning much is implied rather than explicitly stated. Relationships and social harmony are prioritized over direct communication. This affects language use in several ways:
              </p>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Indirect refusals are preferred over direct "no"</li>
                <li>Elaborate expressions of gratitude and respect</li>
                <li>Context-dependent meaning of phrases</li>
                <li>Rich use of metaphor and cultural references</li>
                <li>Emotional expressiveness in both language and gestures</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedCulturePage;