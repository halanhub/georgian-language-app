import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, Play, Volume2, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../hooks/useUserProgress';
import { useAuth } from '../contexts/AuthContext';

interface Idiom {
  georgian: string;
  latin: string;
  literalTranslation: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
}

interface IdiomCategory {
  id: string;
  title: string;
  description: string;
  idioms: Idiom[];
}

const IdiomsPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { updateProgress } = useUserProgress();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [exerciseMode, setExerciseMode] = useState<'matching' | 'interpretation' | 'usage' | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      updateProgress('idioms', { timeSpent: 1 });
    }
    
    // Save progress when component unmounts
    return () => {
      if (user && timeSpent > 0) {
        // Calculate progress based on time spent and exercise completion
        const exerciseCompletion = (showFeedback ? 1 : 0) + 
                                  (feedback === 'correct' ? 1 : 0);
        
        // Mark as completed if user has spent significant time or completed exercises
        const completed = timeSpent > 15 || exerciseCompletion >= 3;
        
        updateProgress('idioms', { 
          timeSpent, 
          completed: completed
        });
      }
    };
  }, [user, timeSpent, showFeedback, feedback, updateProgress]);

  const idiomCategories: IdiomCategory[] = [
    {
      id: 'everyday',
      title: 'Everyday Expressions',
      description: 'Common idioms used in daily conversations and casual settings.',
      idioms: [
        {
          georgian: 'ენას კბილი დააჭირე',
          latin: 'enas kbili daachire',
          literalTranslation: 'Put your tooth on your tongue',
          meaning: 'Hold your tongue / Keep quiet',
          example: 'ენას კბილი დააჭირე, არავინ გეკითხება!',
          exampleTranslation: 'Hold your tongue, nobody is asking you!'
        },
        {
          georgian: 'თვალი დაადგა',
          latin: 'tvali daadga',
          literalTranslation: 'To put an eye on',
          meaning: 'To keep an eye on / To watch closely',
          example: 'დედამ თვალი დაადგა ბავშვებს.',
          exampleTranslation: 'Mother kept an eye on the children.'
        },
        {
          georgian: 'გულზე მოხვდა',
          latin: 'gulze mokhvda',
          literalTranslation: 'It hit on the heart',
          meaning: 'To be touched/affected by something emotionally',
          example: 'მისი სიტყვები გულზე მომხვდა.',
          exampleTranslation: 'His/her words touched my heart.'
        },
        {
          georgian: 'ხელი ჩაიქნია',
          latin: 'kheli chaiqnia',
          literalTranslation: 'To wave a hand (dismissively)',
          meaning: 'To give up on something/someone',
          example: 'ბოლოს ხელი ჩაიქნია და წავიდა.',
          exampleTranslation: 'Finally, he gave up and left.'
        },
        {
          georgian: 'თავი გამოიდო',
          latin: 'tavi gamoido',
          literalTranslation: 'To put out one's head',
          meaning: 'To go out of one's way to help / To take a risk for someone',
          example: 'ჩემთვის თავი გამოიდო, რისთვისაც მადლობელი ვარ.',
          exampleTranslation: 'He went out of his way to help me, for which I am grateful.'
        }
      ]
    },
    {
      id: 'emotions',
      title: 'Emotions and Feelings',
      description: 'Expressions that describe various emotional states and reactions.',
      idioms: [
        {
          georgian: 'გული გაუსკდა',
          latin: 'guli gauskda',
          literalTranslation: 'His/her heart burst',
          meaning: 'To be extremely afraid or startled',
          example: 'ხმაურზე გული გამისკდა.',
          exampleTranslation: 'I was terrified by the noise.'
        },
        {
          georgian: 'გულზე ბოღმა აწვება',
          latin: 'gulze boghma atsveba',
          literalTranslation: 'Resentment is pressing on his/her heart',
          meaning: 'To feel bitter or resentful',
          example: 'ამდენი წლის მერე ისევ გულზე ბოღმა აწვება.',
          exampleTranslation: 'After so many years, he still feels bitter about it.'
        },
        {
          georgian: 'გული მოუვიდა',
          latin: 'guli mouvida',
          literalTranslation: 'His/her heart came',
          meaning: 'To get angry/upset',
          example: 'ჩემი სიტყვებზე გული მოუვიდა.',
          exampleTranslation: 'He got upset because of my words.'
        },
        {
          georgian: 'გული აუჩუყდა',
          latin: 'guli auchuyda',
          literalTranslation: 'His/her heart softened',
          meaning: 'To be moved emotionally, to feel touched',
          example: 'ბავშვის ღიმილზე გული ამიჩუყდა.',
          exampleTranslation: 'I was moved by the child's smile.'
        },
        {
          georgian: 'გზა დაებნა',
          latin: 'gza daebna',
          literalTranslation: 'He/she lost the way',
          meaning: 'To be confused or lost (mentally)',
          example: 'იმდენი საქმე მაქვს, გზა დამებნა.',
          exampleTranslation: 'I have so many things to do, I'm completely confused.'
        }
      ]
    },
    {
      id: 'character',
      title: 'Character and Personality',
      description: 'Idioms that describe personal qualities and traits.',
      idioms: [
        {
          georgian: 'ბუზს არ აწყენს',
          latin: 'buzs ar atsqens',
          literalTranslation: 'Wouldn't hurt a fly',
          meaning: 'Very gentle/kind person',
          example: 'ის ბუზს არ აწყენს, ძალიან კეთილი ადამიანია.',
          exampleTranslation: 'He wouldn't hurt a fly, he's a very kind person.'
        },
        {
          georgian: 'წყალში ქვას გაცურავს',
          latin: 'tsqalshi kvas gatsuravs',
          literalTranslation: 'Can make a stone swim in water',
          meaning: 'Very clever or cunning person',
          example: 'ფრთხილად იყავი, ის წყალში ქვას გაცურავს.',
          exampleTranslation: 'Be careful, he's so cunning he can make a stone swim.'
        },
        {
          georgian: 'ქათამი ბრინჯს ვერ შეჭამს',
          latin: 'katami brinjs ver shechams',
          literalTranslation: 'A chicken can't eat the rice',
          meaning: 'Very stingy/miserly person',
          example: 'ისე ძუნწია, ქათამი ბრინჯს ვერ შეჭამს.',
          exampleTranslation: 'He's so stingy, a chicken couldn't eat a grain of rice at his place.'
        },
        {
          georgian: 'ფეხს ითრევს',
          latin: 'pekhs itrevs',
          literalTranslation: 'Drags his/her feet',
          meaning: 'To be lazy or reluctant',
          example: 'სამსახურში ფეხს ითრევს, არაფერი აინტერესებს.',
          exampleTranslation: 'He drags his feet at work, not interested in anything.'
        },
        {
          georgian: 'ჭკუაში დაუჯდა',
          latin: 'chkuashi daujda',
          literalTranslation: 'It sat in his/her mind',
          meaning: 'To make sense to someone, to be convincing',
          example: 'შენი რჩევა ჭკუაში დამიჯდა.',
          exampleTranslation: 'Your advice made sense to me.'
        }
      ]
    },
    {
      id: 'advice',
      title: 'Wisdom and Advice',
      description: 'Traditional sayings and proverbs that offer guidance or advice.',
      idioms: [
        {
          georgian: 'რაც მოგივა დავითაო, ყველა შენი თავითაო',
          latin: 'rats mogiva davitao, qvela sheni tavitao',
          literalTranslation: 'Whatever happens to you, Davit, it's all by your own doing',
          meaning: 'You are responsible for your own actions and their consequences',
          example: 'გაგაფრთხილე, მაგრამ არ მომისმინე. რაც მოგივა დავითაო, ყველა შენი თავითაო.',
          exampleTranslation: 'I warned you, but you didn't listen. You're responsible for what happens to you.'
        },
        {
          georgian: 'ცოდნა ნათელია, უცოდინრობა ბნელი',
          latin: 'tsodna natelia, utsodinroba bneli',
          literalTranslation: 'Knowledge is light, ignorance is darkness',
          meaning: 'Education illuminates, ignorance obscures',
          example: 'სწავლას ნუ გაანებებ თავს, ცოდნა ნათელია, უცოდინრობა ბნელი.',
          exampleTranslation: 'Don't give up on education, knowledge is light, ignorance is darkness.'
        },
        {
          georgian: 'ნაჩქარევი საქმე ჯოხით დასაწუნია',
          latin: 'nachkarevi sakme jokhit dasatsunia',
          literalTranslation: 'Rushed work deserves to be beaten with a stick',
          meaning: 'Work done in haste will turn out poorly',
          example: 'ნუ აჩქარდები, ნაჩქარევი საქმე ჯოხით დასაწუნია.',
          exampleTranslation: 'Don't rush, hastily done work turns out poorly.'
        },
        {
          georgian: 'შვიდჯერ გაზომე, ერთხელ გაჭერი',
          latin: 'shvidjer gazome, ertkhel gacheri',
          literalTranslation: 'Measure seven times, cut once',
          meaning: 'Think carefully before acting',
          example: 'გადაწყვეტილების მიღებამდე კარგად დაფიქრდი, შვიდჯერ გაზომე, ერთხელ გაჭერი.',
          exampleTranslation: 'Think well before making a decision, measure seven times, cut once.'
        },
        {
          georgian: 'ენა ტკბილი, მოგცემს ძვირფას თვალსა',
          latin: 'ena tkbili, mogtems dzvirpas tvalsa',
          literalTranslation: 'A sweet tongue will give you precious jewels',
          meaning: 'Kind words will get you far',
          example: 'უხეშობით ვერაფერს მიაღწევ, ენა ტკბილი, მოგცემს ძვირფას თვალსა.',
          exampleTranslation: 'You won't achieve anything through rudeness, kind words will get you far.'
        }
      ]
    },
    {
      id: 'culture',
      title: 'Cultural and Historical',
      description: 'Expressions rooted in Georgian history, traditions, and cultural references.',
      idioms: [
        {
          georgian: 'ვაი-ვუის ძახილში',
          latin: 'vai-vuis dzakhilshi',
          literalTranslation: 'In the shouting of "vai-vui" (sounds of distress)',
          meaning: 'In trouble or turmoil',
          example: 'ქვეყანა ვაი-ვუის ძახილშია.',
          exampleTranslation: 'The country is in turmoil.'
        },
        {
          georgian: 'სუფრის თამადა',
          latin: 'supris tamada',
          literalTranslation: 'Toastmaster of the table',
          meaning: 'The leader who guides the Georgian feast with toasts',
          example: 'ბიძაჩემი ყოველთვის კარგი სუფრის თამადაა.',
          exampleTranslation: 'My uncle is always a good toastmaster at feasts.'
        },
        {
          georgian: 'ვაჟკაცის სიტყვა',
          latin: 'vazhkacis sitqva',
          literalTranslation: 'A brave man's word',
          meaning: 'A promise that must be kept at all costs',
          example: 'ვაჟკაცის სიტყვა მისცა, ახლა უნდა შეასრულოს.',
          exampleTranslation: 'He gave his word as a man of honor, now he must fulfill it.'
        },
        {
          georgian: 'ქართული სტუმარ-მასპინძლობა',
          latin: 'kartuli stumar-maspindzloba',
          literalTranslation: 'Georgian guest-hosting',
          meaning: 'The traditional Georgian hospitality',
          example: 'ქართული სტუმარ-მასპინძლობა მთელ მსოფლიოშია ცნობილი.',
          exampleTranslation: 'Georgian hospitality is known throughout the world.'
        },
        {
          georgian: 'ამირანივით მიჯაჭვული',
          latin: 'amiranivit mijachwuli',
          literalTranslation: 'Chained like Amiran',
          meaning: 'Bound or restricted (refers to Georgian mythological hero)',
          example: 'ამ სამსახურში ამირანივით მიჯაჭვული ვარ.',
          exampleTranslation: 'I'm chained to this job like Amiran (to the mountain).'
        }
      ]
    }
  ];

  // Exercise data
  const matchingExercises = [
    {
      prompt: "Match the idiom 'ენას კბილი დააჭირე' with its correct meaning",
      options: [
        "Hold your tongue / Keep quiet",
        "To keep an eye on someone",
        "To be touched emotionally",
        "To give up on something"
      ],
      correct: "Hold your tongue / Keep quiet",
      explanation: "'ენას კბილი დააჭირე' literally means 'put your tooth on your tongue' and is used when telling someone to be quiet or not speak."
    },
    {
      prompt: "Match the idiom 'გული გაუსკდა' with its correct meaning",
      options: [
        "To feel bitter",
        "To be extremely afraid or startled",
        "To get angry",
        "To be moved emotionally"
      ],
      correct: "To be extremely afraid or startled",
      explanation: "'გული გაუსკდა' literally means 'his/her heart burst' and is used to describe being extremely frightened or startled."
    },
    {
      prompt: "Match the idiom 'წყალში ქვას გაცურავს' with its correct meaning",
      options: [
        "Very gentle person",
        "Very stingy person",
        "Very clever or cunning person",
        "Very lazy person"
      ],
      correct: "Very clever or cunning person",
      explanation: "'წყალში ქვას გაცურავს' literally means 'can make a stone swim in water' and describes someone who is extremely cunning or resourceful."
    },
    {
      prompt: "Match the idiom 'შვიდჯერ გაზომე, ერთხელ გაჭერი' with its correct meaning",
      options: [
        "Work done in haste will turn out poorly",
        "Think carefully before acting",
        "You are responsible for your actions",
        "Kind words will get you far"
      ],
      correct: "Think carefully before acting",
      explanation: "'შვიდჯერ გაზომე, ერთხელ გაჭერი' means 'measure seven times, cut once' and advises careful consideration before taking action."
    },
    {
      prompt: "Match the idiom 'ვაჟკაცის სიტყვა' with its correct meaning",
      options: [
        "Traditional Georgian hospitality",
        "A promise that must be kept at all costs",
        "Being in trouble or turmoil",
        "Being bound or restricted"
      ],
      correct: "A promise that must be kept at all costs",
      explanation: "'ვაჟკაცის სიტყვა' means 'a brave man's word' and refers to a solemn promise that must be honored no matter what, reflecting the importance of honor in Georgian culture."
    }
  ];

  const interpretationExercises = [
    {
      prompt: "In the sentence 'ჩემთვის თავი გამოიდო', what does the idiom mean in this context?",
      options: [
        "He physically put his head out for me",
        "He took a risk to help me",
        "He introduced himself to me",
        "He nodded his head to me"
      ],
      correct: "He took a risk to help me",
      explanation: "The idiom 'თავი გამოიდო' literally means 'to put out one's head' but idiomatically means to take a risk or go out of one's way to help someone."
    },
    {
      prompt: "What does 'ბავშვის ღიმილზე გული ამიჩუყდა' express?",
      options: [
        "The person became angry",
        "The person became frightened",
        "The person was emotionally touched",
        "The person became confused"
      ],
      correct: "The person was emotionally touched",
      explanation: "'გული აუჩუყდა' means 'his/her heart softened' and expresses being emotionally moved or touched by something."
    },
    {
      prompt: "In the saying 'რაც მოგივა დავითაო, ყველა შენი თავითაო', what principle is being expressed?",
      options: [
        "Blame others for your problems",
        "Personal responsibility for one's actions",
        "Always help someone named David",
        "Life is unpredictable"
      ],
      correct: "Personal responsibility for one's actions",
      explanation: "This proverb means 'whatever happens to you, David, it's all by your own doing', emphasizing that people are responsible for the consequences of their own actions."
    },
    {
      prompt: "What cultural value is reflected in 'ქართული სტუმარ-მასპინძლობა'?",
      options: [
        "Georgian cuisine",
        "Georgian dance",
        "Georgian hospitality",
        "Georgian winemaking"
      ],
      correct: "Georgian hospitality",
      explanation: "'ქართული სტუმარ-მასპინძლობა' refers to the traditionally generous and warm Georgian hospitality, a cornerstone of Georgian cultural identity."
    },
    {
      prompt: "In the sentence 'ისე ძუნწია, ქათამი ბრინჯს ვერ შეჭამს', what personality trait is being described?",
      options: [
        "Generosity",
        "Stinginess",
        "Laziness",
        "Cleverness"
      ],
      correct: "Stinginess",
      explanation: "The idiom 'ქათამი ბრინჯს ვერ შეჭამს' (a chicken can't eat the rice) is used to describe someone who is extremely stingy or miserly."
    }
  ];

  const usageExercises = [
    {
      prompt: "Which idiom would you use to tell someone to keep a secret?",
      options: [
        "თვალი დაადგა (tvali daadga)",
        "ენას კბილი დააჭირე (enas kbili daachire)",
        "ხელი ჩაიქნია (kheli chaiqnia)",
        "გული მოუვიდა (guli mouvida)"
      ],
      correct: "ენას კბილი დააჭირე (enas kbili daachire)",
      explanation: "'ენას კბილი დააჭირე' (put your tooth on your tongue) is used to tell someone to keep quiet or hold their tongue, appropriate for asking someone to keep a secret."
    },
    {
      prompt: "Which idiom would you use to describe someone who is extremely resourceful?",
      options: [
        "ბუზს არ აწყენს (buzs ar atsqens)",
        "ფეხს ითრევს (pekhs itrevs)",
        "წყალში ქვას გაცურავს (tsqalshi kvas gatsuravs)",
        "გზა დაებნა (gza daebna)"
      ],
      correct: "წყალში ქვას გაცურავს (tsqalshi kvas gatsuravs)",
      explanation: "'წყალში ქვას გაცურავს' (can make a stone swim in water) is used to describe someone who is extremely clever, cunning, or resourceful."
    },
    {
      prompt: "Which idiom would you use when advising someone not to rush their work?",
      options: [
        "ნაჩქარევი საქმე ჯოხით დასაწუნია (nachkarevi sakme jokhit dasatsunia)",
        "ენა ტკბილი, მოგცემს ძვირფას თვალსა (ena tkbili, mogtems dzvirpas tvalsa)",
        "ცოდნა ნათელია, უცოდინრობა ბნელი (tsodna natelia, utsodinroba bneli)",
        "ვაჟკაცის სიტყვა (vazhkacis sitqva)"
      ],
      correct: "ნაჩქარევი საქმე ჯოხით დასაწუნია (nachkarevi sakme jokhit dasatsunia)",
      explanation: "'ნაჩქარევი საქმე ჯოხით დასაწუნია' (rushed work deserves to be beaten with a stick) is used to advise against rushing, suggesting that hasty work will turn out poorly."
    },
    {
      prompt: "Which idiom would you use to describe feeling very scared by a sudden noise?",
      options: [
        "გული გაუსკდა (guli gauskda)",
        "გული აუჩუყდა (guli auchuyda)",
        "გულზე ბოღმა აწვება (gulze boghma atsveba)",
        "გული მოუვიდა (guli mouvida)"
      ],
      correct: "გული გაუსკდა (guli gauskda)",
      explanation: "'გული გაუსკდა' (his/her heart burst) is used to describe being extremely frightened or startled, as would happen with a sudden noise."
    },
    {
      prompt: "Which idiom would you use to describe someone who is very gentle and kind?",
      options: [
        "ამირანივით მიჯაჭვული (amiranivit mijachwuli)",
        "ბუზს არ აწყენს (buzs ar atsqens)",
        "ქათამი ბრინჯს ვერ შეჭამს (katami brinjs ver shechams)",
        "ფეხს ითრევს (pekhs itrevs)"
      ],
      correct: "ბუზს არ აწყენს (buzs ar atsqens)",
      explanation: "'ბუზს არ აწყენს' (wouldn't hurt a fly) is used to describe someone who is extremely gentle and kind-hearted."
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
    setFeedback(answer === getCurrentExercise()?.correct ? 'correct' : 'incorrect');
  };

  const getCurrentExercise = () => {
    if (exerciseMode === 'matching') {
      return matchingExercises[currentExerciseIndex];
    } else if (exerciseMode === 'interpretation') {
      return interpretationExercises[currentExerciseIndex];
    } else if (exerciseMode === 'usage') {
      return usageExercises[currentExerciseIndex];
    }
    return null;
  };

  const nextExercise = () => {
    updateActivity();
    const maxIndex = exerciseMode === 'matching' 
      ? matchingExercises.length - 1 
      : exerciseMode === 'interpretation' 
        ? interpretationExercises.length - 1
        : usageExercises.length - 1;
    
    if (currentExerciseIndex < maxIndex) {
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
    const currentExercise = getCurrentExercise();
    if (currentExercise && selectedOption) {
      return selectedOption === currentExercise.correct;
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
                <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Idiomatic Expressions</span> - ანდაზები და იდიომები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Learn authentic Georgian idioms, proverbs and colloquial expressions.
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
                  to="/advanced/quiz/idioms"
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
                  <li>• Use idioms in context for better understanding</li>
                  <li>• Practice with native speakers when possible</li>
                  <li>• Pay attention to the literal and figurative meanings</li>
                  <li>• Learn the cultural background of expressions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {idiomCategories.map((category) => (
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
                    {category.idioms.map((idiom, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg transition-transform hover:scale-[1.01]`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {idiom.georgian}
                          </span>
                          <button
                            onClick={() => playAudio(idiom.georgian)}
                            className={`p-2 rounded-full transition-colors ${
                              isPlaying === idiom.georgian
                                ? (theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500')
                                : (theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                            }`}
                          >
                            {isPlaying === idiom.georgian ? (
                              <X size={16} className="text-white" />
                            ) : (
                              <Volume2 size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            )}
                          </button>
                        </div>
                        <div className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            /{idiom.latin}/
                          </p>
                          <p>
                            <span className="font-medium">Literal:</span> {idiom.literalTranslation}
                          </p>
                          <p>
                            <span className="font-medium">Meaning:</span> {idiom.meaning}
                          </p>
                          <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className="font-medium mb-1">Example:</p>
                            <p>{idiom.georgian}</p>
                            <p className="text-sm mt-1">{idiom.exampleTranslation}</p>
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
                onClick={() => setExerciseMode('matching')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Matching Idioms
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Match Georgian idioms with their correct meanings
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('interpretation')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Idiom Interpretation
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Understand the meaning of idioms in context
                </p>
              </button>
              
              <button
                onClick={() => setExerciseMode('usage')}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Idiom Usage
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Practice using the right idiom in different situations
                </p>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {exerciseMode === 'matching' ? 'Matching Idioms' : 
                   exerciseMode === 'interpretation' ? 'Idiom Interpretation' : 'Idiom Usage'}
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
              
              <div>
                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getCurrentExercise()?.prompt}
                </p>
                
                <div className="mb-6">
                  <div className="space-y-3">
                    {getCurrentExercise()?.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleExerciseAnswer(option)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          selectedOption === option
                            ? option === getCurrentExercise()?.correct
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
                          : `Incorrect. The correct answer is "${getCurrentExercise()?.correct}". `}
                        {getCurrentExercise()?.explanation}
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
                  
                  {(
                    (exerciseMode === 'matching' && currentExerciseIndex < matchingExercises.length - 1) ||
                    (exerciseMode === 'interpretation' && currentExerciseIndex < interpretationExercises.length - 1) ||
                    (exerciseMode === 'usage' && currentExerciseIndex < usageExercises.length - 1)
                  ) && (
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
                <li>Danelia, K. (2006). <em>Georgian Idioms and Proverbs</em></li>
                <li>Rayfield, D. (2012). <em>The Literature of Georgia: A History</em></li>
                <li>Wardrop, M. (1914). <em>Georgian Folk Tales</em></li>
                <li>Tuite, K. (2005). <em>The Georgian Language and its Cultural Paradigm</em></li>
                <li>Kiziria, D. (2009). <em>Georgian-English Dictionary of Idioms</em></li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Practice Strategies
              </h3>
              <ul className={`list-disc pl-5 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Create flashcards with the idiom on one side and its meaning on the other</li>
                <li>Try to use one new idiom each day in conversation</li>
                <li>Listen to Georgian folk tales and songs for idiomatic expressions</li>
                <li>Watch Georgian films with subtitles and note the idioms used</li>
                <li>Participate in Georgian cultural events to understand idioms in context</li>
                <li>Keep an idiom journal to record new expressions you encounter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdiomsPage;