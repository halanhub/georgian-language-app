import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAuth } from '../../contexts/AuthContext';

interface LiteraryWork {
  title: string;
  author: string;
  period: string;
  excerpt: string;
  translation: string;
  analysis: string;
}

interface Poet {
  name: string;
  years: string;
  bio: string;
  works: string[];
  significance: string;
}

interface LiteraryPeriod {
  id: string;
  title: string;
  years: string;
  description: string;
  keyFigures: string[];
  keyWorks: string[];
  characteristics: string[];
}

const LiteraturePoetryPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null);
  const [expandedPoet, setExpandedPoet] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'analysis' | 'comprehension' | 'comparison' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const periodRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const poetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      updateProgress('literature-poetry', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('literature-poetry', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, updateProgress]);

  const literaryPeriods: LiteraryPeriod[] = [
    {
      id: 'medieval',
      title: 'Medieval Georgian Literature',
      years: '5th - 12th centuries',
      description: 'The earliest period of Georgian literature, characterized by religious texts, hagiographies, and epic poetry. This era saw the development of the Georgian literary language and the establishment of cultural and literary traditions.',
      keyFigures: [
        'Iakob Tsurtaveli',
        'Giorgi Merchule',
        'Shota Rustaveli'
      ],
      keyWorks: [
        'Martyrdom of Saint Shushanik (5th century)',
        'Life of Grigol Khandzteli (10th century)',
        'The Knight in the Panther\'s Skin (12th century)'
      ],
      characteristics: [
        'Strong religious themes',
        'Development of hagiographic literature',
        'Epic poetry with chivalric ideals',
        'Influences from Persian and Byzantine traditions'
      ]
    },
    {
      id: 'golden-age',
      title: 'The Golden Age',
      years: '11th - 13th centuries',
      description: 'The pinnacle of medieval Georgian literature, coinciding with the political and cultural zenith of the Georgian kingdom. This period produced sophisticated secular literature alongside religious works.',
      keyFigures: [
        'Shota Rustaveli',
        'Chakhrukhadze',
        'Ioane Shavteli'
      ],
      keyWorks: [
        'The Knight in the Panther\'s Skin',
        'Tamariani',
        'Abdulmesiani'
      ],
      characteristics: [
        'Secular themes alongside religious content',
        'Complex poetic forms and wordplay',
        'Humanistic values and chivalric ideals',
        'Strong female characters and romantic themes'
      ]
    },
    {
      id: 'renaissance',
      title: 'Georgian Renaissance',
      years: '18th - 19th centuries',
      description: 'After centuries of political fragmentation and cultural decline, Georgian literature experienced a revival in the 18th century. Writers reclaimed and modernized classical traditions while introducing new European influences.',
      keyFigures: [
        'David Guramishvili',
        'Sulkhan-Saba Orbeliani',
        'Alexander Chavchavadze',
        'Nikoloz Baratashvili'
      ],
      keyWorks: [
        'Davitiani',
        'The Wisdom of Lies',
        'Merani',
        'The Hermit'
      ],
      characteristics: [
        'Blending of Georgian traditions with European influences',
        'Romantic and patriotic themes',
        'Reflection on Georgia\'s political challenges',
        'Development of modern literary forms'
      ]
    },
    {
      id: 'realism',
      title: 'Georgian Realism',
      years: 'Late 19th - Early 20th centuries',
      description: 'The development of realist literature focused on social issues, national identity, and the lives of ordinary Georgians. This period laid the foundations for modern Georgian literature.',
      keyFigures: [
        'Ilia Chavchavadze',
        'Akaki Tsereteli',
        'Vazha-Pshavela',
        'Alexander Kazbegi'
      ],
      keyWorks: [
        'Letters of a Traveler',
        'Gamzrdeli (The Raiser)',
        'Host and Guest',
        'The Patricide'
      ],
      characteristics: [
        'Focus on social and political issues',
        'Portrayal of rural life and traditional values',
        'Exploration of Georgian national identity',
        'Critique of societal problems'
      ]
    },
    {
      id: 'modern',
      title: 'Modern Georgian Literature',
      years: '20th - 21st centuries',
      description: 'Modern Georgian literature encompasses Soviet-era writings, dissident literature, and post-Soviet expressions. It reflects Georgia\'s complex journey through totalitarianism, independence, and globalization.',
      keyFigures: [
        'Konstantine Gamsakhurdia',
        'Galaktion Tabidze',
        'Otar Chiladze',
        'Aka Morchiladze'
      ],
      keyWorks: [
        'The Hand of a Great Master',
        'The Moon of Mtabori',
        'A Man Was Going Down the Road',
        'Journey to Karabakh'
      ],
      characteristics: [
        'Experimental forms and modernist techniques',
        'Political allegory and coded meanings during Soviet era',
        'Post-Soviet themes of identity and cultural reorientation',
        'Engagement with global literary movements'
      ]
    }
  ];

  const famousPoets: Poet[] = [
    {
      name: 'Shota Rustaveli',
      years: '12th century',
      bio: 'Shota Rustaveli is Georgia\'s national poet and the greatest literary figure of the Georgian Golden Age. Little is known about his life, but he likely served at the court of Queen Tamar and may have spent time at the Georgian monastery in Jerusalem.',
      works: [
        'The Knight in the Panther\'s Skin (ვეფხისტყაოსანი / Vepkhistkaosani)'
      ],
      significance: 'Rustaveli\'s epic poem established fundamental Georgian literary and cultural values, emphasizing chivalry, friendship, courage, and equality between men and women. His sophisticated philosophical views and humanistic ideals were centuries ahead of their time in European thought.'
    },
    {
      name: 'Nikoloz Baratashvili',
      years: '1817-1845',
      bio: 'Often called the "Georgian Byron," Baratashvili lived a short but influential life. Despite producing a relatively small body of work, his romantic poetry revolutionized Georgian literature with its depth of feeling and philosophical complexity.',
      works: [
        'Merani (The Steed)',
        'Bedi Kartlisa (Fate of Georgia)',
        'Twilight on Mtatsminda'
      ],
      significance: 'Baratashvili's poetry represents the height of Georgian Romanticism. His works tackle themes of destiny, freedom, and national identity, while displaying remarkable technical innovation. His poem "Merani" became a symbol of the Georgian spirit's yearning for freedom.'
    },
    {
      name: 'Vazha-Pshavela',
      years: '1861-1915',
      bio: 'Born Luka Razikashvili in the mountainous region of Pshavi, Vazha-Pshavela ("Son of Pshavi") created works deeply rooted in Georgian folklore and mountain traditions while exploring universal human dilemmas.',
      works: [
        'Host and Guest (სტუმარ-მასპინძელი / Stumar-Maspindzeli)',
        'Snake Eater (გველის მჭამელი / Gvelis Mchameli)',
        'Aluda Ketelauri'
      ],
      significance: 'Vazha-Pshavela's epic poems examine the conflict between individual conscience and community traditions. His works are noted for their psychological depth, moral complexity, and vivid portrayal of mountain culture, while addressing universal questions of humanity.'
    },
    {
      name: 'Galaktion Tabidze',
      years: '1891-1959',
      bio: 'Known as the "King of Poets," Galaktion Tabidze revolutionized Georgian poetry in the 20th century. His life and work were deeply affected by the Soviet regime; after years of depression and alcoholism, he died after falling from a hospital window.',
      works: [
        'The Moon of Mtabori',
        'The Wind Blows',
        'Blue Horses'
      ],
      significance: 'Tabidze brought symbolist and modernist innovations to Georgian poetry while maintaining connections to national traditions. His lyrical genius, musical language, and emotional depth earned him the title of Georgia\'s greatest 20th-century poet. His work continues to influence all subsequent Georgian poetry.'
    },
    {
      name: 'Ana Kalandadze',
      years: '1924-2008',
      bio: 'One of Georgia's most important female poets, Ana Kalandadze crafted linguistically innovative poetry that combined modernist sensibilities with deep roots in Georgian folklore and traditional poetic forms.',
      works: [
        'The Sail',
        'Selected Poems',
        'Unwritten Poems'
      ],
      significance: 'Kalandadze's poetry is known for its unique musicality, linguistic innovation, and spiritual depth. She created a distinctive poetic universe where traditional Georgian elements merge with modernist techniques. Her work significantly expanded the expressive possibilities of Georgian poetry.'
    }
  ];

  const literaryAnalysisExercises = [
    {
      prompt: "In Rustaveli's 'The Knight in the Panther's Skin,' the character Avtandil embodies which of these qualities?",
      options: [
        "Impulsiveness and emotional volatility",
        "Loyalty, rationality, and strategic thinking",
        "Religious fanaticism and conservatism",
        "Cowardice disguised as caution"
      ],
      correct: "Loyalty, rationality, and strategic thinking",
      explanation: "Avtandil is characterized by his unwavering loyalty to both his king and his friend Tariel, as well as his rational approach to solving problems. He uses strategy and intelligence throughout his quest, balancing emotion with reason."
    },
    {
      prompt: "Which theme is central to Vazha-Pshavela's epic poem 'Host and Guest'?",
      options: [
        "The conflict between personal conscience and community traditions",
        "The dangers of mountain travel in winter",
        "The economic benefits of hospitality",
        "The superiority of Christian values over Muslim ones"
      ],
      correct: "The conflict between personal conscience and community traditions",
      explanation: "In 'Host and Guest,' Vazha-Pshavela explores the tragic conflict that arises when Jokyola follows his personal moral code (protecting his guest Zviadauri, who belongs to an enemy tribe) against the demands of his community. This tension between individual ethics and collective norms is the central theme of the work."
    },
    {
      prompt: "Galaktion Tabidze's poetry is best characterized by which of these features?",
      options: [
        "Simple language and straightforward narratives",
        "Political propaganda supporting Soviet ideology",
        "Lyrical musicality and symbolic complexity",
        "Humorous satire of Georgian national character"
      ],
      correct: "Lyrical musicality and symbolic complexity",
      explanation: "Galaktion Tabidze's poetry is renowned for its extraordinary musicality, with rhythm and sound being essential elements of his verse. His work is also characterized by rich symbolism and metaphorical complexity, creating layers of meaning that merge personal emotion with universal themes."
    },
    {
      prompt: "The poem 'Merani' by Nikoloz Baratashvili uses which central symbol?",
      options: [
        "A nightingale representing beauty",
        "A horse representing freedom and the quest to transcend fate",
        "A sword representing Georgian military history",
        "A mountain representing national pride"
      ],
      correct: "A horse representing freedom and the quest to transcend fate",
      explanation: "In 'Merani,' Baratashvili uses the image of a magical horse (Merani) that carries the poet-rider relentlessly forward despite obstacles and darkness. This powerful symbol represents the human desire to overcome limitations, challenge fate, and pursue freedom regardless of consequences."
    },
    {
      prompt: "Which statement best describes the contribution of female writers to Georgian literature?",
      options: [
        "Female writers were entirely absent until the Soviet period",
        "Women wrote exclusively on domestic themes and romance",
        "From Queen Borena and Tamar to modern poets like Ana Kalandadze, women have made significant contributions across centuries",
        "Female authorship was limited to translations of foreign works"
      ],
      correct: "From Queen Borena and Tamar to modern poets like Ana Kalandadze, women have made significant contributions across centuries",
      explanation: "While often overlooked, women have been important contributors to Georgian literature from the medieval period (with royal authors like Queen Borena and possibly Queen Tamar) through the 19th century and particularly in the 20th-21st centuries with major figures like Ana Kalandadze, Lia Sturua, and contemporary writers. Their works address the full range of literary themes, not just domestic or romantic subjects."
    }
  ];

  const literaryComprehensionExercises = [
    {
      prompt: "Read the following excerpt from Shota Rustaveli's 'The Knight in the Panther's Skin':\n\n'A lion and a tiger may be friends, not only those of the same kind.\nA good man should do good to all, and overcome evil with good.'",
      question: "What philosophical principle is Rustaveli expressing in these lines?",
      options: [
        "That friendship is only possible among the powerful",
        "That different types of people can form meaningful bonds despite their differences",
        "That wild animals can be domesticated with proper training",
        "That evil should be punished with greater evil"
      ],
      correct: "That different types of people can form meaningful bonds despite their differences",
      explanation: "These famous lines express Rustaveli's humanistic philosophy that emphasizes the potential for unity and friendship among different kinds of people. The animal metaphor (lion and tiger) suggests that even those with different natures can form bonds. The second line reinforces the ethical principle of responding to evil with good rather than vengeance."
    },
    {
      prompt: "Read this excerpt from Vazha-Pshavela's 'Snake Eater':\n\n'Wisdom is not learning many things,\nBut learning what is essential.'",
      question: "What is the poet's view on knowledge and wisdom?",
      options: [
        "That formal education is the only path to wisdom",
        "That quantity of knowledge is less important than understanding essential truths",
        "That wisdom is impossible for ordinary people to achieve",
        "That learning many facts is the definition of wisdom"
      ],
      correct: "That quantity of knowledge is less important than understanding essential truths",
      explanation: "Vazha-Pshavela distinguishes between mere accumulation of information ('learning many things') and true wisdom, which he defines as understanding what is fundamental or essential. This reflects his philosophy that values depth of insight over breadth of knowledge."
    },
    {
      prompt: "Consider these lines from Galaktion Tabidze:\n\n'Again the familiar blue of the Rioni,\nAgain the roads winding through Racha.\nThose who drink from your waters\nWill forever long for your shores.'",
      question: "What theme is the poet exploring?",
      options: [
        "The economic importance of rivers for transportation",
        "The health benefits of drinking river water",
        "The connection between homeland and identity",
        "The danger of floods in mountainous regions"
      ],
      correct: "The connection between homeland and identity",
      explanation: "In these lines, Tabidze uses the specific Georgian landscape (the Rioni River and Racha region) to explore themes of homeland, belonging, and the lasting emotional attachment to one's native place. The metaphor of drinking the waters suggests that experiencing one's homeland creates a permanent bond that leads to nostalgia when separated from it."
    },
    {
      prompt: "Read this stanza from Ana Kalandadze:\n\n'The sail has stiffened,\nThe sail has turned to stone.\nIt does not remember\nThe whisper of waves.'",
      question: "What is the most likely metaphorical meaning of the 'sail' in this poem?",
      options: [
        "A literal boat sail that has been damaged",
        "The human spirit that has become hardened or unresponsive",
        "Georgia's economy during the Soviet period",
        "The political leadership of the country"
      ],
      correct: "The human spirit that has become hardened or unresponsive",
      explanation: "Kalandadze's poem uses the image of a sail that has stiffened and 'turned to stone' as a metaphor for the human spirit or soul that has become hardened and lost its connection to life's experiences (symbolized by 'the whisper of waves'). This reflects themes of emotional deadening and loss of sensitivity that appear in much of her work."
    },
    {
      prompt: "Consider this quote from Ilia Chavchavadze:\n\n'O, my native land! When will you rise again?\nWhen will we unite and turn our pains to joy?'",
      question: "What historical context is reflected in these lines?",
      options: [
        "Georgia's prosperity under Russian imperial rule",
        "Georgia's struggle for national identity and independence",
        "The Golden Age under Queen Tamar",
        "The agricultural harvest season"
      ],
      correct: "Georgia's struggle for national identity and independence",
      explanation: "Ilia Chavchavadze, writing in the 19th century when Georgia was under Russian imperial rule, often expressed patriotic sentiments longing for national revival and unity. These lines reflect the historical context of Georgia's struggle to maintain its cultural identity and aspirations for independence during a period of foreign domination."
    }
  ];

  const literaryComparisonExercises = [
    {
      prompt: "Compare the approaches to national identity in the works of Ilia Chavchavadze and Galaktion Tabidze.",
      options: [
        "Both rejected Georgian identity in favor of cosmopolitanism",
        "Chavchavadze focused on direct political messages while Tabidze explored nationalism through symbolism and metaphor",
        "Both were nationalist propagandists with identical viewpoints",
        "Chavchavadze ignored the topic while Tabidze made it his only subject"
      ],
      correct: "Chavchavadze focused on direct political messages while Tabidze explored nationalism through symbolism and metaphor",
      explanation: "Ilia Chavchavadze, as a leader of the national awakening movement, often addressed Georgian identity and political concerns directly in his writings. Galaktion Tabidze, while also deeply concerned with Georgian identity, typically approached the subject through complex symbolism, metaphor, and more subtle allusions, particularly during the Soviet period when direct expressions of nationalism could be dangerous."
    },
    {
      prompt: "How do Rustaveli's and Vazha-Pshavela's portrayals of heroism differ?",
      options: [
        "Rustaveli focused on courtly, chivalric heroism while Vazha-Pshavela explored moral heroism among common people",
        "Rustaveli portrayed only female heroes while Vazha-Pshavela wrote exclusively about male heroes",
        "Both portrayed heroism identically with no significant differences",
        "Rustaveli celebrated heroism while Vazha-Pshavela rejected the concept entirely"
      ],
      correct: "Rustaveli focused on courtly, chivalric heroism while Vazha-Pshavela explored moral heroism among common people",
      explanation: "Rustaveli's heroic ideals, as expressed in 'The Knight in the Panther's Skin,' are grounded in medieval chivalric culture and courtly settings, with heroes who are kings, knights, and royal figures. Vazha-Pshavela, writing centuries later, explored heroism among mountain dwellers and ordinary people, emphasizing moral courage and internal ethical struggles rather than traditional martial prowess or aristocratic values."
    },
    {
      prompt: "Compare the treatment of love in Baratashvili's poetry and Rustaveli's epic.",
      options: [
        "Baratashvili rejected love as a literary theme while Rustaveli celebrated it",
        "Rustaveli portrayed love as a divine force connected to chivalric values, while Baratashvili explored romantic love through a more personal, melancholic lens",
        "Both treated love as purely physical attraction",
        "Rustaveli viewed love as sinful while Baratashvili saw it as mankind's highest virtue"
      ],
      correct: "Rustaveli portrayed love as a divine force connected to chivalric values, while Baratashvili explored romantic love through a more personal, melancholic lens",
      explanation: "In 'The Knight in the Panther's Skin,' Rustaveli presents love as a sublime, even divine force that inspires noble deeds and is connected to broader chivalric values. Baratashvili, writing in the Romantic period, explores love more as an intense personal emotion often tinged with melancholy, unfulfillment, and individual psychological experience, reflecting the Romantic movement's emphasis on subjective feeling."
    },
    {
      prompt: "How do traditional Georgian folk elements appear differently in the works of Vazha-Pshavela and Ana Kalandadze?",
      options: [
        "Vazha-Pshavela incorporated folk narratives and characters while Kalandadze utilized folk rhythms and symbolic patterns",
        "Neither writer used any folk elements in their work",
        "Vazha-Pshavela rejected folk influences while Kalandadze relied on them exclusively",
        "Both used identical folk elements in exactly the same way"
      ],
      correct: "Vazha-Pshavela incorporated folk narratives and characters while Kalandadze utilized folk rhythms and symbolic patterns",
      explanation: "Vazha-Pshavela often directly incorporated mountain folklore, tales, characters, and beliefs into his narrative poems, retelling and expanding traditional stories. Ana Kalandadze's relationship with folklore is more abstract—she absorbed the rhythms, symbolic patterns, and linguistic features of folk poetry and transformed them into modernist expressions, creating an innovative synthesis of traditional and avant-garde elements."
    },
    {
      prompt: "Compare how Soviet-era constraints affected the works of Galaktion Tabidze and Konstantine Gamsakhurdia.",
      options: [
        "Both openly opposed the Soviet regime in their writings",
        "Tabidze often used ambiguity and metaphor to express forbidden themes, while Gamsakhurdia turned to historical novels to indirectly address national identity",
        "Neither writer was affected by Soviet censorship",
        "Both fully embraced Soviet ideology in all their works"
      ],
      correct: "Tabidze often used ambiguity and metaphor to express forbidden themes, while Gamsakhurdia turned to historical novels to indirectly address national identity",
      explanation: "During the Soviet period, Galaktion Tabidze developed a poetic style rich in ambiguity, symbolism, and metaphor that allowed him to express forbidden themes (like nationalism or spiritual longing) in ways that could evade censorship. Konstantine Gamsakhurdia adapted differently, turning to historical novels set in Georgia's past that could explore national identity and values while maintaining plausible deniability about contemporary political commentary."
    }
  ];

  const togglePeriod = (periodId: string) => {
    updateActivity();
    if (expandedPeriod === periodId) {
      setExpandedPeriod(null);
    } else {
      setExpandedPeriod(periodId);
      setTimeout(() => {
        if (periodRefs.current[periodId]) {
          periodRefs.current[periodId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const togglePoet = (poetName: string) => {
    updateActivity();
    if (expandedPoet === poetName) {
      setExpandedPoet(null);
    } else {
      setExpandedPoet(poetName);
      setTimeout(() => {
        if (poetRefs.current[poetName]) {
          poetRefs.current[poetName]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      setTimeout(() => setIsPlaying(null), 2000);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    updateActivity();
    setSelectedOption(answer);
    setShowFeedback(true);
  };

  const nextExercise = () => {
    updateActivity();
    if (exerciseMode === 'analysis' && currentExerciseIndex < literaryAnalysisExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'comprehension' && currentExerciseIndex < literaryComprehensionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (exerciseMode === 'comparison' && currentExerciseIndex < literaryComparisonExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const resetExercise = () => {
    updateActivity();
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const isCorrectAnswer = () => {
    if (exerciseMode === 'analysis' && selectedOption) {
      return selectedOption === literaryAnalysisExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'comprehension' && selectedOption) {
      return selectedOption === literaryComprehensionExercises[currentExerciseIndex].correct;
    } else if (exerciseMode === 'comparison' && selectedOption) {
      return selectedOption === literaryComparisonExercises[currentExerciseIndex].correct;
    }
    return false;
  };

  const getExplanation = () => {
    if (exerciseMode === 'analysis') {
      return literaryAnalysisExercises[currentExerciseIndex].explanation;
    } else if (exerciseMode === 'comprehension') {
      return literaryComprehensionExercises[currentExerciseIndex].explanation;
    } else if (exerciseMode === 'comparison') {
      return literaryComparisonExercises[currentExerciseIndex].explanation;
    }
    return '';
  };

  return (
    <div className="pt-16 pb-16" onClick={updateActivity}>
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Literature & Poetry</span> - ლიტერატურა და პოეზია
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore Georgia's rich literary heritage from medieval epics to contemporary works.
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
                  to="/advanced/quiz/literature"
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
                  Literary Journey
                </h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• From medieval epics to modern novels</li>
                  <li>• Explore works that shaped Georgian culture</li>
                  <li>• Discover the unique poetic traditions</li>
                  <li>• Learn about authors who changed literary history</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Literary Periods Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Literary Periods in Georgian History
          </h2>
          
          <div className="space-y-6">
            {literaryPeriods.map((period) => (
              <div
                key={period.id}
                ref={el => periodRefs.current[period.id] = el}
              >
                <button
                  onClick={() => togglePeriod(period.id)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {period.title} <span className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({period.years})</span>
                      </h3>
                      <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {period.description.substring(0, 100)}...
                      </p>
                    </div>
                    {expandedPeriod === period.id ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedPeriod === period.id && (
                  <div className={`mt-4 p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}
                  >
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {period.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Key Figures
                        </h4>
                        <ul className={`list-disc pl-5 space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {period.keyFigures.map((figure, index) => (
                            <li key={index}>{figure}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Key Works
                        </h4>
                        <ul className={`list-disc pl-5 space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {period.keyWorks.map((work, index) => (
                            <li key={index}>{work}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Characteristics
                      </h4>
                      <ul className={`list-disc pl-5 space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {period.characteristics.map((characteristic, index) => (
                          <li key={index}>{characteristic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Poets Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Acclaimed Georgian Poets
          </h2>
          
          <div className="space-y-6">
            {famousPoets.map((poet) => (
              <div
                key={poet.name}
                ref={el => poetRefs.current[poet.name] = el}
              >
                <button
                  onClick={() => togglePoet(poet.name)}
                  className={`w-full p-6 rounded-lg text-left transition-colors ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {poet.name} <span className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({poet.years})</span>
                      </h3>
                      <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {poet.bio.substring(0, 100)}...
                      </p>
                    </div>
                    {expandedPoet === poet.name ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </div>
                </button>

                {expandedPoet === poet.name && (
                  <div className={`mt-4 p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  } shadow-lg`}
                  >
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {poet.bio}
                    </p>
                    
                    <div className="mt-4">
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Notable Works
                      </h4>
                      <ul className={`list-disc pl-5 space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {poet.works.map((work, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{work}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playAudio(work);
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                isPlaying === work
                                  ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                                  : (theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200')
                              }`}
                            >
                              {isPlaying === work ? (
                                <X size={16} className="text-white" />
                              ) : (
                                <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Literary Significance
                      </h4>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {poet.significance}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poetry Excerpt Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Classic Georgian Poetry
          </h2>
          
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ვეფხისტყაოსანი <span className="text-sm font-normal">(The Knight in the Panther's Skin)</span>
              </h3>
              <button
                onClick={() => playAudio("ვეფხისტყაოსანი")}
                className={`p-2 rounded-full transition-colors ${
                  isPlaying === "ვეფხისტყაოსანი"
                    ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                    : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                }`}
              >
                {isPlaying === "ვეფხისტყაოსანი" ? (
                  <X size={18} className="text-white" />
                ) : (
                  <Volume2 size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                )}
              </button>
            </div>
            
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                "ვინცა ეცდების, თავისა საქმესა გამართლებასა,<br />
                იგია ჭკუის სასწავლო, საზომი გონებისაო;<br />
                ვინც არ ეცდების, იგია მართლად უჭკუო, ბრიყვისა,<br />
                უარესია მასზედა, ვინც იცის გზა და არ სვლისაო."
              </p>
              <p className={`mt-4 italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                "Who strives to justify his own deeds,<br />
                He is the teacher of wisdom, a measure of intelligence;<br />
                Who does not strive, he is truly unwise, foolish,<br />
                Worse than him is one who knows the way but does not follow it."
              </p>
              <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                — Shota Rustaveli, 12th century
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Analysis
              </h4>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                This stanza from Rustaveli's masterpiece reflects the poet's humanistic philosophy, emphasizing personal responsibility and the primacy of applied wisdom over mere knowledge. The knight-poet suggests that striving for self-improvement and justifying one's actions through deeds is the true measure of intelligence. Particularly striking is the final line, which introduces a hierarchy of folly: worst of all is not ignorance but failing to act on what one knows to be right—a remarkably modern ethical stance for a medieval work.
              </p>
            </div>
          </div>
          
          <div className={`mt-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                მერანი <span className="text-sm font-normal">(Merani - The Steed)</span>
              </h3>
              <button
                onClick={() => playAudio("მერანი")}
                className={`p-2 rounded-full transition-colors ${
                  isPlaying === "მერანი"
                    ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                    : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                }`}
              >
                {isPlaying === "მერანი" ? (
                  <X size={18} className="text-white" />
                ) : (
                  <Volume2 size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                )}
              </button>
            </div>
            
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                "მიჰქრის, მიმაფრენს, გარდამატარებს<br />
                შავი ბედის წინ მიმავალს შავად,<br />
                ვერ შემაშინებს, ვეღარ დამაბრკოლებს<br />
                ვერც ვაებათა ამაოება..."
              </p>
              <p className={`mt-4 italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                "It gallops, it flies me, it carries me away<br />
                Moving darkly before my dark fate,<br />
                It cannot frighten me, it cannot hinder me<br />
                Nor the futility of sorrows..."
              </p>
              <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                — Nikoloz Baratashvili, 1842
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Analysis
              </h4>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                "Merani" is Baratashvili's most famous poem and an iconic work of Georgian Romanticism. The titular steed symbolizes the indomitable human spirit that refuses to surrender to fate. The poet-rider acknowledges the darkness of his destiny but remains defiant, charging forward despite knowing that no grave may await him in his homeland. Written during a period when Georgia had lost its independence to Russia, the poem can be read both as a deeply personal statement of existential courage and as a national allegory of resistance and the quest for freedom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercises Section */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Literary Analysis Exercises
          </h2>
          
          {!exerciseMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setExerciseMode('analysis')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Character & Theme Analysis
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Analyze characters, symbols, and themes in major Georgian literary works
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('comprehension')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Reading Comprehension
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice understanding and interpreting excerpts from Georgian literature
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('comparison')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Comparative Analysis
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Compare approaches and styles of different Georgian authors and periods
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'analysis' ? 'Character & Theme Analysis' : 
                   exerciseMode === 'comprehension' ? 'Reading Comprehension' : 'Comparative Analysis'}
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
              
              {exerciseMode === 'analysis' && (
                <div>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {literaryAnalysisExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {literaryAnalysisExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === literaryAnalysisExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${literaryAnalysisExercises[currentExerciseIndex].correct}". `}
                          {getExplanation()}
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
                    
                    {currentExerciseIndex < literaryAnalysisExercises.length - 1 && (
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
              
              {exerciseMode === 'comprehension' && (
                <div>
                  <div className={`p-4 mb-4 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}>
                    <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      {literaryComprehensionExercises[currentExerciseIndex].prompt}
                    </p>
                  </div>
                  
                  <p className={`mb-4 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {literaryComprehensionExercises[currentExerciseIndex].question}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {literaryComprehensionExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === literaryComprehensionExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${literaryComprehensionExercises[currentExerciseIndex].correct}". `}
                          {getExplanation()}
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
                    
                    {currentExerciseIndex < literaryComprehensionExercises.length - 1 && (
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
              
              {exerciseMode === 'comparison' && (
                <div>
                  <p className={`mb-4 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {literaryComparisonExercises[currentExerciseIndex].prompt}
                  </p>
                  
                  <div className="mb-6">
                    <div className="space-y-3">
                      {literaryComparisonExercises[currentExerciseIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleExerciseAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedOption === option
                              ? option === literaryComparisonExercises[currentExerciseIndex].correct
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
                            : `Incorrect. The correct answer is "${literaryComparisonExercises[currentExerciseIndex].correct}". `}
                          {getExplanation()}
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
                    
                    {currentExerciseIndex < literaryComparisonExercises.length - 1 && (
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
                <li>Rayfield, D. (2000). <em>The Literature of Georgia: A History</em></li>
                <li>Shota Rustaveli. <em>The Knight in the Panther's Skin</em> (trans. Marjory Wardrop)</li>
                <li>Kveselava, M. (2002). <em>Anthology of Georgian Poetry</em></li>
                <li>Baudelaire, Ch. et al. (2016). <em>Contemporary Georgian Fiction</em></li>
                <li>Pataridze, L. (2018). <em>Georgian Literature in European Scholarship</em></li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Online Resources
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Georgian National Book Center (www.book.gov.ge)</li>
                <li>Digital Library of Georgian Literature</li>
                <li>Poetry Translation Centre - Georgian Poets</li>
                <li>Georgian Writers' House virtual tours and readings</li>
                <li>Contemporary Georgian Writers Database</li>
                <li>Rustaveli Online - Digital archive of scholarship</li>
              </ul>
            </div>
          </div>
          
          <div className={`mt-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Literary Events and Places to Visit
            </h3>
            <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Tbilisi International Literature Festival (annual, September)</li>
              <li>Writers' House of Georgia (Tbilisi) - historic meeting place of Georgian writers</li>
              <li>Rustaveli Museum in Akhaltsikhe</li>
              <li>Museum of Georgian Literature (Tbilisi)</li>
              <li>National Parliamentary Library of Georgia - rare manuscripts collection</li>
              <li>Annual Poetry Days in Sighnaghi (celebrating Vazha-Pshavela)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiteraturePoetryPage;