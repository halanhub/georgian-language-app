import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface LiteratureExample {
  georgian: string;
  latin: string;
  english: string;
  context: string;
}

interface LiteratureTopic {
  id: string;
  title: string;
  description: string;
  examples: LiteratureExample[];
}

const LiteratureAndPoetryPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'conjugation' | 'transformation' | 'analysis' | null>(null);
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
      updateProgress('advanced-grammar', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (feedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('advanced-grammar', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, feedback, updateProgress]);

  const grammarTopics: LiteratureTopic[] = [
    {
      id: 'preverbs',
      title: 'Preverbs and Directional Prefixes',
      description: 'Georgian verbs use preverbs to indicate direction, completion, and other aspects of the action.',
      examples: [
        {
          georgian: 'მი-ვდივარ',
          latin: 'mi-vdivar',
          english: 'I am going (there, away from speaker)',
          explanation: 'The preverb მი- (mi-) indicates movement away from the speaker.'
        },
        {
          georgian: 'მო-ვდივარ',
          latin: 'mo-vdivar',
          english: 'I am coming (here, toward speaker)',
          explanation: 'The preverb მო- (mo-) indicates movement toward the speaker.'
        },
        {
          georgian: 'შე-ვდივარ',
          latin: 'she-vdivar',
          english: 'I am entering (going in)',
          explanation: 'The preverb შე- (she-) indicates movement into something.'
        },
        {
          georgian: 'გა-ვდივარ',
          latin: 'ga-vdivar',
          english: 'I am exiting (going out)',
          explanation: 'The preverb გა- (ga-) indicates movement out of something.'
        },
        {
          georgian: 'ა-ვდივარ',
          latin: 'a-vdivar',
          english: 'I am going up',
          explanation: 'The preverb ა- (a-) indicates upward movement.'
        },
        {
          georgian: 'ჩა-ვდივარ',
          latin: 'cha-vdivar',
          english: 'I am going down',
          explanation: 'The preverb ჩა- (cha-) indicates downward movement.'
        }
      ]
    },
    {
      id: 'version',
      title: 'Version Vowels and Their Functions',
      description: 'Version vowels in Georgian verbs indicate the relationship between the subject and object or the direction of the action.',
      examples: [
        {
          georgian: 'ვ-აკეთებ',
          latin: 'v-aketeb',
          english: 'I am doing (it) (neutral)',
          explanation: 'The version vowel -ა- (-a-) indicates a neutral action.'
        },
        {
          georgian: 'ვ-იკეთებ',
          latin: 'v-iketeb',
          english: 'I am doing (it) for myself',
          explanation: 'The version vowel -ი- (-i-) indicates that the action is done for the subject\'s benefit.'
        },
        {
          georgian: 'ვ-უკეთებ',
          latin: 'v-uketeb',
          english: 'I am doing (it) for him/her/them',
          explanation: 'The version vowel -უ- (-u-) indicates that the action is done for someone else\'s benefit.'
        },
        {
          georgian: 'ვ-აშენებ',
          latin: 'v-asheneb',
          english: 'I am building (it)',
          explanation: 'The version vowel -ა- (-a-) with this verb indicates a neutral action.'
        },
        {
          georgian: 'ვ-იშენებ',
          latin: 'v-isheneb',
          english: 'I am building (it) for myself',
          explanation: 'The version vowel -ი- (-i-) indicates that I am building something for myself.'
        }
      ]
    },
    {
      id: 'screeves',
      title: 'The Screeve System',
      description: 'Georgian verbs are organized into series and screeves (tense-aspect-mood combinations).',
      examples: [
        {
          georgian: 'ვწერ',
          latin: 'vtser',
          english: 'I write/am writing (Present)',
          explanation: 'Present screeve, I Series'
        },
        {
          georgian: 'ვწერდი',
          latin: 'vtserdi',
          english: 'I was writing (Imperfect)',
          explanation: 'Imperfect screeve, I Series'
        },
        {
          georgian: 'დავწერე',
          latin: 'davtsere',
          english: 'I wrote (Aorist)',
          explanation: 'Aorist screeve, II Series'
        },
        {
          georgian: 'დამიწერია',
          latin: 'damitseria',
          english: 'I have (apparently) written (Perfect)',
          explanation: 'Perfect screeve, III Series'
        },
        {
          georgian: 'დავწერო',
          latin: 'davtsero',
          english: 'I should write (Subjunctive)',
          explanation: 'Subjunctive screeve, used for wishes, possibilities'
        }
      ]
    },
    {
      id: 'polypersonal',
      title: 'Polypersonal Agreement',
      description: 'Georgian verbs can simultaneously mark agreement with subject, direct object, and indirect object.',
      examples: [
        {
          georgian: 'მ-ხედავ-ს',
          latin: 'm-khedav-s',
          english: 'He/she sees me',
          explanation: 'მ- (m-) marks 1st person object, -ს (-s) marks 3rd person subject'
        },
        {
          georgian: 'გ-ხედავ-ს',
          latin: 'g-khedav-s',
          english: 'He/she sees you',
          explanation: 'გ- (g-) marks 2nd person object, -ს (-s) marks 3rd person subject'
        },
        {
          georgian: 'მ-ი-წერ-ს',
          latin: 'm-i-tser-s',
          english: 'He/she writes to me',
          explanation: 'მ- (m-) marks 1st person indirect object, -ს (-s) marks 3rd person subject'
        },
        {
          georgian: 'გ-ი-წერ-ს',
          latin: 'g-i-tser-s',
          english: 'He/she writes to you',
          explanation: 'გ- (g-) marks 2nd person indirect object, -ს (-s) marks 3rd person subject'
        },
        {
          georgian: 'მ-ი-ხატავ-ს',
          latin: 'm-i-khatav-s',
          english: 'He/she draws me',
          explanation: 'მ- (m-) marks 1st person object, -ს (-s) marks 3rd person subject'
        }
      ]
    },
    {
      id: 'case-usage',
      title: 'Advanced Case Usage',
      description: 'Georgian cases have complex usage patterns that change based on verb tense and aspect.',
      examples: [
        {
          georgian: 'კაც-ი წერს წერილ-ს',
          latin: 'kats-i tsers tseril-s',
          english: 'The man writes a letter (Present)',
          explanation: 'Subject in Nominative (-ი), Object in Dative (-ს)'
        },
        {
          georgian: 'კაც-მა დაწერა წერილ-ი',
          latin: 'kats-ma datsera tseril-i',
          english: 'The man wrote a letter (Aorist)',
          explanation: 'Subject in Ergative (-მა), Object in Nominative (-ი)'
        },
        {
          georgian: 'კაც-ს დაუწერია წერილ-ი',
          latin: 'kats-s dautseria tseril-i',
          english: 'The man has (apparently) written a letter (Perfect)',
          explanation: 'Subject in Dative (-ს), Object in Nominative (-ი)'
        },
        {
          georgian: 'კაც-ის წერილ-ი',
          latin: 'kats-is tseril-i',
          english: 'The man\'s letter',
          explanation: 'Possessor in Genitive (-ის)'
        },
        {
          georgian: 'კაც-ით მოვიდა',
          latin: 'kats-it movida',
          english: 'He/she came with a man',
          explanation: 'Instrument/accompaniment in Instrumental (-ით)'
        }
      ]
    },
    {
      id: 'complex-sentences',
      title: 'Complex Sentence Structures',
      description: 'Advanced Georgian uses complex sentence structures with various conjunctions and clause types.',
      examples: [
        {
          georgian: 'როცა მოვიდა, უკვე გვიანი იყო',
          latin: 'rotsa movida, ukve gviani iqo',
          english: 'When he/she came, it was already late',
          explanation: 'Temporal clause with როცა (rotsa - when)'
        },
        {
          georgian: 'მინდა, რომ წავიდე',
          latin: 'minda, rom tsavide',
          english: 'I want to go (lit: I want that I go)',
          explanation: 'Complement clause with რომ (rom - that)'
        },
        {
          georgian: 'თუ მოვა, დავინახავ',
          latin: 'tu mova, davinakhav',
          english: 'If he/she comes, I will see him/her',
          explanation: 'Conditional clause with თუ (tu - if)'
        },
        {
          georgian: 'კაცი, რომელიც გუშინ ვნახე, ჩემი მეზობელია',
          latin: 'katsi, romelits gushin vnakhe, chemi mezobelia',
          english: 'The man whom I saw yesterday is my neighbor',
          explanation: 'Relative clause with რომელიც (romelits - who/which)'
        },
        {
          georgian: 'იმიტომ მოვედი, რომ შენ გნახო',
          latin: 'imitom movedi, rom shen gnakho',
          english: 'I came because I wanted to see you',
          explanation: 'Purpose clause with რომ (rom - that)'
        }
      ]
    }
  ];

  // Exercise data
  const conjugationExercises = [
    {
      prompt: "Conjugate the verb 'to write' (წერა) in the Aorist screeve for all persons",
      options: [
        "დავწერე, დაწერე, დაწერა, დავწერეთ, დაწერეთ, დაწერეს",
        "ვწერ, წერ, წერს, ვწერთ, წერთ, წერენ",
        "დავწერ, დაწერ, დაწერს, დავწერთ, დაწერთ, დაწერენ",
        "ვწერდი, წერდი, წერდა, ვწერდით, წერდით, წერდნენ"
      ],
      correct: "დავწერე, დაწერე, დაწერა, დავწერეთ, დაწერეთ, დაწერეს",
      explanation: "The Aorist (past perfective) forms of 'to write' are: დავწერე (I wrote), დაწერე (you wrote), დაწერა (he/she wrote), დავწერეთ (we wrote), დაწერეთ (you all wrote), დაწერეს (they wrote)."
    },
    {
      prompt: "Which version vowel indicates that the action is done for someone else's benefit?",
      options: [
        "-ა- (-a-)",
        "-ი- (-i-)",
        "-უ- (-u-)",
        "-ე- (-e-)"
      ],
      correct: "-უ- (-u-)",
      explanation: "The version vowel -უ- (-u-) indicates that the action is done for someone else's benefit, as in ვუკეთებ (vuketeb - I am doing it for him/her)."
    },
    {
      prompt: "Transform the sentence 'კაცი წერს წერილს' (The man writes a letter) to the Aorist screeve",
      options: [
        "კაცი წერდა წერილს",
        "კაცმა დაწერა წერილი",
        "კაცს დაუწერია წერილი",
        "კაცი დაწერს წერილს"
      ],
      correct: "კაცმა დაწერა წერილი",
      explanation: "In the Aorist, the subject takes the Ergative case (-მა), the verb changes to დაწერა, and the object takes the Nominative case (-ი)."
    },
    {
      prompt: "Which preverb indicates movement toward the speaker?",
      options: [
        "მი- (mi-)",
        "მო- (mo-)",
        "შე- (she-)",
        "გა- (ga-)"
      ],
      correct: "მო- (mo-)",
      explanation: "The preverb მო- (mo-) indicates movement toward the speaker, as in მოდის (modis - he/she is coming here)."
    },
    {
      prompt: "Transform the sentence 'ის მე მხედავს' (He/she sees me) to 'I see him/her'",
      options: [
        "მე ის ვხედავ",
        "მე მას ვხედავ",
        "ის მე ვხედავს",
        "მე ვხედავ მას"
      ],
      correct: "მე მას ვხედავ",
      explanation: "The correct transformation is 'მე მას ვხედავ' where 'მე' (I) is the subject, 'მას' (him/her) is the object in the dative case, and 'ვხედავ' is the verb with the 1st person subject marker ვ-."
    }
  ];

  const transformationExercises = [
    {
      prompt: "Transform the sentence 'მე ვწერ წერილს' (I write a letter) to the negative form",
      options: [
        "მე არ ვწერ წერილს",
        "მე ვწერ არ წერილს",
        "არ მე ვწერ წერილს",
        "მე ვწერ წერილს არ"
      ],
      correct: "მე არ ვწერ წერილს",
      explanation: "To form a negative sentence in Georgian, place the negative particle 'არ' before the verb."
    },
    {
      prompt: "Transform the sentence 'ის წიგნს კითხულობს' (He/she reads a book) to the future tense",
      options: [
        "ის წიგნს იკითხავს",
        "ის წიგნს წაიკითხავს",
        "ის წიგნს კითხულობდა",
        "ის წიგნს კითხულობს"
      ],
      correct: "ის წიგნს წაიკითხავს",
      explanation: "The future tense of 'კითხულობს' (reads) is 'წაიკითხავს' (will read), which includes the preverb 'წა-' indicating completion."
    },
    {
      prompt: "Transform the sentence 'მასწავლებელი მოსწავლეს ასწავლის' (The teacher teaches the student) to the past continuous tense",
      options: [
        "მასწავლებელი მოსწავლეს ასწავლიდა",
        "მასწავლებელმა მოსწავლეს ასწავლა",
        "მასწავლებელს მოსწავლისთვის უსწავლებია",
        "მასწავლებელი მოსწავლეს ასწავლებს"
      ],
      correct: "მასწავლებელი მოსწავლეს ასწავლიდა",
      explanation: "The past continuous (Imperfect) form of 'ასწავლის' is 'ასწავლიდა', and the subject remains in the Nominative case."
    },
    {
      prompt: "Transform the active sentence 'ექიმი პაციენტს მკურნალობს' (The doctor treats the patient) to passive",
      options: [
        "პაციენტი ექიმის მიერ იმკურნალება",
        "პაციენტი ექიმის მიერ მკურნალობს",
        "პაციენტი ექიმის მიერ მკურნალობდება",
        "პაციენტი ექიმის მიერ ნამკურნალებია"
      ],
      correct: "პაციენტი ექიმის მიერ იმკურნალება",
      explanation: "In the passive transformation, the patient becomes the subject, the doctor is marked with 'მიერ' (by), and the verb takes the passive form with the prefix 'ი-'."
    },
    {
      prompt: "Transform the direct speech 'მე მოვალ ხვალ' (I will come tomorrow) to indirect speech: 'მან თქვა, რომ...' (He/she said that...)",
      options: [
        "მან თქვა, რომ მე მოვალ ხვალ",
        "მან თქვა, რომ ის მოვა ხვალ",
        "მან თქვა, რომ ის მოვიდოდა მეორე დღეს",
        "მან თქვა, რომ მე მოვიდოდი მეორე დღეს"
      ],
      correct: "მან თქვა, რომ ის მოვიდოდა მეორე დღეს",
      explanation: "In indirect speech, pronouns change (I → he/she), verb forms shift to the conditional (მოვალ → მოვიდოდა), and time references change (tomorrow → the next day)."
    }
  ];

  const analysisExercises = [
    {
      prompt: "Identify the case of the subject in the sentence: 'კაცმა წერილი დაწერა' (The man wrote a letter)",
      options: [
        "Nominative",
        "Ergative",
        "Dative",
        "Genitive"
      ],
      correct: "Ergative",
      explanation: "In the Aorist screeve, the subject 'კაცმა' (man) is in the Ergative case, marked by the suffix -მა (-ma)."
    },
    {
      prompt: "Identify the function of 'რომ' in the sentence: 'მინდა, რომ წავიდე' (I want to go)",
      options: [
        "Relative pronoun",
        "Complementizer",
        "Conditional marker",
        "Causal conjunction"
      ],
      correct: "Complementizer",
      explanation: "In this sentence, 'რომ' functions as a complementizer, introducing a complement clause after the verb 'მინდა' (I want)."
    },
    {
      prompt: "Identify the version vowel and its function in 'ვუწერ' (I am writing to him/her)",
      options: [
        "-უ-, indicates action for someone else",
        "-ი-, indicates action for oneself",
        "-ა-, indicates neutral action",
        "-ე-, indicates passive voice"
      ],
      correct: "-უ-, indicates action for someone else",
      explanation: "The version vowel -უ- in 'ვუწერ' indicates that the action is performed for someone else's benefit."
    },
    {
      prompt: "Analyze the verb form 'დამიწერია': which screeve and series does it belong to?",
      options: [
        "Present, I Series",
        "Aorist, II Series",
        "Perfect, III Series",
        "Future, I Series"
      ],
      correct: "Perfect, III Series",
      explanation: "The verb form 'დამიწერია' is in the Perfect screeve, which belongs to the III Series. It expresses an action that has apparently been completed."
    },
    {
      prompt: "Identify the type of conditional in: 'რომ მცოდნოდა, მოვიდოდი' (If I had known, I would have come)",
      options: [
        "Real condition (present/future possible)",
        "Unreal condition (present impossible)",
        "Counterfactual condition (past impossible)",
        "Open condition (general truth)"
      ],
      correct: "Counterfactual condition (past impossible)",
      explanation: "This is a counterfactual conditional expressing an impossible condition in the past. Both the condition and result are expressed with past subjunctive forms."
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

  const handleAnalysisSubmit = () => {
    updateActivity();
    setShowFeedback(true);
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'conjugation' && currentExerciseIndex < conjugationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'transformation' && currentExerciseIndex < transformationExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'analysis' && currentExerciseIndex < analysisExercises.length - 1) {
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
    if (exerciseMode === 'conjugation' && selectedOption) {
      return selectedOption === conjugationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'transformation' && selectedOption) {
      return selectedOption === transformationExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'analysis' && selectedOption) {
      return selectedOption === analysisExercises[currentExerciseIndex].correct;
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
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Complex Grammar</span> - რთული გრამატიკა
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Master advanced Georgian grammar patterns and complex linguistic structures.
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
                  to="/advanced/quiz/grammar"
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
                  Learning Tips
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Focus on one grammatical feature at a time</li>
                  <li>• Practice with authentic texts</li>
                  <li>• Create your own examples</li>
                  <li>• Review regularly and build on previous knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {grammarTopics.map((topic) => (
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
                                ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
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
                              <span className="font-medium">Explanation:</span> {example.explanation}
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
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Practice Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('conjugation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Verb Conjugation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice conjugating Georgian verbs in different screeves and with various preverbs
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('transformation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sentence Transformation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Transform sentences between tenses, voices, and speech types
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('analysis')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Grammatical Analysis
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Analyze complex sentences and identify grammatical features
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'conjugation' ? 'Verb Conjugation' : 
                   exerciseMode === 'transformation' ? 'Sentence Transformation' : 'Grammatical Analysis'}
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
              
              {exerciseMode === 'conjugation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {conjugationExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {conjugationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === conjugationExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${conjugationExercises[currentExerciseIndex].correct}". `}
                          {conjugationExercises[currentExerciseIndex].explanation}
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
                    
                    {currentExerciseIndex < conjugationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'transformation' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {transformationExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {transformationExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === transformationExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${transformationExercises[currentExerciseIndex].correct}". `}
                          {transformationExercises[currentExerciseIndex].explanation}
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
                    
                    {currentExerciseIndex < transformationExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')
                        }`}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {exerciseMode === 'analysis' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {analysisExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {analysisExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === analysisExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${analysisExercises[currentExerciseIndex].correct}". `}
                          {analysisExercises[currentExerciseIndex].explanation}
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
                    
                    {currentExerciseIndex < analysisExercises.length - 1 && (
                      <button
                        onClick={nextExercise}
                        disabled={!showFeedback}
                        className={`px-4 py-2 rounded ${
                          !showFeedback
                            ? (theme === 'dark' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white')
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

      {/* Additional Resources */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recommended Reading
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Aronson, H. I. (1990). <em>Georgian: A Reading Grammar</em></li>
                <li>Hewitt, B. G. (1995). <em>Georgian: A Structural Reference Grammar</em></li>
                <li>Kurtsikidze, S. (2006). <em>Essentials of Georgian Grammar</em></li>
                <li>Tschenkéli, K. (1958). <em>Einführung in die georgische Sprache</em></li>
                <li>Harris, A. C. (1981). <em>Georgian Syntax: A Study in Relational Grammar</em></li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Strategies
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Create a verb conjugation journal to track different patterns</li>
                <li>Practice transforming sentences between tenses daily</li>
                <li>Read Georgian literature and analyze complex sentences</li>
                <li>Record yourself explaining grammatical concepts in Georgian</li>
                <li>Join language exchange groups to practice with native speakers</li>
                <li>Translate complex texts between English and Georgian</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiteratureAndPoetryPage;